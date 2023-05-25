import {
  ascensionRevenueDistributionTokenABI,
  ascensionRevenueDistributionTokenAddress,
  ascensionTokenABI,
  ascensionTokenAddress,
} from '@/wagmi/generated'
import { MongoClient } from 'mongodb'
import { NextResponse, NextRequest } from 'next/server'
import {
  createPublicClient,
  formatUnits,
  getContract,
  http,
  parseUnits,
  verifyMessage,
} from 'viem'
import { arbitrum } from 'viem/chains'

interface AscensionUser {
  discordId: string
  ethereumAddress: string
}

const messageText =
  'Ascension Protocol asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees.  '

// This function modifies a Discord guild member
async function modifyDiscordGuildMember(
  guildId: string,
  userId: string,
  roleId: string,
  botToken: string
) {
  const response = await fetch(
    `https://discord.com/api/v8/guilds/${guildId}/members/${userId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roles: [roleId],
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.error()
    }

    const {
      signature,
      userId: discordId,
      interactionId,
      timestamp,
      ethereumAddress,
    } = await request.json()

    // Verify the signature to ensure the user owns the Ethereum address
    const message =
      messageText +
      '\n- Discord ID: ' +
      discordId +
      '\n- Discord Interaction: ' +
      interactionId +
      '\n- Timestamp: ' +
      timestamp

    const valid = await verifyMessage({
      message,
      signature,
      address: ethereumAddress,
    })

    if (!valid) {
      throw new Error('The signature could not be verified.')
    }

    // Connect to the MongoDB Atlas database
    //mongodb setup
    const uri = process.env.MONGODB_URI || ''
    const clientDB = new MongoClient(uri)
    clientDB.connect()
    const db = clientDB.db('Ascension')

    // Check if the user already exists in the database
    const existingUser = await db
      .collection('users')
      .findOne<AscensionUser>({ discordId })

    if (existingUser) {
      return NextResponse.json({
        message: 'User already exists in the database.',
      })
    } else {
      // Create a new user record with the Discord ID and Ethereum address
      await db.collection('users').insertOne({ discordId, ethereumAddress })
    }

    const publicClient = createPublicClient({
      chain: arbitrum,
      transport: http(),
    })

    const ascend = getContract({
      address: ascensionTokenAddress,
      abi: ascensionTokenABI,
      publicClient,
    })
    const xAscend = getContract({
      address: ascensionRevenueDistributionTokenAddress,
      abi: ascensionRevenueDistributionTokenABI,
      publicClient,
    })

    const totalBalance = parseFloat(
      formatUnits(
        (await ascend.read.balanceOf([ethereumAddress])) +
          (await xAscend.read.balanceOfAssets([ethereumAddress])),
        18
      )
    )

    console.log(totalBalance)

    if (totalBalance > 0n) {
      console.log('adding dao member role')
      await modifyDiscordGuildMember(
        process.env.DISCORD_GUILD_ID || '',
        discordId,
        '956205255123681282',
        process.env.DISCORD_BOT_TOKEN || ''
      )
    }
    if (totalBalance > parseUnits('20000', 18)) {
      console.log('adding gamma dao member role')
      await modifyDiscordGuildMember(
        process.env.DISCORD_GUILD_ID || '',
        discordId,
        '1087529481809449020',
        process.env.DISCORD_BOT_TOKEN || ''
      )
    }
    if (totalBalance > parseUnits('40000', 18)) {
      console.log('adding beta dao member role')
      await modifyDiscordGuildMember(
        process.env.DISCORD_GUILD_ID || '',
        discordId,
        '1087529175985967155',
        process.env.DISCORD_BOT_TOKEN || ''
      )
    }
    if (totalBalance > parseUnits('80000', 18)) {
      console.log('adding alpha dao member role')
      await modifyDiscordGuildMember(
        process.env.DISCORD_GUILD_ID || '',
        discordId,
        '955235419384086548',
        process.env.DISCORD_BOT_TOKEN || ''
      )
    }

    return NextResponse.json({ message: 'User created successfully.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
    })
  }
}

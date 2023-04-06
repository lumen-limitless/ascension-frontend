import { defineConfig } from '@wagmi/cli'
import { react, foundry, blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/wagmi/generated.ts',
  contracts: [],
  plugins: [
    react(),

    foundry({
      project: '../ascension-token',
      deployments: {
        AscensionToken: '0x9e724698051da34994f281bd81c3e7372d1960ae',
      },
      include: ['AscensionToken.json'],
    }),

    foundry({
      project: '../ascension-polystaking',
      deployments: {
        AscensionPolyStakingPool: '0xa77e481efa8c668a21d866fa27d6867e03e3edf5',
      },
      include: ['AscensionPolyStakingPool.json'],
    }),

    foundry({
      project: '../ascension-staking',
      deployments: {
        AscensionRevenueDistributionToken:
          '0x42F5A9B27a60a7558D196747cb43e14cBe13B398',
      },
      include: ['AscensionRevenueDistributionToken.json'],
    }),
  ],
})

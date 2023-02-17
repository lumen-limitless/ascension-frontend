import { defineConfig } from '@wagmi/cli'
import { react, foundry, blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/wagmi/generated.ts',
  contracts: [],
  plugins: [
    react(),
    // blockExplorer(),
    foundry({
      project: '../ascension-token',
      deployments: {
        AscensionToken: {
          42161: '0x9e724698051DA34994F281bD81C3E7372d1960AE',
        },
      },
      include: ['AscensionToken.json'],
    }),
  ],
})

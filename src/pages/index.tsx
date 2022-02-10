import Container from "../components/Container";
import Stat from "../components/Stat";
import { useCoingeckoAscensionStats } from "../hooks/useAPI";

export default function HomePage() {
    const { price, marketCap } = useCoingeckoAscensionStats();

    return (
        <Container maxWidth="5xl">
            <Stat
                stats={[
                    { name: "Price", stat: price, before: "$" },
                    {
                        name: "Market Cap",
                        stat: marketCap,
                        before: "$",
                        isBalance: true,
                    },
                    {
                        name: "Liquidity Locked",
                        stat: "15,598",
                        after: " SLP",
                    },
                ]}
            />
        </Container>
    );
}

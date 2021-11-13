import Container from "../components/Container";
import Stat from "../components/Stat";
import { useCoingeckoAscensionStats } from "../hooks/useCoingecko";

export default function Home() {
    const { price, marketCap } = useCoingeckoAscensionStats();

    return (
        <Container maxWidth="3xl">
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
                        name: "Total Supply",
                        stat: "14,400,000",
                        after: " ASCEND",
                    },
                ]}
            />
        </Container>
    );
}

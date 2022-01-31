import Container from "../components/Container";
import Stat from "../components/Stat";
import { useCoingeckoAscensionStats } from "../hooks/useAPI";

export default function Home() {
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
                        name: "Treasury TVL",
                        stat: "10,000",
                        before: "$",
                    },
                ]}
            />
        </Container>
    );
}

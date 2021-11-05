import Container from "../components/Container";
import Card from "../components/Card";
import Chart from "../components/Charts";
import Stat from "../components/Stat";
import useCoingecko, {
    useCoingeckoAscensionStats,
} from "../hooks/useCoingecko";

export default function Home() {
    const { price, marketCap } = useCoingeckoAscensionStats();

    return (
        <Container maxWidth="5xl">
            <Stat
                title="Token Stats"
                stats={[
                    { name: "Price", stat: price, before: "$" },
                    {
                        name: "Market Cap",
                        stat: marketCap,
                        before: "$",
                        commify: true,
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

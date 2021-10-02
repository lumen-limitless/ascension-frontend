import React from "react";
import Section from "../components/base/section";
import Card from "../components/base/card";

export default function Treasury() {
  return (
    <Section>
      <Card color="bg-gray-700" w="" h="">
        Your voting power:
      </Card>
      <Card color="bg-gray-800" w="full" h="2/3">
        Governance
      </Card>
    </Section>
  );
}

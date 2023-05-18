import Section from '@/components/ui/Section'

export default function Page() {
  return (
    <Section centered col className="gap-3">
      <h1 className="text-3xl font-bold text-green">Success!</h1>
      <p className="text-xl">Your account has been linked.</p>
      <p className="">You can now close this window.</p>
    </Section>
  )
}

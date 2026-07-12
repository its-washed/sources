export default function RefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Refund Policy</h1>
      <p className="mt-2 text-muted-foreground">Understand our refund terms and eligibility criteria.</p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p className="mt-3">
            This Refund Policy establishes terms and conditions under which Bender processes refund requests.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Refund Eligibility</h2>
          <p className="mt-3">Strict policy &mdash; no refunds under any of the following conditions:</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Circumvention of disciplinary measures (alternative accounts, third-party payments without disclosure)</li>
            <li>Violation of any rule or guideline within Community Discord Server after payment</li>
            <li>Disrespectful conduct toward Bender, development team, moderation staff, or support personnel</li>
            <li>Duplicate purchases for a previously whitelisted server (additional server will be whitelisted instead)</li>
            <li>Utilization of any command or feature by the purchaser or any member of the purchaser&apos;s server</li>
            <li>Expiration of twenty-four (24) hours from the time of purchase</li>
            <li>Status as a blacklisted user across any service platforms</li>
            <li>Evidence of malicious intent underlying the refund request</li>
            <li>Misrepresentation, falsification, or omission of material information</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Policy Amendments</h2>
          <p className="mt-3">May modify at any time without prior notice. Continued use constitutes acceptance. Violations may result in permanent termination.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Contact Information</h2>
          <p className="mt-3">For questions or concerns, contact through official support channels.</p>
        </section>
      </div>
    </div>
  );
}

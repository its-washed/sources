export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground">Learn how we collect, use, and protect your data.</p>

      <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p className="mt-3">
            This Privacy Policy governs the collection, use, storage, and disclosure of information obtained from users. Contact for misrepresentations/inaccuracies via support email.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information Collection</h2>
          <p className="mt-3">We collect and process:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>User Identifiers: User IDs, usernames, and nicknames</li>
            <li>Guild Information: Guild IDs, Guild names</li>
            <li>Communication Data: Channel IDs, Role IDs, Message IDs, and message timestamps</li>
            <li>Command Arguments: Information provided as arguments when executing commands</li>
            <li>Historical Data: Last deleted message content (max 25 entries, retained &le;6 hours) and message edit history (max 25 entries, retained &le;6 hours)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Purpose of Data Collection and Processing</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>Facilitating command execution and system functionality</li>
            <li>Debugging and technical maintenance</li>
            <li>Supporting features: &quot;namehistory&quot; command (nickname/username changes) and &quot;gnames&quot; command (Guild name changes)</li>
            <li>Data aggregation for system operation</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Third-Party Disclosure</h2>
          <p className="mt-3">We do not sell, trade, rent, or otherwise transfer User information to external parties.</p>
          <p className="mt-2">We reserve the right to disclose information as required by law.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Data Subject Rights</h2>
          <p className="mt-3 font-medium text-foreground">5.1 Right to Erasure:</p>
          <p className="mt-2">Written request to support email, must specifically identify info, provide account ownership evidence, processing time up to 14 days.</p>
          <p className="mt-3 font-medium text-foreground">5.2 Right to Access:</p>
          <p className="mt-2">Written request to support email, response time up to 7 days.</p>
          <p className="mt-3 font-medium text-foreground">5.3 Self-Service Data Management:</p>
          <p className="mt-2">Users can clear nickname/username history via &quot;namehistory&quot; command. Guild admins can clear Guild name history via &quot;gnames&quot; command.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Policy Amendments</h2>
          <p className="mt-3">May modify at any time without prior notice. Continued use constitutes acceptance. Violations may result in permanent termination.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Contact Information</h2>
          <p className="mt-3">Questions/concerns via official support channels.</p>
        </section>
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Shotted',
  description: 'Privacy policy for the Shotted screenshot organizer app.',
};

const LAST_UPDATED = 'June 25, 2025';
const CONTACT_EMAIL = 'pranav.kumar@thesouledstore.com';

export default function ShottedPrivacyPolicy() {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#0a0a0a] text-[#e8eaed]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#8ab4f8]">
            Shotted · Privacy Policy
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white">
            Your data stays on your phone.
          </h1>
          <p className="text-sm text-[#9aa0a6]">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-[#bdc1c6]">
          {/* Overview */}
          <section>
            <p>
              Shotted is a screenshot organizer that runs entirely on your device. It does not have
              accounts, does not connect to the internet, and does not send any data anywhere. This
              policy explains what the app accesses and why.
            </p>
          </section>

          {/* What we access */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">What the app accesses</h2>
            <div className="space-y-4">
              <Row
                label="Your screenshots"
                detail="Shotted reads images from your device's MediaStore to detect when a new screenshot is taken. It reads the file path and timestamp — it does not upload, copy, or transmit images anywhere."
              />
              <Row
                label="Tags and notes you add"
                detail="Any tags or notes you create are stored in a local database on your device (SQLite via Room). This data never leaves your phone."
              />
            </div>
          </section>

          {/* Permissions */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Permissions used</h2>
            <div className="space-y-4">
              <Row
                label="READ_MEDIA_IMAGES"
                detail="Required to detect new screenshots and display them in the app."
              />
              <Row
                label="FOREGROUND_SERVICE"
                detail="Keeps the screenshot detection running while you use other apps. A persistent notification is shown as required by Android."
              />
              <Row
                label="SYSTEM_ALERT_WINDOW"
                detail="Used to show the tag popup over your current screen immediately after a screenshot is taken. You can revoke this in Settings — the app will fall back to a notification instead."
              />
              <Row
                label="RECEIVE_BOOT_COMPLETED"
                detail="Restarts the detection service automatically after your device reboots."
              />
              <Row
                label="REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"
                detail="Requests exemption from battery optimization so the background service is not killed by the OS. You can deny or revoke this at any time in Settings."
              />
            </div>
          </section>

          {/* No third parties */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Third parties</h2>
            <p>
              Shotted contains no analytics, no advertising SDKs, no crash reporting services, and
              no tracking of any kind. No data is shared with any third party.
            </p>
          </section>

          {/* Data storage */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Data storage and deletion</h2>
            <p>
              All data — your tags, notes, and screenshot records — is stored locally on your
              device. Uninstalling the app deletes all of it. There is no cloud backup and no way
              for us to access or recover it.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Children</h2>
            <p>
              Shotted is not directed at children under 13 and does not knowingly collect
              information from them.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Changes to this policy</h2>
            <p>
              If this policy changes materially, the updated version will be posted at this URL with
              a new date. Since the app collects no data, changes are unlikely.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-base font-semibold text-white">Contact</h2>
            <p>
              Questions?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#8ab4f8] underline underline-offset-2 hover:text-white transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-[#9aa0a6]">
          <p>
            Shotted — made by{' '}
            <Link href="/" className="text-[#8ab4f8] hover:text-white transition-colors">
              Pranav
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-1">
      <span className="pt-0.5 text-sm font-medium text-[#e8eaed]">{label}</span>
      <span className="text-sm text-[#9aa0a6]">{detail}</span>
    </div>
  );
}

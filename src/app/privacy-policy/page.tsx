import type { Metadata } from "next";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | GutGuard",
  description: "Read the GutGuard privacy policy.",
};

const linkClass = "text-[#1217C9] transition hover:underline";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white py-16 sm:py-20">
        <Container size="lg">
          <article className="space-y-12 text-[0.84rem] leading-7 text-slate-500 [&_h2]:mb-4 [&_h2]:text-[1rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-slate-950 [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:text-[0.86rem] [&_h3]:font-semibold [&_h3]:text-slate-950 [&_li]:ml-5 [&_li]:list-disc">
            <section>
              <h2>1. Introduction</h2>
              <p>
                ThemeREX (website url address:{" "}
                <a className={linkClass} href="https://themerex.net" rel="noreferrer" target="_blank">
                  https://themerex.net
                </a>
                ) appreciates your business and trust. We are a Cyprus based company, creating products to enhance your website building experience. Please read this Privacy Policy, providing consent to both documents in order to have permission to use our services.
              </p>
            </section>

            <section>
              <h2>2. Data Collected</h2>
              <h3>Data Storage Location</h3>
              <p>
                We are a Cyprus based company and operate web servers hosted in Germany. Our hosting provider Hetzner Online GmbH adheres to the EU/US &quot;Privacy Shield&quot;, ensuring that your data is securely stored and GDPR compliant. For more information on Hetzner Online GmbH privacy policy, please see here:{" "}
                <a className={linkClass} href="https://www.hetzner.com/rechtliches/datenschutz" rel="noreferrer" target="_blank">
                  Hetzner Data Privacy Policy
                </a>
                .
              </p>
              <h3>Registration Data</h3>
              <p>If you register on our website, we store your chosen username and your email address and any additional personal information added to your user profile. You can see, edit, or delete your personal information at any time (except changing your username). Website administrators can also see and edit this information.</p>
              <h3>Purchase Data</h3>
              <p>To receive product support, you have to have one or more Envato/ThemeREX purchase codes on our website. These purchase codes will be stored together with support expiration dates and your user data. This is required for us to provide you with downloads, product support, and other customer services.</p>
              <h3>Support Data</h3>
              <p>
                If you have registered on our website and have a valid support account, you can submit support tickets for assistance. Support form submissions are sent to our third party Ticksy ticketing system. Only the data you explicitly provided is sent, and you are asked for consent, each time you want to create a new support ticket. Ticksy adheres to the EU/US &quot;Privacy Shield&quot; and you can see their privacy policy here:{" "}
                <a className={linkClass} href="https://ticksy.com/privacy-policy/" rel="noreferrer" target="_blank">
                  Ticksy Privacy Policy
                </a>
                .
              </p>
              <h3>Comments</h3>
              <p>When you leave comments on the website we collect the data shown in the comments form, and also the IP address and browser user agent string to help spam detection.</p>
              <h3>Contact Form</h3>
              <p>
                Information submitted through the contact form on our site is sent to our company email, hosted by Zoho. Zoho adheres to the EU/US &quot;Privacy Shield&quot; policy and you can find more information about this here:{" "}
                <a className={linkClass} href="https://www.zoho.com/privacy.html" rel="noreferrer" target="_blank">
                  Zoho Privacy Policy
                </a>
                .
              </p>
              <p className="mt-3">These submissions are only kept for customer service purposes they are never used for marketing purposes or shared with third parties.</p>
              <h3>Google Analytics</h3>
              <p>
                We use Google Analytics on our site for anonymous reporting of site usage. So, no personalized data is stored. If you would like to opt-out of Google Analytics monitoring your behavior on our website please use this link:{" "}
                <a className={linkClass} href="https://tools.google.com/dlpage/gaoptout/" rel="noreferrer" target="_blank">
                  Google Analytics Opt-out
                </a>
                .
              </p>
              <h3>Cases for Using the Personal Data</h3>
              <p className="font-semibold text-slate-700">We use your personal information in the following cases:</p>
              <ul>
                <li>Verification/identification of the user during website usage;</li>
                <li>Providing Technical Assistance;</li>
                <li>Sending updates to our users with important information to inform about news/changes;</li>
                <li>Checking the accounts&apos; activity in order to prevent fraudulent transactions and ensure the security over our customers&apos; personal information;</li>
                <li>Customize the website to make your experience more personal and engaging;</li>
                <li>Guarantee overall performance and administrative functions run smoothly.</li>
              </ul>
            </section>

            <section>
              <h2>3. Embedded Content</h2>
              <p>Pages on this site may include embedded content, like YouTube videos, for example. Embedded content from other websites behaves in the exact same way as if you visited the other website.</p>
              <p className="mt-3">These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with that embedded content if you have an account and are logged in to that website. Below you can find a list of the services we use:</p>
              <h3>Facebook</h3>
              <p>
                The Facebook page plugin is used to display our Facebook timeline on our site. Facebook has its own cookie and privacy policies over which we have no control. There is no installation of cookies from Facebook and your IP is not sent to a Facebook server until you consent to it. See their privacy policy here:{" "}
                <a className={linkClass} href="https://www.facebook.com/privacy/" rel="noreferrer" target="_blank">Facebook Privacy Policy</a>.
              </p>
              <h3>Twitter</h3>
              <p>
                We use the Twitter API to display our tweets timeline on our site. Twitter has its own cookie and privacy policies over which we have no control. Your IP is not sent to a Twitter server until you consent to it. See their privacy policy here:{" "}
                <a className={linkClass} href="https://twitter.com/privacy" rel="noreferrer" target="_blank">Twitter Privacy Policy</a>.
              </p>
              <h3>Youtube</h3>
              <p>
                We use YouTube videos embedded on our site. YouTube has its own cookie and privacy policies over which we have no control. There is no installation of cookies from YouTube and your IP is not sent to a YouTube server until you consent to it. See their privacy policy here:{" "}
                <a className={linkClass} href="https://www.youtube.com/static?template=privacy_guidelines" rel="noreferrer" target="_blank">YouTube Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2>4. Cookies</h2>
              <p>This site uses cookies - small text files that are placed on your machine to help the site provide a better user experience. In general, cookies are used to retain user preferences, store information for things like shopping carts, and provide anonymised tracking data to third party applications like Google Analytics. Cookies generally exist to make your browsing experience better. However, you may prefer to disable cookies on this site and on others. The most effective way to do this is to disable cookies in your browser. We suggest consulting the help section of your browser.</p>
              <h3>Necessary Cookies (all site visitors)</h3>
              <ul>
                <li><strong>cfduid:</strong> Is used for our CDN CloudFlare to identify individual clients behind a shared IP address and apply security settings on a per-client basis. See more information on privacy here: <a className={linkClass} href="https://www.cloudflare.com/privacypolicy/">CloudFlare Privacy Policy</a>.</li>
                <li><strong>PHPSESSID:</strong> To identify your unique session on the website.</li>
              </ul>
              <h3>Necessary Cookies (Additional for Logged in Customers)</h3>
              <ul>
                <li><strong>wp-auth:</strong> Used by WordPress to authenticate logged-in visitors, password authentication and user verification.</li>
                <li><strong>wordpress_logged_in_[hash]:</strong> Used by WordPress to authenticate logged-in visitors, password authentication and user verification.</li>
                <li><strong>wordpress_test_cookie:</strong> Used by WordPress to ensure cookies are working correctly.</li>
                <li><strong>wp-settings-[UID]:</strong> WordPress sets a few wp-settings-[UID] cookies. The number on the end is your individual user ID from the users database table. This is used to customize your view of admin interface, and possibly also the main site interface.</li>
                <li><strong>wp-settings-[UID]:</strong> WordPress also sets a few wp-settings-time-[UID] cookies. The number on the end is your individual user ID from the users database table. This is used to customize your view of admin interface, and possibly also the main site interface.</li>
              </ul>
            </section>

            <section>
              <h2>5. Who Has Access To Your Data</h2>
              <p>If you are not a registered client for our site, there is no personal information we can retain or view regarding yourself.</p>
              <p className="mt-3">If you are a client with a registered account, your personal information can be accessed by:</p>
              <ul>
                <li>Our system administrators.</li>
                <li>Our supporters when they (in order to provide support) need to get the information about the client accounts and access.</li>
              </ul>
            </section>

            <section>
              <h2>6. Third Party Access to Your Data</h2>
              <p>We don&apos;t share your data with third-parties in a way as to reveal any of your personal information like email, name, etc. The only exceptions to that rule are for partners we have to share limited data with in order to provide the services you expect from us. Please see below:</p>
              <h3>Envato Pty Ltd</h3>
              <p>For the purpose of validating and getting your purchase information regarding licenses for this theme, we send your provided tokens and purchase keys to Envato Pty Ltd and use the response from their API to register your validated support data. See the Envato privacy policy here: <a className={linkClass} href="https://envato.com/privacy/" rel="noreferrer" target="_blank">Envato Privacy Policy</a>.</p>
              <h3>Ticksy</h3>
              <p>Ticksy provides the support ticketing platform we use to handle support requests. The data they receive is limited to the data you explicitly provide and consent to being set when you create a support ticket. Ticksy adheres to the EU/US &quot;Privacy Shield&quot; and you can see their privacy policy here: <a className={linkClass} href="https://ticksy.com/privacy-policy/" rel="noreferrer" target="_blank">Ticksy Privacy Policy</a>.</p>
            </section>

            <section>
              <h2>7. How Long We Retain Your Data For</h2>
              <p>When you submit a support ticket or a comment, its metadata is retained until (if) you tell us to remove it. We use this data so that we can recognize you and approve your comments automatically instead of holding them for moderation.</p>
              <p className="mt-3">If you register on our website, we also store the personal information you provide in your user profile. You can see, edit, or delete your personal information at any time (except changing your username). Website administrators can also see and edit that information.</p>
            </section>

            <section>
              <h2>8. Security Measures</h2>
              <p>We use the SSL/HTTPS protocol throughout our site. This encrypts our user communications with the servers so that personally identifiable information is not captured/hijacked by third parties without authorization.</p>
              <p className="mt-3">In case of a data breach, system administrators will immediately take all needed steps to ensure system integrity, will contact affected users and will attempt to reset passwords if needed.</p>
            </section>

            <section>
              <h2>9. Your Data Rights</h2>
              <h3>General Rights</h3>
              <p>If you have a registered account on this website or have left comments, you can request an exported file of the personal data we retain, including any additional data you have provided to us.</p>
              <p className="mt-3">You can also request that we erase any of the personal data we have stored. This does not include any data we are obliged to keep for administrative, legal, or security purposes. In short, we cannot erase data that is vital to you being an active customer (i.e. basic account information like an email address).</p>
              <p className="mt-3">If you wish that all of your data is erased, we will no longer be able to offer any support or other product-related services to you.</p>
              <h3>GDPR Rights</h3>
              <p>Your privacy is critically important to us. Going forward with the GDPR we aim to support the GDPR standard. ThemeREX permits residents of the European Union to use its Service. Therefore, it is the intent of ThemeREX to comply with the European General Data Protection Regulation. For more details please see here: <a className={linkClass} href="https://www.eugdpr.org/" rel="noreferrer" target="_blank">EU GDPR Information Portal</a>.</p>
            </section>

            <section>
              <h2>10. Third Party Websites</h2>
              <p>ThemeREX may post links to third party websites on this website. These third party websites are not screened for privacy or security compliance by ThemeREX, and you release us from any liability for the conduct of these third party websites. All social media sharing links, either displayed as text links or social media icons do not connect you to any of the associated third parties unless you explicitly click on them.</p>
              <p className="mt-3">Please be aware that this Privacy Policy, and any other policies in place, in addition to any amendments, does not create rights enforceable by third parties or require disclosure of any personal information relating to members of the Service or Site. ThemeREX bears no responsibility for the information collected or used by any advertiser or third party website. Please review the privacy policy and terms of service for each site you visit through third party links.</p>
            </section>

            <section>
              <h2>11. Release of Your Data for Legal Purposes</h2>
              <p>At times it may become necessary or desirable to ThemeREX, for legal purposes, to release your information in response to a request from a government agency or a private litigant. You agree that we may disclose your information to a third party where we believe, in good faith, that it is desirable to do so for the purposes of a civil action, criminal investigation, or other legal matter. In the event that we receive a subpoena affecting your privacy, we may elect to notify you to give you an opportunity to file a motion to quash the subpoena, or we may attempt to quash it ourselves, but we are not obligated to do either. We may also proactively report you, and release your information to, third parties where we believe that it is prudent to do so for legal reasons, such as our belief that you have engaged in fraudulent activities. You release us from any damages that may arise from or relate to the release of your information to a request from law enforcement agencies or private litigants.</p>
              <p className="mt-3">Any passing on of personal data for legal purposes will only be done in compliance with laws of the country you reside in.</p>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}

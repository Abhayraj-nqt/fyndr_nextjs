import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fyndr Privacy Statement",
};

const Privacy = () => {
  const olStyle = "list-decimal pl-9 text-[1.2rem]";
  const ulStyle = "list-disc pl-9 text-[1.2rem]";
  const textSize = "text-[1.2rem]";
  const headingSize = "text-[1.6rem]";
  return (
    <div className="m-20">
      <div className="mb-5 flex w-full justify-center">
        {/* <object type="image/svg+xml" data="logo.svg" width="150"></object> */}
        <Image
          src={"/images/fyndr-logo-blue.png"}
          width={300}
          height={500}
          alt="Fyndr Logo"
        ></Image>
      </div>
      <div className="flex w-full justify-center">
        <span className="text-[2rem]">Fyndr Privacy Statement</span>
      </div>
      <div>
        <div className="pb-10 text-[1.2rem]">
          Effective Date: March 24th, 2024
        </div>
        <p className="text-[1.2rem]">
          This Privacy Statement (&ldquo;<strong>Privacy Statement</strong>
          &rdquo;) explains how Fyndr, LLC., its affiliates, and its
          subsidiaries (&ldquo;<strong>Fyndr</strong>,&rdquo; &ldquo;
          <strong>us</strong>,&rdquo; &ldquo;<strong>our</strong>,&rdquo; and
          &ldquo;<strong>we</strong>&rdquo;) use your information that applies
          to all who use our websites and platforms &ndash; including mobile
          applications, touch technologies, electronic services, social
          networking sites, interactive features, online services or any of our
          described online activities we own or control (collectively, the
          &ldquo;<strong>Service</strong>&rdquo;). For terms that govern the use
          of the Service, please review the Service&rsquo;s Terms of Use on our
          website <Link href="http://www.fyndr.us">www.fyndr.us</Link> or on
          mobile app (Menu 🡪 Terms &amp; Privacy Policy)
        </p>
        <p className={`${textSize}`}>
          <strong>
            By using the Service, you acknowledge you have read the terms of
            this Privacy Statement. If you do not want your information handled
            as described in this Privacy Statement, please do not provide us
            with your information or interact with the Service.
          </strong>
        </p>
        <p className="text-[1.2rem]">
          We may modify this Privacy Statement at any time. If we make any
          material changes, we will notify you by email (sent to the email
          address specified in your account) or by means of notice on the
          Service prior to the change becoming effective. You can determine when
          this Privacy Statement was last revised by referring to the
          &rdquo;Effective Date&rdquo; above.
        </p>
        <p className="text-[1.2rem]">
          This Privacy Statement is organized as follows:
        </p>
      </div>
      <div className="mt-10">
        <p className={`${headingSize}`}>
          <strong>Privacy Statement Structure</strong>
        </p>
        <ol className={`${olStyle}`}>
          <li>
            <Link href="" className="text-primary">
              <strong> Types of Information We Collect</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> How Fyndr Collects Information</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> How Fyndr Uses Information</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> When and Why Fyndr Discloses Information</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Security of Personal Information</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Your Rights Regarding Personal Information</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Your Choices</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Social Community Areas</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Privacy Practices of Third Parties</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Business Transfers and Corporate Changes</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong>
                Notice to Residents of Countries outside the United States of
                America
              </strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Children&rsquo;s Privacy</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong> Contact Us</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong>California Privacy Rights and Other Countries</strong>
            </Link>
          </li>
          <li>
            <Link href="" className="text-primary">
              <strong>Google Calendar Permission</strong>
            </Link>
          </li>
        </ol>
        <div className="mt-10">
          <p className="text-[1.2rem]">
            We may collect the following categories of personal information from
            and about you:
          </p>
          <ul className="list-inside list-disc text-[1.2rem]">
            <li>
              <strong>Identifiers</strong>: such as your name, postal addresses,
              email addresses, social networking website user account names,
              telephone numbers, or other addresses at which you are able to
              receive communications.
            </li>
            <li>
              <strong>Demographic information: </strong>such as your age,
              birthdate, and gender.
            </li>
            <li>
              <strong>Commercial information</strong>:such as information that
              enables us to determine lifestyle, interests, and activities,
              including purchasing tendencies and order history (such as the
              Fyndr offers you purchase and redeem); areas of interest;
              information collected through your interactions with social
              networks; information about persons with whom you share the offers
              as gifts or who have bought Fyndr offers as gifts for you; and
              information about friends who refer you or whom you have referred.
            </li>
            <li>
              <strong>Location information: </strong>such as information related
              to your state/province, city, or neighborhood, and, if you agree,
              more specific location information that is provided through the
              GPS functionality on mobile devices used to access the Service.
            </li>
            <li>
              <strong>Financial information</strong>: such as information
              collected from you as needed to process payments for Fyndr usage,
              offers or other products or services that you buy, or as provided
              by you to administer your participation in optional services and
              programs, such as your payment card number, expiration date, and
              card verification number.
            </li>
            <li>
              <strong>Internet, network and activity information</strong>: such
              asinformation about your browsing behavior, search history, and
              interactions with individuals, businesses, websites and
              advertisements, including data from cookies, pixel tags, and web
              beacons.
            </li>
            <li>
              <strong>
                Inferences regarding preferences and other characteristics:{" "}
              </strong>
              such as our assessment of the types of products or services you
              may have an interest in.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href=""></Link>

          <h2 className={`${headingSize}`}>
            <strong>2. How Fyndr Collects Information</strong>
          </h2>
        </div>
        <div>
          <p className="text-[1.2rem]">
            We may collect personal information about you from a variety of
            sources, including:
          </p>
          <ul className="list-inside list-disc text-[1.2rem]">
            <li>
              <strong>From you: </strong>We collect information that you submit
              to us. For example, when you check-in with the business, scan a QR
              code, use the Service; make a purchase; register to receive
              information, products, or services available through the Service;
              or interact with business&rsquo;s and us in other ways. We will
              collect any information you voluntarily provide, and we may also
              request optional information to support your use of the Service.
              We also collect any information that you voluntarily enter into
              any postings, comments, or forums within the Service. If you send
              an e-mail to us, we will collect your e-mail address and the full
              content of your e-mail, including attached files and other
              information you choose to provide to us.
            </li>
            <li>
              <strong>From your device:</strong> When you use the Service, we
              may collect information about the devices you use to access the
              Service, including hardware model, operating system and version,
              Internet Protocol (&ldquo;IP&rdquo;) address, and other unique
              device identifiers, mobile network information, and information
              about the device&rsquo;s interaction with our Service. We may also
              collect information about how you use our Service, including your
              access times, browser types, and language. This type of data
              enables us to understand how often individuals use parts of the
              Service so we can analyze and improve it. To collect this
              information, we use cookies and web beacons, and other similar
              technologies.&nbsp;
            </li>
            <li>
              <strong>Location information:</strong> We may collect different
              types of information about your location, including general
              information, such as the city, state, and/or zip code associated
              with your IP Address, and, if you agree, more specific location
              information that is provided through the GPS functionality on
              mobile devices used to access the Service. We may use such
              location information to customize the Service, including
              advertising that is presented to you. In order to do this, your
              location information may be passed along to our affiliates,
              agents, vendors or advertisers. You may be able to disallow our
              use of certain location data through your device or browser
              settings, for example, by disabling &ldquo;Location&rdquo;
              services for the Fyndr application in iOS privacy settings.
            </li>
            <li>
              <strong>Social media networks and other third parties:</strong> We
              may obtain information about you or your use of the Service from
              third party sources, such as our vendors, like web hosting
              providers, analytics providers, or advertisers. You may give us
              permission to access your information from services offered by
              third parties, including social media networks. The information we
              obtain from third party services depends on your account/privacy
              settings with those third parties and the third parties&rsquo;
              privacy policies, so be sure to check those policies and to adjust
              your settings to meet your preferences. When you access the
              Service through social media networks and other third party
              platforms, you are authorizing Fyndr to collect, store, and use
              such information and content in accordance with this Privacy
              Statement. Please keep in mind that any information provided to us
              by a third party may also be subject to that third party&rsquo;s
              privacy policy.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            3. How Fyndr Uses Information
          </strong>
        </div>
        <div className="text-[1.2rem]">
          <p>
            We may use information collected as described in this Privacy
            Statement to:
          </p>
          <ul className={`${ulStyle}`}>
            <li>
              Operate, maintain, and improve the Service and other programs,
              features, and functionality related to the Service;
            </li>
            <li>
              Provide you with interest-based ads, push notifications,
              communications, and offers for products and services from us and
              our business partners, including based on your precise
              geolocation;
            </li>
            <li>
              Facilitate and fulfill orders &ndash; for example, for Fyndr
              offers and other goods and services, including tracking
              redemption;
            </li>
            <li>Process and confirm bookings with our partners;</li>
            <li>Process your payments;</li>
            <li>
              Evaluate your eligibility for certain types of offers, products,
              or services that may be of interest to you, and analyze
              advertising effectiveness;
            </li>
            <li>Answer your questions and respond to your requests;</li>
            <li>Perform analytics and conduct customer research;</li>
            <li>
              Communicate and provide additional information that may be of
              interest to you about Fyndr and our business partners, sometimes
              by combining your information with information we obtain from
              other sources;
            </li>
            <li>
              Send you reminders, technical notices, updates, security alerts,
              support and administrative messages, service bulletins, marketing
              messages, and requested information, including on behalf of our
              business partners;
            </li>
            <li>
              Administer rewards, surveys, sweepstakes, contests, or other
              promotional activities or events sponsored by us or our business
              partners;
            </li>
            <li>
              Manage our everyday business needs, such as administration of the
              Service, forum management, fulfillment, analytics, fraud
              prevention, and enforcement of our corporate reporting obligations
              and Terms of Use to comply with the law;
            </li>
            <li>
              Allow you to apply for a job, post a video, or sign up for special
              offers from merchants, our business partners, or other companies;
            </li>
            <li>
              Verify your requests made pursuant to this Privacy Statement;
            </li>
            <li>
              Enhance other information we have about you to help us better
              understand you and determine your interests;
            </li>
            <li>
              Use your data as described in our Card Linked Deals program, if
              you consented to participate in such program; and
            </li>
          </ul>
          <div className={`{${textSize}}`}>
            <p>
              We also may use information collected as described in this Privacy
              Statement with your consent or as otherwise required or permitted
              by law.
            </p>
          </div>
          <div>
            <p>
              Fyndr uses your geolocation, including your precise geolocation,
              consistent with this Privacy Statement as described in section 2
              above to deliver location-based offers, products or services that
              may be of interest to you.
            </p>
          </div>
          <div>
            <p>
              If you use any features on the Service to send information about a
              product or service to another person, we will also collect the
              personal information of that other person to the extent disclosed
              by you and may contact them using the information you provided us.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            4. When and Why Fyndr Discloses Information
          </strong>
        </div>
        <div className="text-[1.2rem]">
          <p>We may share your personal information as follows:</p>
          <ul className={`${ulStyle}`}>
            <li>
              as required to comply with the law or legal obligations, such as
              to comply with legal orders and government requests, or as needed
              to support auditing, compliance, and corporate governance
              functions;
            </li>
            <li>
              in response to a subpoena, or similar legal process, including to
              law enforcement agencies, regulators, and courts in the United
              States and other countries where we operate;
            </li>
            <li>
              with our vendors who perform a variety of services and functions
              for us, such as data storage, order fulfillment, transmitting
              emails, and managing digital content. We may share your
              information with such vendors subject to confidentiality
              obligations consistent with this Privacy Statement and on the
              condition that the service providers use your information only on
              our behalf and pursuant to our instructions;
            </li>
            <li>
              in the event we go through a business transition such as a merger,
              acquisition by another company, bankruptcy, reorganization, or
              sale of all or a portion of our assets (as described below in);
            </li>
            <li>
              to combat fraud or criminal activity, and to protect our rights,
              users, and business partners, or as part of legal proceedings
              affecting Fyndr;
            </li>
            <li>
              with our affiliates and subsidiaries who may only use the personal
              information for the purposes described in this Privacy Statement;
            </li>
          </ul>
          <ul className={`${ulStyle}`}>
            <li>
              with participating businesses where you have accepted their
              &ldquo;Business terms&rdquo; or &ldquo;Offers&rdquo; in order to
              review/consider/purchase their services, goods, experience, access
              to facility etc.
            </li>
          </ul>
          <ul>
            <li>
              if the information has been aggregated, de-identified, or
              otherwise does not identify you personally; and
            </li>
            <li>otherwise with your consent.</li>
          </ul>
          <p>
            We may disclose the following categories of personal information for
            our own business and operational purposes:
          </p>
          <ul className={`${ulStyle}`}>
            <li>Identifiers;</li>
            <li>Demographics;</li>
            <li>Commercial information;</li>
            <li>Location information;</li>
            <li>Financial information;</li>
            <li>Internet and network activity information; and</li>
            <li>Inferences regarding preferences or characteristics.</li>
          </ul>
          <p>
            We may disclose certain personal information in exchange for
            services, insights, or other valuable consideration. These
            disclosures may involve:
          </p>
          <ul>
            <li>Identifiers;</li>
            <li>Demographics;</li>
            <li>Commercial information;</li>
            <li>Location information;</li>
            <li>Financial information (not including payment card numbers);</li>
            <li>Internet and network activity information; and</li>
            <li>Inferences regarding preferences or characteristics.</li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            5. Security of Personal Information
          </strong>
        </div>
        <div className="text-[1.2rem]">
          <p>
            Fyndr has implemented an information security program that contains
            administrative, technical, and physical controls that are designed
            to reasonably safeguard personal information. For example, we use
            industry-standard encryption technology to secure financial account
            information. No method of transmission over the Internet, or method
            of electronic storage, is 100% secure, however. Therefore, we cannot
            guarantee its absolute security. If you have any questions about
            security on our Website, you can contact us at privacy@Fyndr.us.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            6. Your Rights Regarding Personal Information
          </strong>
        </div>
        <div className="text-[1.2rem]">
          <p>
            You have certain rights with regard to your personal
            information:&nbsp;
          </p>
          <ul className={`${ulStyle}`}>
            <li>
              You have the right to know and request information about the
              categories and specific pieces of personal information we have
              collected about you within the last 12 months, as well as the
              categories of sources from which such information is collected,
              the purpose for collecting such information, and the categories of
              third parties with whom we share such information. You also have
              the right to know if we have sold or disclosed your personal
              information for business purposes.
            </li>
            <li>
              You have the right to update your
              <Link
                href="https://fyndr.us/legal/privacy.html"
                className="text-primary"
              >
                personal information
              </Link>
              .
            </li>
            <li>
              You have the right to request a portable copy of your
              <Link
                href="https://fyndr.us/legal/privacy.html"
                className="text-primary"
              >
                personal information
              </Link>
              .
            </li>
            <li>
              You have the right to request that Fyndr delete your
              <Link
                href="https://fyndr.us/legal/privacy.html"
                className="text-primary"
              >
                Personal Information
              </Link>
              , subject to certain exceptions allowed under applicable
              law.&nbsp;
            </li>
            <li>
              You have the right to opt-out of certain disclosures of your
              personal information for valuable consideration. You can exercise
              this right through the preference section.
            </li>
            <li>
              You have the right to not be discriminated against for exercising
              any of the above-listed rights. We may, however, provide a
              different level of service or charge a different rate reasonably
              relating to the value of your personal information.
            </li>
          </ul>
          <p>
            You may exercise these rights through the Fyndr Data Privacy by
            sending an email to privacy@Fyndr.us.We may take reasonable steps to
            verify your identity prior to responding to your requests.
          </p>
          <p>
            In addition to the above rights, you can update or remove financial
            account information. You can also deactivate your Fyndr account.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>7. Your Choices</strong>
        </div>
        <div className="text-[1.2rem]">
          <p>
            We think that you benefit from a more personalized experience when
            we know more about you and what you like. However, you can limit the
            information you provide to Fyndr, and you can limit the
            communications that Fyndr sends to you. In particular:
          </p>
          <ul className={`${ulStyle}`}>
            <li>
              <strong>Commercial E-mails: </strong>You may choose not to receive
              commercial e-mails from us by following the instructions contained
              in any of the commercial e-mails we send or by logging into your
              account and adjusting your e-mail preferences. Please note that
              even if you unsubscribe from commercial email messages, we may
              still e-mail you non-commercial e-mails related to your account
              and your transactions on the Service. You may update your
              subscription preferences or unenroll from site at any time.
            </li>
            <li>
              <strong>Cookies and Other Technologies: </strong>You may manage
              how your browser handles cookies by adjusting its privacy and
              security settings. Browsers are different, so refer to
              instructions related to your browser to learn about cookie-related
              and other privacy and security settings that may be
              available.&nbsp;
            </li>
            <li>
              <strong>Device Data: </strong>You may manage how your mobile
              device and mobile browser share certain device data with Fyndr, as
              well as how your mobile browser handles cookies by adjusting the
              privacy and security settings on your mobile device. Please refer
              to the instructions provided by your mobile service provider or
              the manufacturer of your device to learn how to adjust your
              settings.
            </li>
          </ul>
          <p>
            When you first visit or use the Service we may request permission to
            collect and use your device&rsquo;s precise geolocation. You can opt
            not to permit the collection of this information, or permit it only
            when using the mobile app, but it may limit certain functions or
            features of the Service. You can control how and whether we collect
            your precise geolocation information through your device&rsquo;s
            settings.
          </p>
          <ul>
            <li>
              <strong>E-mails from Business Partners: </strong>If you wish to
              opt-out of receiving offers directly from our business partners,
              you can follow the opt-out instructions in the emails they send
              you.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            8. Social Community Areas
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            The Service may be accessible through or contain connections to
            areas where you may be able to publicly post information,
            communicate with others such as messaging, discussion boards or
            blogs, review products and merchants, and submit media content.
            Prior to posting in these areas, please read our Terms of Use
            carefully. All the information you post may be accessible to anyone
            with Internet access, and any personal information you include in
            your posting may be read, collected, and used by others. We
            recommend that you do not post any personal information in the
            social community areas.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            9. Privacy Practices of Third Parties
          </strong>
        </div>
        <div className="text-[1.2rem]">
          <p>
            This Privacy Statement only addresses the use and disclosure of
            information by Fyndr through your interaction with the Service.
            Other websites that may be accessible through links from the Service
            and our co-branded websites may have their own privacy statements
            and personal information collection, use, and disclosure practices.
            Our business partners may also have their own privacy statements.
          </p>

          <p>
            Fyndr provides it’s users the ability to login via 3rd party
            authenticators like Google, Facebook & Apple.
          </p>

          <p>
            In case of Facebook, a unique, app-specific identifier tied to a
            user’s Facebook account enables the user to sign in to Fyndr. A user
            must explicitly grant Fyndr app permission to access their data
            through Facebook. Since Facebook Login is part of the Facebook SDK,
            Facebook may collect other information such as Device information,
            Device identifiers, Location, Network, Clicks, Impressions,
            Timezone, Language, IP address etc.
          </p>

          <p>
            We encourage you to familiarize yourself with the privacy statements
            provided by these 3rd parties prior to providing them with
            information or taking advantage of a login feature, sponsored offer
            or promotion.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            10. Business Transfers and Corporate Changes
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            Fyndr reserves the right to disclose, transfer, or license any and
            all information related to the Service, including personal
            information:
          </p>
          <ul className={`${ulStyle}`}>
            <li>
              to a subsequent owner, co-owner, or operator of the Service or any
              portion or operation related to part of Service; or
            </li>
            <li>
              in connection with a corporate merger, consolidation, or
              restructuring, the sale of substantially all of our stock and/or
              assets, or other corporate change, including, without limitation,
              during the course of any due diligence process.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            11. Notice to Residents of Countries outside the United States of
            America
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            This Service is intended only for users in the United States. By
            using the Service or giving us your personal information, you are
            directly transferring your personal information to us in the United
            States. You agree and consent to our collection, transfer, and
            processing of your personal information in accordance with this
            Privacy Statement. You are solely responsible for compliance with
            any data protection or privacy obligations in your jurisdiction when
            you use the Service or provide us with personal information.
            Regardless of where we transfer your information, we still protect
            your information in the manner described in this Privacy Statement.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            12. Children&rsquo;s Privacy
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            The Service is a general audience site not directed at children
            under the age of 18.
          </p>
          <p>
            By using Fyndr, you represent that you are at least eighteen years
            old and understand that you must be at least eighteen years old in
            order to create an account and purchase the goods or services
            advertised through the Service.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>13. Contact Us</strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            Please contact us if you have any questions or comments about our
            privacy practices or this Privacy Statement. You can reach us online
            at privacy@Fyndr.us. You can reach us via postal mail at the
            following address:
          </p>
          <div>
            <p>
              <strong>Fyndr Inc.&nbsp;</strong>
            </p>
            <p>
              <strong>Attention: Privacy Office&nbsp;</strong>
            </p>
            <p>
              <strong>4550 E Bell Rd Building 3, Suite 226</strong>
            </p>
            <p>
              <strong>Phoenix &ndash; AZ 85032</strong>
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            14. California Privacy Rights and Other Countries
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            If you reside in Canada, you may have the right to be provided with
            access to personal information that we have collected about you and
            written information about our policies and practices with respect to
            the transfer of your personal information to vendors outside Canada.
            E-mail us at
            <Link href="mailto:privacy@Fyndr.us" className="text-primary">
              privacy@Fyndr.us
            </Link>{" "}
            with questions.
          </p>
          <p>
            Fyndr utilizes various valid data transfer mechanisms for personal
            information at its sole discretion in accordance with applicable
            data protection and privacy laws. We will continue to monitor and
            assess the appropriateness of other valid data transfer mechanisms
            as they become available.
          </p>
          <p>
            Pursuant to Section 1798.83 of the California Civil Code, residents
            of California have the right to request, once a year, if we have
            shared their personal information with other companies for those
            companies&rsquo; direct marketing purposes during the preceding
            calendar year. To request a copy of the information disclosure
            provided by Fyndr, please contact us at privacy@Fyndr.us or the
            address stated above. Please include &ldquo;Shine the Light
            Request&rdquo; in your correspondence. Please allow 30 days for a
            response.
          </p>
          <p>
            If you are a California resident under the age of 18, and a
            registered user of any site where this policy is posted, California
            Business and Professions Code Section 22581 permits you to request
            and obtain removal of content or information you have publicly
            posted. To make such a request, please send an email with a detailed
            description of the specific content or information to
            privacy@Fyndr.us. Please be aware that such a request does not
            ensure complete or comprehensive removal of the content or
            information you have posted and that there may be circumstances in
            which the law does not require or allow removal even if requested.
          </p>
        </div>
        <div className="mt-10">
          <Link href=""></Link>
          <strong className={`${headingSize}`}>
            15. Google Calendar Permission
          </strong>
        </div>
        <div className={`${textSize}`}>
          <p>
            When users want to schedule appointments for specific campaigns or
            stores within the Fyndr webapp/app, they need to grant permission to
            access their Google Calendar and events. This permission enables the
            app to seamlessly integrate with their Google Calendar, allowing
            them to create events directly from the Fyndr webapp/app for their
            chosen campaign or store at the desired date and time.
          </p>
          <p>
            Once users have granted permission for a particular appointment,
            such as scheduling a visit to a store or attending a campaign event,
            the app remembers this preference. Consequently, if users decide to
            explore other campaigns or stores and wish to schedule appointments
            for them, the app automatically extends the granted permission to
            these new selections. This streamlines the process for users,
            eliminating the need to repeatedly grant permission for each
            individual campaign or store they wish to schedule appointments for
            within the app.
          </p>
          <p>
            In essence, enabling Google Calendar and event permissions not only
            facilitates the creation of appointments within the Fyndr webapp/app
            but also ensures a seamless and efficient user experience by
            extending permission across multiple campaigns or stores as needed.
          </p>
        </div>
        <div>
          <strong className={`${headingSize}`}>Required Disclosure</strong>
          <p className={`${textSize}`}>
            Fyndr webapp/app uses and transfers of information received from
            Google APIs to any other app will adhere to the
            <Link
              href="https://developers.google.com/terms/api-services-user-data-policy"
              className="text-primary"
            >
              Google API Services User Data Policy
            </Link>
            , including the Limited Use requirements.
          </p>

          <strong className={`${headingSize}`}>
            Justification for Requested Scopes
          </strong>
          <p className={`${textSize}`}>
            <strong>https://www.googleapis.com/auth/calendar:</strong> Fyndr
            webapp/app will use this scope to display the user&apos;s Google
            Calendar data on the scheduling screen, allowing users to manage
            their schedules through our app and sync changes with their Google
            Calendar.
          </p>
          <p className={`${textSize}`}>
            <strong>https://www.googleapis.com/auth/calendar.events:</strong>{" "}
            Fyndr webapp/app will use this scope to create, modify, and delete
            events in the user&apos;s Google Calendar, ensuring seamless
            schedule management within our app.
          </p>

          <strong className={`${headingSize}`}>Demo Video</strong>
          <p className={`${textSize}`}>
            You can view the demo video of the OAuth consent screen grant
            process at the following link:{" "}
            <Link
              href="https://www.youtube.com/watch?v=JHuCq9VxhRY"
              className="text-primary"
            >
              OAuth Consent Screen Demo
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fyndr Terms of Use",
};

const Terms = () => {
  return (
    <div className="m-20">
      <div className="flex justify-center w-full mb-5">
        {/* <object type="image/svg+xml" data="logo.svg" width="150"></object> */}
        <Image
          src={"/images/fyndr-logo-blue.png"}
          width={300}
          height={500}
          alt="Fyndr Logo"
        ></Image>
      </div>
      <div className="flex justify-center w-full">
        <span className="text-[2rem]">Fyndr Terms of Use</span>
      </div>
      <br />
      <div className="text-[1.2rem]">
        These Terms of Use were last updated on March 24th, 2024.
      </div>
      <br />
      <div className="text-[1.2rem]">
        Welcome to Fyndr Site (defined below). By using it, you are agreeing to
        these Terms of Use (defined below). Please read them carefully.
      </div>
      <br />
      <div>ACCEPTANCE OF TERMS OF USE</div>
      <br />
      <div className="text-[1.2rem]">
        Fyndr, LLC. (&quot;<strong>Fyndr</strong>&quot; &quot;
        <strong>&nbsp;we</strong>&nbsp;&quot; or &quot;<strong>&nbsp;us</strong>
        &quot; or &quot;<strong>&nbsp;our</strong>&quot;) owns and operates the
        website,
        <Link href="https://www.fyndr.us" className="text-blue-600">
          www.fyndr.us
        </Link>
        , the mobile and touch versions and any sites we have now or in the
        future that reference these Terms of Use (collectively, &quot; Site
        &quot;). By: <br />
        (a) using the Site and Fyndr’s services through the Site, <br />
        (b) signing up for an account and/or
        <br />
        (c) completing a purchase on the Site, <br />
        <br />
        <span className="text-[1.2rem]">
          you agree to these Terms of Use (defined below) and any additional
          terms applicable to certain programs in which you may elect to
          participate. You also agree to our Privacy Statement, incorporated
          herein by reference and located at our website
          <Link href="https://www.fyndr.us" className="text-blue-600">
            www.fyndr.us
          </Link>
          or Mobile App (Menu - Terms & Privacy Policy section), and acknowledge
          that you will regularly visit the Terms of Use (defined below) to
          familiarize yourself with any updates. The Privacy Statement, together
          with these terms of use, and any other terms contained herein or
          incorporated herein by reference, are collectively referred to as the
          &quot;<strong>Terms of Use</strong>&quot;. The term using also
          includes any person or entity that accesses or uses the Site with
          crawlers, robots, data mining, or extraction tools or any other
          functionality.
          <br /> <br />
          By entering your email, signing into your Fyndr account, checking-in
          with businesses and individuals, accepting notifications and offers,
          You agree to share your interaction through QR codes, Your first Name
          and first letter of Last name and/or any information such as location
          etc to establish the interaction. Additionally, you agree to share
          your Information with Businesses while Checking-in & Accepting or
          Declining business terms in order to review/consider/avail their
          goods, services, experiences, facility in person or online through the
          Fyndr platform, website and / or mobile app.
          <br />
          <br />
          By entering your mobile number during signup on Fyndr, you agree to
          receive messages from Fyndr platform. These messages may contain
          one-time passwords, links to the invoice or campaigns.
          <br /> <br />
          IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE
          SITE AND DO NOT USE ANY FYNDR SERVICE, PARTICIPATE IN ANY PROGRAM OR
          PURCHASE ANY OFFER, PRODUCT, OR OTHER GOODS OR SERVICE OFFERED THROUGH
          THE SITE, PLATFORM OR MOBILE APP. PLEASE REVIEW THE FOLLOWING SECTIONS
          OF THESE TERMS OF USE CAREFULLY: (Section 22){" "}
          <strong>DISPUTE RESOLUTION/ARBITRATION AGREEMENT</strong>, INCLUDING
          THE <strong>CLASS ACTION WAIVER</strong> DESCRIBED THEREIN,{" "}
          <Link href="#liability" className="text-blue-600">
            (Section 14)
            <strong>LIMITATION OF LIABILITY</strong>
          </Link>
          , AND{" "}
          <Link href="#indemnification" className="text-blue-600">
            (Section 17) <strong>INDEMNIFICATION/RELEASE</strong>
          </Link>
          .
        </span>
        <br /> <br />
        <h3 className="text-[1.5rem]">Table of Contents</h3>
        <ol className="list-decimal pl-9 text-[1.3rem]">
          <li>
            <Link href="#about" className="text-blue-600">
              ABOUT THE SITE
            </Link>
          </li>
          <li>
            <Link href="#ownership" className="text-blue-600">
              OWNERSHIP OF THE SITE
            </Link>
          </li>
          <li>
            <Link href="#use" className="text-blue-600">
              USE OF THE SITE
            </Link>
          </li>
          <li>
            <Link href="#access" className="text-blue-600">
              ACCESS TO THE SITE
            </Link>
          </li>
          <li>
            <Link href="#modification" className="text-blue-600">
              MODIFICATION
            </Link>
          </li>
          <li>
            <Link href="#account" className="text-blue-600">
              YOUR ACCOUNT
            </Link>
          </li>
          <li>
            <Link href="#conduct" className="text-blue-600">
              YOUR CONDUCT
            </Link>
          </li>
          <li>
            <Link href="#privacy" className="text-blue-600">
              YOUR PRIVACY
            </Link>
          </li>
          <li>
            <Link href="#copyright" className="text-blue-600">
              COPYRIGHT AND TRADEMARKS
            </Link>
          </li>
          <li>
            <Link href="#content" className="text-blue-600">
              USER CONTENT
            </Link>
          </li>
          <li>
            <Link href="#unsolicited" className="text-blue-600">
              UNSOLICITED IDEAS
            </Link>
          </li>
          <li>
            <Link href="#reporting" className="text-blue-600">
              INFRINGEMENT REPORTING PROCEDURES AND DIGITAL MILLENNIUM COPYRIGHT
              ACT (DMCA) PROCEDURES
            </Link>
          </li>
          <li>
            <Link href="#disclaimer" className="text-blue-600">
              DISCLAIMER OF WARRANTY
            </Link>
          </li>
          <li>
            <Link href="#liability" className="text-blue-600">
              LIMITATION OF LIABILITY
            </Link>
          </li>
          <li>
            <Link href="#communications" className="text-blue-600">
              ELECTRONIC COMMUNICATIONS
            </Link>
          </li>
          <li>
            <Link href="#others" className="text-blue-600">
              WEBSITES OF OTHERS
            </Link>
          </li>
          <li>
            <Link href="#indemnification" className="text-blue-600">
              INDEMNIFICATION/RELEASE
            </Link>
          </li>
          <li>
            <Link href="#force" className="text-blue-600">
              FORCE MAJEURE
            </Link>
          </li>
          <li>
            <Link href="#assignment" className="text-blue-600">
              ASSIGNMENT
            </Link>
          </li>
          <li>
            <Link href="#agreement" className="text-blue-600">
              ENTIRE AGREEMENT
            </Link>
          </li>
          <li>
            <Link href="#law" className="text-blue-600">
              CHOICE OF LAW
            </Link>
          </li>
          <li>
            <Link href="#dispute" className="text-blue-600">
              DISPUTE RESOLUTION/ARBITRATION AGREEMENT
            </Link>
          </li>
          <li>
            <Link href="#disclosers" className="text-blue-600">
              ADDITIONAL DISCLOSURES
            </Link>
          </li>
        </ol>
        <div className="text-[1.5rem] pt-10">
          These Terms of Use are as follows:
        </div>
        <br />
        <br />
        <h3 className="text-[1.2rem]">
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            1. About the Site
          </Link>
        </h3>
        <span className="text-[1.2rem] ">
          The “Site” is a platform through which an individual can track their
          interactions & notify their interactions without sharing their contact
          details or identity in order to caution their interactions about the
          potential exposure to any health hazard such as Covid-19. The users
          can also chose to check-in with certain business (“ Business ”) by
          providing their consent to Business’s terms & conditions(“Business
          Terms” or “Business Agreement”) as requested by the business in rder
          to review/avail/purchase proposed goods, services, access to facility
          or experiences (“ Offers ”). Businesses are the owners, sellers and
          issuers of the “Business Terms” and “Offers” and are solely
          responsible to you for the care, quality, and delivery of the goods
          and services provided. In addition, the Site & mobile app also
          provides a platform through which you can purchase products from Fyndr
          (“ Products ”) and participate in other available programs. Certain
          Business Offerings, Products, other available programs and pricing on
          the Site may change at any time in Fyndr’s sole discretion, without
          notice.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            2. Ownership of the Site
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          The Site and mobile app, any content on the Site, and the
          infrastructure used to provide the Site are proprietary to us, our
          affiliates, Businesss, and other content providers. <br />
          By using the Site and accepting these Terms of Use: <br />
          (a) Fyndr grants you a limited, personal, nontransferable,
          nonexclusive, revocable license to use the Site pursuant to these
          Terms of Use and to any additional terms and policies set forth by
          Fyndr; and <br />
          (b) you agree not to reproduce, distribute, create derivative works
          from, publicly display, publicly perform, license, sell, or re-sell
          any content, software, products, or services obtained from or through
          the Site without the express permission of Fyndr.
        </span>
        <br />
        <br />
        <h3>
          <Link
            href="use"
            className="text-[1.6rem] text-black-600 font-semibold"
          >
            3. Use of the Site
          </Link>
        </h3>
        As a condition of your use of the Site, you agree that:
        <ul className="list-disc list-inside">
          <li>
            You have reached the age of majority in the state or province in
            which you reside
          </li>
          <li>You are able to create a binding legal obligation</li>
          <li>
            You will use this platform in good faith while notifying your
            interactions about a possible exposure to health hazard you may have
            been subjected to.
          </li>
          <li>
            You receive the notification in good faith and only as a cautionary
            measure to minimize the spread of such exposure within the
            community.{" "}
          </li>
          <li>
            You are not barred from receiving products or services under
            applicable law
          </li>
          <li>
            You will not attempt to use the Site with crawlers, robots, data
            mining, or extraction tools or any other functionality
          </li>
          <li>
            Your use of the Site will at all times comply with these Terms of
            Use
          </li>
          <li>
            You will only make legitimate purchases that comply with the letter
            and spirit of the terms of the respective offers
          </li>
          <li>
            You will only make purchases on the Site for your own use and
            enjoyment or as a gift for another person
          </li>
          <li>
            You have the right to provide any and all information you submit to
            the Site, and all such information is accurate, true, current, and
            complete
          </li>
          <li>
            You will update and correct information you have submitted to the
            Site, including all account information, and ensure that it is
            accurate at all times (out-of-date information will invalidate your
            account)
          </li>{" "}
          and,
          <li>
            You will only purchase a Business Offering, Product, or participate
            in other available programs through the Site by creating an account
            or using the guest checkout feature on the Site, and any purchase
            will be subject to the applicable Terms of Sale set forth in these
            Terms of Use.
          </li>
        </ul>
        <br />
        <h3>
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            4. Access to the Site
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          Fyndr retains the right, at our sole discretion, to deny service or
          use of the Site or an account to anyone at any time and for any
          reason. While we use reasonable efforts to keep the Site and your
          account accessible, the Site and/or your account may be unavailable
          from time to time. You understand and agree that there may be
          interruptions in service or events, Site access, or access to your
          account due to circumstances both within our control (e.g., routine
          maintenance) and outside of our control.{" "}
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            5. Modification{" "}
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          We reserve the right at all times to discontinue or modify any part of
          these Terms of Use in our sole discretion. If we make changes that
          affect your use of the Site or our services we will post notice of the
          change on the Terms of Use page. Any changes to these Terms of Use
          will be effective upon our posting of the notice; provided that these
          changes will be prospective only and not retroactive. If you do not
          agree to the changes, you may close your account and you should not
          use the Site or any services offered through the Site after the
          effective date of the changes. We suggest that you revisit our Terms
          of Use regularly to ensure that you stay informed of any changes. You
          agree that posting notice of any changes on the Terms of Use page is
          adequate notice to advise you of these changes, and that your
          continued use of the Site or our services will constitute acceptance
          of these changes and the Terms of Use as modified.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            6. Your Account{" "}
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          You may only create and hold one account on the Site for your personal
          use and must register using a valid credit/debit card or payment
          method lawfully allowed in your geography. You are responsible for
          updating and correcting information you have submitted to create or
          maintain your account. As part of your account settings, you have the
          option to: <br />
          (a) save, edit, or delete your personal information, including,
          without limitation, a valid credit card; and <br />
          (b) opt-out of persistent login by logging out after each use. You
          understand and agree that Fyndr shall have no responsibility for any
          incident arising out of, or related to, your account settings. You
          must safeguard your password and supervise the use of your account.
          You are solely responsible for maintaining the security of your
          account and maintaining settings that reflect your preferences. We
          will assume that anyone using the Site or transacting through your
          account is you. You agree that you are solely responsible for any
          activity that occurs under your account. Your account is
          non-transferrable. You cannot sell, combine, or otherwise share it
          with any other person. Any violation of these Terms of Use, including,
          without limitation, failure to maintain updated and correct
          information about your account (e.g., valid credit card information)
          will cause your account to fall out of good standing and we may cancel
          your account in our sole discretion. If your account is cancelled, you
          may forfeit any pending, current, or future account credits (e.g.,
          Fyndr Bucks), and any other forms of unredeemed value in your account
          without notice. Upon termination, the provisions of these Terms of Use
          that are, by their nature, intended to survive termination (e.g., any
          disclaimers, all limitations of liability, and all indemnities) shall
          survive. We also reserve the right to change or discontinue any aspect
          or feature of our services or the Site, including, without limitation,
          requirements for use.
        </span>
        <h3>
          <Link href="" className="text-[1.6rem] text-black-600 font-semibold">
            7. Your Conduct
          </Link>
        </h3>
        All interactions on the Site must comply with these Terms of Use. To the
        extent your conduct, in our sole discretion, restricts or inhibits any
        other user from using or enjoying any part of the Site, we may limit or
        terminate your privileges on the Site and seek other remedies,
        including, without limitation, cancellation of your account or
        forfeiture of any forms of unredeemed value in your account. The
        following activities are prohibited on the Site and constitute
        violations of these Terms of Use:
        <br />
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          Submitting any content to the Site that:
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Violates applicable laws (including, without limitation,
            intellectual property laws, laws relating to rights of privacy and
            rights of publicity, and laws related to defamation)
          </li>
          <li>
            Contains personal information, except when we expressly ask you to
            provide such information
          </li>
          <li>Contains viruses or malware</li>
          <li>
            Offers unauthorized downloads of any copyrighted, confidential, or
            private information
          </li>
          <li>Has the effect of impersonating others</li>
          <li>
            Contains messages by non-spokesperson employees of Fyndr purporting
            to speak on behalf of Fyndr or provides confidential information
            concerning Fyndr
          </li>
          <li>Contains chain letters of any kind</li>
          <li>
            Is purposely inaccurate, commits fraud, or falsifies information in
            connection with your Fyndr account or to create multiple Fyndr
            accounts
          </li>{" "}
          or
          <li>
            Is protected by copyright, trademark, or other proprietary right
            without the express permission of the owner of the copyright,
            trademark or other proprietary right.
          </li>
        </ul>
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          Attempting to do or actually doing any of the following:
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Accessing data not intended for you, such as logging into a server
            or an account which you are not authorized to access
          </li>
          <li>
            Scanning or monitoring the Site for data gathering purposes in an
            effort to track sales, usage, aggregate offering information,
            pricing information, or similar data
          </li>
          <li>
            Scanning or testing the security or configuration of the Site or
            breaching security or authentication measures
          </li>{" "}
          or
          <li>
            Interfering with service to any user in any manner, including,
            without limitation, by means of submitting a virus to the Site or
            attempting to overload, “flood,” “spam,” “mail bomb,” or “crash” the
            Site.
          </li>
        </ul>
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          Using any of the following:
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Frames, framing techniques, or framing technology to enclose any
            content included on the Site without our express written permission
          </li>
          <li>
            Any Site content, including, without limitation, User Content
            (defined below), in any meta tags or any other “hidden text”
            techniques or technologies without our express written permission
          </li>
          <li>
            The Site or any of its contents to advertise or solicit, for any
            commercial, political, or religious purpose or to compete, directly
            or indirectly, with Fyndr
          </li>{" "}
          or
          <li>
            The Site or any of its resources to solicit consumers, Businesss, or
            other third-parties to become users or partners of other online or
            offline services directly or indirectly competitive or potentially
            competitive with Fyndr, including, without limitation, aggregating
            current or previously offered deals.
          </li>
        </ul>
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          Collecting any of the following:
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Content from the Site, including, without limitation, in connection
            with current or previously offered deals, and featuring such content
            to consumers in any manner that diverts traffic from the Site
            without our express written permission
          </li>{" "}
          or
          <li>
            Personal Information (defined in our Privacy Statement), User
            Content (defined in Section 12 below), or content of any consumers
            or Businesss
          </li>
        </ul>
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          Engaging in any of the following:
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Tampering or interfering with the proper functioning of any part,
            page, or area of the Site or any functions or services provided by
            Fyndr
          </li>
          <li>
            Taking any action that places excessive demand on our services or
            imposes, or may impose, an unreasonable or disproportionately large
            load on our servers or other portion of our infrastructure (as
            determined in our sole discretion)
          </li>
          <li>
            Reselling or repurposing your access to the Site or any purchases
            made through the Site
          </li>
          <li>
            Exceeding or attempting to exceed quantity limits when purchasing
            Business Offerings or Products, or otherwise using any Fyndr account
            to purchase Business Offerings or Products for resale or for
            speculative, false, fraudulent, or any other purpose not expressly
            permitted by these Terms of Use and the terms of a specific offer on
            the Site
          </li>
          <li>
            Accessing, monitoring, or copying any content from the Site using
            any “robot,” “spider,” “scraper,” or other automated means or any
            manual process for any purpose without our express written
            permission
          </li>
          <li>
            Violating the restrictions in any robot exclusion headers on the
            Site or bypassing or circumventing other measures employed to
            prevent or limit access to the Site
          </li>
          <li>
            Aggregating any current or previously-offered deals or content or
            other information from the Site (whether using links or other
            technical means or physical records associated with purchases made
            through the Site) with material from other sites or on a secondary
            site without our express written permission
          </li>
          <li>
            Deep-linking to any portion of the Site (including, without
            limitation, the purchase path for any Voucher) without our express
            written permission
          </li>
          <li>
            Hyperlinking to the Site from any other website without our initial
            and ongoing consent
          </li>{" "}
          or
          <li>
            Acting illegally or maliciously against the business interests or
            reputation of Fyndr, our Businesss, or our services.{" "}
          </li>
        </ul>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            8. Your Privacy
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          We take the privacy of your Personal Information (defined in the
          Privacy Statement) seriously. We encourage you to carefully review our
          Privacy Statement for important disclosures about ways that we may
          collect, use, and share personal data and your choices. Our Privacy
          Statement is incorporated in and subject to these Terms of Use, and
          available on the website and mobile app.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            9. Copyright and Trademarks
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          The Site contains copyrighted material, trademarks, and other
          proprietary information, including, without limitation, text,
          software, photos, video, graphics, music, and sound, and the entire
          contents of the Site are protected by copyright, trademark, and other
          intellectual property laws of the United States. Fyndr owns a
          copyright in the selection, coordination, arrangement, and enhancement
          of such content, as well as in the content original to it. You may not
          modify, distribute, publish, transmit, publicly display, publicly
          perform, participate in the transfer or sale, create derivative works,
          or in any way exploit any of the content, in whole or in part. Except
          as otherwise expressly stated under copyright law, no downloading,
          copying, redistribution, retransmission, publication, or commercial
          exploitation of the content without the express permission of Fyndr or
          the copyright owner is permitted. If downloading, copying,
          redistribution, retransmission, or publication of copyrighted material
          is permitted, you will make independent attribution and/or make no
          changes in or deletion of any author attribution, trademark legend, or
          copyright notice. You acknowledge that you do not acquire any
          ownership rights by downloading copyrighted material. Any violation of
          these restrictions may result in a copyright, trademark, or other
          intellectual property right infringement that may subject you to civil
          and/or criminal penalties. Fyndr owns trademarks, registered and
          unregistered, in many countries and &quot;Fyndr&quot; the Fyndr logos
          and variations thereof found on the Site are trademarks owned by
          Fyndr, Inc. or its related entities and all use of these marks are
          intended for the benefit of Fyndr. Other marks on the site not owned
          by Fyndr may be under license from the trademark owner thereof, in
          which case such license is for the exclusive benefit and use of Fyndr
          unless otherwise stated, or may be the property of their respective
          owners. You may not use Fyndr&apos;s name, logos, trademarks or
          brands, or trademarks or brands of others on the Site without
          Fyndr&apos;s express permission.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            10.User Content
          </Link>
        </h3>
        <div className="text-[1.2rem] mb-5 ">
          {" "}
          The Site may provide registered users and visitors various
          opportunities to submit or post reviews, opinions, advice, ratings,
          discussions, comments, messages, survey responses, and other
          communications, as well as files, images, photographs, video, sound
          recordings, musical works, and any other content or material submitted
          or posted to the Site (collectively, &quot; User Content &quot;)
          through forums, bulletin boards, discussion groups, chat rooms,
          surveys, blogs, or other communication facilities that may be offered
          on, through, or in connection with the Site from time to time. You may
          be required to have a Fyndr account to submit User Content. If you
          contribute any User Content, you will not upload, post, or otherwise
          make available on the Site any material protected by copyright,
          trademark, or other proprietary right without the express permission
          of the owner of the copyright, trademark, or other proprietary right.
          Fyndr does not have any express burden or responsibility to provide
          you with indications, markings, or anything else that may aid you in
          determining whether the material in question is copyrighted or
          trademarked. You will be solely liable for any damage resulting from
          any infringement of copyrights, trademarks, proprietary rights, or any
          other harm resulting from such a submission. In addition, if you
          contribute any User Content, you represent and warrant that:
          <br />
          (a) you are the creator of the User Content; or <br />
          (b) if you are acting on behalf of the creator, that you have <br />
        </div>
        <ol className="list-decimal list-inside text-[1.2rem]">
          <li>
            express, advance authority from the creator to submit or post the
            User Content, and that they have waived any moral rights in such
            User Content, and
          </li>
          <li>
            all rights necessary to grant the licenses and grants in these Terms
            of Use. You further represent and warrant (or, if you are acting on
            behalf of the creator of the User Content, you have ensured that the
            creator represents and warrants) that the use and sharing of the
            User Content for the purposes you have selected will not violate or
            infringe any copyrights, trademarks, or any other intellectual
            property rights or rights of third parties, including, without
            limitation, the rights of publicity or privacy. You represent and
            warrant that you will not upload, post, transmit, or otherwise make
            available User Content that is unlawful, harmful, tortious,
            threatening, abusive, harassing, hateful, racist, infringing,
            pornographic, obscene, violent, misleading, defamatory or libelous,
            invasive of the privacy of another person, or violative of any
            third-party rights; and that you will not upload, post, transmit, or
            otherwise make available User Content that contains any material
            that harbors viruses or any other computer codes, files, or programs
            designed to intercept, misappropriate, interrupt, destroy or limit
            the functionality of any software or computer equipment. <br />
            Fyndr shall have the sole and absolute right, but not the
            obligation, to review, edit, post, refuse to post, remove, monitor
            the User Content, and disclose the User Content and the
            circumstances surrounding its transmission to any third-party, at
            any time, for any reason, including, without limitation, to
            determine compliance with these Terms of Use and any operating rules
            established by Fyndr, as well as to satisfy any applicable law,
            regulation, or authorized government request. Without limiting the
            foregoing, Fyndr shall have the right to remove any material from
            the Communities or any other Fyndr controlled sites, in its sole
            discretion. Fyndr assumes no liability for any User Content or other
            information that appears or is removed from the Site or elsewhere.
            Fyndr has no obligation to use User Content and may not use it at
            all. <br />
            In some instances and from time to time, it may be possible to
            modify or remove the User Content submitted or posted through your
            account. Fyndr makes no representations or warranties that the User
            Content you modify or remove will be modified or removed from the
            Site or elsewhere, or that the User Content will cease to appear on
            the Internet, in search engines, social media websites, or in any
            other form, media or technology.
          </li>
        </ol>
        <h4 className="text-[1.4rem] text-black-600 font-bold mt-10">
          Public Nature of Your User Content.
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            You understand and agree that User Content is public. Any person
            (whether or not a user of Fyndr’s services) may read your User
            Content without your knowledge. Please do not include any Personal
            Information in your User Content unless you wish for it to be
            publicly disclosed. Fyndr is not responsible for the use or
            disclosure of any Personal Information that you disclose in
            connection with User Content.
          </li>

          <li>
            Any User Content of any kind made by you or any third-party is made
            by the respective author(s) or distributor(s) and not by Fyndr.
            Other users may post User Content that is inaccurate, misleading, or
            deceptive. Fyndr does not endorse and is not responsible for any
            User Content, and will not be liable for any loss or damage caused
            by your reliance on such User Content. User Content reflects the
            opinions of the person submitting it and may not reflect the opinion
            of Fyndr. Fyndr does not control or endorse any User Content, and
            specifically disclaims any liability concerning or relating to your
            contribution of, use of, or reliance on any User Content and any
            actions resulting from your participation in any part of the Site,
            including, without limitation, any objectionable User Content.{" "}
          </li>
        </ul>
        <br />
        <h4 className="text-[1.4rem] text-black-600 font-bold">
          License Grants.
        </h4>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Some User Content you submit to Fyndr may be displayed or may give
            you the option to display in connection with your Personal
            Information, or a portion of your Personal Information, including,
            without limitation, your name, initials, username, social networking
            website user account name, image, likeness, preferences, voice, and
            location
          </li>
          <li>
            {" "}
            You grant Fyndr a royalty-free, perpetual, irrevocable,
            sublicensable, fully paid-up, non-exclusive, transferrable,
            worldwide license and right to use, commercial use, display and
            distribute any Personal Information in connection with your User
            Content in accordance with these Terms of Use, including, without
            limitation, a right to offer for sale and to sell such rights in
            Personal Information, whether the User Content appears alone or as
            part of other works, and in any form, media or technology, whether
            now known or hereinafter developed, and to sublicense such rights
            through multiple tiers of sublicensees, all without compensation to
            you
          </li>
          <li>
            {" "}
            However, Fyndr shall have no obligation to use your Personal
            Information in connection with any User Content
          </li>
          <li>
            As between you and Fyndr, you shall retain all ownership rights in
            and to the User Content you submit or post
          </li>
          <li>
            However, by contributing User Content or other information on or
            through the Site, you grant Fyndr a royalty-free, perpetual,
            irrevocable, sublicensable, fully paid-up, non-exclusive,
            transferrable, worldwide right and license to use, reproduce, create
            derivative works from, publish, edit, translate, distribute,
            perform, display, transmit, offer for sale, and sell the User
            Content alone or as part of other works in any form, media or
            technology, whether now known or hereafter developed, and to
            sublicense such rights through multiple tiers of sublicensees and
            without compensation to you
          </li>
          <li>
            {" "}
            You waive any &quot;moral rights&quot; or other rights with respect
            to attribution of authorship or integrity of materials regarding the
            User Content that you may have under any applicable law under any
            legal theory
          </li>
          <li>
            {" "}
            Fyndr’s license in any User Content or Personal Information
            submitted includes, without limitation, use for promotions,
            advertising, marketing, market research, business feedback, quality
            control, or any other lawful purpose
          </li>
          <li>
            As detailed in Section 3, contributing User Content or other
            information on or through the Site, is limited to individuals who
            are over the age of majority in the state or province in which they
            reside
          </li>
          <li> The Site is designed and intended for adults</li>
          <li>
            {" "}
            By contributing User Content or other content on or through the
            Communities, you affirm that you are over the age of majority in the
            state or province in which you reside
          </li>
          <li>
            We will promptly delete User Content or other content associated
            with any account we obtain actual knowledge of that is associated
            with a registered user who is not at least the age of majority in
            the state or province in which he or she resides
          </li>
        </ul>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            11. Unsolicited Ideas
          </Link>
        </h3>
        <span className="text-[1.2rem]"></span> We do not accept or consider,
        directly or through any Fyndr employee or agent, unsolicited ideas of
        any kind, including, without limitation, ideas or suggestions relating
        to new or improved products, enhancements, names or technologies,
        advertising and marketing campaigns, plans, or other promotions. Do not
        send us (or any of our employees) any unsolicited ideas, suggestions,
        material, images, or other work in any form ( “Unsolicited Materials” ).
        If you send us Unsolicited Materials, you understand and agree that the
        following terms will apply, notwithstanding any cover letter or other
        terms that accompany them:
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Fyndr has no obligation to review any Unsolicited Materials, nor to
            keep any Unsolicited Materials confidential
          </li>
          <li>
            Fyndr will own, and may use and redistribute, Unsolicited Materials
            for any purpose without restriction and free of any obligation to
            acknowledge or compensate you
          </li>
        </ul>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            12. Infringement Reporting Procedures and Digital Millennium
            Copyright Act (DMCA) Procedures{" "}
          </Link>
        </h3>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Infringement Reporting Procedures. If you own copyright, trademark,
            patent, or other intellectual property rights (“ IP Rights Owner ”),
            or if you are an agent authorized to act on the IP Rights Owner’s
            behalf (“ Authorized Agent ”), and you have a good faith belief that
            material or products on the Site infringe the IP Rights Owner’s
            copyright, trademark, or other intellectual property right, and you
            would like to bring it to Fyndr&apos;s attention, you can report
            your concern(s) by submitting your complaint to{" "}
            <a href="mailto:privacy@fyndr.us">Privacy@fyndr.us </a>
          </li>
          <li>
            Fyndr reserves the right to terminate your, or any third-party’s,
            right to use the Site if such use infringes the copyrights of
            another. Fyndr may, under appropriate circumstances and at its sole
            discretion, terminate your, or any third-party’s, right to access to
            the Site, if Fyndr determines that you are, or a third-party is, a
            repeat infringer. If you believe that any material has been posted
            via the Site by any third-party in a way that constitutes copyright
            infringement, and you would like to bring it to Fyndr&apos;s
            attention, you must provide Fyndr the following information:
          </li>
        </ul>
        <ol className="list-decimal list-inside text-[1.2rem]">
          <li>
            {" "}
            an electronic or physical signature of the person authorized to act
            on behalf of the owner of the copyrighted work{" "}
          </li>
          <li> an identification of the copyrighted</li>
          <li>
            {" "}
            work and the location on the Site of the allegedly infringing work
          </li>
          <li>
            {" "}
            a written statement that you have a good faith belief that the
            disputed use is not authorized by the owner, its agent, or the law
          </li>
          <li>
            your name and contact information, including, without limitation,
            telephone number and email address{" "}
          </li>
          <li>
            {" "}
            a statement by you that the above information in your notice is
            accurate and, under penalty of perjury, that you are the copyright
            owner or authorized to act on the copyright owner’s behalf
          </li>
        </ol>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            13. Disclaimer of Warranty
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          AS PERMITTED BY APPLICABLE LAW, YOU EXPRESSLY AGREE THAT USE OF THE
          SITE IS AT YOUR SOLE RISK. NEITHER FYNDR, NOR ITS SUBSIDIARIES OR
          AFFILIATES OR ANY OF THEIR RESPECTIVE EMPLOYEES, AGENTS, BUSINESSS,
          THIRD-PARTY CONTENT PROVIDERS OR LICENSORS OR ANY OF THEIR OFFICERS,
          DIRECTORS, EMPLOYEES OR AGENTS, WARRANT THAT USE OF THE SITE WILL BE
          UNINTERRUPTED, SECURE, VIRUS-FREE, OR ERROR FREE, NOR DO THEY MAKE ANY
          WARRANTY AS TO (A) THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE
          SITE, OR (B) THE ACCURACY, COMPLETENESS, OR RELIABILITY OF (I) THE
          CONTENT ON THE SITE, INCLUDING, WITHOUT LIMITATION, BUSINESS
          OFFERINGS, PRODUCTS, OR OTHER AVAILABLE PROGRAMS, (II) DESCRIPTIONS OF
          BUSINESS OFFERINGS, PRODUCTS, OR OTHER AVAILABLE PROGRAMS, OR (III)
          USER CONTENT PROVIDED THROUGH THE SITE. THE SITE AND ALL CONTENT, USER
          CONTENT AND OTHER INFORMATION CONTAINED ON THE SITE, BUSINESS
          OFFERINGS, PRODUCTS AND OTHER AVAILABLE PROGRAMS ACCESSIBLE OR
          AVAILABLE THROUGH THE SITE, ARE MADE ACCESSIBLE OR AVAILABLE ON AN “AS
          IS” AND “AS AVAILABLE” BASIS. TO THE EXTENT ALLOWED BY APPLICABLE LAW,
          FYNDR HEREBY DISCLAIMS ANY AND ALL REPRESENTATIONS, WARRANTIES, AND
          CONDITIONS, WHETHER EXPRESS, IMPLIED, OR STATUTORY, AS TO THE
          OPERATION OF THE SITE OR THE CONTENT, USER CONTENT, OR OTHER
          INFORMATION CONTAINED ON THE SITE OR THE BUSINESS OFFERINGS, PRODUCTS,
          OR OTHER AVAILABLE PROGRAMS ACCESSIBLE OR AVAILABLE THROUGH THE SITE,
          INCLUDING, WITHOUT LIMITATION, THOSE OF TITLE, NON-INFRINGEMENT,
          NON-INTERFERENCE, BUSINESSABILITY, SUITABILITY, AND FITNESS FOR A
          PARTICULAR PURPOSE, AS WELL AS WARRANTIES IMPLIED FROM A COURSE OF
          PERFORMANCE OR COURSE OF DEALING. THE WARRANTY LIMITATIONS IN THIS
          SECTION ARE NOT INTENDED TO LIMIT ANY WARRANTY PROVIDED DIRECTLY BY A
          BUSINESS OR BY THE APPLICABLE MANUFACTURER OF PHYSICAL PRODUCTS OR ANY
          EXPRESS REPRESENTATIONS OR WARRANTIES BY FYNDR THAT ARE INCLUDED IN
          OTHER APPLICABLE TERMS.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            14. Limitation of Liability
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          AS PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FYNDR, ITS
          SUBSIDIARIES OR AFFILIATES OR ANY OF THEIR RESPECTIVE EMPLOYEES,
          OFFICERS, DIRECTORS, AGENTS, BUSINESSS, PARTNERS, THIRD-PARTY CONTENT
          PROVIDERS OR LICENSORS, OR ANY OF THEIR OFFICERS, DIRECTORS,
          EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY DIRECT OR INDIRECT LOST
          PROFITS OR LOST BUSINESS DAMAGES, INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF, RELATED TO, OR IN
          CONNECTION WITH ANY OF THE FOLLOWING: (A) YOUR USE OF THE SITE, THE
          CONTENT, USER CONTENT, INCLUDING, WITHOUT LIMITATION, ANY PERSONAL
          INFORMATION, AND ANY OTHER INFORMATION EITHER CONTAINED IN THE SITE OR
          SUBMITTED BY YOU TO THE SITE; (B) YOUR INABILITY TO USE THE SITE; (C)
          MODIFICATION OR REMOVAL OF CONTENT SUBMITTED ON THE SITE; (D) THE
          BUSINESS OFFERINGS, PRODUCTS, AND OTHER AVAILABLE PROGRAMS ACCESSIBLE
          OR AVAILABLE THROUGH THE SITE; (E) ANY PRODUCTS OR SERVICES PURCHASED
          OR OBTAINED DIRECTLY FROM A BUSINESS; (F) THESE TERMS OF USE; OR (G)
          ANY IMPROPER USE OF INFORMATION YOU PROVIDE TO THE SITE, INCLUDING,
          WITHOUT LIMITATION, ANY PERSONAL INFORMATION. IN NO EVENT WILL FYNDR’S
          LIABILITY IN CONNECTION WITH A BUSINESS OFFERING, PRODUCT, AND OTHER
          AVAILABLE PROGRAMS EXCEED THE AMOUNTS PAID FOR THE APPLICABLE
          PURCHASE, PRODUCT, OR SERVICE. THE LIABILITY LIMITATIONS IN THIS
          SECTION ARE NOT INTENDED TO LIMIT ANY WARRANTY PROVIDED DIRECTLY BY A
          BUSINESS OR BY THE APPLICABLE MANUFACTURER OF PHYSICAL PRODUCTS OR ANY
          EXPRESS REPRESENTATIONS OR WARRANTIES BY FYNDR THAT ARE INCLUDED IN
          OTHER APPLICABLE TERMS, NOR ARE THEY INTENDED TO LIMIT REMEDIES YOU
          MIGHT HAVE FOR PRODUCT-RELATED INJURY.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            15. Electronic Communications
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          When you use the Site or send emails to Fyndr, you are communicating
          with us electronically and consent to receive electronic
          communications related to your use of the Site. We will communicate
          with you by email or by posting notices on the Site. You agree that
          all agreements, notices, disclosures, and other communications that
          are provided to you electronically satisfy any legal requirement that
          such communications be in writing. Notices from us will be considered
          delivered to you and effective when sent to the email address you
          provide on the Site or from which you otherwise email us. You also
          agree to use this platform in good faith while notifying your
          interactions about a possible exposure to health hazard you may have
          been subjected to. Fyndr does not collect or validate medical records
          or claims from it’s users, The notifications are solely intended for
          cautionary purposes in order to minimize the spread of Covid-19 or
          similar contagion.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            16. Websites of Others
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          The Site contains links to websites maintained by other parties. These
          links are provided solely as a convenience to you and not because we
          endorse or have an opinion about the contents on such websites. We
          expressly disclaim any representations regarding the content or
          accuracy of materials on such websites or the privacy practices of
          those websites. If you decide to access websites maintained by other
          parties, you do so at your own risk. We are not responsible or liable,
          directly or indirectly, for any damage, loss, or liability caused or
          alleged to be caused by or in connection with any use of or reliance
          on any content, Products, or services available on or through any such
          linked site or resource.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            17. Indemnification/Release
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          You agree to defend, indemnify, and hold harmless Fyndr, its
          subsidiaries and affiliates, and their respective directors, officers,
          employees and agents from and against all claims and expenses,
          including, without limitation, attorneys’ fees, arising out of,
          related to, or in connection with any of the following: (a) any User
          Content submitted or posted by you, in connection with the Site, or
          any use of the Site in violation of these Terms of Use; (b) fraud you
          commit or your intentional misconduct or gross negligence; or (c) your
          violation of any applicable U.S., Canadian, or foreign law or rights
          of a third-party. You are solely responsible for your interactions
          with Business and other users of the Site. To the extent permitted
          under applicable laws, you hereby release Fyndr from any and all
          claims or liability related to any product or service of a Business,
          regardless of whether such product or service is a Business Offering
          available through the Site, any action or inaction by a Business,
          including, without limitation, but not limited to any harm caused to
          you by action or inaction of a Business or other users of the Fyndr
          website or mobile app platform, a Business’s failure to comply with
          applicable law and/or failure to abide by the terms of a Business
          Offering or any other product or service purchased or obtained by you
          from the Business, and any conduct, speech or User Content, whether
          online or offline, of any other third-party.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            18. Force Majeure
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          Fyndr shall be excused from performance under these Terms of Use, to
          the extent it or a Business is prevented or delayed from performing,
          in whole or in part, as a result of an event or series of events
          caused by or resulting from: (a) weather conditions or other elements
          of nature or acts of God; (b) acts of war, acts of terrorism,
          insurrection, riots, civil disorders, or rebellion; (c) quarantines or
          embargoes; (d) labor strikes; (e) error or disruption to major
          computer hardware or networks or software failures; or (g) other
          causes beyond the reasonable control of Fyndr or a Business, as
          applicable.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            19. Assignment
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          You may not assign these Terms of Use, or any rights, benefits, or
          obligations hereunder, by operation of law or otherwise, without the
          express written permission of Fyndr. Any attempted assignment that
          does not comply with these Terms of Use shall be null and void. Fyndr
          may assign these Terms of Use, in whole or in part, to any third-party
          in its sole discretion.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            20. Entire Agreement
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          The Terms of Use, including, without limitation, the incorporated
          Terms of Sale, Special Programs, Privacy Statement, and other terms
          incorporated by reference, constitute the entire agreement and
          understanding between you and Fyndr with respect to the subject matter
          hereof and supersedes all prior or contemporaneous communications and
          proposals, whether oral or written, between you and Fyndr with respect
          to such subject matter.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            21. Choice of Law
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          Any disputes arising out of or related to these Terms of Use and/or
          any use by you of the Site or Fyndr’s services shall be governed by
          the laws of the State of Arizona, without regard to its choice of law
          rules and without regard to conflicts of laws principles. If you
          reside in Canada, any disputes arising out of or related to these
          Terms of Use and/or any use by you of the Site or Fyndr’s services
          shall be governed by the laws of the Province in which you reside at
          the time you enter into these Terms of Use, without regard to its
          choice of law rules and without regard to conflicts of laws
          principles. Fyndr and you specifically disclaim the application of the
          United Nations Convention on Contracts for the International Sale of
          Goods as that Convention may be incorporated into applicable law.
        </span>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            22. Dispute Resolution/Arbitration Agreement
          </Link>
        </h3>
        <ul className="list-disc list-inside text-[1.2rem]">
          <li>
            Binding Arbitration . Except as specifically stated herein, any
            dispute or claim between you and Fyndr and/or its subsidiaries,
            affiliates, and/or any of their respective members, officers,
            directors, and employees (all such entities collectively referred to
            herein as the “Fyndr Entities”) arising out of, relating in any way
            to, or in connection with the Terms of Use, the Site or your use of
            the Site, your Personal Information, or any Products or Business
            Offerings (“Dispute(s)”) shall be resolved exclusively by final,
            binding arbitration; except that you may bring a qualifying claim
            over a Dispute in a small claims court. By virtue of this Dispute
            Agreement (defined below), you and Fyndr are each giving up the
            right to go to court and have a Dispute heard by a judge or jury
            (except as otherwise set forth in this Section 22(d)). The
            provisions of this Section 22 shall constitute your and Fyndr’s
            written agreement to arbitrate Disputes under the Federal
            Arbitration Act (“ Dispute Agreement ”). The arbitration will be
            administered by the American Arbitration Association (“ AAA ”) and
            conducted before a single arbitrator pursuant to its rules,
            including, without limitation. The arbitrator will apply and be
            bound by this Agreement, apply applicable law and the facts, and
            issue a reasoned award, if appropriate. To begin an arbitration
            proceeding, you must submit the Dispute and simultaneously send a
            copy of the completed form to the following address: Fyndr LLC, 3793
            E Covey lane, Phoenix, AZ 85050. The arbitration will be conducted
            based upon written submissions unless you request, and/or the
            arbitrator determines, that a telephone or in-person hearing is
            necessary. In addition, you hereby unconditionally agree that (1)
            the arbitrator’s decision shall be controlled by these Terms of Use
            and any of the other agreements referenced herein that you may have
            entered into in connection with the Site; (2) the arbitrator shall
            apply Arizona law consistent with the FAA and applicable statutes of
            limitations, and shall honor claims of privilege recognized at law;
            and (3) in the event the AAA is unavailable or unwilling to hear the
            Dispute, you and the applicable Fyndr Entity(ies) shall agree to, or
            a court shall select, another arbitration provider.
          </li>
          <li>
            {" "}
            No Class Action Matters . We each agree that we shall bring any
            Dispute against the other in our respective individual capacities
            and not as a plaintiff or class member in any purported class,
            representative proceeding or as an association. In addition, we each
            agree that Disputes shall be arbitrated only on an individual basis
            and not in a class, consolidated, or representative action and that
            the arbitrator may award relief (including injunctive relief) only
            on an individual basis. The arbitrator does not have the power to
            vary these provisions.
          </li>
          <li>
            Choice of Law and Forum; No Jury Trial . If for any reason a Dispute
            proceeds in court: (i) except with respect to a qualifying claim
            over a Dispute in a small claims court, which you shall have the
            right to bring in a court of competent jurisdiction in the county in
            which you reside, you and Fyndr agree that any Dispute may only be
            instituted in a state or federal court in Maricopa County, Arizona;
            (ii) you and Fyndr irrevocably consent and submit to the exclusive
            personal jurisdiction and venue of such courts for resolution of
            such Disputes; and (iii) you and Fyndr agree to waive any right to a
            trial by jury. You and Fyndr agree that the Federal Arbitration Act,
            the AAA rules, applicable federal law, and the laws of the State of
            Arizona, without regard to principles of conflicts of law, will
            govern this Dispute Agreement and any Disputes.
          </li>
          <li>
            Injunctive Relief . Notwithstanding anything to the contrary in this
            Dispute Agreement, either party may bring suit in court seeking an
            injunction or other equitable relief arising out of or relating to
            the infringement of a party’s intellectual property, or any illegal
            or intentional act affecting the accessibility, functionality, or
            the security of the Site, and/or any illegal or intentional act
            against your interests or the general business interests of Fyndr.
          </li>
          <li>
            {" "}
            Severability . With the exception of Section 22(b) above, if any
            part of this Section 22 is ruled to be unenforceable, then the
            balance of this Section 22 shall remain in full effect and construed
            and enforced as if the portion ruled unenforceable were not
            contained herein. If Section 22(b) above is ruled to be
            unenforceable, then the rest of Section 22 shall remain in full
            effect.
          </li>
        </ul>
        <br />
        <br />
        <h3>
          {" "}
          <Link href="" className="text-[1.4rem] text-black-600 font-bold">
            23. Additional Disclosures
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          No waiver by either you or Fyndr of any breach or default or failure
          to exercise any right allowed under these Terms of Use is a waiver of
          any preceding or subsequent breach or default or a waiver or
          forfeiture of any similar or future rights under our Terms of Use. The
          section headings used herein are for convenience only and shall be of
          no legal force or effect. If a court of competent jurisdiction holds
          any provision of our Terms of Use invalid, such invalidity shall not
          affect the enforceability of any other provisions contained in these
          Terms of Use, and the remaining portions of our Terms of Use shall
          continue in full force and effect.
          <br />
          <br />
          You are contracting with Fyndr, LLC. Correspondence should be directed
          to: Fyndr, LLC. 3793 E Covey lane Phoenix, AZ, 85050.
          <br />
          <br />
          If you are a California resident, you may report complaints to the
          Complaint Assistance Unit of the Division of Consumer Services of the
          California Department of Consumer Affairs by contacting them in
          writing at 1625 North Market Blvd., Suite N-112, Sacramento,
          California 95834, or by telephone at (800) 952-5210.
          <br />
          <br />
          The provisions of these Terms of Use apply equally to, and are for the
          benefit of, Fyndr, its subsidiaries, affiliates, Business, and its
          third-party content providers and licensors, and each shall have the
          right to assert and enforce such provisions directly.
        </span>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Terms;

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fyndr Business Terms & Conditions",
};

const Agreement = () => {
  const olStyle = "list-decimal pl-9 text-[1.2rem]";
  const textSize = "text-[1.2rem]";
  const headingSize = "text-[1.6rem]";
  return (
    <div className="m-20">
      <div className="flex justify-center w-full mb-5">
        <Image
          src={"/images/fyndr-logo-blue.png"}
          width={300}
          height={500}
          alt="Fyndr Logo"
        ></Image>
      </div>
      <div className="flex justify-center w-full">
        <span className="text-[2rem]">Fyndr Business Terms & Conditions</span>
      </div>
      <br />

      <div className={`${textSize}`}>
        <p>Effective date March 24th, 2024</p>
        <br />

        <p>
          A <strong>Business</strong> is an establishment, Non-Profit or For
          Profit that participates in tracking customer interaction based on
          customer disclosures (with or without knowing the customer identity)
          <strong>and/or</strong> Offers services &amp; products for
          consideration or purchase with or without money transaction
          <strong>and/or</strong> Presents the Terms of Service to the customers
          / consumers in order to obtain their electronic consent. Referred
          collectively as <strong>&ldquo;Business&rdquo;</strong> in the
          contract.
        </p>
      </div>
      <br />

      <div className={`${textSize}`}>
        <p>
          These Business Terms and Conditions
          <strong>(&ldquo;Terms and Conditions&rdquo;)</strong> govern and are
          incorporated into the Fyndr Business Agreement between Fyndr and
          Business (collectively, the&nbsp;
          <strong>&ldquo;Agreement&rdquo;</strong>). Fyndr, subject to the
          provisions of this paragraph, may amend the Terms and Conditions in
          its sole discretion and at any time. The most recent version of the
          Terms and Conditions (as may be amended by Fyndr from time to time)
          will be available: (i) in Fyndr&rsquo;s Business Center, and/or (ii)
          as part of the Fyndr website. Business agrees that either or both of
          these notification methods constitute adequate notice to inform
          Business of any amendments to the Agreement and Business further
          agrees to be bound by any such amendments to the Agreement upon such
          notification.
        </p>
      </div>
      <br />

      <div className={`${headingSize}`}>
        <p>
          <strong>Definitions</strong>
        </p>
      </div>
      <br />
      <div className={`${textSize}`}>
        <p>
          <strong>&ldquo;BUSINESS OFFER&rdquo;</strong>&nbsp;means the goods
          and/or services to be provided by the Business, stated on the campaign
          as presented by Fyndr website, mobile app or platform. Value of the
          offers are determined by Business.
        </p>
        <p>
          <strong>&ldquo;PURCHASE AMOUNT&rdquo;</strong>&nbsp;means the amount a
          purchaser pays for each offer.
        </p>
        <p>
          <strong>&ldquo;DISCOUNT AMOUNT&rdquo;</strong>&nbsp;means the amount
          which the customer typically saves by purchasing the offer.
        </p>
        <p>
          <strong>&ldquo;RETAIL AMOUNT&rdquo;</strong>&nbsp;means the Purchase
          amount plus Discount amount.
        </p>
        <p>
          <strong>&ldquo;PROMOTIONAL VALUE EXPIRATION DATE&rdquo;</strong>
          &nbsp;means the date stated on the Offers when the Promotional Value
          expires.
        </p>
        <p>
          <strong>&ldquo;REMITTANCE AMOUNT&rdquo;</strong>&nbsp;means the amount
          Fyndr shall remit to Business for each offer, subject to the payment
          terms.
        </p>
        <p>
          <strong>&ldquo;OFFER FINE PRINT&rdquo;</strong>&nbsp;means the
          conditions and restrictions concerning Offers redemption and purchase
          determined by the business and published on Fyndr platform.
        </p>
        <p>
          <strong>&ldquo;BUSINESS TERMS OF SERVICE&rdquo;</strong>&nbsp;means
          the &ldquo;<strong>Business Terms&rdquo; </strong>concerning use of
          specific Offering, Services, Property, Experience and/or Access to
          facility wherein the electronic consent of the
          consumer/customer/individual intending to avail such business offering
          are presented through the Fyndr Website and / or mobile app.
        </p>
      </div>
      <br />
      <div>
        <ol className={`${olStyle}`}>
          <li>
            <strong className={`${headingSize}`}>Business Offer Program</strong>

            <ol className={`${olStyle} ${textSize}`}>
              <li>
                <p>
                  Business will have the following two options to promote their
                  business offering
                </p>
              </li>
              <ol className={`${olStyle}`}>
                <li>
                  <p>
                    By publishing offers on Fyndr platform but selling &amp;
                    fulfilling it through their own website or digital medium.
                  </p>
                </li>
                <li>
                  <p>
                    By publishing &amp; selling the offers on Fyndr platform
                    wherein the purchase amount is collected by Fyndr. Business
                    then fulfills the offers once the sale is completed on Fyndr
                    platform.
                  </p>
                </li>
              </ol>

              <li>
                <p>
                  For both options listed as part of section 1.1 Business is
                  solely responsible for creating, pricing &amp; publishing the
                  offers on the Fyndr platform. Fyndr website and mobile app is
                  only a medium where these offers are presented. The primary
                  responsibility to fulfill &amp; honor the offers will be sole
                  responsibility of the business.
                </p>
              </li>
              <li>
                <p>
                  Fyndr is authorized to promote and sell Offers on
                  Business&rsquo;s behalf subject to the terms of this
                  Agreement. The Business Offering will be sent to the customers
                  electronically. The customer will then choose to purchase
                  through Fyndr App, Website OR directed to the business
                  website. Business is the issuer of the Offers and seller of
                  the Business Offering. If there is a conflict between this
                  Agreement and the Terms of Sale, the Agreement controls.
                </p>
              </li>
              <li>
                <p>
                  Fyndr is authorized to promote and sell Offers on
                  Business&rsquo;s behalf through any platform, including its
                  feature deal-of-the-day, affiliates, business partner network,
                  marketplace, or referral network. The Offers can be offered to
                  all or part of Fyndr&rsquo;s subscriber base or its affiliate
                  subscriber base or referral network and segmented by various
                  variables including gender, age, location, and consumer
                  preferences based on the criteria selected and opted by
                  Business. The features may be offered through a variety of
                  distribution channels, including, the Internet, the Website,
                  affiliate websites, business partner network, email, mobile
                  applications, other types of electronic offerings and other
                  platforms or distribution channels owned, controlled, or
                  operated by Fyndr, its affiliates or business partners. In
                  addition, in connection with Fyndr&rsquo;s promotion of a
                  Business Offering, Business authorizes Fyndr to shorten or
                  extend the Promotional Value Expiration Date.
                </p>
              </li>
              <li>
                <p>
                  Business shall promptly notify Fyndr any time it receives a
                  complaint related to potentially criminal conduct, including
                  allegations of sexual assault, allegedly engaged in by any of
                  its employees, agents or independent contractors, regardless
                  of whether a Fyndr customer makes the complaint.
                </p>
              </li>
              <li>
                <p>
                  The expense for business offering will be presented and
                  charged to business at the time of creating the offers. Fyndr
                  is authorized to promote and sell the offers beyond the
                  Maximum Number of customers at its own expense.&nbsp;
                </p>
              </li>
              <li>
                <p>
                  Fyndr reserves the continuing right to reject, revise, or
                  discontinue any Business Offering, at any time and for any
                  reason in Fyndr&rsquo;s sole discretion, and to terminate the
                  Business Offering and to remove all references to the Business
                  Offering and Offers from the Website, Mobile app or Fyndr
                  platform; and redirect or delete any URL used in connection
                  with the Business Offering.
                </p>
              </li>
              <li>
                <p>
                  Business shall honor the Offers for the Business Offering
                  through the Promotional Value Expiration Date. After the
                  Promotional Value Expiration Date, Business must always allow
                  the purchaser to redeem the Offers toward any goods or
                  services then offered by the Business equivalent to at least
                  the Amount Paid.
                </p>
              </li>
              <li>
                <p>
                  Partial redemptions: If applicable, and if a purchaser redeems
                  a Offers for less than the Amount Paid, the Business is
                  responsible for handling any unredeemed value as required by
                  applicable law.
                </p>
              </li>
              <li>
                <p>
                  Business agrees that in providing the Business Offering,
                  Business will not inflate prices or impose any additional
                  fees, charges, conditions or restrictions that contradict or
                  are inconsistent with the terms stated on the Offers,
                  including the Terms & Conditions. Unless disclosed in the
                  Terms & Conditions, Business further agrees not to impose
                  different terms or a different cancellation policy than what
                  is imposed on its non-Fyndr customers.
                </p>
              </li>
              <li>
                <p>
                  Business agrees that so long as an appointment or reservation
                  is made to redeem a Offers, or purchaser has made an attempt
                  to make an appointment, before the Offers&rsquo;s Promotional
                  Value Expiration Date, the Offers will be honored for the Full
                  Offer Value without restriction, even though the services may
                  be provided after the Promotional Value Expiration Date.
                </p>
              </li>
              <li>
                <p>
                  Business is responsible for all customer service in connection
                  with the Business Offering and for supplying all goods and
                  services stated in the Business Offering. Business is also
                  responsible for any customer loyalty programs associated with
                  the Business Offering.
                </p>
              </li>
              <li>
                <p>
                  Business agrees to accept returns of the Business Offering in
                  compliance with applicable laws and the Terms & Conditions,
                  but in any event: (i) will accept returns of a defective
                  Business Offering or nonconforming items in or a part of any
                  Business Offering at all times and pay (or reimburse a
                  purchaser for) any and all costs associated with the return of
                  such Business Offering; and (ii) will not impose a more
                  restrictive return policy on purchasers than Business&rsquo;s
                  regular return policy as applied to Business&rsquo;s purchaser
                  in the ordinary course of Business&rsquo;s business.
                </p>
              </li>
            </ol>
          </li>
          <br />
          <li>
            <strong className={`${headingSize}`}>Payment</strong>
          </li>

          <ol className={`${olStyle} ${textSize}`}>
            <li>
              <p>
                Fyndr requires a business to provide their credit/debit card or
                bank account to ensure promotional campaign fees when opted into
                additional services outside of what is included in your free
                registration, including but not limited to the optional Featured
                Business partnership, as well as the optional email & push
                notification system to users within a designated radius.
              </p>
            </li>
            <li>
              <p>
                Fyndr will have the right to withhold amounts pertaining to
                specific campaigns wherein the business chooses the Fyndr
                platform to sell the product directly on their behalf.
              </p>
            </li>
            <li>
              <p>
                Taxes Generally. It is Business&rsquo;s responsibility to
                determine what, if any, taxes apply to the payments Business
                makes or receives, and it is Business&rsquo;s responsibility to
                collect, report and remit the correct tax to the appropriate tax
                authority. Fyndr is not responsible for determining whether
                taxes apply to Business&rsquo;s transaction with either
                purchasers or Fyndr, or for collecting, reporting or remitting
                any taxes arising from any transaction with or by Business and
                purchaser. Business may be asked to provide Fyndr with a valid
                Tax Identification Number for tax reporting purposes. An IRS
                Form 1099 may be issued in Business&rsquo;s name for the value
                of payments made. Notwithstanding anything else in this
                Agreement, Business shall be, and will remain, registered for
                sales, use and other similar tax collection purposes in all
                states and localities in which Business is required to be so
                registered in connection with the Business Offering and pursuant
                to the terms and redemption of the Offers, and shall be
                responsible for paying any and all sales, use or any other taxes
                related to the Business Offering or the goods and services.
              </p>
            </li>
            <li>
              <p>
                Transaction Taxes. Business bears sole financial responsibility
                for any and all sales, use, excise, general, GST, or other
                similar taxes, including any interest penalties and additions
                related thereto, imposed on or arising from the transactions
                contemplated by this Agreement between Fyndr and Business
                (&ldquo;Transaction Taxes&rdquo;), if any. Fyndr shall apply the
                applicable Transaction Tax to the amounts it retains and/or
                other fees remitted to Fyndr pursuant this Agreement.
                Transaction Taxes are calculated using the Business&rsquo;s
                billing address and will be included on invoices. Tax rates are
                subject to change. If applied, Transaction Taxes will be
                calculated at the time of each payment using the rates in effect
                under current law.
              </p>
            </li>
          </ol>
          <br />
          <li>
            <strong className={`${headingSize}`}>
              Customer Data Restrictions
            </strong>
          </li>
          <ol className={`${olStyle} ${textSize}`}>
            <li>
              <p>
                <strong>&ldquo;</strong>Customer Data&rdquo;&nbsp;means all
                identifiable information about purchasers generated or collected
                by Fyndr or Business, including, but not limited to,
                purchasers&rsquo; name, shipping addresses, email addresses,
                phone numbers, purchaser preferences and tendencies, and
                financial transaction data.
              </p>
            </li>
            <li>
              <p>
                Business shall use Customer Data only to fulfill its redemption
                obligations in connection with the Business Offering as
                authorized by this Agreement. Business expressly agrees that any
                Customer Data shall be used only for this purpose (including,
                but not limited to, the redemption of Offers and provision of
                goods and services to purchasers), and not to enhance a file or
                list owned by Business, or any third party. Business represents,
                warrants and covenants that it will not resell, broker or
                otherwise disclose any Customer Data to any third party, in
                whole or in part, for any purpose, unless required by applicable
                law. If Business engages any third party to facilitate its
                redemption obligations hereunder, Business shall ensure that
                such third party implements and complies with reasonable
                security measures in handling any Customer Data. If any Customer
                Data is collected directly by Business or a third party engaged
                by Business to facilitate its redemption obligations hereunder,
                Business shall ensure that it or such third party adopts, posts
                and processes the Customer Data in conformity with its posted
                privacy policy and all applicable laws.
              </p>
            </li>
            <li>
              <p>
                As long as Business uses Customer Data in compliance with
                applicable law and Business&rsquo;s posted privacy policy,
                restrictions stated in this Agreement on Business&rsquo;s use of
                Customer Data do not apply to: (i) data from any purchaser who
                is already a customer of Business before the Effective Date, if
                such data was provided to Business by such purchaser independent
                of this Agreement or any transaction hereunder; or (ii) data
                supplied by a purchaser directly to Business who becomes a
                customer of Business in connection with such purchaser
                explicitly opting in to receive communications from Business.
              </p>
            </li>
            <li>
              <p>
                Business shall immediately notify Fyndr if Business becomes
                aware of or suspects any unauthorized access to or use of
                Customer Data or any confidential information of Fyndr, and
                shall cooperate with Fyndr in the investigation of such breach
                and the mitigation of any damages. Business will bear all
                associated expenses incurred by Fyndr to comply with applicable
                laws (including, but not limited to, any data breach laws) or
                arising from any unauthorized access or acquisition of Customer
                Data while such data is in Business&rsquo;s reasonable
                possession or control. Upon termination or expiration of this
                Agreement, Business shall, as directed by Fyndr, destroy or
                return to Fyndr all the Customer Data in Business&rsquo;s or any
                agent of Business&rsquo;s possession.
              </p>
            </li>
          </ol>
          <br />
          <li>
            <p>
              <strong className={`${headingSize}`}>
                Business Service Terms &amp; Waiver{" "}
              </strong>
              <strong>&ndash; </strong>The business may choose to present
              &ldquo;Terms of Service &amp; Waiver&rdquo;
              <strong>(&ldquo;Business Terms&rdquo;)</strong> to the individuals
              &amp; consumers of their services through the Fyndr platform.Fyndr
              is a mere technology platform that enables the presentment of the
              Business terms. The content of the Business Terms are directly
              managed and controlled by the business. Business may choose to
              provide service or decline at their own discretion depending on
              customer&rsquo;s willingness to sign the consent or otherwise.
            </p>
          </li>
          <br />

          <li>
            <strong className={`${headingSize}`}>Term and Termination</strong>
          </li>

          <p className={`${textSize}`}>
            This Agreement will continue in effect until terminated by either
            party in accordance with this Section (
            <strong>&ldquo;Term&rdquo;</strong>). Fyndr is authorized to
            terminate this Agreement, at any time for any reason, upon written
            notice to Business. Business is authorized to terminate this
            Agreement upon seven (7) business days prior written notice to
            Fyndr. Termination of this Agreement will not in any way affect
            Business&rsquo;s obligation to redeem any Offers according to the
            terms of this Agreement, including the obligation to honor the
            Offers for the Amount Paid after the Promotional Value Expiration
            Date. Provisions in this Agreement that are intended to survive
            termination will continue in full force and effect after the Term.
          </p>
          <br />

          <li>
            <strong className={`${headingSize}`}>Marketing</strong>
          </li>

          <p className={`${textSize}`}>
            Fyndr and its business partners may communicate with Business with
            regard to products, promotions, and other services that may be of
            interest to Business. This may include email or other
            communications. Fyndr may also solicit Business&rsquo;s opinion for
            market research purposes.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>
              Intellectual Property Rights
            </strong>
          </li>
          <ol className={`${olStyle} ${textSize}`}>
            <li>
              <p>
                Business grants to Fyndr a non-exclusive, worldwide, royalty
                free, paid-up, perpetual, irrevocable, transferable and
                sub-licensable license and right to use, modify, reproduce,
                sublicense, publicly display, distribute, broadcast, transmit,
                stream, publish and publicly perform: (a) Business&rsquo;s name,
                logos, trademarks, service marks, domain names, and any
                audiovisual content, video recordings, audio recordings,
                photographs, graphics, artwork, text and any other content
                provided, specified, recommended, directed, authorized or
                approved to use by Business (collectively,&nbsp;&ldquo;Business
                IP&rdquo;); and (b) any third party&rsquo;s name, logos,
                trademarks, service marks, domain names, audiovisual recordings,
                video recordings, audio recordings, photographs, graphics,
                artwork, text and any other content provided, specified,
                recommended, directed, authorized or approved for use by
                Business (collectively,&nbsp;&ldquo;Third Party IP&rdquo;), in
                each case in connection with the promotion, sale/resale (as may
                be applicable) or distribution of the Business Offering in all
                media or formats now known or hereinafter developed
                (&ldquo;License&rdquo;). Any use of the Business IP or Third
                Party IP as contemplated in this Agreement is within
                Fyndr&rsquo;s sole discretion.
              </p>
            </li>
            <li>
              <p>
                Business acknowledges and agrees that, as between the parties,
                Fyndr owns all interest in and to the Website, Customer Data,
                Fyndr trade names, logos, trademarks, service marks, domain
                names, social media identifiers, all data collected through or
                from the Website, all audiovisual content, video recordings,
                audio recordings, photographs, graphics, artwork, text or any
                other content created by Fyndr or at Fyndr&rsquo;s direction, or
                assigned to Fyndr, and any materials, software, technology or
                tools used or provided by Fyndr to promote, sell/resell (as may
                be applicable) or distribute the Business Offering and conduct
                its business in connection therewith
                (collectively&nbsp;&ldquo;Fyndr IP&rdquo;). Business shall not
                use, sell, rent, lease, sublicense, distribute, broadcast,
                transmit, stream, place shift, transfer, copy, reproduce,
                download, time shift, display, perform, modify or timeshare the
                Fyndr IP or any portion thereof, or use such Fyndr IP as a
                component of or a base for products or services prepared for
                commercial use, sale, sublicense, lease, access or distribution,
                except that Fyndr grants Business a limited, non-exclusive,
                revocable, non-transferable, non-sub licensable license during
                the Term to use one copy of Fyndr&rsquo;s mobile Business
                software application on a single mobile computer, tablet
                computer, or other device, solely for the purposes permitted by
                that software, and to make one copy of the software for back-up
                purposes. Business shall keep the Fyndr IP confidential, and
                shall not prepare any derivative work based on the Fyndr IP or
                translate, reverse engineer, decompile or disassemble the Fyndr
                IP. Business shall not take any action to challenge or object to
                the validity of Fyndr&rsquo;s rights in the Fyndr IP or
                Fyndr&rsquo;s ownership or registration thereof. Except as
                specifically provided in this Agreement, Business and any third
                party assisting Business with its obligations in this Agreement,
                are not authorized to use Fyndr IP in any medium without prior
                written approval from an authorized representative of Fyndr.
                Business shall not include any trade name, trademark, service
                mark, domain name, social media identifier, of Fyndr or its
                affiliates, or any variant or misspelling thereof, in any
                trademark, domain name, email address, social network
                identifier, metadata or search engine keyword. Business shall
                not use or display any Fyndr IP in a manner that could
                reasonably imply an endorsement, relationship, affiliation with,
                or sponsorship between Business or a third party and Fyndr. All
                rights to the Fyndr IP not expressly granted in this Agreement
                are reserved by Fyndr.
              </p>
            </li>
            <li>
              <p>
                If Business provides Fyndr or any of its affiliates with
                feedback, suggestions, reviews, modifications, data, images,
                text, or other information or content about a Fyndr product or
                service or otherwise in connection with this Agreement, any
                Fyndr IP, or Business&rsquo;s participation in the Business
                Offering or Offers, (collectively,&nbsp;&ldquo;Feedback&rdquo;),
                Business irrevocably assigns to Fyndr all right, title, and
                interest in and to Feedback. In the event your assignment to
                Fyndr is invalid for any reason, you hereby irrevocably grant
                Fyndr and its affiliates a perpetual, paid-up, royalty-free,
                nonexclusive, worldwide, irrevocable, freely transferable right
                and license to (i) use, reproduce, perform, display, and
                distribute Feedback; (ii) adapt, modify, re-format, and create
                derivative works of Feedback for any purpose and sublicense the
                foregoing rights to any other person or entity. Business
                warrants that: (A) Feedback is Business&rsquo;s original work,
                or Business obtained Feedback in a lawful manner; and (B) Fyndr
                and its sublicensees&rsquo; exercise of rights under the license
                above will not violate any person&rsquo;s or entity&rsquo;s
                rights, including any copyright rights. Business agrees to
                provide Fyndr such assistance as Fyndr might require to
                document, perfect, or maintain Fyndr&rsquo;s rights in and to
                Feedback.
              </p>
            </li>
          </ol>
          <br />

          <li>
            <strong className={`${headingSize}`}>
              Representations and Warranties
            </strong>
          </li>

          <p className={`${textSize}`}>
            Business represents and warrants that: (a) Business has the right,
            power and authority to enter into this Agreement; (b) Business, if
            required by applicable law, is registered for sales and use tax
            collection purposes in all jurisdictions where Business&rsquo;s
            goods and services will be provided; (c) the Offers, upon being
            delivered by Fyndr, will be available immediately for redemption and
            Business will have sufficient goods and/or services available for
            redemption through the Promotional Value Expiration Date (
            <em>i.e.</em>, a number of goods and/or services sufficient to
            fulfill its redemption obligations in connection with the applicable
            Maximum Number of Offers); (d) the terms and conditions of the
            Offers, including any discounts or goods and services offered
            thereunder do not and will not violate any, local, state,
            provincial, territorial or federal law, statute, rule, regulation,
            or order, including but not limited to, any law or regulation
            governing the use, sale, and distribution of alcohol and any laws
            governing Offers, gift cards, coupons, and gift certificates; (e)
            the Business&rsquo;s redemption of the Offers will result in the
            bona fide provision of goods and/or services by Business to the
            purchaser; (f) Business owns all interest in and to the Business IP
            and has licensing rights in (with the right to sublicense to Fyndr)
            the Third Party IP, and has the right to grant the License stated in
            this Agreement; (g) the Business IP and the Third Party IP, the
            Business Offering, Fyndr&rsquo;s use and promotion thereof, and the
            results of such Business Offerings, will not infringe, dilute,
            misappropriate, or otherwise violate, anywhere in the world, any
            patent, copyright, logo, trademark, service mark, trade name, rights
            in designs, or other intellectual property right or right of privacy
            or publicity of any third party or any applicable law, and does not
            and will not result from the misappropriation of any trade secret or
            the breach of any confidentiality obligations to any person or
            entity; (h) the Business IP and Third Party IP does not include any
            material that is unlawful, threatening, abusive, defamatory, vulgar,
            obscene, profane or otherwise objectionable, or that encourages
            conduct that constitutes a criminal offense, gives rise to civil
            liability or otherwise violates any law; (i) the Offers and any
            advertising or promotion of Business&rsquo;s goods and services
            relating thereto will not constitute false, deceptive or unfair
            advertising or disparagement under any applicable law; (j) Business
            and its employees, contractors and agents have had the proper
            education and training and hold all required and up-to-date
            regulatory authorization, licenses and certifications relating to
            any Business Offering to provide the goods or services described in
            this Agreement; (k) Business&rsquo;s business information and direct
            deposit details as provided in this Agreement, indicating where
            payments should be forwarded are accurate and Business is the
            authorized entity to receive the funds forwarded by Fyndr; (l)
            Business is not authorized to resell, broker or otherwise disclose
            any Customer Data (as defined in this Agreement) to any third party,
            in whole or in part, for any purpose, and Business is not authorized
            to copy or otherwise reproduce any Customer Data other than for the
            purpose of redeeming or verifying the validity of Offers in
            connection with this Agreement and (m) the Business Offering is: (i)
            free from defects in workmanship, materials and design, (ii)
            Business-able and suitable for the purposes, if any, stated in the
            Agreement, and (iii) genuine, bona fide products, as described
            herein and does not violate the rights of any third party.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>Indemnification</strong>
          </li>

          <p className={`${textSize}`}>
            To the extent allowed under applicable law, Business agrees to
            defend, indemnify and hold Fyndr, its affiliated and related
            entities, and any of its respective officers, directors, agents and
            employees, harmless from and against any claims, lawsuits,
            investigations, penalties, damages, losses or expenses (including
            but not limited to reasonable attorneys&rsquo; fees and costs)
            arising out of or relating to any of the following: (a) any breach
            or alleged breach by Business of this Agreement, or the
            representations and warranties made in this Agreement; (b) any claim
            for state sales, use, or similar tax obligations of Business arising
            from the sale and redemption of a Offers; (c) any claim by any
            local, state, provincial, territorial or federal governmental entity
            for unredeemed Offers or unredeemed cash values of Offers or any
            other amounts under any applicable abandoned or unclaimed property
            or escheat law, including but not limited to any claims for
            penalties and interest; (d) any claim arising out of a violation of
            any law or regulation by Business or governing Business&rsquo;s
            goods and/or services; (e) any claim arising out of Business&rsquo;s
            violation of law or regulation governing the use, sale, and
            distribution of alcohol; (f) any claim by a purchaser or anyone else
            arising out of or relating to the goods and services provided by
            Business and/or pick up of the goods and services at the Redemption
            Site, including but not limited to, any claims for false
            advertising, product defects, personal injury, death, or property
            damages; (g) any claim by a purchaser for the Amount Paid; (h) any
            claim arising out of Business&rsquo;s misuse of Customer Data, or
            any violation of an applicable data privacy or security law; and (i)
            any claim arising out of Business&rsquo;s negligence, fraud or
            willful misconduct. Fyndr maintains the right to control its own
            defense and to choose and appoint its own defense counsel,
            regardless of the presence or absence of a conflict of interest
            between Fyndr and Business. Business&rsquo;s duty to defend and
            indemnify Fyndr includes the duty to pay Fyndr&rsquo;s reasonable
            attorneys&rsquo; fees and costs, including any expert fees.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>Confidentiality</strong>
          </li>

          <p className={`${textSize}`}>
            The terms for the Business Offering described in this Agreement are
            confidential, and Business agrees not to disclose the terms
            described in this Agreement to any party (other than to its
            employees, parent companies, shareholders, lawyers and accountants
            on a strict need-to-know basis or as required by applicable public
            records and other law, if Business has taken the necessary
            precautions of the kind generally taken with confidential
            information to preserve the confidentiality of the information made
            available to such parties). In the event of a breach, Fyndr is
            entitled to injunctive relief and a decree for specific performance,
            and any other relief allowed under applicable law (including
            monetary damages if appropriate).
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>
              Limitation of Liability
            </strong>
          </li>

          <p className={`${textSize}`}>
            EXCEPT FOR BUSINESS&rsquo;S INDEMNIFICATION OBLIGATIONS HEREUNDER,
            IN NO EVENT IS EITHER PARTY LIABLE OR OBLIGATED TO THE OTHER PARTY
            OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST BUSINESS, SPECIAL,
            INCIDENTAL, EXEMPLARY, CONSEQUENTIAL, PUNITIVE, OR INDIRECT DAMAGES
            REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT OR
            OTHERWISE, EVEN IF INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGES
            IN ADVANCE. FYNDR&rsquo;S SOLE AND COMPLETE LIABILITY TO BUSINESS
            FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT, OR ANY
            ERRORS, OMISSIONS OR MISPLACEMENTS OF ANY OFFERS IS LIMITED TO THE
            FEE BUSINESS PAID TO CREATE AND PUBLISH THE OFFER TO THE FYNDR APP
            AND/OR WEBSITE.THIS LIMITATION OF LIABILITY APPLIES TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW AND NOTWITHSTANDING THE FAILURE
            OF ANY LIMITED REMEDY. IN ADDITION, ANY CLAIM BY OR ON BEHALF OF A
            BUSINESS IN CONNECTION WITH ANY PAYMENT MADE BY FYNDR, INCLUDING,
            BUT NOT LIMITED TO, CLAIMS ALLEGING THAT A BUSINESS WAS UNDERPAID,
            MUST BE MADE IN WRITING TO FYNDR WITHIN NINETY (90) DAYS FROM THE
            DATE FYNDR REMITS THE PAYMENT AT ISSUE. ALL CLAIMS NOT MADE IN
            ACCORDANCE WITH THE FOREGOING SHALL BE DEEMED WAIVED, RELEASED AND
            DISCHARGED BY BUSINESS.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>Dispute Resolution</strong>
          </li>

          <p className={`${textSize}`}>
            All disputes arising out of, or relating in any way to this
            Agreement, shall be resolved pursuant to this Section 12 Dispute
            Resolution.
          </p>

          <li>
            <strong className={`${headingSize}`}>Binding Arbitration</strong>
          </li>
          <p className={`${textSize}`}>
            EXCEPT AS SPECIFICALLY STATED HEREIN, ANY DISPUTE OR CLAIM BETWEEN
            BUSINESS AND FYNDR ARISING OUT OF, OR RELATING IN ANY WAY TO, THIS
            AGREEMENT (<strong>&ldquo;DISPUTES&rdquo;</strong>) SHALL BE
            RESOLVED EXCLUSIVELY BY FINAL, BINDING ARBITRATION. BY VIRTUE OF THE
            AGREEMENT IN THIS SECTION 14 TO ARBITRATE, BUSINESS AND FYNDR ARE
            EACH GIVING UP THE RIGHT TO GO TO COURT AND HAVE A DISPUTE HEARD BY
            A JUDGE OR JURY (EXCEPT AS OTHERWISE SET FORTH IN THIS SECTION 14).
            The provisions of this Section 14 shall constitute Business&rsquo;s
            and Fyndr&rsquo;s written agreement to arbitrate Disputes under the
            Federal Arbitration Act. The arbitration will be administered by the
            American Arbitration Association (&ldquo;AAA&rdquo;) and conducted
            before a single arbitrator pursuant to its applicable rules,
            including those applicable to Commercial Disputes, available at
            http://www.adr.org or by calling 800-778-7879. The arbitrator will
            apply and be bound by this Agreement, apply applicable law and the
            facts, and issue a reasoned award.
          </p>
          <p className={`${textSize}`}>
            To begin an arbitration proceeding, Business or Fyndr must comply
            with the limitations provision set forth in Section 13 and submit
            the Dispute by making a demand for arbitration as detailed at
            http://www.adr.org. If Fyndr demands arbitration, it shall
            simultaneously send a copy of the completed demand to the
            Business&rsquo;s address of record. Payment of all filing,
            administration and arbitrator fees will be governed by the
            AAA&rsquo;s rules. Fyndr will reimburse those fees for Disputes
            totaling less than $3,000 if Business is the prevailing party in
            such arbitration. Fyndr will not seek attorneys&rsquo; fees and
            costs in arbitration unless the arbitrator determines that a
            Business Dispute is frivolous. The arbitration will be conducted
            based upon written submissions unless Business requests and/or the
            arbitrator determines that a telephone or in-person hearing is
            necessary. If the arbitrator grants the request or determines an
            in-person hearing is necessary, the hearing will proceed in Phoenix,
            AZ, unless the arbitrator determines, or we agree that the matter
            should proceed in the county of Business&rsquo;s principal place of
            business.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>Class Action Waiver</strong>
          </li>

          <p className={`${textSize}`}>
            WE EACH AGREE THAT WE SHALL BRING ANY DISPUTE AGAINST THE OTHER IN
            OUR RESPECTIVE INDIVIDUAL CAPACITIES AND NOT AS A PLAINTIFF OR CLASS
            MEMBER IN ANY PURPORTED CLASS, REPRESENTATIVE PROCEEDING OR AS AN
            ASSOCIATION. IN ADDITION, WE EACH AGREE THAT DISPUTES SHALL BE
            ARBITRATED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS,
            CONSOLIDATED OR REPRESENTATIVE ACTION. THE ARBITRATOR DOES NOT HAVE
            THE POWER TO VARY THESE PROVISIONS.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>
              Choice of Law/No Jury Trial
            </strong>
          </li>

          <p className={`${textSize}`}>
            If for any reason a Dispute proceeds in court: (i) Business and
            Fyndr agree that any such Dispute may only be instituted in a state
            or federal court in Maricopa County, Arizona; (ii) Business and
            Fyndr irrevocably consent and submit to the exclusive personal
            jurisdiction and venue of such courts for resolution of such
            Disputes; (iii) Business and Fyndr agree that the Federal
            Arbitration Act, the AAA rules, applicable federal law and the laws
            of the State of Arizona, without regard to principles of conflicts
            of law, will govern this Agreement and any Disputes; and (iv)
            BUSINESS AND FYNDR AGREE TO WAIVE ANY RIGHT TO A TRIAL BY JURY.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>
              Injunctive Relief/Attorneys&rsquo; Fees
            </strong>
          </li>

          <p className={`${textSize}`}>
            Notwithstanding anything to the contrary in this Agreement, either
            party may bring suit in court seeking an injunction or other
            equitable relief arising out of or relating to claims that the other
            party&rsquo;s conduct may cause the other irreparable injury.
          </p>
          <p className={`${textSize}`}>
            In the event Fyndr is the prevailing party in any Dispute, subject
            to any exceptions in this Section 12, Business shall pay to Fyndr
            all reasonable attorneys&rsquo; fees and costs incurred by Fyndr in
            connection with any Dispute.
          </p>
          <br />
          <li>
            <strong className={`${headingSize}`}>Other</strong>
          </li>
          <ol className={`${olStyle} ${textSize}`}>
            <li>
              <p>
                The parties are independent contractors. Nothing in this
                Agreement is to be construed to create a joint venture,
                partnership, franchise, or an agency relationship between the
                parties. Neither party has the authority, without the other
                party&rsquo;s prior written approval, to bind or commit the
                other in any way.
              </p>
            </li>
            <li>
              <p>
                This Agreement constitutes the entire agreement between the
                parties relating to its subject matter and supersedes all prior
                or contemporaneous oral or written agreements concerning such
                subject matter.
              </p>
            </li>
            <li>
              <p>
                Business is not authorized to transfer or assign its rights or
                obligations under this Agreement, whether by operation of law or
                otherwise, without Fyndr&rsquo;s prior written consent. Any
                waiver must be in writing and signed by an authorized signatory
                of Fyndr. Fyndr is authorized to transfer or assign this
                Agreement to a present or future affiliate or pursuant to a
                merger, consolidation, reorganization or sale of all or
                substantially all of the assets or business, or by operation of
                law, without notice to Business.
              </p>
            </li>
            <li>
              <p>
                If any provision of this Agreement should be held to be invalid
                or unenforceable, the validity and enforceability of the
                remaining provisions of this Agreement are not affected.
              </p>
            </li>
            <li>
              <p>
                EXCEPT AS EXPRESSLY STATED IN THIS AGREEMENT, NEITHER PARTY
                MAKES ANY REPRESENTATIONS OR WARRANTIES, EXPRESS NOR IMPLIED,
                INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTY OF
                BUSINESSABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
                NON-INFRINGEMENT. FYNDR DOES NOT WARRANT OR GUARANTEE THAT THE
                SERVICES OFFERED ON OR THROUGH THE WEBSITE WILL BE UNINTERRUPTED
                OR ERROR-FREE, THAT THE OFFERS ARE ERROR-FREE, OR THAT ANY
                BUSINESS OFFERING WILL RESULT IN ANY REVENUE OR PROFIT FOR
                BUSINESS.
              </p>
            </li>
          </ol>
        </ol>
      </div>
    </div>
  );
};

export default Agreement;

namespace eoscostarica {
    // CONTRACTS
    const char* rate_ricardian = R"(---
spec_version: 0.1.0
title: Rate a block producer
summary: The intent of the `{{ rate }}` action is to allow the `issuer` account to rate a blockproducer into five categories: Community, Development, Infraestructure, Transparency, Trustiness.
---)";

    const char* erase_ricardian = R"(---
spec_version: 0.1.0
title: Erase Block Producer Stats
summary: The intent of the `{{ erase }}` action is to provide a ways to clear all data related with a specific block producer.
---)";

    const char* wipe_ricardian = R"(---
spec_version: 0.1.0
title: Wipe all contract's tables
summary: The intent of the `{{ wipe }}` action is to provide a way to release the stored data within the contract.
---)";

    const char* rminactive_ricardian = R"(---
spec_version: 0.1.0
title: Erase innactive Block Producer
summary: The intent of the `{{ rminactive }}` action is to provide a method to purge stats related with inactive block producers.
---)";

    const char* rmrate_ricardian = R"(---
spec_version: 0.1.0
title: Remove a especific rate
summary: The intent of the `{{ rmrate }}` action is to remove a rate made from an especific account.
---)";

const char* migrate_ricardian = R"(---
spec_version: 0.1.0
title: Update the current logic to newest
summary: The intent of the `{{ migrate }}` action is to update the current logic to newest.
---)";


    // CLAUSES
    const char* datastorage_clause = R"(The rateproducer application values the security of personal data. We may process only minimal user data as much as it is necessary to maintain the rateproducer application running. We only receive and store any information you knowingly provide to us when you create an account, or fill using the app.)";

    const char* datausage_clause = R"(This smart contract will process user data to keep the rateproducer application running. Any of the information we collect from you may be used for these purposes:
- Create and manage user accounts.
- Run and operate the rateproducer application.)";

    const char* dataownership_clause = R"(The user of this smart contract verifies that the smart contract owns the data and that it can use the data in accordance with the terms defined in the Ricardian contract.
You can delete certain personal information you shared with the rateproducer application. When you delete personal information, we may maintain a copy of the unrevised personal information in our records for the duration necessary to comply with our obligations to our affiliates and partners, and for the purposes described below. If you would like to delete your personal information or permanently delete your account, you can do so on your account's profile page in the rateproducer application.
We will retain and use your personal information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements unless a more extended retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your personal information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, personal information shall be deleted.)";

    const char* datadistribution_clause = R"(The smart contract promises not actively to share or distribute the address data. The smart contract user understands that data stored in a multi-index table is not private and can be accessed by any user of the blockchain.
Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. Moreover, to keep rateproducer running, we must share necessary personal data such as your name with the authorized blood donation centers and sponsors. We do not store any information regarding your blood type, health conditions, or any other confidential information between you and the donation centers.)";

    const char* datafuture_clause = R"(The smart contract promises to only use the data following the terms defined in the Ricardian contract, now and at all future dates. You may exercise certain rights regarding your information processed by us. In particular, you have the right to do the following: (i) you have the right to withdraw consent where you have previously given your consent to the processing of your information; (ii) you have the right to object to the processing of your information if the processing is carried out on a legal basis other than consent; (iii) you have the right to learn if information is being processed by us, obtain disclosure regarding certain aspects of the processing and obtain a copy of the information undergoing processing; (iv) you have the right to verify the accuracy of your information and ask for it to be updated or corrected; (v) you have the right, under certain circumstances, to restrict the processing of your information, in which case, we will not process your information for any purpose other than storing it; (vi) you have the right, under certain circumstances, to obtain the erasure of your Personal Information from us; (vii) you have the right to receive your information in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that your information is processed by automated means and that the processing is based on your consent, on a contract you are part of or on pre-contractual obligations thereof.)";
}
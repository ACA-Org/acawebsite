const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

const urls = [
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/PastPresentFuture/Message_from_the_ED/ExecDirMessage_Home.aspx?hkey=e4f6a9c7-b0db-4a57-9ec2-c71fec093842",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/AboutUs_Home.aspx?hkey=0c9cb058-e3d5-4bb0-ba7c-be29f9b34380",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Executive_Office_Home.aspx?hkey=57c55c2c-bb11-4fa2-9c9e-f2a591124954",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/ContactUs.aspx?hkey=5582ef3d-4227-4809-a067-d40b38935f79",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Executive_Committee.aspx?hkey=4c649acc-56f4-41e9-a04f-47585e7f8064",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Executive_Committee.aspx?hkey=4c649acc-56f4-41e9-a04f-47585e7f8064",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Board_of_Governors.aspx?hkey=1c5ab7bd-977e-439c-a08d-6933821101f9",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Delegate_Assembly.aspx?hkey=3c0153b0-f9d0-4234-bc4e-a5e39ae95a12",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Committees.aspx?hkey=b62bf4c1-886a-417a-a8e0-5c9ddbfa02a9",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Dec.aspx?hkey=a975cbd5-9788-4705-9b39-fcb6ddc048e0",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/ACA_Awards.aspx?hkey=1a4a534a-d4e5-42b1-abef-4ab081fa75aa",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/ER_Cass_Award_Winners.aspx?hkey=822b9b69-99b0-42ef-a557-6b451f12a12a",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/CurrentER_Cass.aspx?hkey=65d1f121-7381-4224-9fe4-6d944fa810c8",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Code_of_Ethics.aspx?hkey=61577ed2-c0c3-4529-bc01-36a248f79eba",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Constitution_Bylaws.aspx?hkey=dd90a358-9118-436a-ad92-9fbe660ea6ce",
    "https://aca.org/Common/Uploaded%20files/ACA%20EXEC/2025_To Lead and To Serve_V2.pdf",
    "https://aca.org/ACA_Member/ACA/ACA_Member/AboutUs/Financial-Information.aspx?hkey=4631a80e-c5d7-4595-bb32-24252af1d249",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/ProfDev_Home.aspx?hkey=63ec1d58-23ba-43cc-bdd1-45803e5db79b",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/ProfDev_Home.aspx?hkey=18dbb083-b2f4-4737-8a22-3e04abffdb58",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/Course_Catalog.aspx?hkey=2db9eca6-3f2b-4480-a9c2-ca6c0e1ab238",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/Course_Catalog.aspx?hkey=b7057a42-98f2-482c-93a2-30f36afcbf84",
    "https://aca.org/ACA_Member/ACA/iCohere/SSO.aspx?hkey=026139bf-c740-4d86-9091-6b409beb5b07",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Certifications_Home.aspx?hkey=90e28de0-4b27-4056-bdb3-f3e74fbe11ff",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Benefits_of_Certification.aspx?hkey=a71d7aab-209d-44d4-b7ca-970e8be35a88",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Certification_Types_and_Levels.aspx?hkey=fea31a24-de20-4d94-a9e9-a48f25a4a210",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Acceptance_and_Examination.aspx?hkey=3dba4a35-3250-45c5-aba4-9cb7c28f3ec4",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Recertification.aspx?hkey=d4c1c4d7-232b-4aa1-89c9-571056480319",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Certification/Certification_Commission.aspx?hkey=723c142b-f505-4ac8-b395-0dee6e69a530",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/ProfDev_FAQ.aspx?hkey=e5cfaf3c-adc6-46e2-9160-6f17decf4d23",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/Face-to-Face_Training.aspx?hkey=867343f7-6898-4eb7-8ea2-24174569cc64",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/Earning_CE.aspx?hkey=34906ad0-adee-4eea-9afc-8b0dc32c0261",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Meetings/Meetings_Home.aspx?hkey=095d31c1-3ebd-4485-9ed6-b7685e702c48",
    "https://aca.org/ACA_Member/ACA/ACA_Member/ACA_OnTheLine/ACA_Conference/Event_Details.aspx?hkey=fc7eff77-9a67-4cfa-992c-8df429311468",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Meetings/Future_Conferences.aspx?hkey=b9b00b46-0d48-4ee3-bf22-37dc77c2d264",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Professional_Development/TrainingWorkshops_Home.aspx?hkey=86939205-deec-460a-a888-7b27823dc18d",
    "https://aca.org/common/Uploaded%20files/Professional%20Development/Workshop%20Proposal%20Application%20and%20Disclosure%20Form%20-%202025.pdf",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Advertising/Advertising_Opps.aspx?hkey=9181ed7a-1ff2-4392-a672-497efcbe2c32",
    "https://user-3imepyw.cld.bz/ACA-Program-Books",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_Home.aspx?hkey=a11e6bc4-4a96-4d51-b9ca-be9d195cdb7c",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_About.aspx?hkey=e9d55fc8-f10b-4222-ad99-f994031d2bec",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_HealthCertHome.aspx?hkey=01f369bf-1b2e-41ee-b075-490b07945dc5",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/Types_of_Certification.aspx?hkey=be28fd89-7d5f-479f-983a-ed89b29596e0",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_AccreditationHome.aspx?hkey=5b21416b-fee4-47fd-9eed-2597879e7076",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_CommitteeHomeUpdated.aspx?hkey=db1f7ef7-469c-4b13-8c34-539336b2a490",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_Services.aspx?hkey=1a312b5f-d8dc-490f-8554-6e6433be071f",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_ResourceLibraryHome.aspx?hkey=aeafde06-e773-40d9-a510-e2e3dca7636b",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/International_home.aspx?hkey=b21f4f75-04f6-443c-9bb1-8de6b1f62e95",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Outreach.aspx?hkey=3f84cbf6-9bad-4456-90b4-9c5f2b4be038",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Training.aspx?hkey=633a9f4a-97a4-4e56-826d-4dcdc1feaf05",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Standards.aspx?hkey=31b86a29-ae0e-46d1-a9f9-9ea9fabe856a",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_InternProgram.aspx?hkey=d716fb10-ca1d-4795-a103-ffd6c3200489",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Scholarship.aspx?hkey=a8e9bd50-4061-4c38-bfc7-74c8718082b9",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_HCP.aspx?hkey=9f56b587-93a5-43ad-81a5-fbc70d12fbee",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Committee.aspx?hkey=428796b3-ad63-43ea-96d1-6c3fcb09db8b",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Intl/Intl_Partners.aspx?hkey=d048fc77-cb8f-4dc7-b9bf-a465f19f84f5",
    "https://american-correctional-association.org/",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Membership/Chapters_Affiliates_Home.aspx?hkey=2910ae77-207b-4b2e-839e-74ef05e47d80",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Membership/Dual_Membership_Chapters.aspx?hkey=8410de05-1851-466a-849b-e5d5f999f6ee",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Membership/Affiliate_with_Representation.aspx?hkey=59e3bc53-631b-42b1-a950-800b7fbc2eca",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Membership/General_Affiliate.aspx?hkey=25839d84-0eea-4d66-9ed2-90343b6baa33",
    "https://american-correctional-association.org/",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Membership/JoinACA.aspx?hkey=c4985357-f5ea-41dc-9212-ebb1950bda15",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/Publications_Home.aspx?hkey=1f9d46f1-6cc1-42ec-bc4c-b492329739a5",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/Publishing_with_ACA.aspx?hkey=2c34f2d6-2493-4b1d-9525-777801977faf",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/CT_Magazine/CorrectionsToday_Home.aspx?hkey=08c84ce7-094c-4ae8-836d-d43cd22c656f",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/CT_Magazine/Access_CT_Digital_Edition.aspx?hkey=e2ce4b7e-9921-4f29-bc20-b6c6b278c018",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/CT_Magazine/CorrTodayArchives_Home.aspx?hkey=8c9a4545-0761-4f04-92c7-924e34723b34",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/CT_Magazine/CT_SubmissionGuidelines_home.aspx?hkey=602f94ad-5f22-4cab-b56c-e3cdc56e39e2",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/Publishing_FAQs.aspx?hkey=76f7dbf8-983e-4c3c-b5e0-f73f366bef69",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Advertising/Advertising_Opps.aspx?hkey=694b49dd-c4b1-4da6-a822-b2ca1eb9d893",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/Newsletters/Newsletters.aspx?hkey=1c4641e2-126d-4344-aa9a-5b84e0cf9fa4",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Publications/Newsletters/Art_on_Leadership.aspx?hkey=ba86d0eb-6260-4224-8c43-793917f68938",
    "https://aca.org/ACA_Member/ACA/ACA_Member/ACA_Resources.aspx?hkey=caacfc0e-e00f-454a-b61e-d95df6b0a80f",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_ResourceLibraryHome.aspx?hkey=6e0f7ed7-c302-4679-9dc6-013fc2b62810",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Healthcare_Professional_Interest_Section/HC_StandardManuals.aspx?hkey=a4a4b7e4-a7f2-4110-b53f-e7764da4e456",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Advertising/Advertising_Opps.aspx?hkey=595598ba-8950-40ab-b7c0-c6727fd7a717",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Videos/Videos_Home2.aspx?hkey=c2668997-3e9d-47ad-9bf7-51cd7f2a9fd7",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Job_Bank/JobBank_Home.aspx?hkey=44314df9-442c-43f6-9742-8bc735fedbe4",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Govt_Public_Affairs/Legislative-Affairs-Resources.aspx?hkey=eee84372-555a-43d4-9e1f-55e5604ec1a0",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC.aspx?hkey=7f4cf7bf-2b27-4a6b-b124-36e5bd90b93d",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_AboutUs.aspx?hkey=bdf577fe-be9e-4c22-aa60-dc30dfa3adcb",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_AreaResponsibility.aspx?hkey=734b2d06-32c2-463f-831d-1588511f4ddd",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_Commission.aspx?hkey=90da0502-afd8-4685-97c2-b8c7e1c803d3",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/Standards__FAQ.aspx?hkey=b1dbaa4b-91ef-4922-8e7d-281f012963ce",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/StandardsInfo_Home.aspx?hkey=7c1b31e5-95cf-4bde-b400-8b5bb32a2bad",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/Standards_Committee/Standards_Committee.aspx?hkey=795105de-6a67-4769-b58a-0de6df7e8324",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/Seeking_Accreditation_Home.aspx?hkey=ed52ffa0-24e4-4575-9242-1aa9d7107e69",
    "https://aca.org/common/Uploaded files/Standards/Accreditation Manual - Aug 2020 Final.pdf",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/PREA.aspx?hkey=ee5ec9aa-50aa-4608-8d0e-310545aabcb2",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_AuditorsHome.aspx?hkey=8823f5b6-2454-4c78-a7ba-aefea296da83",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_AccFacHome.aspx?hkey=f53cf206-2285-490e-98b7-66b5ecf4927a",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/SAC_AwardsHome.aspx?hkey=45c3986c-5c98-4b6d-b554-ea7510698c72",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Standards_and_Accreditation/Forms.aspx?hkey=03c91e8b-99b6-46e0-8ae1-ac9fc90c3f80",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Marketplace_Home.aspx?hkey=df2d7d47-139e-4c9f-b636-1ad5023a9aef",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Marketplace_Home.aspx?hkey=d5cc5c1b-4c7f-4da4-8a61-d198928e2fdd",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/ACA_Store_Books.aspx?hkey=f4a66106-a53b-404e-9e47-f5bf88e77e1b",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Resale_Books.aspx?hkey=6209c7c4-e309-4ac1-ab67-4a6416c5b94e",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/E-Learning.aspx?hkey=dd6cff04-3536-4798-8c81-5761e2fa09e8",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Certification Packets.aspx?hkey=9d1e0f0e-b4b9-4287-ad4a-5003ac4833d3",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Subscriptions.aspx?hkey=96fa3cfb-c877-4ca6-bdcd-166c54082412",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/Standards_Merchandise.aspx?hkey=dafe5b44-2c3b-4d06-80e2-1c8bf1b84831",
    "https://aca.org/ACA_Member/ACA/ACA_Member/Marketplace/ACA_Store_Videos.aspx?hkey=8535e27b-7ef0-4125-b380-18fe4c780f17",
    "http://correctionsmarketplace.com/"
];

async function fetchAndSave(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const text = $('.ContentItemContainer').textContent().trim();

        const urlObj = new URL(url);
        const pathname = urlObj.pathname.replace(/^\//, '').replace(/[\/\\?%*:|"<>]/g, '-');
        const filename = pathname || 'index';
        const filePath = path.join(__dirname, 'content', `${filename}.txt`);

        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(filePath, text || '[No content found]', 'utf8');

        console.log(`Saved content from ${url} to ${filePath}`);
    } catch (err) {
        console.error(`Failed to process ${url}: ${err.message}`);
    }
}

(async () => {
    await Promise.all(urls.map(fetchAndSave));
})();

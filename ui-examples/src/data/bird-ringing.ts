import {
    Actor,
    Sex,
    ReportStatus,
    LicenseStatus,
    License,
    LicenseRelation,
    LicenseDocument,
    Species,
    LicenseRole,
} from "../app/bird-ringing/common";
import { RandomContext, DataGenerator } from "./common";

function getMoonData(): DataSource {
    const groupNames = [
        "Skywatchers",
        "Avians",
        "Flockkeepers",
        "Featherguard",
        "Wingwatch",
        "Flight Observers",
        "Bird Sentinels",
        "OrnithoGuard",
        "Feathered Alliance",
        "Flightwatch",
        "Avian Collective",
        "Flock Surveyors",
        "Birdwatch Corps",
        "Feathered Network",
        "Winged Custodians",
        "Ornithology Unit",
        "Flight Monitors",
        "Avian Researchers",
        "Flock Oversight",
        "Feathered Observers"
    ]

    const maleNames = [
        "Aren",
        "Lyra",
        "Kael",
        "Sora",
        "Minae",
        "Tovan",
        "Rika",
        "Eshan",
        "Nova",
        "Kiro",
        "Alyen",
        "Tsera",
        "Vian",
        "Olek",
        "Nami",
        "Ralen",
        "Issa",
        "Junor",
        "Zaiya",
        "Thane",
        "Liora",
        "Kaden",
        "Amira",
        "Nilo",
        "Saren",
        "Tayo",
        "Orin",
        "Velin",
        "Mirae",
        "Kova",
        "Elior",
        "Zhen",
        "Luma",
        "Rion",
        "Tahlia",
        "Oryn",
        "Meira",
        "Kalen",
        "Sivra",
        "Darek",
        "Inari",
        "Vexa",
        "Rami",
        "Kaia",
        "Noen",
        "Tirra",
        "Lior",
        "Asen",
        "Nyra",
        "Kian"
    ]

    const femaleNames = [
        "Lyra",
        "Mirae",
        "Nova",
        "Aelina",
        "Sora",
        "Tahlia",
        "Rika",
        "Zaiya",
        "Liora",
        "Amira",
        "Nyra",
        "Kaela",
        "Elara",
        "Vexa",
        "Selene",
        "Inari",
        "Meira",
        "Oriana",
        "Junia",
        "Alyen",
        "Thalira",
        "Kiona",
        "Soraya",
        "Velina",
        "Tsera",
        "Nami",
        "Riona",
        "Isara",
        "Lunara",
        "Ysera",
        "Arieth",
        "Celara",
        "Zhenna",
        "Mirella",
        "Kaiana",
        "Vionna",
        "Talira",
        "Olyra",
        "Elyra",
        "Sivra",
        "Arinya",
        "Naira",
        "Kalea",
        "Delyra",
        "Rashia",
        "Luneth",
        "Tayana",
        "Alora",
        "Zalina",
        "Ishara"
    ]

    const familyNames = [
        "Solane",
        "Va'Solane",
        "Takura",
        "Von'Takura",
        "Vennar",
        "De'Vennar",
        "Orashi",
        "Kovalen",
        "Al'Kovalen",
        "Mirek",
        "Sa'Mirek",
        "Dashara",
        "Valenor",
        "Va'Valenor",
        "Ramiq",
        "Nairen",
        "De'Nairen",
        "Aldarion",
        "Chenra",
        "Vosin",
        "Ilanor",
        "Von'Ilanor",
        "Zurek",
        "Omariq",
        "Talvaren",
        "Kashir",
        "Devarn",
        "Morien",
        "Al'Morien",
        "Azuraeth",
        "Fenric",
        "Katoz",
        "Ishen",
        "Vorali",
        "Navesh",
        "Arvonn",
        "Va'Arvonn",
        "Tesira",
        "Yunai",
        "Darvek",
        "Sorayaen",
        "Khelan",
        "Tovanic",
        "Rishad",
        "Lunareth",
        "Omvek",
        "Selan",
        "Varu",
        "Demei",
        "Trasken",
        "Eloran",
        "Al'Eloran",
        "Mavari",
        "Sorek",
        "Yalun",
        "Pavren",
        "Thalor",
        "Va'Thalor",
        "Nashiq",
        "Kalvi",
        "Rendar",
        "Dustfield",
        "Stonevault",
        "Lightgrove",
        "Glassbrook",
        "Hillshade",
        "Ashwell",
        "Starford",
        "Grayridge",
        "Moonstead",
        "Leafmere",
        "Frostvale",
        "Sunhollow",
        "Brightfell",
        "Rocklund",
        "Glowstead",
        "Shadewood",
        "Skyfen",
        "Fieldcrest",
        "Lumenhill",
        "Valeheart",
        "Domehaven",
        "Ridgeglass",
        "Claymere",
        "Starfen",
        "Ashridge",
        "Dawnvale",
        "Lightholm",
        "Stonehaven",
        "Glowfield",
        "Dustholm",
        "Moonridge",
        "Silvershade",
        "Wynfield",
        "Clearbrook",
        "Ironvale",
        "Softfell",
        "Starhollow",
        "Grayvale",
        "Brightholm",
        "Frostwell"
    ]

    const licenseStatuses: LicenseStatus[] = [
        "Active",
        "Not active",
        "Discontinued"
    ]

    const reportStatuses: ReportStatus[] = [
        "Yes",
        "No",
        "Incomplete",
    ]

    const emailStatus = [
        "Sent",
        "Not sent",
        "Bounced",
        "Pending"
    ]

    const descriptions = [
        "population monitoring",
        "migration pattern tracking",
        "health assessment",
        "juvenile development study",
        "nesting site documentation",
        "habitat impact observation",
        "behavioral pattern analysis",
        "diet and foraging survey",
        "species distribution mapping",
        "flight adaptation research",
        "environmental stress evaluation",
        "biosphere stability monitoring",
        "subspecies differentiation study",
        "genetic diversity sampling",
        "breeding success assessment",
        "post-release recovery observation",
        "disease and parasite screening",
        "tag integrity inspection",
        "long-term data archiving",
        "avian rescue and rehabilitation support",
        "invasive interaction tracking",
        "climate cycle correlation study",
        "artificial-gravity adaptation research",
        "light-cycle influence assessment",
        "avian acoustics monitoring",
        "nocturnal activity study",
        "territorial behavior observation",
        "ring recovery and verification",
        "training and mentorship of novice ringers",
        "collaboration with inter-city ecological projects"
    ]

    const permissionTypes = [
        "Using a mist net",
        "Setting a cage trap",
        "Using a drop net",
        "Setting a baited trap",
        "Using a clap net",
        "Using a funnel trap",
        "Catching by hand",
        "Using a snare loop",
        "Setting a ground net",
        "Using a decoy bird and trap",
        "Using a bird lime branch",
        "Luring with food bait",
        "Using a throw net",
        "Trapping in a box trap",
        "Using a noose carpet",
        "Using a rocket net",
        "Capturing at night with a flashlight",
        "Using a hand net",
        "Trapping in a misted area with nets",
        "Using a spring-loaded trap"
    ]

    const lunarRegions = {
        "Selena Prime": [
            "Tranquilum District",
            "Helios Quarter",
            "Mare Vista",
            "Lunaport Core",
            "Aurora Heights",
            "Regolith Belt",
            "Cis-Lunar Gardens",
            "Nova Spires",
            "Crater Edge",
            "Orbital Nexus"
        ],
        "Artemis Station": [
            "Horizon Ring",
            "Vallis Sector",
            "Selenic Market",
            "Eclipse District",
            "Ionspire Heights",
            "Rill Flats",
            "Photon Arc",
            "Tether Ward",
            "Celestium Hub",
            "Lunarforge District"
        ],
        "Mare Citadel": [
            "Obscura Plaza",
            "Stellar Park",
            "Zenith Heights",
            "Craton Core",
            "Ironveil Sector",
            "Lumen Quarter",
            "Hollows Edge",
            "Plasma Terrace",
            "Regent Docks",
            "Nova Promenade"
        ],
        "Tycho Haven": [
            "Crater Ring",
            "Tycho Plateau",
            "Lunar Spires",
            "Vortex Ward",
            "Helium Heights",
            "Dustfall Quarter",
            "Orbital Exchange",
            "Radiant Belt",
            "Echo Terrace",
            "Ion Horizon"
        ]
    }

    const regionNames = Object.values(lunarRegions).flat()

    const regionDescriptors = [
        "In",
        "Around",
        "Near",
        "North of",
        "South of",
        "East of",
        "West of",
        "In central",
        "In northern",
        "In southern",
        "In eastern",
        "In western",
        "On the coast of",
        "Outside",
        "Just outside",
        "Within",
        "Close to",
        "By",
        "Across",
        "Beyond",
        "Inside",
        "At the edge of",
        "In the region of",
        "In greater",
        "In metropolitan",
        "In rural",
        "In downtown",
        "In the suburbs of",
        "In the outskirts of",
        "In old",
        "Near central",
        "Close by",
        "In upper",
        "In lower",
        "Just beyond",
        "Right outside",
        "At the heart of",
        "Along the coast of",
        "High above",
        "Deep within"
    ]

    const speciesSignifiers = [
        { "signifier": "Pale", "code": "PLAE", "epithet": "pallida" },
        { "signifier": "Cinder", "code": "CNDR", "epithet": "cineraria" },
        { "signifier": "Polar", "code": "PLAR", "epithet": "polaris" },
        { "signifier": "Solar", "code": "SLAR", "epithet": "solara" },
        { "signifier": "Dusk", "code": "DSKQ", "epithet": "crepuscula" },
        { "signifier": "Radiant", "code": "RDNT", "epithet": "radiosa" },
        { "signifier": "Echo", "code": "ECHO", "epithet": "resonata" },
        { "signifier": "Crystal", "code": "CRYS", "epithet": "crystallina" },
        { "signifier": "Void", "code": "VOID", "epithet": "vacua" },
        { "signifier": "Luminescent", "code": "LMNS", "epithet": "lumina" },
        { "signifier": "Ashen", "code": "ASHN", "epithet": "cinerea" },
        { "signifier": "Lowlight", "code": "LWLT", "epithet": "obscura" },
        { "signifier": "Highdome", "code": "HGDM", "epithet": "altidoma" },
        { "signifier": "Chroma", "code": "CHRM", "epithet": "chromata" },
        { "signifier": "Glacial", "code": "GLCL", "epithet": "glacialis" },
        { "signifier": "Ecliptic", "code": "ECLP", "epithet": "ecliptica" },
        { "signifier": "Hollow", "code": "HLLO", "epithet": "cavata" },
        { "signifier": "Vapor", "code": "VAPR", "epithet": "vaporis" },
        { "signifier": "Dustborne", "code": "DSTB", "epithet": "pulverata" },
        { "signifier": "Silica", "code": "SLIC", "epithet": "silicata" }
    ]

    const species = [
        { "name": "Lunathrush", "code": "LNTH", "scientific": "Avius lunathrusia" },
        { "name": "Skylume", "code": "SKLM", "scientific": "Caelornis luminis" },
        { "name": "Dustjay", "code": "DSTJ", "scientific": "Paracorvus pulveris" },
        { "name": "Orbiter", "code": "ORBT", "scientific": "Aethera orbitale" },
        { "name": "Moondove", "code": "MNDV", "scientific": "Columba lunara" },
        { "name": "Kestrelon", "code": "KSTL", "scientific": "Falco minoris" },
        { "name": "Regolark", "code": "RGLR", "scientific": "Alauda regolithica" },
        { "name": "Glowfinch", "code": "GLFN", "scientific": "Carduelis lucerna" },
        { "name": "Terralite", "code": "TRLT", "scientific": "Terravis luminata" },
        { "name": "Craterhawk", "code": "CRHK", "scientific": "Accipiter crateris" },
        { "name": "Nimbird", "code": "NMBR", "scientific": "Avis nimbalis" },
        { "name": "Aetherin", "code": "AETR", "scientific": "Aetherornis tenuis" },
        { "name": "Echowl", "code": "ECHW", "scientific": "Strix resonata" },
        { "name": "Spiremag", "code": "SPMG", "scientific": "Pica spiralis" },
        { "name": "Novarook", "code": "NVRK", "scientific": "Corvus novaris" },
        { "name": "Lunegret", "code": "LNGR", "scientific": "Ardea lunaris" },
        { "name": "Vaultwing", "code": "VLWG", "scientific": "Alatus cavarum" },
        { "name": "Crestorn", "code": "CRST", "scientific": "Aves cristata" },
        { "name": "Plumetern", "code": "PLMT", "scientific": "Sterna plumatica" },
        { "name": "Hollowswift", "code": "HLSW", "scientific": "Apus cavalis" }
    ]


    return {
        groupNames,
        maleNames,
        femaleNames,
        familyNames,
        regionNames,
        regionDescriptors,
        licenseStatuses,
        reportStatuses,
        emailStatus,
        descriptions,
        permissionTypes,
        speciesSignifiers,
        species,
    }
}

function getRandomBase() {
    return [
        0.20741536188545795,
        0.5595905346455882,
        0.5822218369641013,
        0.9607082331278506,
        0.988923190041827,
        0.08617541076997659,
        0.19437241850999099,
        0.8857463787361463,
        0.5735442180292741,
        0.5629622457552047,
        0.6749161174037619,
        0.04253038928720565,
        0.8203370297026712,
        0.3442504206886069,
        0.5329937605375283,
        0.7906205285274828,
        0.51200640321653,
        0.7065968006911221,
        0.7489723578925022,
        0.034244245879893165,
        0.7692082090854805,
        0.5239969443978556,
        0.8023445379110216,
        0.44079209634104755,
        0.7753118865334327,
        0.699755448534883,
        0.9063308208895936,
        0.780038586595407,
        0.27815533111262614,
        0.41046017718094496,
        0.2579574975367256,
        0.8031262415862557,
        0.17758901562403662,
        0.5500287798202025,
        0.8271381027437187,
        0.63340918806205,
        0.4387209815334906,
        8.509139405643573e-05,
        0.6082629587219214,
        0.314998024979501,
        0.5113842523248547,
        0.2523708143955523,
        0.6002243990555153,
        0.9921166427848298,
        0.26057816811206125,
        0.4892806774891787,
        0.03589868466651147,
        0.9481902671401347,
        0.5012236584616327,
        0.5545584642204787,
        0.2427087946791916,
        0.8259342105343978,
        0.5355256338593831,
        0.22475105526383254,
        0.47757031272612926,
        0.78192456640082,
        0.8193602759218039,
        0.8227029709316296,
        0.44957587121350784,
        0.18650387970484772,
        0.7371422447530421,
        0.7887044154689847,
        0.018889027984426376,
        0.3725372766929844,
        0.11173252968580438,
        0.22670169205212665,
        0.5745646272499968,
        0.10105143329999933,
        0.3931584261663338,
        0.20023506512992806,
        0.7285594280143806,
        0.9691471928872945,
        0.26859678975171153,
        0.13971648298857897,
        0.19855098329087628,
        0.7681374094906529,
        0.6856007893697239,
        0.7212030897430686,
        0.23245671592500505,
        0.2585606314691581,
        0.5394205734545345,
        0.5168072848584171,
        0.4735808727019548,
        0.1542199278769567,
        0.24459930971246158,
        0.5645688355884114,
        0.23788873712064218,
        0.786081022022729,
        0.4502078844740294,
        0.7583687733114177,
        0.45886093767219505,
        0.8543319686344898,
        0.283994216177868,
        0.06422434218123507,
        0.5358769255419847,
        0.9689469158344516,
        0.5811674377741632,
        0.41781685969538074,
        0.6492884908596273,
        0.739645354269751,
        0.3693592039085133,
        0.36894590317986065,
        0.5376425880782874,
        0.8959713871710437,
        0.5879782351921025,
        0.16198694090355148,
        0.689981840863459,
        0.4381933584993595,
        0.1379555701738321,
        0.6935700517298559,
        0.41461082599644083,
        0.19035373671670675,
        0.26164833927299047,
        0.9416448819185237,
        0.09130113476431834,
        0.3881566562560054,
        0.12781021305336793,
        0.25165383208524406,
        0.26601171478839936,
        0.5509843924848055,
        0.8090584119066632,
        0.9259147576448695,
        0.745725918131591,
        0.13371758195673056,
        0.8814884378947127,
        0.8081881045133364,
        0.1703589633512852,
        0.9939786814681933,
        0.8593365717055447,
        0.16676256890352936,
        0.38801288129931777,
        0.41191462592484807,
        0.5340079914515017,
        0.4463427315940137,
        0.9102923946216244,
        0.7569715153088313,
        0.2120772281657638,
        0.35925040205709646,
        0.7685124907460122,
        0.16004688813832768,
        0.5634769466691206,
        0.10111688024594867,
        0.3859461256620642,
        0.4365338362319461,
        0.5781769775007564,
        0.8383514533254927,
        0.10383571364911814,
        0.4673641582127316,
        0.5143644618593578,
        0.6191551197133388,
        0.8806205178734222,
        0.5431225914979484,
        0.3473997271336944,
        0.507192079429329,
        0.04743441342840937,
        0.9628267993239629,
        0.1895046731996909,
        0.5428921565905915,
        0.6743513610925461,
        0.9336034816051083,
        0.3787433855788793,
        0.3341367108086436,
        0.9598521097802601,
        0.14080029378617787,
        0.6875800261490201,
        0.27757280986454347,
        0.5636051351443895,
        0.6306223857355687,
        0.9746903146181461,
        0.7176476330469176,
        0.9030164698291603,
        0.2711063152320423,
        0.6667771300476342,
        0.6641328340214794,
        0.47526051974730044,
        0.6605971653249391,
        0.7866982459287343,
        0.12759246492657417,
        0.3647539973102426,
        0.5066474052514958,
        0.7710904283197727,
        0.16029283083058565,
        0.4773243020617205,
        0.7514289506462295,
        0.933978455210589,
        0.923993195491914,
        0.5362868075138074,
        0.7350119782755414,
        0.4128363578982427,
        0.6423013432572464,
        0.6307260764500369,
        0.25388660409104946,
        0.6489117017482,
        0.7559026540049175,
        0.3267669103986389,
        0.3785337736776052,
        0.11776950394952412,
        0.3460047133660824,
        0.7465711243467702,
        0.645382053378751
    ]
}

type DataSource = {
    groupNames: string[];
    maleNames: string[];
    femaleNames: string[];
    familyNames: string[];
    regionNames: string[];
    regionDescriptors: string[];
    licenseStatuses: LicenseStatus[];
    reportStatuses: ReportStatus[];
    emailStatus: string[];
    descriptions: string[];
    permissionTypes: string[];
    speciesSignifiers: {signifier: string, code: string, epithet: string}[];
    species: {name: string, code: string, scientific: string}[];
}

export class BirdRingingDataGenerator implements DataGenerator<{
    actors: Record<string, Actor>,
    licenses: Record<string, License>,
    documents: Record<string, LicenseDocument>,
    species: Record<string, Species>,
}> {
    randomContext: RandomContext;
    period: [Date, Date];
    maxLicenseLength: number;
    dataSource: DataSource;
    constructor(randomContext: RandomContext, dataSource: DataSource, period: [Date, Date], maxLicenseLength: number) {
        this.randomContext = randomContext;
        this.dataSource = dataSource;
        this.period = period;
        this.maxLicenseLength = maxLicenseLength;
    }

    createActors(numberOfActors: number, numberOfOrganizations: number): Record<string, Actor> {
        const fixedRandom = this.randomContext;
        const period = this.period;
        const groupNames = this.dataSource.groupNames;
        const maleNames = this.dataSource.maleNames;
        const femaleNames = this.dataSource.femaleNames;
        const regionNames = this.dataSource.regionNames;
        const familyNames = this.dataSource.familyNames;
        const emailStatus = this.dataSource.emailStatus;
        return (Array.from({length: numberOfActors})).map<Actor>((_, index) => {
            const isOrganization = index < numberOfOrganizations;
            fixedRandom.seed(index)
            const isMale = fixedRandom.randbool();
            const declareSex = fixedRandom.randbool();
            const updatedAt = fixedRandom.randdate(...period);
            const givenNames = isMale ? maleNames : femaleNames;
            const name = isOrganization ? `${fixedRandom.choice(groupNames)} ${fixedRandom.choice(regionNames)}` : `${fixedRandom.choice(givenNames)} ${fixedRandom.choice(familyNames)}`;
            const email = isOrganization ? `contact@${name.toLowerCase().replaceAll(" ", "-")}.example.edu` : `${name.toLowerCase().replaceAll(/(\s+|')/g, ".")}@example.edu`;
            const sex: Sex = isOrganization ? "N/A" : (
                declareSex ? (isMale ? "Male" : "Female") : "Undisclosed"
            )
            const id: string = `actor-${index}`;
            return {
                id,
                name,
                email,
                sex,
                type: isOrganization ? "Organization" : "Person",
                emailStatus: fixedRandom.choice(emailStatus),
                emailSentAt: updatedAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
                city: fixedRandom.choice(this.dataSource.regionNames),
                birtDate: fixedRandom.randdate(...period)
            }
        }).reduce<Record<string, Actor>>((acc, actor) => {
            acc[actor.id] = actor;
            return acc;
        }, {})
    }

    createLicenses(actors: Record<string, Actor>, numberOfLicenses: number) {
        const fixedRandom = this.randomContext;
        const period = this.period;
        const maxLicenseLength = this.maxLicenseLength;
        const {
            regionNames,
            regionDescriptors,
            emailStatus,
            permissionTypes,
            descriptions,
            licenseStatuses,
            reportStatuses,
        } = this.dataSource;
        const organizationActors = Object.entries(actors).reduce<Record<string, Actor>>((acc, [key, value]) => {
            if (value.type === "Organization") acc[key] = value;
            return acc;
        }, {});
        const personActors = Object.entries(actors).reduce<Record<string, Actor>>((acc, [key, value]) => {
            if (value.type === "Person") acc[key] = value;
            return acc;
        }, {});
        const ringerIds = [
            ...fixedRandom.choices(Object.keys(personActors), numberOfLicenses - Object.keys(organizationActors).length),
            ...Object.keys(organizationActors)
        ];
        const helperIds = Object.keys(personActors);
        const helperVariants: LicenseRole[] = [
            "Helper",
            "Associate",
            "Communication"
        ]
        return (Array.from({length: numberOfLicenses}).map<License>((_, index) => {
            const mnr: string = `${String(index).padStart(4, '0')}`;
            const ringerId = ringerIds[index % ringerIds.length]
            const [createdAt, updatedAt] = fixedRandom.randdaterange(...period);
            const [startsAt, expiresAt] = fixedRandom.randdaterange(...period, maxLicenseLength);
            const helpers = fixedRandom.choices(helperIds.filter(id => id !== ringerId), fixedRandom.randint(2, 5)).map<LicenseRelation>((actorId, index, list) => {
                const isActive = index > 0.5 * list.length
                return {
                    role: fixedRandom.choice(helperVariants),
                    mednr: `${String(index).padStart(4, '0')}`,
                    actor: {id: actorId, type: "actor"},
                    licenseSentAt: createdAt.toISOString(),
                    licenseSentStatus: fixedRandom.choice(emailStatus),
                    status: isActive ? "Active" : "Inactive",
                }
            });
            const ringer: LicenseRelation = {
                role: "Ringer",
                actor: {id: ringerId, type: "actor"},
                licenseSentAt: createdAt.toISOString(),
                licenseSentStatus: fixedRandom.choice(emailStatus),
                status: "Active",
            }
            const id: string = `license-${index}`;
            return {
                id,
                mnr,
                actor: {id: ringerId, type: "actor"},
                createdAt: createdAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
                expiresAt: expiresAt.toISOString(),
                startsAt: startsAt.toISOString(),
                permissions: fixedRandom.choices(permissionTypes, 5),
                description: "Within this license the actors will perform:\n" + fixedRandom.choices(descriptions, fixedRandom.randint(1, 3)).map(d => `- ${d}`).join("\n"),
                status: fixedRandom.choice(licenseStatuses),
                region: `${fixedRandom.choice(regionDescriptors)} ${fixedRandom.choice(regionNames)}`,
                actors: [
                    ringer,
                    ...helpers
                ],
                reportStatus: fixedRandom.choice(reportStatuses),
            }
        })).reduce<Record<string, License>>((acc, license) => {
            acc[license.id] = license;
            return acc;
        }, {});
    }

    createDocuments(licenses: Record<string, License>): Record<string, LicenseDocument> {
        return Object.values(licenses).flatMap(l => l.actors.map<[License, LicenseRelation]>(r => [l, r])).map<LicenseDocument>(([license, relation], index) => {
            const id: string = `document-${index}`;
            return {
                id,
                actor: relation.actor,
                license: {id: license.id, type: "license"},
                type: "license",
                href: "/mock-license.pdf",
                createdAt: license.createdAt,
            }
        }).reduce<Record<string, LicenseDocument>>((acc, doc) => {
            acc[doc.id] = doc;
            return acc;
        }, {});
    }

    createSpecies(numberOfSpecies: number): Record<string, Species> {
        const fixedRandom = this.randomContext;
        const {speciesSignifiers, species} = this.dataSource
        return Array.from({length: numberOfSpecies}).map<Species>((_, index) => {
            const id: string = `species-${index}`;
            const speciesBase = fixedRandom.choice(species);
            const signifier = fixedRandom.choice(speciesSignifiers);
            return {
                id,
                name: `${signifier.signifier} ${speciesBase.name}`,
                scientificCode: `${signifier.code}-${speciesBase.code}`,
                scientificName: `${speciesBase.scientific} ${signifier.epithet}`,
            }
        }).reduce<Record<string, Species>>((acc, s) => {
            acc[s.id] = s;
            return acc;
        }, {});
    }

    createData() {
        const actors = this.createActors(200, 30);
        const licenses = this.createLicenses(actors, 100);
        const documents = this.createDocuments(licenses);
        const species = this.createSpecies(50);
        return {
            actors,
            licenses,
            documents,
            species,
        }
    }
}

export function getFixedRandom() {
    return new RandomContext(getRandomBase())
}

export function getGenerator() {
    return new BirdRingingDataGenerator(
        getFixedRandom(),
        getMoonData(),
        [new Date("2020-01-01T00:00:00.000Z"), new Date("2025-01-01T00:00:00.000Z")],
        new Date("2020-06-01T00:00:00.000Z").getTime() - new Date("2020-01-01T00:00:00.000Z").getTime(),
    )
}
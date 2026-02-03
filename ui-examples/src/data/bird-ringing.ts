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

    const permissionTypeBase = [
        { "id": "capture-and-physical-restraint", "name": "Capture and Physical Restraint", "description": "Authorizes the intentional interruption of a bird’s freedom of movement through capture, holding, or physical restraint. Covers direct handling that may stress, injure, or alter natural behavior." },
        { "id": "temporary-displacement-or-relocation", "name": "Temporary Displacement or Relocation", "description": "Permits moving birds from their usual territory or dome habitat, temporarily or permanently, with or without human assistance." },
        { "id": "nest-access-and-modification", "name": "Nest Access and Modification", "description": "Covers direct interaction with nests, including entry, alteration, or temporary removal, potentially affecting parental care or nest integrity." },
        { "id": "egg-and-hatchling-handling", "name": "Egg and Hatchling Handling", "description": "Regulates direct interaction with eggs or dependent young, including relocation, handling, or incubation, recognizing this as a sensitive lifecycle stage." },
        { "id": "lifecycle-stage-interruption", "name": "Lifecycle Stage Interruption", "description": "Authorizes interference with time-sensitive phases like courtship, incubation, fledging, molt, or migration behaviors." },
        { "id": "artificial-marking-or-tagging", "name": "Artificial Marking or Tagging", "description": "Permits the attachment or implantation of identifiers that alter the bird’s physical state or appearance for tracking, identification, or data collection." },
        { "id": "biological-sample-extraction", "name": "Biological Sample Extraction", "description": "Covers removal of biological material from a living bird, including fluids, tissues, or feathers, for research or diagnostic purposes." },
        { "id": "induced-behavioral-response", "name": "Induced Behavioral Response", "description": "Authorizes intentional actions designed to provoke, alter, or condition avian behavior beyond natural environmental stimuli." },
        { "id": "alteration-of-flight-or-movement", "name": "Alteration of Flight or Movement", "description": "Permits interventions that restrict, redirect, enhance, or otherwise modify a bird’s locomotion within the biosphere." },
        { "id": "habitat-structure-disturbance", "name": "Habitat Structure Disturbance", "description": "Covers physical changes to the built or biological environment that may affect shelter, perching, feeding, or nesting opportunities." },
        { "id": "environmental-condition-manipulation", "name": "Environmental Condition Manipulation", "description": "Authorizes deliberate deviation from established environmental baselines such as temperature, humidity, or atmospheric composition within a habitat." },
        { "id": "light-and-circadian-cycle-interference", "name": "Light and Circadian Cycle Interference", "description": "Regulates changes to light exposure or timing that may disrupt natural circadian rhythms or seasonal biological cues." },
        { "id": "acoustic-or-signal-emission", "name": "Acoustic or Signal Emission", "description": "Permits the introduction of artificial sounds or signals that may influence avian communication, orientation, or stress responses." },
        { "id": "population-structure-intervention", "name": "Population Structure Intervention", "description": "Covers actions intended to influence demographic characteristics such as age distribution, sex ratios, or population density." },
        { "id": "genetic-lineage-influence", "name": "Genetic Lineage Influence", "description": "Authorizes interventions that affect heredity, reproductive pairing, or genetic outcomes across one or more generations." },
        { "id": "cross-habitat-transfer", "name": "Cross-Habitat Transfer", "description": "Permits movement of birds between distinct biospheres, domes, or controlled ecological zones." },
        { "id": "post-injury-or-post-illness-intervention", "name": "Post-Injury or Post-Illness Intervention", "description": "Covers medical, rehabilitative, or assisted recovery actions that delay or alter natural reintegration into the habitat." },
        { "id": "emergency-ecological-override", "name": "Emergency Ecological Override", "description": "Allows temporary suspension of standard protections in response to imminent ecological risk, system failure, or population collapse." },
        { "id": "restricted-species-interaction", "name": "Restricted Species Interaction", "description": "Applies to species designated as protected, experimental, or ecologically critical, requiring heightened authorization." },
        { "id": "extended-or-repeated-contact-authorization", "name": "Extended or Repeated Contact Authorization", "description": "Permits sustained or repeated interaction with the same individuals beyond standard contact thresholds." }
    ]

    const permissionProperties = [
        {
            "id": "manual-handling-required",
            "name": "manual handling required",
            "description": "The activity requires physically holding the bird with hands, directly controlling its movement.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "mechanical-restraint-permitted",
            "name": "mechanical restraint permitted",
            "description": "Use of devices such as nets, cages, or other mechanical methods to restrain birds is allowed.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "sedation-permitted",
            "name": "sedation permitted",
            "description": "Temporary pharmacological restraint is allowed to reduce stress or facilitate handling.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "handling-exceeds-standard-duration",
            "name": "handling exceeds standard duration",
            "description": "The bird may be held or manipulated for longer than baseline welfare guidelines suggest.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "repeat-capture-allowed",
            "name": "repeat capture allowed",
            "description": "The same individual may be captured multiple times for study or monitoring purposes.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "juveniles-included",
            "name": "juveniles included",
            "description": "Dependent young birds may be captured and handled under this permit.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "breeding-individuals-included",
            "name": "breeding individuals included",
            "description": "Adult birds engaged in mating, nesting, or incubation may be captured or handled.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "capture-during-active-flight",
            "name": "capture during active flight",
            "description": "Capture may occur while the bird is in motion, such as flying or hopping between perches.",
            "applies_to": ["capture-and-physical-restraint"]
        },
        {
            "id": "capture-during-rest-phase",
            "name": "capture during rest phase",
            "description": "Birds may be captured while resting, sleeping, or in low activity periods.",
            "applies_to": ["capture-and-physical-restraint"]
        },

        {
            "id": "displacement-beyond-home-range",
            "name": "displacement beyond home range",
            "description": "Birds may be moved outside their habitual territory or typical activity zone.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "relocation-between-habitat-zones",
            "name": "relocation between habitat zones",
            "description": "Transfer of birds between distinct habitat zones or ecological areas is permitted.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "return-to-origin-site-required",
            "name": "return to origin site required",
            "description": "Birds must be returned to their original capture site after displacement or relocation.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "human-assisted-transport-required",
            "name": "human-assisted transport required",
            "description": "Birds must be moved using human assistance rather than allowing them to move themselves.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "relocation-exceeds-one-circadian-cycle",
            "name": "relocation exceeds one circadian cycle",
            "description": "Birds may be displaced for longer than a single day-night cycle within the lunar habitat.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "group-displacement-permitted",
            "name": "group displacement permitted",
            "description": "Multiple birds may be moved together as a cohort rather than individually.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },
        {
            "id": "juveniles-subject-to-relocation",
            "name": "juveniles subject to relocation",
            "description": "Dependent young may be included in relocation or temporary displacement activities.",
            "applies_to": ["temporary-displacement-or-relocation"]
        },

        {
            "id": "physical-nest-entry-required",
            "name": "physical nest entry required",
            "description": "Access inside the nest structure is necessary, potentially exposing eggs or chicks to disturbance.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "structural-alteration-permitted",
            "name": "structural alteration permitted",
            "description": "Modifications to the nest’s physical structure are allowed, including reinforcement or minor reshaping.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "temporary-nest-removal-allowed",
            "name": "temporary nest removal allowed",
            "description": "The nest may be temporarily removed from its location for inspection, study, or relocation.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "artificial-support-added",
            "name": "artificial support added",
            "description": "Non-native materials may be added to stabilize or reinforce the nest structure.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "parental-presence-disrupted",
            "name": "parental presence disrupted",
            "description": "Access may occur even if it temporarily deters parent birds from caring for the nest.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "access-during-incubation",
            "name": "access during incubation",
            "description": "Nests may be entered while eggs are being incubated, potentially affecting temperature or attendance.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "access-during-feeding-phase",
            "name": "access during feeding phase",
            "description": "Nests may be accessed while adults are feeding chicks, potentially disturbing feeding behavior.",
            "applies_to": ["nest-access-and-modification"]
        },
        {
            "id": "direct-egg-contact-permitted",
            "name": "direct egg contact permitted",
            "description": "Handling eggs directly by hand is allowed for study, relocation, or measurement purposes.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "egg-relocation-permitted",
            "name": "egg relocation permitted",
            "description": "Eggs may be moved to a different nest or controlled environment for monitoring or protection.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "hatchling-removal-permitted",
            "name": "hatchling removal permitted",
            "description": "Chicks may be temporarily removed from the nest for study, tagging, or health checks.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "artificial-incubation-involved",
            "name": "artificial incubation involved",
            "description": "Eggs may be placed in artificial incubation devices to ensure development outside natural conditions.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "handling-prior-to-imprinting",
            "name": "handling prior to imprinting",
            "description": "Chicks may be handled before species-specific imprinting occurs, affecting future behavioral responses.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "handling-after-imprinting",
            "name": "handling after imprinting",
            "description": "Chicks may be handled even after imprinting has begun, potentially affecting social or ecological behaviors.",
            "applies_to": ["egg-and-hatchling-handling"]
        },
        {
            "id": "clutch-size-modification-allowed",
            "name": "clutch size modification allowed",
            "description": "Adding or removing eggs from a nest is permitted under controlled study or management conditions.",
            "applies_to": ["egg-and-hatchling-handling"]
        },

        {
            "id": "interruption-during-courtship",
            "name": "interruption during courtship",
            "description": "Activities may interfere with mating displays or partner selection behaviors.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "interruption-during-incubation",
            "name": "interruption during incubation",
            "description": "Activities may affect birds while they are incubating eggs, potentially impacting development or survival.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "interruption-during-fledging",
            "name": "interruption during fledging",
            "description": "Interventions may affect chicks leaving the nest or developing flight capabilities.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "interruption-during-molt",
            "name": "interruption during molt",
            "description": "Activities may disrupt the natural feather replacement process, affecting flight, insulation, or display.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "interruption-during-migration-behavior",
            "name": "interruption during migration behavior",
            "description": "Birds may be disturbed while performing natural migratory movements, orientation, or stopover behavior.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "forced-phase-delay-permitted",
            "name": "forced phase delay permitted",
            "description": "Deliberate interventions may delay a lifecycle stage for research or management purposes.",
            "applies_to": ["lifecycle-stage-interruption"]
        },
        {
            "id": "external-tag-attached",
            "name": "external tag attached",
            "description": "An external identifier such as a band, ring, or flag is attached for tracking and identification.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "subcutaneous-implant-allowed",
            "name": "subcutaneous implant allowed",
            "description": "Subcutaneous or internal implants are permitted for identification, tracking, or physiological monitoring.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "temporary-marker-used",
            "name": "temporary marker used",
            "description": "Non-permanent markers can be applied for short-term identification purposes.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "permanent-marker-used",
            "name": "permanent marker used",
            "description": "Permanent markings can be applied for long-term identification and study.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "tag-weight-exceeds-baseline-threshold",
            "name": "tag weight exceeds baseline threshold",
            "description": "The attached tag or device may exceed recommended weight limits, potentially affecting behavior or flight.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "tag-removal-planned",
            "name": "tag removal planned",
            "description": "The marker is intended to be removed after the study or tracking period.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        {
            "id": "tag-removal-not-required",
            "name": "tag removal not required",
            "description": "Markers may remain permanently on the bird without removal after study completion.",
            "applies_to": ["artificial-marking-or-tagging"]
        },
        
        {
            "id": "blood-sampling-permitted",
            "name": "blood sampling permitted",
            "description": "Collection of blood is authorized for research or monitoring purposes.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "feather-sampling-permitted",
            "name": "feather sampling permitted",
            "description": "Feathers may be collected for genetic, hormonal, or health analysis.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "tissue-sampling-permitted",
            "name": "tissue sampling permitted",
            "description": "Small tissue samples may be taken for diagnostic or experimental purposes, avoiding lethal impact.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "non-lethal-extraction-only",
            "name": "non-lethal extraction only",
            "description": "All biological sampling must not cause death or permanent impairment of the bird.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "repeat-sampling-allowed",
            "name": "repeat sampling allowed",
            "description": "The same individual may be sampled multiple times across the study period.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "sampling-during-active-illness",
            "name": "sampling during active illness",
            "description": "Birds may be sampled even if exhibiting signs of illness, for health monitoring or treatment purposes.",
            "applies_to": ["biological-sample-extraction"]
        },
        {
            "id": "sampling-during-breeding-phase",
            "name": "sampling during breeding phase",
            "description": "Sampling may occur while birds are incubating eggs or caring for chicks, with appropriate care.",
            "applies_to": ["biological-sample-extraction"]
        },

        {
            "id": "behavior-induced-intentionally",
            "name": "behavior induced intentionally",
            "description": "The bird’s behavior is deliberately provoked for observation or experimentation.",
            "applies_to": ["induced-behavioral-response"]
        },
        {
            "id": "response-triggered-via-stimulus",
            "name": "response triggered via stimulus",
            "description": "Specific stimuli (visual, auditory, or tactile) are used to elicit particular behaviors.",
            "applies_to": ["induced-behavioral-response"]
        },
        {
            "id": "training-or-conditioning-involved",
            "name": "training or conditioning involved",
            "description": "Structured behavioral conditioning or training protocols may be applied.",
            "applies_to": ["induced-behavioral-response"]
        },
        {
            "id": "aversive-stimulus-permitted",
            "name": "aversive stimulus permitted",
            "description": "Unpleasant or mildly stressful stimuli may be applied to modify behavior under controlled conditions.",
            "applies_to": ["induced-behavioral-response"]
        },
        {
            "id": "reward-based-stimulus-permitted",
            "name": "reward-based stimulus permitted",
            "description": "Positive reinforcement or rewarding stimuli may be applied to encourage behavior.",
            "applies_to": ["induced-behavioral-response"]
        },
        {
            "id": "behavior-change-expected-to-persist",
            "name": "behavior change expected to persist",
            "description": "Behavioral changes may last beyond the immediate experimental or observational period.",
            "applies_to": ["induced-behavioral-response"]
        },

        {
            "id": "flight-restriction-applied",
            "name": "flight restriction applied",
            "description": "Birds’ ability to fly may be temporarily limited or constrained for study, safety, or management purposes.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "flight-enhancement-applied",
            "name": "flight enhancement applied",
            "description": "Flight performance may be temporarily augmented, for example via reduced gravity environments or support systems.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "movement-corridor-altered",
            "name": "movement corridor altered",
            "description": "Paths or routes normally used by birds within a habitat may be modified or redirected.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "gravity-assisted-intervention",
            "name": "gravity-assisted intervention",
            "description": "Bird movement is modified using controlled gravitational manipulations in the lunar habitat.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "repeated-movement-trials-required",
            "name": "repeated movement trials required",
            "description": "Birds may be subjected to multiple trials to observe or test locomotion and flight behavior.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "movement-suppression-permitted",
            "name": "movement suppression permitted",
            "description": "Temporary restriction of voluntary movement is allowed, for research or control purposes.",
            "applies_to": ["alteration-of-flight-or-movement"]
        },
        {
            "id": "vegetation-displacement-permitted",
            "name": "vegetation displacement permitted",
            "description": "Plant structures or artificial foliage may be moved or removed, altering perching or shelter areas.",
            "applies_to": ["habitat-structure-disturbance"]
        },
        {
            "id": "perching-structures-altered",
            "name": "perching structures altered",
            "description": "Artificial or natural perches may be modified or removed, affecting roosting or resting behavior.",
            "applies_to": ["habitat-structure-disturbance"]
        },
        {
            "id": "nesting-substrate-modified",
            "name": "nesting substrate modified",
            "description": "Ground or surface materials used for nesting may be altered or replaced for study or maintenance.",
            "applies_to": ["habitat-structure-disturbance"]
        },
        {
            "id": "temporary-disturbance-only",
            "name": "temporary disturbance only",
            "description": "Habitat changes are short-term and must be restored to baseline conditions after intervention.",
            "applies_to": ["habitat-structure-disturbance"]
        },
        {
            "id": "permanent-modification-allowed",
            "name": "permanent modification allowed",
            "description": "Permanent structural changes are permitted under controlled ecological management plans.",
            "applies_to": ["habitat-structure-disturbance"]
        },
        {
            "id": "disturbance-during-breeding-season",
            "name": "disturbance during breeding season",
            "description": "Alterations may occur even during the breeding season, potentially affecting nesting success.",
            "applies_to": ["habitat-structure-disturbance"]
        },

        {
            "id": "temperature-altered",
            "name": "temperature altered",
            "description": "Ambient temperature within the habitat may be deliberately increased or decreased for experimental or management purposes.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "humidity-altered",
            "name": "humidity altered",
            "description": "Relative humidity levels may be modified, affecting microclimate conditions for the birds.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "atmospheric-composition-altered",
            "name": "atmospheric composition altered",
            "description": "The levels of oxygen, carbon dioxide, or other gases may be intentionally adjusted within the habitat.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "condition-change-exceeds-baseline-variance",
            "name": "condition change exceeds baseline variance",
            "description": "Environmental changes may go beyond normal natural fluctuations for experimental study.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "conditions-restored-post-intervention",
            "name": "conditions restored post-intervention",
            "description": "Environmental parameters must be returned to baseline conditions after the experiment or activity.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "long-term-alteration-permitted",
            "name": "long-term alteration permitted",
            "description": "Sustained changes to environmental conditions may be maintained for extended study or management.",
            "applies_to": ["environmental-condition-manipulation"]
        },
        {
            "id": "light-intensity-altered",
            "name": "light intensity altered",
            "description": "The brightness of artificial or natural light may be increased or decreased to influence behavior or physiology.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },
        {
            "id": "light-spectrum-altered",
            "name": "light spectrum altered",
            "description": "The spectral composition of light may be modified to mimic or deviate from natural conditions.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },
        {
            "id": "photoperiod-length-altered",
            "name": "photoperiod length altered",
            "description": "The duration of light and dark periods may be changed, potentially shifting circadian rhythms.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },
        {
            "id": "intervention-during-rest-phase",
            "name": "intervention during rest phase",
            "description": "Environmental or light manipulations may occur while birds are normally resting.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },
        {
            "id": "intervention-during-active-phase",
            "name": "intervention during active phase",
            "description": "Manipulations may occur while birds are normally active, potentially affecting behavior.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },
        {
            "id": "circadian-shift-exceeds-one-cycle",
            "name": "circadian shift exceeds one cycle",
            "description": "The alteration in daily or lunar cycles may exceed one full circadian rhythm period.",
            "applies_to": ["light-and-circadian-cycle-interference"]
        },

        {
            "id": "artificial-vocalization-used",
            "name": "artificial vocalization used",
            "description": "Synthetic sounds or calls are emitted to influence bird behavior or simulate communication.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "signal-mimics-natural-call",
            "name": "signal mimics natural call",
            "description": "Emitted signals replicate natural vocalizations to elicit responses from birds.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "signal-exceeds-natural-volume",
            "name": "signal exceeds natural volume",
            "description": "Acoustic emissions may be louder than natural calls, potentially affecting multiple individuals.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "continuous-emission-permitted",
            "name": "continuous emission permitted",
            "description": "Sound or signal may be broadcast continuously for extended observation or conditioning.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "directional-emission-required",
            "name": "directional emission required",
            "description": "Acoustic signals must be aimed or focused to target specific birds or groups.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "cross-species-signal-exposure-allowed",
            "name": "cross-species signal exposure allowed",
            "description": "Signals may be broadcast in ways that affect other species present in the habitat.",
            "applies_to": ["acoustic-or-signal-emission"]
        },
        {
            "id": "sex-ratio-intentionally-altered",
            "name": "sex ratio intentionally altered",
            "description": "The ratio of males to females in a population may be modified to study ecological or behavioral effects.",
            "applies_to": ["population-structure-intervention"]
        },
        {
            "id": "age-distribution-altered",
            "name": "age distribution altered",
            "description": "Population demographics may be adjusted to favor or limit certain age classes.",
            "applies_to": ["population-structure-intervention"]
        },
        {
            "id": "selective-exclusion-applied",
            "name": "selective exclusion applied",
            "description": "Certain individuals or subgroups may be prevented from accessing parts of the habitat or population.",
            "applies_to": ["population-structure-intervention"]
        },
        {
            "id": "selective-encouragement-applied",
            "name": "selective encouragement applied",
            "description": "Certain individuals or subgroups may be preferentially supported, guided, or relocated to influence population structure.",
            "applies_to": ["population-structure-intervention"]
        },
        {
            "id": "intervention-affects-multiple-generations",
            "name": "intervention affects multiple generations",
            "description": "Actions may have consequences that influence the population over more than one breeding cycle or generation.",
            "applies_to": ["population-structure-intervention"]
        },

        {
            "id": "selective-breeding-permitted",
            "name": "selective breeding permitted",
            "description": "Individuals may be paired or managed to favor specific genetic traits for research or population management.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "lineage-isolation-enforced",
            "name": "lineage isolation enforced",
            "description": "Certain genetic lines may be isolated to prevent mixing with other populations.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "hybridization-permitted",
            "name": "hybridization permitted",
            "description": "Crossing between genetically distinct lines or species is allowed under controlled conditions.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "genetic-traits-amplified",
            "name": "genetic traits amplified",
            "description": "Specific traits may be selected or enhanced over successive generations.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "genetic-traits-suppressed",
            "name": "genetic traits suppressed",
            "description": "Specific traits may be intentionally reduced or eliminated from the population.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "intervention-persists-beyond-one-generation",
            "name": "intervention persists beyond one generation",
            "description": "Effects of the intervention may influence multiple successive generations.",
            "applies_to": ["genetic-lineage-influence"]
        },
        {
            "id": "transfer-between-biospheres",
            "name": "transfer between biospheres",
            "description": "Birds may be moved from one controlled biosphere or dome to another for management, research, or population support.",
            "applies_to": ["cross-habitat-transfer"]
        },
        {
            "id": "transfer-between-domes",
            "name": "transfer between domes",
            "description": "Relocation of birds between domed habitats within the same mega-city is permitted.",
            "applies_to": ["cross-habitat-transfer"]
        },
        {
            "id": "transfer-across-gravity-gradients",
            "name": "transfer across gravity gradients",
            "description": "Birds may be moved across areas with different gravity or simulated gravitational environments.",
            "applies_to": ["cross-habitat-transfer"]
        },
        {
            "id": "transfer-involves-quarantine",
            "name": "transfer involves quarantine",
            "description": "Relocated birds must undergo quarantine or isolation protocols before integration.",
            "applies_to": ["cross-habitat-transfer"]
        },
        {
            "id": "return-transfer-guaranteed",
            "name": "return transfer guaranteed",
            "description": "Birds must be returned to their origin habitat after the study or intervention period.",
            "applies_to": ["cross-habitat-transfer"]
        },
        {
            "id": "permanent-relocation-permitted",
            "name": "permanent relocation permitted",
            "description": "Birds may be permanently transferred to a new habitat or biosphere.",
            "applies_to": ["cross-habitat-transfer"]
        },

        {
            "id": "medical-treatment-applied",
            "name": "medical treatment applied",
            "description": "Birds may receive direct medical interventions, including medication, surgery, or therapeutic care.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "assisted-recovery-required",
            "name": "assisted recovery required",
            "description": "Birds may need human support during healing or rehabilitation before returning to natural behavior.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "release-timing-controlled",
            "name": "release timing controlled",
            "description": "The timing of release back into the habitat is managed to optimize survival and reintegration.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "post-treatment-monitoring-required",
            "name": "post-treatment monitoring required",
            "description": "Birds are monitored after intervention to track recovery, health, or behavioral changes.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "reintegration-assistance-provided",
            "name": "reintegration assistance provided",
            "description": "Support is given to help birds re-adapt to their habitat after injury or illness.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "long-term-captivity-permitted",
            "name": "long-term captivity permitted",
            "description": "Birds may remain in controlled care for extended periods if necessary for recovery or research.",
            "applies_to": ["post-injury-or-post-illness-intervention"]
        },
        {
            "id": "standard-restrictions-suspended",
            "name": "standard restrictions suspended",
            "description": "Normal regulatory limitations may be temporarily lifted to respond to urgent ecological or population threats.",
            "applies_to": ["emergency-ecological-override"]
        },
        {
            "id": "rapid-intervention-authorized",
            "name": "rapid intervention authorized",
            "description": "Immediate actions may be taken to prevent imminent harm to the ecosystem or bird populations.",
            "applies_to": ["emergency-ecological-override"]
        },
        {
            "id": "retrospective-review-required",
            "name": "retrospective review required",
            "description": "All emergency interventions must be reviewed after the fact to ensure compliance and accountability.",
            "applies_to": ["emergency-ecological-override"]
        },
        {
            "id": "data-logging-mandatory",
            "name": "data logging mandatory",
            "description": "Comprehensive records of interventions, procedures, and outcomes must be maintained.",
            "applies_to": ["emergency-ecological-override"]
        },
        {
            "id": "intervention-affects-protected-species",
            "name": "intervention affects protected species",
            "description": "Emergency actions may involve species that are normally protected under regulations.",
            "applies_to": ["emergency-ecological-override"]
        },
        {
            "id": "override-duration-limited",
            "name": "override duration limited",
            "description": "The period during which normal restrictions are suspended is explicitly bounded.",
            "applies_to": ["emergency-ecological-override"]
        },

        {
            "id": "species-classified-as-protected",
            "name": "species classified as protected",
            "description": "Interactions are limited because the species is legally or environmentally designated as protected.",
            "applies_to": ["restricted-species-interaction"]
        },
        {
            "id": "species-classified-as-experimental",
            "name": "species classified as experimental",
            "description": "Species used in research or pilot studies may have interaction restrictions to ensure controlled conditions.",
            "applies_to": ["restricted-species-interaction"]
        },
        {
            "id": "interaction-quota-applies",
            "name": "interaction quota applies",
            "description": "A maximum number of allowed interactions with the species is set to prevent over-handling or stress.",
            "applies_to": ["restricted-species-interaction"]
        },
        {
            "id": "senior-authorization-required",
            "name": "senior authorization required",
            "description": "High-level or supervisory approval is necessary before interaction can occur.",
            "applies_to": ["restricted-species-interaction"]
        },
        {
            "id": "public-disclosure-restricted",
            "name": "public disclosure restricted",
            "description": "Information about interactions with the species may not be shared publicly without approval.",
            "applies_to": ["restricted-species-interaction"]
        },
        {
            "id": "multiple-contacts-per-individual-permitted",
            "name": "multiple contacts per individual permitted",
            "description": "An individual bird may be handled or studied more than once under the terms of the permit.",
            "applies_to": ["extended-or-repeated-contact-authorization"]
        },
        {
            "id": "contact-spans-multiple-lifecycle-stages",
            "name": "contact spans multiple lifecycle stages",
            "description": "Interactions may occur with the same individual at different stages such as juvenile, adult, or breeding phases.",
            "applies_to": ["extended-or-repeated-contact-authorization"]
        },
        {
            "id": "longitudinal-study-authorized",
            "name": "longitudinal study authorized",
            "description": "Permits allow long-term tracking and observation of individuals over time.",
            "applies_to": ["extended-or-repeated-contact-authorization"]
        },
        {
            "id": "continuous-monitoring-applied",
            "name": "continuous monitoring applied",
            "description": "Birds may be under ongoing observation or data collection throughout the study period.",
            "applies_to": ["extended-or-repeated-contact-authorization"]
        },
        {
            "id": "contact-frequency-exceeds-baseline-limits",
            "name": "contact frequency exceeds baseline limits",
            "description": "The number of interactions may surpass standard guidelines for normal handling or monitoring.",
            "applies_to": ["extended-or-repeated-contact-authorization"]
        }
    ]

    const permissionTypes = permissionTypeBase.map<DataSource["permissionTypes"][number]>((pt) => {
        return {
            id: pt.id,
            name: pt.name,
            description: pt.description,
            properties: permissionProperties.filter(pp => pp.applies_to.includes(pt.id))
        }
    });

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
    permissionTypes: {
        id: string,
        name: string;
        description: string;
        properties: {
            id: string;
            name: string;
            description: string;
        }[];
    }[];
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
                birthDate: fixedRandom.randdate(...period)
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
            const regionName = fixedRandom.choice(regionNames);
            return {
                id,
                mnr,
                actor: {id: ringerId, type: "actor"},
                createdAt: createdAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
                expiresAt: expiresAt.toISOString(),
                startsAt: startsAt.toISOString(),
                permissions: this.createPermissions(regionName, [startsAt, expiresAt], fixedRandom.randint(3, 5)),
                description: "Within this license the actors will perform:\n" + fixedRandom.choices(descriptions, fixedRandom.randint(1, 3)).map(d => `- ${d}`).join("\n"),
                status: fixedRandom.choice(licenseStatuses),
                region: `${fixedRandom.choice(regionDescriptors)} ${regionName}`,
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

    createPermissions(regionName: string, period: [Date, Date], count: number): License["permissions"] {
        const {permissionTypes, regionDescriptors, species} = this.dataSource;
        const fixedRandom = this.randomContext;
        return Array.from({length: count}).map(() => {
            const permissionType = fixedRandom.choice(permissionTypes);
            const permissionPeriod = fixedRandom.randdaterange(...period);
            const permission: License["permissions"][number] = {
                description: "",
                type: {
                    id: permissionType.id,
                    name: permissionType.name,
                    description: permissionType.description,
                },
                properties: fixedRandom.choices(permissionType.properties, Math.floor(permissionType.properties.length * 0.5)).map(pp => ({
                    id: pp.id,
                    name: pp.name,
                    description: pp.description,
                })),
                species: fixedRandom.choices(species, fixedRandom.randint(3, 5)).map(s => ({id: s.code, name: s.name})),
                location: `${fixedRandom.choice(regionDescriptors)} ${regionName}`,
                period: [permissionPeriod[0].toISOString(), permissionPeriod[1].toISOString()]
            };
            return permission;
        })
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
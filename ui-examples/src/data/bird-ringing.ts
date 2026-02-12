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
    PermissionType,
    PermissionProperty,
} from "../app/bird-ringing/common";
import { RandomContext, DataGenerator, getFixedRandom } from "./common";
import { CommonDataSource, getCommonData } from "./common-data";

export function getMoonData(): BirdRingingDataSource {
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

    const permissionTypes: PermissionType[] = [
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

    const permissionProperties: PermissionProperty[] = [
        {
            "id": "manual-handling-required",
            "name": "manual handling required",
            "description": "The activity requires physically holding the bird with hands, directly controlling its movement.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "mechanical-restraint-permitted",
            "name": "mechanical restraint permitted",
            "description": "Use of devices such as nets, cages, or other mechanical methods to restrain birds is allowed.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "sedation-permitted",
            "name": "sedation permitted",
            "description": "Temporary pharmacological restraint is allowed to reduce stress or facilitate handling.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "handling-exceeds-standard-duration",
            "name": "handling exceeds standard duration",
            "description": "The bird may be held or manipulated for longer than baseline welfare guidelines suggest.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "repeat-capture-allowed",
            "name": "repeat capture allowed",
            "description": "The same individual may be captured multiple times for study or monitoring purposes.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "juveniles-included",
            "name": "juveniles included",
            "description": "Dependent young birds may be captured and handled under this permit.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "breeding-individuals-included",
            "name": "breeding individuals included",
            "description": "Adult birds engaged in mating, nesting, or incubation may be captured or handled.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "capture-during-active-flight",
            "name": "capture during active flight",
            "description": "Capture may occur while the bird is in motion, such as flying or hopping between perches.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },
        {
            "id": "capture-during-rest-phase",
            "name": "capture during rest phase",
            "description": "Birds may be captured while resting, sleeping, or in low activity periods.",
            "permissionType": {"type": "permission-type", "id": "capture-and-physical-restraint"}
        },

        {
            "id": "displacement-beyond-home-range",
            "name": "displacement beyond home range",
            "description": "Birds may be moved outside their habitual territory or typical activity zone.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "relocation-between-habitat-zones",
            "name": "relocation between habitat zones",
            "description": "Transfer of birds between distinct habitat zones or ecological areas is permitted.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "return-to-origin-site-required",
            "name": "return to origin site required",
            "description": "Birds must be returned to their original capture site after displacement or relocation.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "human-assisted-transport-required",
            "name": "human-assisted transport required",
            "description": "Birds must be moved using human assistance rather than allowing them to move themselves.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "relocation-exceeds-one-circadian-cycle",
            "name": "relocation exceeds one circadian cycle",
            "description": "Birds may be displaced for longer than a single day-night cycle within the lunar habitat.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "group-displacement-permitted",
            "name": "group displacement permitted",
            "description": "Multiple birds may be moved together as a cohort rather than individually.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },
        {
            "id": "juveniles-subject-to-relocation",
            "name": "juveniles subject to relocation",
            "description": "Dependent young may be included in relocation or temporary displacement activities.",
            "permissionType": {"type": "permission-type", "id": "temporary-displacement-or-relocation"}
        },

        {
            "id": "physical-nest-entry-required",
            "name": "physical nest entry required",
            "description": "Access inside the nest structure is necessary, potentially exposing eggs or chicks to disturbance.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "structural-alteration-permitted",
            "name": "structural alteration permitted",
            "description": "Modifications to the nest’s physical structure are allowed, including reinforcement or minor reshaping.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "temporary-nest-removal-allowed",
            "name": "temporary nest removal allowed",
            "description": "The nest may be temporarily removed from its location for inspection, study, or relocation.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "artificial-support-added",
            "name": "artificial support added",
            "description": "Non-native materials may be added to stabilize or reinforce the nest structure.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "parental-presence-disrupted",
            "name": "parental presence disrupted",
            "description": "Access may occur even if it temporarily deters parent birds from caring for the nest.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "access-during-incubation",
            "name": "access during incubation",
            "description": "Nests may be entered while eggs are being incubated, potentially affecting temperature or attendance.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "access-during-feeding-phase",
            "name": "access during feeding phase",
            "description": "Nests may be accessed while adults are feeding chicks, potentially disturbing feeding behavior.",
            "permissionType": {"type": "permission-type", "id": "nest-access-and-modification"}
        },
        {
            "id": "direct-egg-contact-permitted",
            "name": "direct egg contact permitted",
            "description": "Handling eggs directly by hand is allowed for study, relocation, or measurement purposes.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "egg-relocation-permitted",
            "name": "egg relocation permitted",
            "description": "Eggs may be moved to a different nest or controlled environment for monitoring or protection.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "hatchling-removal-permitted",
            "name": "hatchling removal permitted",
            "description": "Chicks may be temporarily removed from the nest for study, tagging, or health checks.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "artificial-incubation-involved",
            "name": "artificial incubation involved",
            "description": "Eggs may be placed in artificial incubation devices to ensure development outside natural conditions.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "handling-prior-to-imprinting",
            "name": "handling prior to imprinting",
            "description": "Chicks may be handled before species-specific imprinting occurs, affecting future behavioral responses.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "handling-after-imprinting",
            "name": "handling after imprinting",
            "description": "Chicks may be handled even after imprinting has begun, potentially affecting social or ecological behaviors.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },
        {
            "id": "clutch-size-modification-allowed",
            "name": "clutch size modification allowed",
            "description": "Adding or removing eggs from a nest is permitted under controlled study or management conditions.",
            "permissionType": {"type": "permission-type", "id": "egg-and-hatchling-handling"}
        },

        {
            "id": "interruption-during-courtship",
            "name": "interruption during courtship",
            "description": "Activities may interfere with mating displays or partner selection behaviors.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "interruption-during-incubation",
            "name": "interruption during incubation",
            "description": "Activities may affect birds while they are incubating eggs, potentially impacting development or survival.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "interruption-during-fledging",
            "name": "interruption during fledging",
            "description": "Interventions may affect chicks leaving the nest or developing flight capabilities.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "interruption-during-molt",
            "name": "interruption during molt",
            "description": "Activities may disrupt the natural feather replacement process, affecting flight, insulation, or display.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "interruption-during-migration-behavior",
            "name": "interruption during migration behavior",
            "description": "Birds may be disturbed while performing natural migratory movements, orientation, or stopover behavior.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "forced-phase-delay-permitted",
            "name": "forced phase delay permitted",
            "description": "Deliberate interventions may delay a lifecycle stage for research or management purposes.",
            "permissionType": {"type": "permission-type", "id": "lifecycle-stage-interruption"}
        },
        {
            "id": "external-tag-attached",
            "name": "external tag attached",
            "description": "An external identifier such as a band, ring, or flag is attached for tracking and identification.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "subcutaneous-implant-allowed",
            "name": "subcutaneous implant allowed",
            "description": "Subcutaneous or internal implants are permitted for identification, tracking, or physiological monitoring.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "temporary-marker-used",
            "name": "temporary marker used",
            "description": "Non-permanent markers can be applied for short-term identification purposes.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "permanent-marker-used",
            "name": "permanent marker used",
            "description": "Permanent markings can be applied for long-term identification and study.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "tag-weight-exceeds-baseline-threshold",
            "name": "tag weight exceeds baseline threshold",
            "description": "The attached tag or device may exceed recommended weight limits, potentially affecting behavior or flight.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "tag-removal-planned",
            "name": "tag removal planned",
            "description": "The marker is intended to be removed after the study or tracking period.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        {
            "id": "tag-removal-not-required",
            "name": "tag removal not required",
            "description": "Markers may remain permanently on the bird without removal after study completion.",
            "permissionType": {"type": "permission-type", "id": "artificial-marking-or-tagging"}
        },
        
        {
            "id": "blood-sampling-permitted",
            "name": "blood sampling permitted",
            "description": "Collection of blood is authorized for research or monitoring purposes.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "feather-sampling-permitted",
            "name": "feather sampling permitted",
            "description": "Feathers may be collected for genetic, hormonal, or health analysis.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "tissue-sampling-permitted",
            "name": "tissue sampling permitted",
            "description": "Small tissue samples may be taken for diagnostic or experimental purposes, avoiding lethal impact.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "non-lethal-extraction-only",
            "name": "non-lethal extraction only",
            "description": "All biological sampling must not cause death or permanent impairment of the bird.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "repeat-sampling-allowed",
            "name": "repeat sampling allowed",
            "description": "The same individual may be sampled multiple times across the study period.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "sampling-during-active-illness",
            "name": "sampling during active illness",
            "description": "Birds may be sampled even if exhibiting signs of illness, for health monitoring or treatment purposes.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },
        {
            "id": "sampling-during-breeding-phase",
            "name": "sampling during breeding phase",
            "description": "Sampling may occur while birds are incubating eggs or caring for chicks, with appropriate care.",
            "permissionType": {"type": "permission-type", "id": "biological-sample-extraction"}
        },

        {
            "id": "behavior-induced-intentionally",
            "name": "behavior induced intentionally",
            "description": "The bird’s behavior is deliberately provoked for observation or experimentation.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },
        {
            "id": "response-triggered-via-stimulus",
            "name": "response triggered via stimulus",
            "description": "Specific stimuli (visual, auditory, or tactile) are used to elicit particular behaviors.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },
        {
            "id": "training-or-conditioning-involved",
            "name": "training or conditioning involved",
            "description": "Structured behavioral conditioning or training protocols may be applied.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },
        {
            "id": "aversive-stimulus-permitted",
            "name": "aversive stimulus permitted",
            "description": "Unpleasant or mildly stressful stimuli may be applied to modify behavior under controlled conditions.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },
        {
            "id": "reward-based-stimulus-permitted",
            "name": "reward-based stimulus permitted",
            "description": "Positive reinforcement or rewarding stimuli may be applied to encourage behavior.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },
        {
            "id": "behavior-change-expected-to-persist",
            "name": "behavior change expected to persist",
            "description": "Behavioral changes may last beyond the immediate experimental or observational period.",
            "permissionType": {"type": "permission-type", "id": "induced-behavioral-response"}
        },

        {
            "id": "flight-restriction-applied",
            "name": "flight restriction applied",
            "description": "Birds’ ability to fly may be temporarily limited or constrained for study, safety, or management purposes.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "flight-enhancement-applied",
            "name": "flight enhancement applied",
            "description": "Flight performance may be temporarily augmented, for example via reduced gravity environments or support systems.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "movement-corridor-altered",
            "name": "movement corridor altered",
            "description": "Paths or routes normally used by birds within a habitat may be modified or redirected.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "gravity-assisted-intervention",
            "name": "gravity-assisted intervention",
            "description": "Bird movement is modified using controlled gravitational manipulations in the lunar habitat.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "repeated-movement-trials-required",
            "name": "repeated movement trials required",
            "description": "Birds may be subjected to multiple trials to observe or test locomotion and flight behavior.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "movement-suppression-permitted",
            "name": "movement suppression permitted",
            "description": "Temporary restriction of voluntary movement is allowed, for research or control purposes.",
            "permissionType": {"type": "permission-type", "id": "alteration-of-flight-or-movement"}
        },
        {
            "id": "vegetation-displacement-permitted",
            "name": "vegetation displacement permitted",
            "description": "Plant structures or artificial foliage may be moved or removed, altering perching or shelter areas.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },
        {
            "id": "perching-structures-altered",
            "name": "perching structures altered",
            "description": "Artificial or natural perches may be modified or removed, affecting roosting or resting behavior.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },
        {
            "id": "nesting-substrate-modified",
            "name": "nesting substrate modified",
            "description": "Ground or surface materials used for nesting may be altered or replaced for study or maintenance.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },
        {
            "id": "temporary-disturbance-only",
            "name": "temporary disturbance only",
            "description": "Habitat changes are short-term and must be restored to baseline conditions after intervention.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },
        {
            "id": "permanent-modification-allowed",
            "name": "permanent modification allowed",
            "description": "Permanent structural changes are permitted under controlled ecological management plans.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },
        {
            "id": "disturbance-during-breeding-season",
            "name": "disturbance during breeding season",
            "description": "Alterations may occur even during the breeding season, potentially affecting nesting success.",
            "permissionType": {"type": "permission-type", "id": "habitat-structure-disturbance"}
        },

        {
            "id": "temperature-altered",
            "name": "temperature altered",
            "description": "Ambient temperature within the habitat may be deliberately increased or decreased for experimental or management purposes.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "humidity-altered",
            "name": "humidity altered",
            "description": "Relative humidity levels may be modified, affecting microclimate conditions for the birds.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "atmospheric-composition-altered",
            "name": "atmospheric composition altered",
            "description": "The levels of oxygen, carbon dioxide, or other gases may be intentionally adjusted within the habitat.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "condition-change-exceeds-baseline-variance",
            "name": "condition change exceeds baseline variance",
            "description": "Environmental changes may go beyond normal natural fluctuations for experimental study.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "conditions-restored-post-intervention",
            "name": "conditions restored post-intervention",
            "description": "Environmental parameters must be returned to baseline conditions after the experiment or activity.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "long-term-alteration-permitted",
            "name": "long-term alteration permitted",
            "description": "Sustained changes to environmental conditions may be maintained for extended study or management.",
            "permissionType": {"type": "permission-type", "id": "environmental-condition-manipulation"}
        },
        {
            "id": "light-intensity-altered",
            "name": "light intensity altered",
            "description": "The brightness of artificial or natural light may be increased or decreased to influence behavior or physiology.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },
        {
            "id": "light-spectrum-altered",
            "name": "light spectrum altered",
            "description": "The spectral composition of light may be modified to mimic or deviate from natural conditions.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },
        {
            "id": "photoperiod-length-altered",
            "name": "photoperiod length altered",
            "description": "The duration of light and dark periods may be changed, potentially shifting circadian rhythms.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },
        {
            "id": "intervention-during-rest-phase",
            "name": "intervention during rest phase",
            "description": "Environmental or light manipulations may occur while birds are normally resting.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },
        {
            "id": "intervention-during-active-phase",
            "name": "intervention during active phase",
            "description": "Manipulations may occur while birds are normally active, potentially affecting behavior.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },
        {
            "id": "circadian-shift-exceeds-one-cycle",
            "name": "circadian shift exceeds one cycle",
            "description": "The alteration in daily or lunar cycles may exceed one full circadian rhythm period.",
            "permissionType": {"type": "permission-type", "id": "light-and-circadian-cycle-interference"}
        },

        {
            "id": "artificial-vocalization-used",
            "name": "artificial vocalization used",
            "description": "Synthetic sounds or calls are emitted to influence bird behavior or simulate communication.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "signal-mimics-natural-call",
            "name": "signal mimics natural call",
            "description": "Emitted signals replicate natural vocalizations to elicit responses from birds.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "signal-exceeds-natural-volume",
            "name": "signal exceeds natural volume",
            "description": "Acoustic emissions may be louder than natural calls, potentially affecting multiple individuals.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "continuous-emission-permitted",
            "name": "continuous emission permitted",
            "description": "Sound or signal may be broadcast continuously for extended observation or conditioning.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "directional-emission-required",
            "name": "directional emission required",
            "description": "Acoustic signals must be aimed or focused to target specific birds or groups.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "cross-species-signal-exposure-allowed",
            "name": "cross-species signal exposure allowed",
            "description": "Signals may be broadcast in ways that affect other species present in the habitat.",
            "permissionType": {"type": "permission-type", "id": "acoustic-or-signal-emission"}
        },
        {
            "id": "sex-ratio-intentionally-altered",
            "name": "sex ratio intentionally altered",
            "description": "The ratio of males to females in a population may be modified to study ecological or behavioral effects.",
            "permissionType": {"type": "permission-type", "id": "population-structure-intervention"}
        },
        {
            "id": "age-distribution-altered",
            "name": "age distribution altered",
            "description": "Population demographics may be adjusted to favor or limit certain age classes.",
            "permissionType": {"type": "permission-type", "id": "population-structure-intervention"}
        },
        {
            "id": "selective-exclusion-applied",
            "name": "selective exclusion applied",
            "description": "Certain individuals or subgroups may be prevented from accessing parts of the habitat or population.",
            "permissionType": {"type": "permission-type", "id": "population-structure-intervention"}
        },
        {
            "id": "selective-encouragement-applied",
            "name": "selective encouragement applied",
            "description": "Certain individuals or subgroups may be preferentially supported, guided, or relocated to influence population structure.",
            "permissionType": {"type": "permission-type", "id": "population-structure-intervention"}
        },
        {
            "id": "intervention-affects-multiple-generations",
            "name": "intervention affects multiple generations",
            "description": "Actions may have consequences that influence the population over more than one breeding cycle or generation.",
            "permissionType": {"type": "permission-type", "id": "population-structure-intervention"}
        },

        {
            "id": "selective-breeding-permitted",
            "name": "selective breeding permitted",
            "description": "Individuals may be paired or managed to favor specific genetic traits for research or population management.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "lineage-isolation-enforced",
            "name": "lineage isolation enforced",
            "description": "Certain genetic lines may be isolated to prevent mixing with other populations.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "hybridization-permitted",
            "name": "hybridization permitted",
            "description": "Crossing between genetically distinct lines or species is allowed under controlled conditions.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "genetic-traits-amplified",
            "name": "genetic traits amplified",
            "description": "Specific traits may be selected or enhanced over successive generations.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "genetic-traits-suppressed",
            "name": "genetic traits suppressed",
            "description": "Specific traits may be intentionally reduced or eliminated from the population.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "intervention-persists-beyond-one-generation",
            "name": "intervention persists beyond one generation",
            "description": "Effects of the intervention may influence multiple successive generations.",
            "permissionType": {"type": "permission-type", "id": "genetic-lineage-influence"}
        },
        {
            "id": "transfer-between-biospheres",
            "name": "transfer between biospheres",
            "description": "Birds may be moved from one controlled biosphere or dome to another for management, research, or population support.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },
        {
            "id": "transfer-between-domes",
            "name": "transfer between domes",
            "description": "Relocation of birds between domed habitats within the same mega-city is permitted.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },
        {
            "id": "transfer-across-gravity-gradients",
            "name": "transfer across gravity gradients",
            "description": "Birds may be moved across areas with different gravity or simulated gravitational environments.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },
        {
            "id": "transfer-involves-quarantine",
            "name": "transfer involves quarantine",
            "description": "Relocated birds must undergo quarantine or isolation protocols before integration.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },
        {
            "id": "return-transfer-guaranteed",
            "name": "return transfer guaranteed",
            "description": "Birds must be returned to their origin habitat after the study or intervention period.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },
        {
            "id": "permanent-relocation-permitted",
            "name": "permanent relocation permitted",
            "description": "Birds may be permanently transferred to a new habitat or biosphere.",
            "permissionType": {"type": "permission-type", "id": "cross-habitat-transfer"}
        },

        {
            "id": "medical-treatment-applied",
            "name": "medical treatment applied",
            "description": "Birds may receive direct medical interventions, including medication, surgery, or therapeutic care.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "assisted-recovery-required",
            "name": "assisted recovery required",
            "description": "Birds may need human support during healing or rehabilitation before returning to natural behavior.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "release-timing-controlled",
            "name": "release timing controlled",
            "description": "The timing of release back into the habitat is managed to optimize survival and reintegration.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "post-treatment-monitoring-required",
            "name": "post-treatment monitoring required",
            "description": "Birds are monitored after intervention to track recovery, health, or behavioral changes.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "reintegration-assistance-provided",
            "name": "reintegration assistance provided",
            "description": "Support is given to help birds re-adapt to their habitat after injury or illness.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "long-term-captivity-permitted",
            "name": "long-term captivity permitted",
            "description": "Birds may remain in controlled care for extended periods if necessary for recovery or research.",
            "permissionType": {"type": "permission-type", "id": "post-injury-or-post-illness-intervention"}
        },
        {
            "id": "standard-restrictions-suspended",
            "name": "standard restrictions suspended",
            "description": "Normal regulatory limitations may be temporarily lifted to respond to urgent ecological or population threats.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },
        {
            "id": "rapid-intervention-authorized",
            "name": "rapid intervention authorized",
            "description": "Immediate actions may be taken to prevent imminent harm to the ecosystem or bird populations.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },
        {
            "id": "retrospective-review-required",
            "name": "retrospective review required",
            "description": "All emergency interventions must be reviewed after the fact to ensure compliance and accountability.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },
        {
            "id": "data-logging-mandatory",
            "name": "data logging mandatory",
            "description": "Comprehensive records of interventions, procedures, and outcomes must be maintained.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },
        {
            "id": "intervention-affects-protected-species",
            "name": "intervention affects protected species",
            "description": "Emergency actions may involve species that are normally protected under regulations.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },
        {
            "id": "override-duration-limited",
            "name": "override duration limited",
            "description": "The period during which normal restrictions are suspended is explicitly bounded.",
            "permissionType": {"type": "permission-type", "id": "emergency-ecological-override"}
        },

        {
            "id": "species-classified-as-protected",
            "name": "species classified as protected",
            "description": "Interactions are limited because the species is legally or environmentally designated as protected.",
            "permissionType": {"type": "permission-type", "id": "restricted-species-interaction"}
        },
        {
            "id": "species-classified-as-experimental",
            "name": "species classified as experimental",
            "description": "Species used in research or pilot studies may have interaction restrictions to ensure controlled conditions.",
            "permissionType": {"type": "permission-type", "id": "restricted-species-interaction"}
        },
        {
            "id": "interaction-quota-applies",
            "name": "interaction quota applies",
            "description": "A maximum number of allowed interactions with the species is set to prevent over-handling or stress.",
            "permissionType": {"type": "permission-type", "id": "restricted-species-interaction"}
        },
        {
            "id": "senior-authorization-required",
            "name": "senior authorization required",
            "description": "High-level or supervisory approval is necessary before interaction can occur.",
            "permissionType": {"type": "permission-type", "id": "restricted-species-interaction"}
        },
        {
            "id": "public-disclosure-restricted",
            "name": "public disclosure restricted",
            "description": "Information about interactions with the species may not be shared publicly without approval.",
            "permissionType": {"type": "permission-type", "id": "restricted-species-interaction"}
        },
        {
            "id": "multiple-contacts-per-individual-permitted",
            "name": "multiple contacts per individual permitted",
            "description": "An individual bird may be handled or studied more than once under the terms of the permit.",
            "permissionType": {"type": "permission-type", "id": "extended-or-repeated-contact-authorization"}
        },
        {
            "id": "contact-spans-multiple-lifecycle-stages",
            "name": "contact spans multiple lifecycle stages",
            "description": "Interactions may occur with the same individual at different stages such as juvenile, adult, or breeding phases.",
            "permissionType": {"type": "permission-type", "id": "extended-or-repeated-contact-authorization"}
        },
        {
            "id": "longitudinal-study-authorized",
            "name": "longitudinal study authorized",
            "description": "Permits allow long-term tracking and observation of individuals over time.",
            "permissionType": {"type": "permission-type", "id": "extended-or-repeated-contact-authorization"}
        },
        {
            "id": "continuous-monitoring-applied",
            "name": "continuous monitoring applied",
            "description": "Birds may be under ongoing observation or data collection throughout the study period.",
            "permissionType": {"type": "permission-type", "id": "extended-or-repeated-contact-authorization"}
        },
        {
            "id": "contact-frequency-exceeds-baseline-limits",
            "name": "contact frequency exceeds baseline limits",
            "description": "The number of interactions may surpass standard guidelines for normal handling or monitoring.",
            "permissionType": {"type": "permission-type", "id": "extended-or-repeated-contact-authorization"}
        }
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

    const commonData = getCommonData();

    return {
        ...commonData,
        licenseStatuses,
        reportStatuses,
        emailStatus,
        descriptions,
        permissionTypes,
        permissionProperties,
        speciesSignifiers,
        species,
    }
}

export type BirdRingingDataSource = CommonDataSource & {
    licenseStatuses: LicenseStatus[];
    reportStatuses: ReportStatus[];
    emailStatus: string[];
    descriptions: string[];
    permissionTypes: PermissionType[];
    permissionProperties: PermissionProperty[];
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
    dataSource: BirdRingingDataSource;
    constructor(randomContext: RandomContext, dataSource: BirdRingingDataSource, period: [Date, Date], maxLicenseLength: number) {
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

    createLicenses(actors: Record<string, Actor>, species: Record<string, Species>, numberOfLicenses: number) {
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
                permissions: this.createPermissions(regionName, [startsAt, expiresAt], species, fixedRandom.randint(3, 5)),
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

    createPermissions(regionName: string, period: [Date, Date], species: Record<string, Species>, count: number): License["permissions"] {
        const {permissionTypes, permissionProperties, regionDescriptors} = this.dataSource;
        const fixedRandom = this.randomContext;
        const speciesList = Object.keys(species).map(key => species[key])
        return Array.from({length: count}).map(() => {
            const permissionType = fixedRandom.choice(permissionTypes);
            const permissionPeriod = fixedRandom.randdaterange(...period);
            const currentPermissionProperties = permissionProperties.filter(pp => pp.permissionType.id === permissionType.id)
            const permission: License["permissions"][number] = {
                description: "",
                type: {
                    type: "permission-type",
                    id: permissionType.id,
                },
                properties: fixedRandom.choices(currentPermissionProperties, Math.floor(currentPermissionProperties.length * 0.5)).map(pp => ({
                    type: "permission-property",
                    id: pp.id,
                })),
                speciesList: fixedRandom.choices(speciesList, fixedRandom.randint(3, 5)).map(s => ({type: "species", id: s.id})),
                location: `${fixedRandom.choice(regionDescriptors)} ${regionName}`,
                period: [permissionPeriod[0].toISOString(), permissionPeriod[1].toISOString()]
            };
            return permission;
        })
    }

    createPermissionTypes() {
        return this.dataSource.permissionTypes.reduce<Record<string, PermissionType>>((acc, pt) => {
            acc[pt.id] = pt;
            return acc;
        }, {});
    }

    createPermissionProperties() {
        return this.dataSource.permissionProperties.reduce<Record<string, PermissionProperty>>((acc, pp) => {
            acc[pp.id] = pp;
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
        const species = this.createSpecies(50);
        const licenses = this.createLicenses(actors, species, 100);
        const documents = this.createDocuments(licenses);
        const permissionTypes = this.createPermissionTypes();
        const permissionProperties = this.createPermissionProperties();
        return {
            actors,
            licenses,
            documents,
            species,
            permissionTypes,
            permissionProperties
        }
    }
}

export function getGenerator() {
    return new BirdRingingDataGenerator(
        getFixedRandom(),
        getMoonData(),
        [new Date("2020-01-01T00:00:00.000Z"), new Date("2025-01-01T00:00:00.000Z")],
        new Date("2020-06-01T00:00:00.000Z").getTime() - new Date("2020-01-01T00:00:00.000Z").getTime(),
    )
}
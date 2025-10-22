export type Actor = {
    name: string;
    email?: string;
    updatedAt: string;
    type: ActorType;
}

export type ActorType = "Organization" | "Person";

export type ReportStatus = "Yes" | "No" | "Incomplete";

export type LicenseStatus = "Active" | "Not active" | "Discontinued";

export type LicenseRole = "Ringer" | "Helper";

export type License = {
    mnr: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    startsAt: string;
    permissions: string[];
    region: string;
    description: string;
    actors: LicenseRelation[];
    documents: {
        type: string;
        createdAt: string;
        href: string;
    }[];
    reportStatus: ReportStatus;
}

export type LicenseRelation = {
    actorId: string;
    mednr?: string;
    role: LicenseRole;
    licenseSentAt: string;
    licenseSentStatus: string;
    active: boolean;
}

export type IdentifiableEntity = {
    id: string;
}

const groupNames = [
    "Fågelklubben",
    "Fågelgruppen",
    "Fågelföreningen",
    "Fågelskådarna",
    "Fågelskådargruppen",
    "Fågelskådarsällskapet",
    "Ornitologerna",
    "Ornitologiska föreningen",
    "Fågelspanarna",
    "Fågelvännerna",
    "Fågelentusiasterna",
    "Fågelobservatörerna",
    "Fågelintresset",
    "Fågelstationen",
    "Ringmärkarna",
    "Fågelövervakarna",
    "Fågelinventerarna",
    "Fältornitologerna",
    "Skådarklubben",
    "Skådargruppen"
]

const firstNames = [
  "Erik",
  "Lars",
  "Johan",
  "Anders",
  "Per",
  "Karl",
  "Oskar",
  "Nils",
  "Gustav",
  "Henrik",
  "Mats",
  "Fredrik",
  "Daniel",
  "Björn",
  "Tobias",
  "Marcus",
  "Viktor",
  "Håkan",
  "Emil",
  "Anton",
  "Axel",
  "Jonas",
  "Stefan",
  "Olle",
  "Mattias",
  "Rasmus",
  "Patrik",
  "Simon",
  "Filip",
  "Albin",
  "Sven",
  "Elias",
  "Isak",
  "Leon",
  "Arvid",
  "Lennart",
  "Göran",
  "Christer",
  "Robin",
  "Martin"
]

const lastNames = [
  "Andersson",
  "Johansson",
  "Karlsson",
  "Nilsson",
  "Eriksson",
  "Larsson",
  "Olsson",
  "Persson",
  "Svensson",
  "Gustafsson",
  "Pettersson",
  "Jonsson",
  "Jansson",
  "Hansson",
  "Bengtsson",
  "Olofsson",
  "Lindberg",
  "Lindström",
  "Lundberg",
  "Lundgren",
  "Lindqvist",
  "Lundström",
  "Bergström",
  "Holmberg",
  "Wallin",
  "Sandberg",
  "Axelsson",
  "Berglund",
  "Ekström",
  "Nyström",
  "Blomqvist",
  "Söderberg",
  "Hedlund",
  "Fransson",
  "Isaksson",
  "Strömberg",
  "Lindgren",
  "Håkansson",
  "Norberg",
  "Forsberg"
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

const allowanceTypes = [
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

const regions = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping",
  "Lund",
  "Umeå",
  "Gävle",
  "Borås",
  "Sundsvall",
  "Eskilstuna",
  "Halmstad",
  "Karlstad",
  "Trollhättan",
  "Luleå",
  "Skellefteå",
  "Växjö",
  "Kristianstad",
  "Kalmar",
  "Falun",
  "Bor­länge",
  "Östersund",
  "Södertälje",
  "Karlskrona",
  "Visby",
  "Hudiksvall",
  "Motala",
  "Enköping",
  "Falkenberg",
  "Åmål",
  "Mariestad",
  "Sigtuna",
  "Alingsås",
  "Älmhult",
  "Sandviken"
]

const regionSignifiers = [
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

const randomBase = [
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

class RandomContext {
    private _items: number[];
    private _ticker: number = 0;
    constructor(items?: number[]) {
        this._items = items || (Array.from({length: 200}).map(() => Math.random()))
    }

    seed(seed: number) {
        this._ticker = seed % this._items.length;
    }

    random() {
        this._ticker = (this._ticker + 1) % this._items.length;
        return this._items[this._ticker];
    }

    randint(min: number, max: number) {
        const delta = max - min;
        return Math.floor(min + delta * this.random());
    }

    randbool(): boolean {
        return this.random() < 0.5;
    }

    choice<T>(entries: T[]): T {
        const index = Math.min(this.randint(0, entries.length), entries.length - 1);
        return entries[index]
    }

    choices<T>(entries: T[], count: number) {
        const localEntries = [...entries];
        return (Array.from({length: count}).map(() => {
            const index = Math.min(this.randint(0, localEntries.length), localEntries.length - 1);
            const [value] = localEntries.splice(index, 1);
            return value;
        }))
    }

    randdaterange(start: Date, end: Date, maxLength?: number): [Date, Date] {
        const rangeStart = this.randdate(start, end);
        const delta = rangeStart.getTime() - start.getTime();
        const limitedDelta = maxLength === undefined ? delta : Math.min(delta, maxLength);
        const rangeEnd = this.randdate(rangeStart, new Date(rangeStart.getTime() + limitedDelta));
        return [rangeStart, rangeEnd]
    }

    randdate(start: Date, end: Date): Date {
        const delta = end.getTime() - start.getTime();
        return new Date(start.getTime() + this.randint(0, delta));
    }

    reset() {
        this._ticker = 0;
    }
}

const period: [Date, Date] = [new Date("2020-01-01T00:00:00.000Z"), new Date("2025-01-01T00:00:00.000Z")];
const maxLicenseLength = new Date("2020-01-01T00:00:00.000Z").getTime() - new Date("2020-06-01T00:00:00.000Z").getTime();
const fixedRandom = new RandomContext(randomBase);
const numberOfActors = 200;
const numberOfOrganizations = 30;
export const actors: Record<string, Actor> = (Array.from({length: numberOfActors})).map<Actor>((_, index) => {
    const isOrganization = index < numberOfOrganizations;
    fixedRandom.seed(index)
    const updatedAt = fixedRandom.randdate(...period);
    const name = isOrganization ? `${fixedRandom.choice(groupNames)} ${fixedRandom.choice(regions)}` : `${fixedRandom.choice(firstNames)} ${fixedRandom.choice(lastNames)}`;
    const email = isOrganization ? `contact@${name.toLowerCase().replace(" ", ".")}.example.edu` : `${name.toLowerCase().replace(" ", ".")}@example.edu`
    return {
        name,
        email,
        type: isOrganization ? "Organization" : "Person",
        emailStatus: fixedRandom.choice(emailStatus),
        emailSentAt: updatedAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
    }
}).reduce<Record<string, Actor>>((acc, actor, index) => {
    const id: string = `actor-${index}`;
    acc[id] = actor;
    return acc;
}, {})

const numberOfLicenses = 50;
export const licenses = (Array.from({length: numberOfLicenses}).map<License>((_, index) => {
    const [createdAt, updatedAt] = fixedRandom.randdaterange(...period);
    const [startsAt, expiresAt] = fixedRandom.randdaterange(...period, maxLicenseLength);
    return {
        mnr: `${String(index).padStart(4, '0')}`,
        documents: [
            {
                type: "license",
                href: "/mock-license.pdf",
                createdAt: createdAt.toISOString(),
            }
        ],
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        startsAt: startsAt.toISOString(),
        permissions: fixedRandom.choices(allowanceTypes, 5),
        description: "",
        status: fixedRandom.choice(licenseStatuses),
        region: `${fixedRandom.choice(regionSignifiers)} ${fixedRandom.choice(regions)}`,
        actors: fixedRandom.choices(Object.keys(actors), fixedRandom.randint(3, 6)).map((actorId, index) => {
            const isHelper = index > 0;
            return {
                role: isHelper ? "Helper" : "Ringer",
                mednr: isHelper ? `${String(index).padStart(4, '0')}` : undefined,
                actorId,
                licenseSentAt: createdAt.toISOString(),
                licenseSentStatus: fixedRandom.choice(emailStatus),
                active: true,
            }
        }),
        reportStatus: fixedRandom.choice(reportStatuses),
    }
})).reduce<Record<string, License>>((acc, license, index) => {
    const id: string = `license-${index}`;
    acc[id] = license;
    return acc;
}, {});

export function getActors(): (Actor & IdentifiableEntity)[] {
    return Object.entries(actors).map(([id, value]) => ({
        id,
        ...value
    }))
}

export function getLicenses(): (License & IdentifiableEntity)[] {
    return Object.entries(licenses).map(([id, value]) => ({
        id,
        ...value
    }))
}

export function getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole) {
    return getLicenses().filter(l => l.actors.some(a => a.actorId === actor.id && (!role || a.role === role)))
}

export function getLicenseInfo(license: License, actor: IdentifiableEntity) {
    return license.actors.filter(a => a.actorId === actor.id)[0]
}

export function getLicenseActors(license: IdentifiableEntity, role: LicenseRole) {
    return getLicense(license).actors.filter(a => a.role === role).map(a => getActor({id: a.actorId}))
}

export function getActor(actor: IdentifiableEntity): Actor & IdentifiableEntity {
    return {
        ...actor,
        ...actors[actor.id]
    }
}

export function getLicense(license: IdentifiableEntity) {
    return {
        ...license,
        ...licenses[license.id]
    }
}

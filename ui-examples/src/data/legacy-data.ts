import { getGenerator as getBirdRinging, getFixedRandom } from "./bird-ringing";
import { StaticDataSource, Actor, LicenseStatus, ActorType } from "../app/bird-ringing/common";

type MNR = string; // Ringer number, identifier for a ringer.
type YesNo = "J" | "N"; // J = Yes, N = No
type Sex = "M" | "F" | "NULL"; // Sex
type DateStr = string;

type BaseMaerkare = {
    Mnr: MNR; // It is a varchar/text column. Some entries contain letters.
    Status: "Aktiv" | "Ej aktiv" | "Avslutad"; // The current status of a ringer Active, Not active, Terminated
    PriSta: "P" | "S"; // P = Privat, S = Station
    Enamn: string; // Family name
    Fnamn: string; // Given name
    Adress1: string; // Address field 1
    Adress2: string; // Address field 1
    Adress3: string; // Address field 1
    Postnr: string; // Postal code
    Ort: string; // City
    Region: "S"; // Obsolete column.
    Telhem: string; // Phone number home -> Rename Telhem to Tel1
    Telarb: string; // Phone number work -> Rename Telarb to Tel2
    Email: string; // Email address
    SendMail: YesNo; // This means whether a person has email. We have a few older ringer who hasn't entered the email era yet.
    Spr: "SV" | "EN" | string; // Language using language code
    UdatAdr: DateStr; // Time when adress was updated
    UdatTel: DateStr; // TIme when phone number was updated
    UdatEmail: DateStr; // Time hen email was updated
    Greenwich: unknown; // This shows coordinates of bird observatories. We can remake it so it refers to a local from the Lokaler table (which would drastically increase the coordinate accuracy).
    Sex: Sex;
    Fyr: unknown; // Birth year. It should become birthDate.
    AdrMnr: unknown; // ID of a person who is responsible about all communication regarding this license. For example if a ringer dies/becomes inactive there can still be recoveries of birds that were ringed under that licese and someone else can still receive these updates.
    AssMnr1: MNR; // The ID of an accosiated ringer that is given access to another license's data.
    AssMnr2: MNR; // Same as above.
    AssMnr3: MNR; // Same as above.
    Mistnet: YesNo; // Permission to use nets
    Ljud: YesNo; // Permission to use sounds
    Trap: YesNo; // Permission to use traps
    Startyr: number; // First active year for the particular license.
    Lastredov: DateStr; // Last report date -> Tracking that we have up-to-date data. If someone hasn't sent a report for a while we'd remind them to do so.
    Slutredov: DateStr; // Final report date -> To ensure that all data for the year is in by the end of said year so we can do the annual report.
    Statupdat: DateStr; // Date of status update -> When was the license status last changed (from Active to Inactive, for example).
    Postupdat: DateStr; // Obsolete.
    Noteringar: string; // Notes with details not yet modeled in the system
    LicDatum: DateStr; // We don't know.
    Fagel2: YesNo | unknown; // Whether the lices uses Fagel2 or Fagel3 program for rapporting to us.
    Fagel3: YesNo | unknown; // Whether the lices uses Fagel2 or Fagel3 program for rapporting to us.
    Mappnamn: unknown; // Guides one of our current programs to the correct folder with .txt rapports for the license.
    Access: number; // MS Access version used by that lices's Fagel program.
    Runtime: unknown; // We don't know.
    F3Mnr1: MNR | null; // We don't know exactly.
    F3Mnr1Lokal: unknown; // We don't know exactly.
    F3Mnr1Art: unknown; // We don't know exactly.
    F3Mnr1Sign: unknown; // We don't know exactly.
    F3Mnr2: MNR | null; // We don't know exactly.
    F3Mnr2Lokal: unknown; // We don't know exactly.
    F3Mnr2Art: unknown; // We don't know exactly.
    F3Mnr2Sign: unknown; // We don't know exactly.

// Ignore the following fields
    LastRCdata: DateStr; // Tracks different update dates. Applies to the rest of the questions in this section. You can ignore these.
    AdminDb: DateStr; // What is this?
    BackupDb: DateStr; // What is this?
    BearbetaDb: DateStr; // What is this?
    FyndDb: DateStr; // What is this?
    InmatningsDb: DateStr; // What is this?
    RapportDb: DateStr; // What is this?
    RCKodlistaDb: DateStr; // What is this?
    KomprimeraDb: DateStr; // What is this?
    UdatF2: DateStr; // What is this?
}

export type Maerkare = Omit<
    BaseMaerkare,
    "Region" |
    "SendMail" |
    "UdatAdr" |
    "UdatAdr" |
    "UdatTel" |
    "UdatEmail" |
    "Statupdat" |
    "Postupdat" |
    "Fagel2" |
    "Fagel3" |
    "Access" |
    "Runtime" |
    "F3Mnr1" |
    "F3Mnr1Lokal" |
    "F3Mnr1Art" |
    "F3Mnr1Sign" |
    "F3Mnr2" |
    "F3Mnr2Lokal" |
    "F3Mnr2Art" |
    "F3Mnr2Sign" |
    "LastRCdata" |
    "AdminDb" |
    "BackupDb" |
    "BearbetaDb" |
    "FyndDb" |
    "InmatningsDb" |
    "RapportDb" |
    "RCKodlistaDb" |
    "KomprimeraDb" |
    "UdatF2"
>

type BaseMarkAss = {
    Mnr: MNR; // Reference to the main ringer to which this helper is associated
    Mednr: MNR; // Enumeration local to a specific MNR
    ENamn: string; // Family name
    FNamn: string; // Given name
    Sex: Sex;
    Fyr: unknown; // Year of birth: a little mix of födelse and year :). Should be replaced with födelseår+datum? Do we need datum?
    Fritext: string; // Notes with details not yet modeled in the system
    UDat: Date; // Date when post was updated
}

export type MarkAss = Omit<BaseMarkAss, "UDat">

type BaseMarkAssYr = {
    Mnr: MNR; // Reference to the main ringer to which this helper is associated
    Mednr: MNR; // Enumeration local to a specific MNR
    Ar: string | number; // Shows which year(s) this helper has been active under a particularl license.
    LicDatum: Date; // When that row was created.
}

export type MarkAssYr = Omit<BaseMarkAssYr, "LicDatum">

type BaseArtlista = {
    Artkod: string; // Code which identifies a species or subspecies.
    Status: "A" | "R" | "Z" | "X"; // A: Species, R: Subspecies, Z: Hybrid there is also X: Likely hybrid
    Art: string; // Art is the main species. If we have a particular subspecies then it has its own Artkod while the Art refers to the main species.
    Skyddad: unknown; // Shows protection status. J is Yes (protected) and P shows that only nest site(s) are protected (coordinates for these are hidden).
    StatVilt: unknown; // Visar om arten hör till StatensVilt.
    Eunr: number; // The EUring number for the species.
    Sort: number; // Custom sorting ID used by us so that species can be shown in a certain order follwing taxonomical order.
    VetKod: string; // EUring's scientific code (corresponds to the Eunr).
    Std: "J" | unknown; // Shows which species are part of the standard list for Sweden.
    SVnamn: string; // Swedish name
    VetNamn: string; // Scientific name
    ENnamn: string; // English name
    MinVinge: number; // Species stat
    MaxVinge: number; // Species stat
    MinVikt: number; // Species stat
    MaxVikt: number; // Species stat
    VM: "S" | unknown | null; // Type of ring used for the species.
    Rtyp1: number | null; // Recommended ring size.
    Rtyp2: unknown | null; // Recommended alternative ring size.
    Släktnamn: string; // Genus name (latin).
    Artnamn: string; // Species name (latin).
	Rasnamn: string; // Race name
    FRnamn: string; // French name
    TYnamn: string; // German name
    FInamn: string; // Finnish name
    DKnamn: string; // Danish name
    NOnamn: string; // Norwegian name
    NLnamn: string; // Dutch name
    SPnamn: string; // Spanish name
    ITnamn: string; // Italian name
    PLnamn: string; // Polish name
}

export type Artilista = Pick<
    BaseArtlista,
    "VetKod" | "VetNamn" | "SVnamn"
>

function parseStatus(status: LicenseStatus): Maerkare["Status"] {
    switch (status) {
        case "Active": return "Aktiv"
        case "Discontinued": return "Avslutad"
        case "Not active": return "Ej aktiv"
    }
}

function parsePriSta(type: ActorType): Maerkare["PriSta"] {
    switch (type) {
        case "Organization": return "S"
        case "Person": return "P"
    }
}

function parseNames(actor: Actor): [string, string] {
    const nameList = actor.name.split(" ")
    return actor.type === "Organization" ? [actor.name, ""] : [nameList[0], nameList.slice(1).join(" ")]
}

function padZero(value: number, length: number = 2) {
    return String(value).padStart(length, "0")
}

function parseDateTime(date: Date) {
    // 1999-03-15 00:00:00.000
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} 00:00:00.000`
}

function parseSex(sex: Actor["sex"]): Maerkare["Sex"] {
    switch (sex) {
        case "Female": return "F";
        case "Male": return "M";
        case "N/A": return "NULL";
        case "Undisclosed": return "NULL";
    }
}

export function contentToLegacyData() {
    const generator = getBirdRinging()
    const content = generator.createData();
    const dataSource = new StaticDataSource(content.actors, content.licenses, content.documents, content.permissionTypes, content.permissionProperties, content.species, false);
    const fixedRandom = getFixedRandom();

    const licenseList = Object.values(dataSource.licenses);
    const licenses: Maerkare[] = licenseList.map<Maerkare>((license) => {
        const licenseActor = dataSource.getLicenseActors(license, "Ringer")[0];
        const [fnamn, enamn] = parseNames(licenseActor);
        const adrMnr = fixedRandom.randbool() ? fixedRandom.choice(licenseList).mnr : "NULL";
        const assMnrs = Array.from({length: 3}).map<string>(() => fixedRandom.randbool() ? fixedRandom.choice(licenseList).mnr : "NULL")
        const yesNo: YesNo[] = ["J", "N"]
        const refNames = ["Central Archive", `${licenseActor.city} Archive`, "Bunker Archive", "Lunar Archive"]
        return {
            Mnr: license.mnr,
            Status: parseStatus(license.status),
            PriSta: parsePriSta(licenseActor.type),
            Enamn: enamn,
            Fnamn: fnamn,
            Adress1: "",
            Adress2: "",
            Adress3: "",
            Postnr: `X${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}`,
            Ort: licenseActor.city,
            Telhem: `X00-${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}`,
            Telarb: `X00-${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}${padZero(fixedRandom.randint(0, 99))}`,
            Email: licenseActor.email || "NULL",
            Spr: fixedRandom.choice(["SV", "EN"]),
            Greenwich: "",
            Sex: parseSex(licenseActor.sex),
            Fyr: licenseActor.birthDate ? licenseActor.birthDate.getFullYear() : undefined,
            AdrMnr: adrMnr,
            AssMnr1: assMnrs[0],
            AssMnr2: assMnrs[1],
            AssMnr3: assMnrs[2],
            Mistnet: fixedRandom.choice(yesNo),
            Ljud: fixedRandom.choice(yesNo),
            Trap: fixedRandom.choice(yesNo),
            Startyr: fixedRandom.randint(1996, 2025),
            Lastredov: parseDateTime(fixedRandom.randdate(new Date("1996-01-01"), new Date("2026-01-01"))),
            Slutredov: parseDateTime(fixedRandom.randdate(new Date("1996-01-01"), new Date("2026-01-01"))),
            Noteringar: "",
            LicDatum: parseDateTime(fixedRandom.randdate(new Date("1996-01-01"), new Date("2026-01-01"))),
            Mappnamn: fixedRandom.randbool() ? fixedRandom.choice(refNames) : "NULL",
        }
    });

    const actorList = Object.values(dataSource.actors);
    const helpers = fixedRandom.choices(actorList, Math.floor(actorList.length * 0.7)).flatMap<MarkAss>(actor => {
        const helperLicenses = dataSource.getActorLicenses(actor, undefined, undefined, (r) => r.role === "Associate" || r.role === "Communication" || r.role == "Helper")
        const [fnamn, enamn] = parseNames(actor)
        return helperLicenses.map<MarkAss>((license) => {
            const relation = license.actors.filter(r => r.actor.id === actor.id)[0]
            return {
                "Mnr": license.mnr,
                "Mednr": relation.mednr!,
                "FNamn": fnamn,
                "ENamn": enamn,
                "Fritext": "",
                "Fyr": actor.birthDate ? actor.birthDate.getFullYear() : undefined,
                "Sex": parseSex(actor.sex),
            }
        })
    })

    const helperYears = helpers.flatMap<MarkAssYr>(helper => {
        const startYear = fixedRandom.randint(1996, 2025)
        const years = Array.from({length: fixedRandom.randint(4, 10)}).map((_, index) => startYear + index)
        return years.map<MarkAssYr>((year) => ({
            "Ar": year, 
            "Mednr": helper.Mednr,
            "Mnr": helper.Mnr
        }))
    })

    const species = Object.values(content.species).map<Artilista>(s => {
        return {
            "VetKod": s.scientificCode,
            "VetNamn": s.scientificName,
            "SVnamn": s.name
        }
    })

    return {
        "br-ex-Maerkare": licenses,
        "br-ex-MarkAss": helpers,
        "br-ex-MarkAssYr": helperYears,
        "br-ex-Artlista": species
    }
}

export function getGenerator() {
    return {
        createData: contentToLegacyData,
    }
}
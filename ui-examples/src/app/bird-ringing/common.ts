export type Actor = {
    name: string;
    email?: string;
    updatedAt: string;
    type: ActorType;
    sex: Sex,
}

export type Sex = "Male" | "Female" | "Undisclosed" | "N/A"

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
    reportStatus: ReportStatus;
}

export type LicenseRelation = {
    actorId: string;
    mednr?: string;
    role: LicenseRole;
    licenseSentAt: string;
    licenseSentStatus: string;
    status: RelationStatus;
    documents: {
        type: string;
        createdAt: string;
        href: string;
    }[];
}

export type RelationStatus = "Active" | "Inactive";

export type IdentifiableEntity = {
    id: string;
}

export type DataSource = {
    getActors(): (Actor & IdentifiableEntity)[];
    getLicenses(): (License & IdentifiableEntity)[];
    getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole, status?: RelationStatus): (License & IdentifiableEntity)[];
    getLicenseInfo(license: License, actor: IdentifiableEntity): LicenseRelation;
    getLicenseActors(license: IdentifiableEntity, role: LicenseRole): (Actor & IdentifiableEntity)[];
    getActor(actor: IdentifiableEntity): Actor & IdentifiableEntity;
    getLicense(license: IdentifiableEntity): License & IdentifiableEntity;
}

export class StaticDataSource implements DataSource {
    actors: Record<string, Actor>;
    licenses: Record<string, License>;
    constructor(actors: Record<string, Actor>, licenses: Record<string, License>) {
        this.actors = actors;
        this.licenses = licenses;
    }
    getActors(): (Actor & IdentifiableEntity)[] {
        return Object.entries(this.actors).map(([id, value]) => ({
            id,
            ...value
        }))
    }
    getLicenses(): (License & IdentifiableEntity)[] {
        return Object.entries(this.licenses).map(([id, value]) => ({
            id,
            ...value
        }))
    }
    getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole, status?: RelationStatus): (License & IdentifiableEntity)[] {
        return this.getLicenses().filter(l => l.actors.some(a => (
            a.actorId === actor.id &&
            (!role || a.role === role) &&
            (status === undefined || a.status === status)
        )))
    }
    getLicenseInfo(license: License, actor: IdentifiableEntity): LicenseRelation {
        return license.actors.filter(a => a.actorId === actor.id)[0]
    }
    getLicenseActors(license: IdentifiableEntity, role: LicenseRole): (Actor & IdentifiableEntity)[] {
        return this.getLicense(license).actors.filter(a => a.role === role).map(a => this.getActor({id: a.actorId}))
    }
    getActor(identifier: IdentifiableEntity): Actor & IdentifiableEntity {
        const actor = this.actors[identifier.id];
        if (actor) {
            return {
                ...identifier,
                ...actor
            }
        }
        throw new Error(`Missing actor id ${identifier.id}`);
    }
    getLicense(identifier: IdentifiableEntity): License & IdentifiableEntity {
        const license = this.licenses[identifier.id];
        if (license) {
            return {
                ...identifier,
                ...license
            }
        }
        throw new Error(`Missing license id ${identifier.id}`);
    }
}

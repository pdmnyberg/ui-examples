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

export type DataLoading<T> = {
    data?: T,
    error: unknown,
    isLoading?: boolean,
}

export type DataSource = {
    getActors(): DataLoading<(Actor & IdentifiableEntity)[]>;
    getLicenses(): DataLoading<(License & IdentifiableEntity)[]>;
    getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole, status?: RelationStatus): (License & IdentifiableEntity)[];
    getLicenseInfo(license: License, actor: IdentifiableEntity): LicenseRelation;
    getLicenseActors(license: IdentifiableEntity, role: LicenseRole): (Actor & IdentifiableEntity)[];
    getActor(actor: IdentifiableEntity): DataLoading<Actor & IdentifiableEntity>;
    getLicense(license: IdentifiableEntity): DataLoading<License & IdentifiableEntity>;
}

export class StaticDataSource implements DataSource {
    actors: Record<string, Actor>;
    licenses: Record<string, License>;
    isLoading: boolean;
    constructor(actors: Record<string, Actor>, licenses: Record<string, License>, isLoading: boolean) {
        this.actors = actors;
        this.licenses = licenses;
        this.isLoading = isLoading;
    }
    getActors() {
        return this.isLoading ? this._getResult([], true) : this._getResult(this._getActors(), false)
    }
    _getActors(): (Actor & IdentifiableEntity)[] {
        return Object.entries(this.actors).map(([id, value]) => ({
            id,
            ...value
        }))
    }
    getLicenses() {
        return this.isLoading ? this._getResult([], true) : this._getResult(this._getLicenses(), false);
    }
    _getLicenses(): (License & IdentifiableEntity)[] {
        return Object.entries(this.licenses).map(([id, value]) => ({
            id,
            ...value
        }))
    }
    getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole, status?: RelationStatus): (License & IdentifiableEntity)[] {
        return this._getLicenses().filter(l => l.actors.some(a => (
            a.actorId === actor.id &&
            (!role || a.role === role) &&
            (status === undefined || a.status === status)
        )))
    }
    getLicenseInfo(license: License, actor: IdentifiableEntity): LicenseRelation {
        return license.actors.filter(a => a.actorId === actor.id)[0]
    }
    getLicenseActors(license: IdentifiableEntity, role: LicenseRole): (Actor & IdentifiableEntity)[] {
        return this._getLicense(license).actors.filter(a => a.role === role).map(a => this._getActor({id: a.actorId}))
    }
    getActor(identifier: IdentifiableEntity) {
        try {
            return this.isLoading ? this._getResult(undefined, true) : this._getResult(this._getActor(identifier), false);
        } catch (e) {
            return this._getResult(undefined, false, e);
        }
    }
    _getActor(identifier: IdentifiableEntity): Actor & IdentifiableEntity {
        const actor = this.actors[identifier.id];
        if (actor) {
            return {
                ...identifier,
                ...actor
            }
        }
        throw new Error(`Missing actor id ${identifier.id}`);
    }
    getLicense(identifier: IdentifiableEntity) {
        try {
            return this.isLoading ? this._getResult(undefined, true) : this._getResult(this._getLicense(identifier), false)
        } catch (e) {
            return this._getResult(undefined, false, e);
        }
    }
    _getLicense(identifier: IdentifiableEntity): License & IdentifiableEntity {
        const license = this.licenses[identifier.id];
        if (license) {
            return {
                ...identifier,
                ...license
            }
        }
        throw new Error(`Missing license id ${identifier.id}`);
    }
    _getResult<T>(data: T, isLoading: boolean, error?: unknown | undefined) {
        return {data, error, isLoading}
    }
}

export function getOrDefault<T, V, D>(value: DataLoading<T> | undefined, getter: (x: T) => V, defaultValue: D): V | D {
    return value && value.data ? getter(value.data) : defaultValue;
}
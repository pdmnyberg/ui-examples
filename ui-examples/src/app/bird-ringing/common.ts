export type Actor = IdentifiableEntity & {
    name: string;
    email?: string;
    updatedAt: string;
    type: ActorType;
    sex: Sex,
    city: string;
    birthDate?: Date;
}

export type Sex = "Male" | "Female" | "Undisclosed" | "N/A"

export type ActorType = "Organization" | "Person";

export type ReportStatus = "Yes" | "No" | "Incomplete";

export type LicenseStatus = "Active" | "Not active" | "Discontinued";

export type LicenseRole = "Ringer" | "Helper" | "Associate" | "Communication";

export type ActorRef = IdentifiableEntity & {type: "actor"};
export type LicenseRef = IdentifiableEntity & {type: "license"};
export type SpeciesRef = IdentifiableEntity & {type: "species"};
export type PermissionTypeRef = IdentifiableEntity & {type: "permission-type"};
export type PermissionPropertyRef = IdentifiableEntity & {type: "permission-property"};

export type License = IdentifiableEntity & {
    mnr: string;
    status: LicenseStatus,
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    startsAt: string;
    permissions: Permission[];
    region: string;
    description: string;
    actors: LicenseRelation[];
    reportStatus: ReportStatus;
}

export type LicenseRelation = {
    actor: ActorRef;
    mednr?: string;
    role: LicenseRole;
    licenseSentAt: string;
    licenseSentStatus: string;
    status: RelationStatus;
}

export type LicenseDocument = IdentifiableEntity & {
    actor: ActorRef;
    license: LicenseRef;
    type: string;
    createdAt: string;
    href: string;
}

export type Species = IdentifiableEntity & {
    name: string;
    scientificName: string;
    scientificCode: string;
}

export type PermissionType = IdentifiableEntity & {
    name: string;
    description: string;
}

export type PermissionProperty = IdentifiableEntity & {
    permissionType: PermissionTypeRef;
    name: string;
    description: string;
}

export type Permission = {
    type: PermissionTypeRef;
    speciesList: SpeciesRef[];
    properties: PermissionPropertyRef[];
    location: string;
    description: string;
    period: [string, string];
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
    getDocuments(license: IdentifiableEntity, actor: IdentifiableEntity): LicenseDocument[];
    getPermissionType(permission: IdentifiableEntity): PermissionType;
    getPermissionProperty(property: IdentifiableEntity): PermissionProperty;
    getSpecies(species: IdentifiableEntity): Species;
}

export class StaticDataSource implements DataSource {
    actors: Record<string, Actor>;
    licenses: Record<string, License>;
    documents: Record<string, LicenseDocument>;
    permissionTypes: Record<string, PermissionType>;
    permissionProperties: Record<string, PermissionProperty>;
    species: Record<string, Species>;
    isLoading: boolean;

    constructor(
        actors: Record<string, Actor>,
        licenses: Record<string, License>,
        documents: Record<string, LicenseDocument>,
        permissionTypes: Record<string, PermissionType>,
        permissionProperties: Record<string, PermissionProperty>,
        species: Record<string, Species>,
        isLoading: boolean
    ) {
        this.actors = actors;
        this.licenses = licenses;
        this.documents = documents;
        this.permissionTypes = permissionTypes;
        this.permissionProperties = permissionProperties;
        this.species = species;
        this.isLoading = isLoading;
    }
    getActors() {
        return this.isLoading ? this._getResult([], true) : this._getResult(this._getActors(), false)
    }
    _getActors(): Actor[] {
        return Object.values(this.actors);
    }
    getLicenses() {
        return this.isLoading ? this._getResult([], true) : this._getResult(this._getLicenses(), false);
    }
    _getLicenses(): (License & IdentifiableEntity)[] {
        return Object.values(this.licenses);
    }
    getActorLicenses(actor: IdentifiableEntity, role?: LicenseRole, status?: RelationStatus, filter: (r: LicenseRelation) => boolean = () => true): (License & IdentifiableEntity)[] {
        return this._getLicenses().filter(l => l.actors.some(a => (
            a.actor.id === actor.id &&
            (!role || a.role === role) &&
            (status === undefined || a.status === status) &&
            filter(a)
        )))
    }
    getLicenseInfo(license: License, actor: IdentifiableEntity): LicenseRelation {
        return license.actors.filter(a => a.actor.id === actor.id)[0]
    }
    getLicenseActors(license: IdentifiableEntity, role: LicenseRole): (Actor & IdentifiableEntity)[] {
        return this._getLicense(license).actors.filter(a => a.role === role).map(a => this._getActor({id: a.actor.id}))
    }
    getActor(identifier: IdentifiableEntity) {
        try {
            return this.isLoading ? this._getResult(undefined, true) : this._getResult(this._getActor(identifier), false);
        } catch (e) {
            return this._getResult(undefined, false, e);
        }
    }
    getPermissionType(permission: IdentifiableEntity): PermissionType {
        return this.permissionTypes[permission.id];
    }
    getPermissionProperty(property: IdentifiableEntity): PermissionProperty {
        return this.permissionProperties[property.id];
    }
    getSpecies(species: IdentifiableEntity): Species {
        return this.species[species.id];
    }
    _getActor(identifier: IdentifiableEntity): Actor {
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
    getDocuments(license: IdentifiableEntity, actor: IdentifiableEntity) {
        return Object.values(this.documents).filter(d => d.actor.id === actor.id && d.license.id === license.id)
    }
    _getLicense(identifier: IdentifiableEntity): License {
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
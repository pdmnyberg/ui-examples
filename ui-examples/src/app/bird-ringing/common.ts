import { AsyncDataSource, EntityRef, refsToSet, SearchFunction, StaticDataSource, toCertainList, toList } from "../common";

export type Actor = ActorRef & {
    name: string;
    email?: string;
    updatedAt: string;
    actorType: ActorType;
    sex: Sex,
    city: string;
    birthDate?: Date;
}

export type Sex = "Male" | "Female" | "Undisclosed" | "N/A"

export type ActorType = "Organization" | "Person";

export type ReportStatus = "Yes" | "No" | "Incomplete";

export type LicenseStatus = "Active" | "Not active" | "Discontinued";

export type LicenseRole = "Ringer" | "Helper" | "Associate" | "Communication";

export type RingStatus = "In stock" | "Assigned" | "In use" | "Observed" | "Decommissioned"

export type ActorRef = EntityRef<"actor">;
export type LicenseRef = EntityRef<"license">;
export type LicenseDocumentRef = EntityRef<"document">;
export type SpeciesRef = EntityRef<"species">;
export type PermissionTypeRef = EntityRef<"permission-type">;
export type PermissionPropertyRef = EntityRef<"permission-property">;
export type RingOrderRef = EntityRef<"ring-order">;
export type RingRef = EntityRef<"ring">;
export type RingTypeRef = EntityRef<"ring-type">;

export type License = LicenseRef & {
    mnr: string;
    status: LicenseStatus,
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    startsAt: string;
    permissions: Permission[];
    region: string;
    subRegion: string;
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

export type LicenseDocument = LicenseDocumentRef & {
    actor: ActorRef;
    license: LicenseRef;
    documentType: string;
    createdAt: string;
    href: string;
}

export type Species = SpeciesRef & {
    name: string;
    scientificName: string;
    scientificCode: string;
}

export type PermissionType = PermissionTypeRef & {
    name: string;
    description: string;
}

export type PermissionProperty = PermissionPropertyRef & {
    permissionType: PermissionTypeRef | null;
    name: string;
    description: string;
}

export type Permission = {
    permissionType: PermissionTypeRef;
    speciesList: SpeciesRef[];
    properties: PermissionPropertyRef[];
    location: string;
    description: string;
    period: [string, string];
}

export type Ring = RingRef & {
    identifier: string;
    order: RingOrderRef;
    license?: LicenseRef;
    status: RingStatus;
    changedAt: string;
    ringType: RingTypeRef;
}

export type RingOrder = RingOrderRef & {
    status: "Ordered" | "Delivered";
    identifier: string;
    manufacturer: string;
    ringType: RingTypeRef;
    changedAt: string;
}

export type RingType = RingTypeRef & {
    code: string;
    variant: "Round" | "Oval" | "Triangle";
    material: "Aluminium" | "Steel";
    prefix: string;
    numberOfDigits: number;
    diameter: number;
}

export type RelationStatus = "Active" | "Inactive";


export type DataLoading<T> = {
    data?: T,
    error: unknown,
    isLoading?: boolean,
}

export interface DataAPI {
    actors: AsyncDataSource<Actor>;
    licenses: AsyncDataSource<License, License, "license", {actorRef: EntityRef<"actor">, role: LicenseRole}>;
    documents: AsyncDataSource<LicenseDocument,LicenseDocument, "document", {actorRef: EntityRef<"actor">, licenseRef: EntityRef<"license">}>;
    permissionTypes: AsyncDataSource<PermissionType>;
    permissionProperties: AsyncDataSource<PermissionProperty>;
    species: AsyncDataSource<Species>;
    rings: AsyncDataSource<Ring>;
    ringOrders: AsyncDataSource<RingOrder>;
    ringTypes: AsyncDataSource<RingType>;
}

export interface SyncDataAPI {
    actors: StaticDataSource<Actor>;
    licenses: StaticDataSource<License>;
    documents: StaticDataSource<LicenseDocument>;
    permissionTypes: StaticDataSource<PermissionType>;
    permissionProperties: StaticDataSource<PermissionProperty>;
    species: StaticDataSource<Species>;
    rings: StaticDataSource<Ring>;
    ringOrders: StaticDataSource<RingOrder>;
    ringTypes: StaticDataSource<RingType>;
}

export function fetchItemList<T extends keyof Omit<DataAPI, "ringEvents">>(api: DataAPI, type: T, params: Parameters<DataAPI[T]["list"]>): ReturnType<DataAPI[T]["list"]> {
    const lister = api[type].list as (...args: Parameters<DataAPI[T]["list"]>) => ReturnType<DataAPI[T]["list"]>;
    return lister(...params);
}

export function fetchItem<T extends keyof Omit<DataAPI, "ringEvents">>(api: DataAPI, type: T, ref: EntityRef<NoInfer<T>>): ReturnType<DataAPI[T]["get"]> {
    const getter = api[type].get as (ref: EntityRef<T>) => ReturnType<DataAPI[T]["get"]>;
    return getter(ref);
}

export function createSyncStaticDataAPI({
    actors,
    licenses,
    rings,
    ringOrders,
    documents,
    permissionTypes,
    permissionProperties,
    species,
    ringTypes,
}: {
    actors: Record<string, Actor>,
    licenses: Record<string, License>,
    rings: Record<string, Ring>,
    ringOrders: Record<string, RingOrder>,
    documents: Record<string, LicenseDocument>,
    permissionTypes: Record<string, PermissionType>,
    permissionProperties: Record<string, PermissionProperty>,
    species: Record<string, Species>,
    ringTypes: Record<string, RingType>,
}): SyncDataAPI {
    return {
        actors: new StaticDataSource<Actor>(
            toList(actors || {}).map(v => toEntity(v, "actor")),
            actorFilter
        ),
        licenses: new StaticDataSource<License>(
            toList(licenses || {}).map(v => toEntity(v, "license")),
            licenseFilter
        ),
        documents: new StaticDataSource<LicenseDocument>(
            toList(documents || {}).map(v => toEntity(v, "document")),
            documentFilter
        ),
        permissionTypes: new StaticDataSource<PermissionType>(toList(permissionTypes || {}).map(v => toEntity(v, "permission-type"))),
        permissionProperties: new StaticDataSource<PermissionProperty>(toList(permissionProperties || {}).map(v => toEntity(v, "permission-property"))),
        species: new StaticDataSource<Species>(toList(species || {}).map(v => toEntity(v, "species"))),
        rings: new StaticDataSource<Ring>(toList(rings || {}).map(v => toEntity(v, "ring"))),
        ringOrders: new StaticDataSource<RingOrder>(toList(ringOrders || {}).map(v => toEntity(v, "ring-series"))),
        ringTypes: new StaticDataSource<RingType>(toList(ringTypes || {}).map(v => toEntity(v, "ring-series"))),
    }
}

export function createStaticDataAPI(
    actors: Record<string, Actor>,
    licenses: Record<string, License>,
    rings: Record<string, Ring>,
    ringOrders: Record<string, RingOrder>,
    documents: Record<string, LicenseDocument>,
    permissionTypes: Record<string, PermissionType>,
    permissionProperties: Record<string, PermissionProperty>,
    species: Record<string, Species>,
    ringTypes: Record<string, RingType>,
): DataAPI {
    const syncAPI = createSyncStaticDataAPI({
        actors,
        licenses,
        rings,
        ringOrders,
        documents,
        permissionTypes,
        permissionProperties,
        species,
        ringTypes,
    });
    return {
        actors: syncAPI.actors.toAsyncSource(),
        licenses: syncAPI.licenses.toAsyncSource(),
        documents: syncAPI.documents.toAsyncSource(),
        permissionTypes: syncAPI.permissionTypes.toAsyncSource(),
        permissionProperties: syncAPI.permissionProperties.toAsyncSource(),
        species: syncAPI.species.toAsyncSource(),
        rings: syncAPI.rings.toAsyncSource(),
        ringOrders: syncAPI.ringOrders.toAsyncSource(),
        ringTypes: syncAPI.ringTypes.toAsyncSource(),
    }
}

function toEntity<T, TT extends string>(value: T, type: TT): T & {type: TT} {
    return {
        type: type,
        ...value
    };
}

const licenseFilter: SearchFunction<EntityRef<"license"> & License, {actorRef: EntityRef<"actor">, role: LicenseRole}> = (license, props) => {
    const actors = refsToSet(props?.actorRef)
    const roles = new Set(toCertainList(props?.role))
    return license.actors.some(a => (roles.size === 0 || roles.has(a.role)) && (actors.size === 0 || actors.has(a.actor.id)))
}

const actorFilter: SearchFunction<EntityRef<"actor"> & Actor> = (actor, props) => {
    const ids = new Set(toCertainList(props?.id));
    return ids.size === 0 || ids.has(actor.id);
}

    const documentFilter: SearchFunction<EntityRef<"document"> & LicenseDocument, {actorRef: EntityRef<"actor">, licenseRef: EntityRef<"license">}> = (document, props) => {
    const actors = refsToSet(props?.actorRef)
    const licenses = refsToSet(props?.licenseRef)
    return (actors.size === 0 || actors.has(document.actor.id)) && (licenses.size === 0 || licenses.has(document.license.id))
}

export function getOrDefault<T, V, D>(value: DataLoading<T> | undefined, getter: (x: T) => V, defaultValue: D): V | D {
    return value && value.data ? getter(value.data) : defaultValue;
}

export function toLocalDate(d: string) {
    return new Date(d).toLocaleDateString()
}

export function toLocalTime(d: string) {
    return new Date(d).toLocaleString()
}

export function getActorLicenses(
    licenses: (EntityRef<"license"> & License)[],
    actor: EntityRef<"actor">,
    role?: LicenseRole,
    status?: RelationStatus
): (License & EntityRef<"license">)[] {
    return licenses.filter(l => l.actors.some(a => (
        a.actor.id === actor.id &&
        (!role || a.role === role) &&
        (status === undefined || a.status === status)
    )))
}

export function getLicenseInfo(license: License, actor: EntityRef<"actor">): LicenseRelation {
    return license.actors.filter(a => a.actor.id === actor.id)[0]
}

export function toRecord<T extends {id: string}>(items: T[]): Record<string, T> {
    return items.reduce<Record<string, T> >((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {})
}
"use client"
import { PropsWithChildren, useMemo } from "react";
import { Actor, DataAPI, License, LicenseDocument, LicenseRole, PermissionProperty, PermissionType, Ring, RingSeries, Species } from "./common";
import { EntityRef, SearchFunction, StaticDataSource, toList } from "../common";
import { fetchData } from "../utils";
import useSWR from "swr";
import { DataContext } from "./contexts";


function fetchAppData(
  [
    actorUrl,
    licenseUrl,
    licenseDocumentUrl,
    permissionTypeUrl,
    permissionPropertyUrl,
    speciesUrl,
    ringUrl,
    ringSeriesUrl
  ]: [string, string, string, string, string, string, string, string]
) {
  return Promise.all([
    fetchData<Record<string, Actor>>(actorUrl),
    fetchData<Record<string, License>>(licenseUrl),
    fetchData<Record<string, LicenseDocument>>(licenseDocumentUrl),
    fetchData<Record<string, PermissionType>>(permissionTypeUrl),
    fetchData<Record<string, PermissionProperty>>(permissionPropertyUrl),
    fetchData<Record<string, Species>>(speciesUrl),
    fetchData<Record<string, Ring>>(ringUrl),
    fetchData<Record<string, RingSeries>>(ringSeriesUrl),
  ]);
}

function toEntity<T, TT extends string>(value: T, type: TT): T & {type: TT} {
  return {
    type: type,
    ...value
  };
}

const licenseFilter: SearchFunction<EntityRef<"license"> & License, {actorRef: EntityRef<"actor">, role: LicenseRole}> = (license, props) => {
  const actors = refsToSet(props?.actorRef)
  const roles = new Set(toArray(props?.role))
  return license.actors.some(a => (roles.size === 0 || roles.has(a.role)) && (actors.size === 0 || actors.has(a.actor.id)))
}

const documentFilter: SearchFunction<EntityRef<"document"> & LicenseDocument, {actorRef: EntityRef<"actor">, licenseRef: EntityRef<"license">}> = (document, props) => {
  const actors = refsToSet(props?.actorRef)
  const licenses = refsToSet(props?.licenseRef)
  return (actors.size === 0 || actors.has(document.actor.id)) && (licenses.size === 0 || licenses.has(document.license.id))
}

function refsToSet(refs?: (EntityRef<string>[] | EntityRef<string>)): Set<string> {
  return new Set<string>(toArray(refs).map(a => a.id))
}

function toArray<T>(item?: T[] | T): T[] {
  return Array.isArray(item) ? item : (item ? [item] : [])
}

export function DataProvider({
  actorUrl,
  licenseUrl,
  licenseDocumentUrl,
  permissionTypeUrl,
  permissionPropertyUrl,
  speciesUrl,
  ringUrl,
  ringSeriesUrl,
  children,
}: PropsWithChildren<{
  actorUrl: string;
  licenseUrl: string;
  licenseDocumentUrl: string;
  permissionTypeUrl: string;
  permissionPropertyUrl: string;
  speciesUrl: string;
  ringUrl: string;
  ringSeriesUrl: string;
}>) {
  const {data, error, isLoading} = useSWR([
    actorUrl,
    licenseUrl,
    licenseDocumentUrl,
    permissionTypeUrl,
    permissionPropertyUrl,
    speciesUrl,
    ringUrl,
    ringSeriesUrl
  ], fetchAppData);
  if (error) {
    console.log(error);
  }
  const [
    actors,
    licenses,
    documents,
    permissionTypes,
    permissionProperties,
    species,
    rings,
    ringSeries,
  ] = (data || []);
  const dataSource = useMemo<DataAPI>(() => ({
    actors: new StaticDataSource<EntityRef<"actor"> & Actor>(toList(actors || {}).map(v => toEntity(v, "actor"))).toAsyncSource(),
    licenses: new StaticDataSource<EntityRef<"license"> & License>(
      toList(licenses || {}).map(v => toEntity(v, "license")),
      licenseFilter
    ).toAsyncSource(),
    documents: new StaticDataSource<EntityRef<"document"> & LicenseDocument>(
      toList(documents || {}).map(v => toEntity(v, "document")),
      documentFilter
    ).toAsyncSource(),
    permissionTypes: new StaticDataSource<EntityRef<"permission-type"> & PermissionType>(toList(permissionTypes || {}).map(v => toEntity(v, "permission-type"))).toAsyncSource(),
    permissionProperties: new StaticDataSource<EntityRef<"permission-property"> & PermissionProperty>(toList(permissionProperties || {}).map(v => toEntity(v, "permission-property"))).toAsyncSource(),
    species: new StaticDataSource<EntityRef<"species"> & Species>(toList(species || {}).map(v => toEntity(v, "species"))).toAsyncSource(),
    rings: new StaticDataSource<EntityRef<"ring"> & Ring>(toList(rings || {}).map(v => toEntity(v, "ring"))).toAsyncSource(),
    ringSeries: new StaticDataSource<EntityRef<"ring-series"> & RingSeries>(toList(ringSeries || {}).map(v => toEntity(v, "ring-series"))).toAsyncSource(),
  }), [data])
  return (
    isLoading ? <></> : <DataContext.Provider value={dataSource}>{children}</DataContext.Provider>
  )
}

export function birdRingingUrl(basePath: string, type: string) {
  return `${basePath}/data/bird-ringing/${type}.json`
}
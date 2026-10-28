"use client"
import { PropsWithChildren, useMemo } from "react";
import { Actor, DataAPI, License, LicenseDocument, PermissionProperty, PermissionType, Ring, RingSeries, Species } from "./common";
import { EntityRef, StaticDataSource, toList } from "../common";
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
    licenses: new StaticDataSource<EntityRef<"license"> & License>(toList(licenses || {}).map(v => toEntity(v, "license"))).toAsyncSource(),
    documents: new StaticDataSource<EntityRef<"document"> & LicenseDocument>(toList(documents || {}).map(v => toEntity(v, "document"))).toAsyncSource(),
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
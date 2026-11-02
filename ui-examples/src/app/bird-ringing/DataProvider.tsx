"use client"
import { PropsWithChildren, useMemo } from "react";
import { Actor, createStaticDataAPI, DataAPI, License, LicenseDocument, PermissionProperty, PermissionType, Ring, RingSeries, Species } from "./common";
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
  const dataSource = useMemo<DataAPI>(() => {
    const [
      actors,
      licenses,
      documents,
      permissionTypes,
      permissionProperties,
      species,
      rings,
      ringSeries,
    ] = (data || [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);
    return createStaticDataAPI(
      actors,
      licenses,
      rings,
      ringSeries,
      documents,
      permissionTypes,
      permissionProperties,
      species,
    )
  }, [data])
  return (
    isLoading ? <></> : <DataContext.Provider value={dataSource}>{children}</DataContext.Provider>
  )
}

export function birdRingingUrl(basePath: string, type: string) {
  return `${basePath}/data/bird-ringing/${type}.json`
}
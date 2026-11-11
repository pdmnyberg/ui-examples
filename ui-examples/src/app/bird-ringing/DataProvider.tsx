"use client"
import { PropsWithChildren, useMemo } from "react";
import {
  Actor,
  createStaticDataAPI,
  DataAPI,
  License,
  LicenseDocument,
  PermissionProperty,
  PermissionType,
  Ring,
  RingOrder,
  RingType,
  RingSeries,
  Species
} from "./common";
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
    ringOrdersUrl,
    ringTypesUrl,
    ringSeriesUrl,
  ]: [string, string, string, string, string, string, string, string, string, string]
) {
  return Promise.all([
    fetchData<Record<string, Actor>>(actorUrl),
    fetchData<Record<string, License>>(licenseUrl),
    fetchData<Record<string, LicenseDocument>>(licenseDocumentUrl),
    fetchData<Record<string, PermissionType>>(permissionTypeUrl),
    fetchData<Record<string, PermissionProperty>>(permissionPropertyUrl),
    fetchData<Record<string, Species>>(speciesUrl),
    fetchData<Record<string, Ring>>(ringUrl),
    fetchData<Record<string, RingOrder>>(ringOrdersUrl),
    fetchData<Record<string, RingType>>(ringTypesUrl),
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
  ringOrdersUrl,
  ringTypesUrl,
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
  ringOrdersUrl: string;
  ringTypesUrl: string;
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
    ringOrdersUrl,
    ringTypesUrl,
    ringSeriesUrl,
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
      ringOrders,
      ringTypes,
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
      {},
      {},
    ]);
    return createStaticDataAPI(
      actors,
      licenses,
      rings,
      ringOrders,
      documents,
      permissionTypes,
      permissionProperties,
      species,
      ringTypes,
      ringSeries,
    )
  }, [data])
  return (
    isLoading ? <></> : <DataContext.Provider value={dataSource}>{children}</DataContext.Provider>
  )
}

export function birdRingingUrl(basePath: string, type: string) {
  return `${basePath}/data/bird-ringing/${type}.json`
}
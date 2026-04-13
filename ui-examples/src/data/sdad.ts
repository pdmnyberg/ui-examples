import { Dataset, DatasetFile } from "@/app/sdad/types";
import { DataGenerator, getFixedRandom, RandomContext } from "./common";
import { v5 as uuidv5 } from "uuid";

export class SDADGenerator implements DataGenerator<{
    datasets: Record<string, Dataset>,
    files: Record<string, DatasetFile>,
}> {
    private randomContext: RandomContext;
    private datasetCount: number
    private fileCountRange: [number, number]
    private dateRange: [Date, Date]
    private namespace: string

    constructor(randomContext: RandomContext, datasetCount: number, fileCountRange: [number, number], dateRange: [Date, Date], namespace: string) {
        this.randomContext = randomContext;
        this.datasetCount = datasetCount;
        this.fileCountRange = fileCountRange;
        this.dateRange = dateRange;
        this.namespace = namespace
    }

    createDatasets(): Dataset[] {
        return Array.from({length: this.datasetCount}).map<Dataset>((_, index) => ({
            id: uuidv5(`dataset-${index}`, this.namespace),
            type: "dataset",
            files: this.randomContext.randint(...this.fileCountRange),
            size: this.randomContext.randint(1000, 1000000),
            date: this.randomContext.randdate(...this.dateRange).toISOString(),
        }));
    }

    createFiles(datasets: Dataset[]): DatasetFile[] {
        return datasets.flatMap<DatasetFile>((ds, di) => Array.from({length: ds.files}).map<DatasetFile>((_, fi) => ({
            id: uuidv5(`file-${di}-${fi}`, this.namespace),
            type: "dataset-file",
            dataset: {id: ds.id, type: "dataset"},
            checksums: Array.from({length: this.randomContext.randint(1, 10)}).map(() => this._getChecksum()),
            decryptedSize: Math.floor(ds.size / ds.files),
            downloadUrl: "",
            filePath: `file-${fi}`,
        })))
    }

    _getChecksum() {
        const base = "ALKDFSSOJFopAJFSoPAJSFAPOSJfPOASJFPOAJSFGAOGJAaIODGJAAOLDGIOGHJEPIOHAIOGHJAIGHADVJNAIOSDFHIAOWHIOAHSDFJIAOHSDFAIOFHSA";
        const start = this.randomContext.randint(0, base.length);
        return (base + base).slice(start, start + 16);
    }

    _toRecord<T extends { id: string }>(items: T[]): Record<string, T> {
        return items.reduce<Record<string, T>>((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {})
    }

    createData() {
        const datasets = this.createDatasets();
        const files = this.createFiles(datasets);
        return {
            datasets: this._toRecord(datasets),
            files: this._toRecord(files),
        }
    }
}

export function getGenerator() {
    return new SDADGenerator(
        getFixedRandom(),
        100,
        [10, 100],
        [new Date("2020-01-01T00:00:00.000Z"), new Date("2025-01-01T00:00:00.000Z")],
        uuidv5("sdad", "00000000-0000-0000-0000-000000000000"),
    )
}
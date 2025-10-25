import fs from "node:fs";
import { generator as birdRinging } from "./bird-ringing";
import { DataGenerator } from "./common";



function main(rootPath: string = "public/data") {
    const generators: Record<string, DataGenerator<object>> = {
        "bird-ringing": birdRinging,
    }

    for (const key in generators) {
        const dirPath = `${rootPath}/${key}`;
        fs.mkdirSync(dirPath, {recursive: true});

        const generator = generators[key];
        const content = generator.createData();
        Object.entries(content).forEach(([contentKey, value]) => {
            const data = JSON.stringify(value, undefined, "  ");
            const outputFile = `${dirPath}/${contentKey}.json`
            console.log(key, outputFile);
            fs.writeFileSync(outputFile, data);
        })
    }
}

main()
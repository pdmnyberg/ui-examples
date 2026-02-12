import { Activity, Log, Organization, Person, Priority, ScheduleSpecification, User, UserRef, UserRole } from "@/app/health-care/common";
import { DataGenerator, getFixedRandom, RandomContext } from "./common";
import { CommonDataSource, getCommonData } from "./common-data";

export class HealtCareDataGenerator implements DataGenerator<{
    users: Record<string, User>,
    activities: Record<string, Activity>,
    logs: Record<string, Log>,
    notifications: Record<string, Notification>,
    people: Record<string, Person>,
    organizations: Record<string, Organization>,
}> {
    randomContext: RandomContext;
    period: [Date, Date];
    dataSource: CommonDataSource;

    constructor(randomContext: RandomContext, dataSource: CommonDataSource, period: [Date, Date]) {
        this.randomContext = randomContext;
        this.dataSource = dataSource;
        this.period = period;
    }

    createOrganizations(numberOfOrganizations: number): Organization[] {
        const groupNames = this.dataSource.groupNames;
        const regionNames = this.dataSource.regionNames;
        return Array.from({length: numberOfOrganizations}).map<Organization>((_, index) => {
            const name = `${this.randomContext.choice(groupNames)} ${this.randomContext.choice(regionNames)}`;
            return {
                id: `organization-${index}`,
                type: "organization",
                name,
            }
        })
    }

    createPeople(numberOfPeople: number): Person[] {
        const givenNames = [...this.dataSource.maleNames, ...this.dataSource.femaleNames];
        const familyNames = this.dataSource.familyNames;
        return Array.from({length: numberOfPeople}).map<Person>((_, index) => {
            const name = this.randomContext.choice(givenNames);
            const fullName = `${name} ${this.randomContext.choice(familyNames)}`;
            return {
                id: `person-${index}`,
                type: "person",
                name,
                fullName,
                notes: "",
            }
        })
    }

    createUsers(people: Person[], organizations: Organization[]): User[] {
        const users = people.map<Omit<User, "roles">>((person, index) => {
            return {
                type: "user",
                id: `user-${index}`,
                username: person.fullName.toLowerCase().replaceAll(" ", "-"),
                person: {type: "person", id: person.id}
            }
        });

        return users.map<User>(user => {
            return {
                ...user,
                roles: this.randomContext.choices<UserRole>([
                    {type: "care-recipient", organization: this.randomContext.choice(organizations)},
                    {type: "care-recipient-relation", recipient: this.randomContext.choice(users.filter(u => u.id !== user.id).map<UserRef>(u => ({type: "user", id: u.id})))},
                    {type: "care-taker", organization: this.randomContext.choice(organizations)}
                ], this.randomContext.randint(1, 2))
            }
        });
    }

    createActivities(numberOfActivities: number, users: User[]): Activity[] {
        const recipients = users.filter(user => user.roles.some(r => r.type === "care-recipient"));
        const careTakers = users.filter(user => user.roles.some(r => r.type === "care-taker"));
        return Array.from({length: numberOfActivities}).map<Activity>((_, index) => {
            const recipient = this.randomContext.choice(recipients);
            const useSchedule = this.randomContext.randbool();
            const isCertain = this.randomContext.randbool()
            const schedule: ScheduleSpecification = isCertain ? {
                certainty: "certain",
                time: this.randomContext.randdate(this.period[0], this.period[1])
            } : {
                certainty: "uncertain",
                time: this.randomContext.randdate(this.period[0], this.period[1]),
                timeRange: this.randomContext.randint(1, 5) * 3600 * 24,
            }
            const startDate = schedule.time;
            return {
                id: `activity-${index}`,
                type: "activity",
                createdAt: this.randomContext.randdate(startDate, this.period[1]),
                createdBy: this._toRef(this.randomContext.choice(careTakers)),
                recipient: this._toRef(recipient),
                title: "Någonting att göra",
                content: "Detaljer om vad som ska göras",
                timeNeeded: this.randomContext.randint(1, 5) * 3600,
                priority: this.randomContext.choice<Priority>(["danger", "info", "primary", "secondary", "success", "warning"]),
                status: this.randomContext.choice<Activity["status"]>(["accepted", "done", "new"]),
                schedule: useSchedule ? schedule : undefined,
            }
        })
    }

    _toRecord<T extends {id: string}>(items: T[]): Record<string, T> {
        return items.reduce<Record<string, T>>((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {})
    }

    _toRef<T extends {id: string, type: unknown}>(obj: T): Pick<T, "id" | "type"> {
        return {
            id: obj.id,
            type: obj.type
        }
    }

    createData() {
        const people = this.createPeople(100);
        const organizations = this.createOrganizations(5);
        const users = this.createUsers(people, organizations);
        return {
            organizations: this._toRecord(organizations),
            people: this._toRecord(people),
            users: this._toRecord(users),
            activities: this._toRecord(this.createActivities(1000, users)),
            logs: {},
            notifications: {}
        }
    }
}

export function getGenerator() {
    return new HealtCareDataGenerator(
        getFixedRandom(),
        getCommonData(),
        [new Date("2026-01-01T00:00:00.000Z"), new Date("2027-01-01T00:00:00.000Z")],
    )
}
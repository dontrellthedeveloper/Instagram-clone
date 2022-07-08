import React, {useEffect, useState} from 'react';
import { faker } from '@faker-js/faker';
import Story from "./Story";


function Stories2() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(()=> {
        const suggestions = [...Array(20)].map((_, i) => ({
            // ...faker.helpers.contextualCard(),
            id: i,
            name: faker.name.firstName(),
            username: faker.internet.userName(),
            avatar: faker.internet.avatar(),
            email: faker.internet.email(),
            dob: faker.date.birthdate(),
            phone: faker.phone.number(),
            address: {
                street: faker.address.streetAddress(false),
                suite: faker.address.secondaryAddress(),
                city: faker.address.city(),
                zipcode: faker.address.zipCode(),
                state: faker.address.state(),
                geo: faker.address.nearbyGPSCoordinate()
            },
            website: faker.internet.domainName(),
            company: {
                name: faker.company.companyName(),
                catchPhrase: faker.company.catchPhraseNoun(),
                bs: faker.company.bs()
            }
        }));

        console.log(suggestions);
        setSuggestions(suggestions);
    },[])
    return (
        <div>
            {suggestions.map((profile) => (
                <Story key={profile.id} img={profile.avatar} username={profile.username}
                />
            ))}

        </div>
    );
}

export default Stories2;
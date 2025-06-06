const input = require("./input.json");

/**
 * Transforms an array of titles into Prismic accordion objects
 * @param {string[]} titles - Array of accordion titles
 * @returns {Object[]} Array of Prismic accordion objects
 */
const createAccordionObjects = (titles) => {
    return titles.map(title => ({
        accordionTitle: title,
        accordionDescription: [
            {
                type: "paragraph",
                text: "", // Empty description by default
                spans: [],
                direction: "ltr"
            }
        ],
        accordionAction: {
            link_type: "Any"
        }
    }));
};

/**
 * Creates Prismic accordion objects with article content
 * @param {Object[]} data - Array of objects containing title and articles
 * @returns {Object[]} Array of Prismic accordion objects
 */
const createAccordionObjectsWithContent = (data) => {
    return data.map(section => ({
        accordionTitle: section.title,
        accordionDescription: section.articles.map(article => ({
            type: "paragraph",
            text: `${article.title}\n${article.author}`,
            spans: [
                {
                    start: 0,
                    end: article.title.length,
                    type: "hyperlink",
                    data: {
                        link_type: "Web",
                        url: article.url
                    }
                }
            ],
            direction: "ltr"
        })),
        accordionAction: {
            link_type: "Any"
        }
    }));
};

/**
 * Example usage:
 * const titles = ["Spring 2025", "Winter 2024-2025", ...];
 * const accordionObjects = createAccordionObjects(titles);
 */

const titles = [
    "Spring 2025",
    "Winter 2024-2025",
    "Fall 2024",
    "Summer 2024",
    "January/February 2024",
    "November/December 2023",
    "September/October 2023",
    "July/August 2023",
    "May/June 2023",
    "March/April 2023",
    "January/February 2023",
    "November/December 2022",
    "September/October 2022",
    "July/August 2022",
    "May/June 2022",
    "March/April 2022",
    "January/February 2022",
    "November/December 2021",
    "September/October 2021",
    "July/August 2021",
    "May/June 2021",
    "March/April 2021",
    "January/February 2021",
    "November/December 2020",
    "September/October 2020",
    "July/August 2020",
    "May/June 2020",
    "March/ April 2020",
    "January/ February 2020",
    "November /December  2019",
    "September/ October 2019",
    "July/August 2019",
    "May/June 2019",
    "March/April 2019",
    "January/February 2019",
    "November/December 2018",
    "September/October 2018"
]



const fs = require('fs');
const output = JSON.stringify(createAccordionObjectsWithContent(input), null, 2);
fs.writeFileSync('output.json', output);

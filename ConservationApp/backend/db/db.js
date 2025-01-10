import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function dropTables() {
  try {
    await pool.query("DROP TABLE IF EXISTS animal");
    // plant_soil is plant2
    await pool.query("DROP TABLE IF EXISTS plant_soil");
    // soil_info is plant1
    await pool.query("DROP TABLE IF EXISTS soil_info");
    await pool.query("DROP TABLE IF EXISTS medical_incident_documents");
    await pool.query("DROP TABLE IF EXISTS houses");
    await pool.query("DROP TABLE IF EXISTS mates_with");
    await pool.query("DROP TABLE IF EXISTS researches");
    await pool.query("DROP TABLE IF EXISTS organism_belongs_to");
    await pool.query("DROP TABLE IF EXISTS species");
    // researcher_topic is researcher2
    await pool.query("DROP TABLE IF EXISTS researcher_topic");
    // researcher_name is researcher1
    await pool.query("DROP TABLE IF EXISTS researcher_name");
    // research_info is researcher3
    await pool.query("DROP TABLE IF EXISTS research_info");
    // habitat_coord is habitat_contained3
    await pool.query("DROP TABLE IF EXISTS habitat_coord");
    await pool.query("DROP TABLE IF EXISTS protects");
    await pool.query("DROP TABLE IF EXISTS monitors");
    await pool.query("DROP TABLE IF EXISTS region");
    // habitat_temp is habitat_contained1
    await pool.query("DROP TABLE IF EXISTS habitat_temp");
    // habitat_biome is habitat_contained2
    await pool.query("DROP TABLE IF EXISTS habitat_biome");
    // ranger_experience is ranger4
    await pool.query("DROP TABLE IF EXISTS ranger_experience");
    // ranger_age is ranger3
    await pool.query("DROP TABLE IF EXISTS ranger_age");
    // ranger_number is ranger1
    await pool.query("DROP TABLE IF EXISTS ranger_number");
    // ranger_certification is ranger2
    await pool.query("DROP TABLE IF EXISTS ranger_certification");
    await pool.query("DROP TABLE IF EXISTS donates");
    // project_info is project2
    await pool.query("DROP TABLE IF EXISTS project_info");
    // project_status is project1
    await pool.query("DROP TABLE IF EXISTS project_status");
    await pool.query("DROP TABLE IF EXISTS donor");
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await pool.query(
      `CREATE TABLE species
             (
                 scientific_name   VARCHAR(255) PRIMARY KEY,
                 common_name       VARCHAR(255) UNIQUE,
                 endangered_status CHAR(2)
             );`
    );
    await pool.query(
      `CREATE TABLE organism_belongs_to
             (
                 tag          INT GENERATED ALWAYS AS IDENTITY,
                 sex          CHAR(1),
                 age          INT,
                 species_name VARCHAR(255) NOT NULL,
                 PRIMARY KEY (tag),
                 FOREIGN KEY (species_name) REFERENCES species (scientific_name) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE soil_info
             (
                 is_evergreen BOOLEAN,
                 soil_type    VARCHAR(20),
                 PRIMARY KEY (soil_type)
             );`
    );
    await pool.query(
      `CREATE TABLE plant_soil
             (
                 soil_type    VARCHAR(20),
                 organism_tag INT,
                 PRIMARY KEY (organism_tag),
                 FOREIGN KEY (organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE,
                 FOREIGN KEY (soil_type) REFERENCES soil_info (soil_type) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE animal
             (
                 diet_type    VARCHAR(20),
                 organism_tag INT,
                 PRIMARY KEY (organism_tag),
                 FOREIGN KEY (organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE researcher_name
             (
                 id   INT GENERATED ALWAYS AS IDENTITY,
                 name VARCHAR(255),
                 PRIMARY KEY (id)
             );`
    );
    await pool.query(
      `CREATE TABLE research_info
             (
                 research_topic VARCHAR(255),
                 department     VARCHAR(255),
                 PRIMARY KEY (research_topic)
             );`
    );
    await pool.query(
      `CREATE TABLE researcher_topic
             (
                 id             INT,
                 research_topic VARCHAR(255),
                 PRIMARY KEY (id),
                 FOREIGN KEY (id) REFERENCES researcher_name (id) ON DELETE CASCADE,
                 FOREIGN KEY (research_topic) REFERENCES research_info (research_topic) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE region
             (
                 code_name VARCHAR(5),
                 name      VARCHAR(255) UNIQUE,
                 continent VARCHAR(20),
                 PRIMARY KEY (code_name)
             );`
    );
    await pool.query(
      `CREATE TABLE habitat_temp
             (
                 temperature       REAL,
                 containing_region VARCHAR(5),
                 PRIMARY KEY (containing_region)
             );`
    );
    await pool.query(
      `CREATE TABLE habitat_biome
             (
                 biome             VARCHAR(255),
                 containing_region VARCHAR(255),
                 PRIMARY KEY (containing_region)
             );`
    );
    await pool.query(
      `CREATE TABLE habitat_coord
             (
                 x_coord           REAL,
                 y_coord           REAL,
                 containing_region VARCHAR(255),
                 PRIMARY KEY (x_coord, y_coord),
                 FOREIGN KEY (containing_region) REFERENCES region (code_name) ON DELETE CASCADE,
                 FOREIGN KEY (containing_region) REFERENCES habitat_temp (containing_region) ON DELETE CASCADE,
                 FOREIGN KEY (containing_region) REFERENCES habitat_biome (containing_region) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE ranger_number
             (
                 badge_number INT GENERATED ALWAYS AS IDENTITY,
                 name         VARCHAR(255),
                 PRIMARY KEY (badge_number)
             );`
    );
    await pool.query(
      `CREATE TABLE ranger_certification
             (
                 experience          VARCHAR(255),
                 certification_level INT,
                 PRIMARY KEY (certification_level)
             );`
    );
    await pool.query(
      `CREATE TABLE ranger_age
             (
                 badge_number INT,
                 age          INT,
                 PRIMARY KEY (badge_number),
                 FOREIGN KEY (badge_number) REFERENCES ranger_number (badge_number) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE ranger_experience
             (
                 badge_number        INT,
                 certification_level INT,
                 PRIMARY KEY (badge_number),
                 FOREIGN KEY (badge_number) REFERENCES ranger_number (badge_number) ON DELETE CASCADE,
                 FOREIGN KEY (badge_number) REFERENCES ranger_age (badge_number) ON DELETE CASCADE,
                 FOREIGN KEY (certification_level) REFERENCES ranger_certification (certification_level) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE project_status
             (
                 start_date DATE,
                 end_date   DATE,
                 status     VARCHAR(20),
                 PRIMARY KEY (start_date, end_date)
             );`
    );
    await pool.query(
      `CREATE TABLE project_info
             (
                 operation_name VARCHAR(255),
                 budget         INT,
                 start_date     DATE,
                 end_date       DATE,
                 PRIMARY KEY (operation_name),
                 FOREIGN KEY (start_date, end_date) REFERENCES project_status (start_date, end_date)
             );`
    );
    await pool.query(
      `CREATE TABLE donor
             (
                 id          INT GENERATED ALWAYS AS IDENTITY,
                 name        VARCHAR(255),
                 email       VARCHAR(255),
                 address     VARCHAR(255),
                 affiliation VARCHAR(255),
                 PRIMARY KEY (id),
                 UNIQUE (name, email)
             );`
    );
    await pool.query(
      `CREATE TABLE medical_incident_documents
             (
                 disease_name  VARCHAR(50),
                 incident_date DATE,
                 organism_tag  INT,
                 PRIMARY KEY (disease_name, incident_date, organism_tag),
                 FOREIGN KEY (organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE donates
             (
                 amount                 INT,
                 donor_id               INT,
                 project_operation_name VARCHAR(255),
                 PRIMARY KEY (donor_id, project_operation_name),
                 FOREIGN KEY (donor_id) REFERENCES donor (id) ON DELETE CASCADE,
                 FOREIGN KEY (project_operation_name) REFERENCES project_info (operation_name) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE protects
             (
                 project_operation_name VARCHAR(255),
                 region_code_name       VARCHAR(255),
                 PRIMARY KEY (project_operation_name, region_code_name),
                 FOREIGN KEY (project_operation_name) REFERENCES project_info (operation_name) ON DELETE CASCADE,
                 FOREIGN KEY (region_code_name) REFERENCES region (code_name) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE houses
             (
                 organism_tag    INT,
                 habitat_x_coord REAL,
                 habitat_y_coord REAL,
                 PRIMARY KEY (organism_tag, habitat_x_coord, habitat_y_coord),
                 FOREIGN KEY (organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE,
                 FOREIGN KEY (habitat_x_coord, habitat_y_coord) REFERENCES habitat_coord (x_coord, y_coord) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE monitors
             (
                 region_code_name    VARCHAR(255),
                 ranger_badge_number INT,
                 PRIMARY KEY (region_code_name, ranger_badge_number),
                 FOREIGN KEY (region_code_name) REFERENCES region (code_name) ON DELETE CASCADE,
                 FOREIGN KEY (ranger_badge_number) REFERENCES ranger_number (badge_number) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE mates_with
             (
                 female_organism_tag INT,
                 male_organism_tag   INT,
                 PRIMARY KEY (female_organism_tag, male_organism_tag),
                 FOREIGN KEY (female_organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE,
                 FOREIGN KEY (male_organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE
             );`
    );
    await pool.query(
      `CREATE TABLE researches
             (
                 researcher_id INT,
                 organism_tag  INT,
                 PRIMARY KEY (researcher_id, organism_tag),
                 FOREIGN KEY (researcher_id) REFERENCES researcher_name (id) ON DELETE CASCADE,
                 FOREIGN KEY (organism_tag) REFERENCES organism_belongs_to (tag) ON DELETE CASCADE
             );`
    );
  } catch (error) {
    throw error;
  }
}

async function insertSampleData() {
  try {
    // insert sample data
    await pool.query(
      `INSERT INTO species (scientific_name, common_name, endangered_status)
             VALUES ('Panthera leo', 'Lion', 'VU'),
                    ('Elephas maximus', 'Asian Elephant', 'EN'),
                    ('Gorilla beringei', 'Mountain Gorilla', 'CR'),
                    ('Ursus maritimus', 'Polar Bear', 'VU'),
                    ('Ailuropoda melanoleuca', 'Giant Panda', 'VU'),
                    ('Rhinoceros unicornis', 'Indian Rhinoceros', 'VU'),
                    ('Chelonia mydas', 'Green Sea Turtle', 'EN'),
                    ('Panthera tigris', 'Tiger', 'EN'),
                    ('Balaenoptera musculus', 'Blue Whale', 'EN'),
                    ('Phoenicopterus roseus', 'Greater Flamingo', 'LC'),
                    ('Quercus robur', 'English Oak', 'LC'),
                    ('Pinus sylvestris', 'Scots Pine', 'LC'),
                    ('Acer saccharum', 'Sugar Maple', 'LC'),
                    ('Sequoia sempervirens', 'Coast Redwood', 'EN'),
                    ('Ficus benghalensis', 'Banyan Tree', 'LC'),
                    ('Eucalyptus globulus', 'Blue Gum', 'LC'),
                    ('Taxus baccata', 'European Yew', 'VU'),
                    ('Betula pendula', 'Silver Birch', 'LC'),
                    ('Cedrus libani', 'Cedar of Lebanon', 'VU'),
                    ('Prunus avium', 'Wild Cherry', 'LC');`
    );
    await pool.query(
      `INSERT INTO organism_belongs_to (sex, age, species_name)
             VALUES ('M', 8, 'Panthera leo'),
                    ('F', 5, 'Panthera leo'),
                    ('M', 3, 'Panthera leo'),
                    ('F', 10, 'Ursus maritimus'),
                    ('M', 6, 'Ailuropoda melanoleuca'),
                    ('F', 15, 'Chelonia mydas'),
                    ('M', 20, 'Chelonia mydas'),
                    ('F', 7, 'Panthera tigris'),
                    ('M', 25, 'Balaenoptera musculus'),
                    ('F', 12, 'Balaenoptera musculus'),
                    ('N', 50, 'Quercus robur'),
                    ('N', 80, 'Pinus sylvestris'),
                    ('N', 120, 'Acer saccharum'),
                    ('N', 200, 'Sequoia sempervirens'),
                    ('N', 70, 'Ficus benghalensis'),
                    ('N', 30, 'Eucalyptus globulus'),
                    ('N', 300, 'Taxus baccata'),
                    ('N', 40, 'Betula pendula'),
                    ('N', 100, 'Cedrus libani'),
                    ('N', 25, 'Prunus avium');`
    );
    await pool.query(
      `INSERT INTO soil_info (is_evergreen, soil_type)
             VALUES (TRUE, 'Loamy'),
                    (FALSE, 'Clay'),
                    (TRUE, 'Sandy'),
                    (FALSE, 'Peaty'),
                    (TRUE, 'Chalky'),
                    (FALSE, 'Silty'),
                    (TRUE, 'Gravelly'),
                    (TRUE, 'Alluvial'),
                    (FALSE, 'Volcanic'),
                    (TRUE, 'Podzol');`
    );
    await pool.query(
      `INSERT INTO plant_soil (soil_type, organism_tag)
             VALUES ('Loamy', 11),
                    ('Sandy', 12),
                    ('Loamy', 13),
                    ('Loamy', 14),
                    ('Peaty', 15),
                    ('Alluvial', 16),
                    ('Loamy', 17),
                    ('Clay', 18),
                    ('Chalky', 19),
                    ('Sandy', 20);`
    );
    await pool.query(
      `INSERT INTO animal (diet_type, organism_tag)
             VALUES ('Carnivore', 1),
                    ('Carnivore', 2),
                    ('Carnivore', 3),
                    ('Carnivore', 4),
                    ('Herbivore', 5),
                    ('Herbivore', 6),
                    ('Omnivore', 7),
                    ('Carnivore', 8),
                    ('Carnivore', 9),
                    ('Carnivore', 10);`
    );
    await pool.query(
      `INSERT INTO researcher_name (name)
             VALUES ('Jane Goodall'),
                    ('Charles Darwin'),
                    ('Konrad Lorenz'),
                    ('Birutė Galdikas'),
                    ('E.O. Wilson'),
                    ('Temple Grandin'),
                    ('Dian Fossey'),
                    ('Pan Wenshi'),
                    ('Kinji Imanishi'),
                    ('Salim Ali');`
    );
    await pool.query(
      `INSERT INTO research_info (research_topic, department)
             VALUES ('Wildlife Conservation', 'Biology'),
                    ('Biodiversity Preservation', 'Environmental Science'),
                    ('Habitat Restoration', 'Ecology'),
                    ('Endangered Species Protection', 'Zoology'),
                    ('Forest Conservation', 'Environmental Science'),
                    ('Marine Ecosystem Conservation', 'Marine Biology'),
                    ('Sustainable Agriculture', 'Agriculture and Environmental Science'),
                    ('Climate Change and Conservation', 'Environmental Science'),
                    ('Conservation Genetics', 'Biotechnology'),
                    ('Invasive Species Management', 'Ecology');`
    );
    await pool.query(
      `INSERT INTO researcher_topic (id, research_topic)
             VALUES (1, 'Wildlife Conservation'),
                    (2, 'Biodiversity Preservation'),
                    (3, 'Habitat Restoration'),
                    (4, 'Endangered Species Protection'),
                    (5, 'Forest Conservation'),
                    (6, 'Wildlife Conservation'),
                    (7, 'Sustainable Agriculture'),
                    (8, 'Climate Change and Conservation'),
                    (9, 'Conservation Genetics'),
                    (10, 'Invasive Species Management');`
    );
    await pool.query(
      `INSERT INTO region (code_name, name, continent)
             VALUES ('SAH', 'Sahara', 'AF'),
                    ('GBS', 'Great Basin', 'NA'),
                    ('KNP', 'Kalahari', 'AF'),
                    ('AZR', 'Arabian Desert', 'AS'),
                    ('GOB', 'Gobi Desert', 'AS'),
                    ('KD', 'Karakum Desert', 'AS'),
                    ('ARC', 'Arctic', 'NA'),
                    ('AMZ', 'Amazon', 'SA'),
                    ('PSN', 'Patagonian Desert', 'SA'),
                    ('SBL', 'Sonoran Desert', 'NA'),
                    ('SER', 'Serengeti', 'AF');`
    );
    await pool.query(
      `INSERT INTO habitat_temp (temperature, containing_region)
             VALUES (30.5, 'SAH'),
                    (15.3, 'GBS'),
                    (24.8, 'KNP'),
                    (35.2, 'AZR'),
                    (23.7, 'GOB'),
                    (25.0, 'KD'),
                    (-20.0, 'ARC'),
                    (25.4, 'AMZ'),
                    (18.5, 'PSN'),
                    (22.9, 'SBL');`
    );
    await pool.query(
      `INSERT INTO habitat_biome (biome, containing_region)
             VALUES ('Desert', 'SAH'),
                    ('Desert', 'GBS'),
                    ('Desert', 'KNP'),
                    ('Desert', 'AZR'),
                    ('Desert', 'GOB'),
                    ('Desert', 'KD'),
                    ('Tundra', 'ARC'),
                    ('Desert', 'PSN'),
                    ('Desert', 'SBL'),
                    ('Rain Forest', 'AMZ');`
    );
    await pool.query(
      `INSERT INTO habitat_coord (x_coord, y_coord, containing_region)
             VALUES (45.12, -75.34, 'SAH'),
                    (50.45, -100.23, 'GBS'),
                    (39.99, -104.89, 'KNP'),
                    (60.12, -150.78, 'AZR'),
                    (20.30, 120.45, 'GOB'),
                    (15.56, -95.67, 'KD'),
                    (-25.34, 131.03, 'ARC'),
                    (55.72, 37.61, 'PSN'),
                    (35.68, 139.76, 'SBL'),
                    (48.85, 2.35, 'AMZ');`
    );
    await pool.query(
      `INSERT INTO ranger_number (name)
             VALUES ('John Doe'),
                    ('Jane Smith'),
                    ('Alice Johnson'),
                    ('Bob Brown'),
                    ('Charlie Davis'),
                    ('Deborah Wilson'),
                    ('Edward Lee'),
                    ('Fiona Li'),
                    ('Ali Mousavi'),
                    ('Hannah Clark');`
    );
    await pool.query(
      `INSERT INTO ranger_certification (experience, certification_level)
             VALUES ('Novice', 1),
                    ('Apprentice', 2),
                    ('Journeyman', 3),
                    ('Expert', 4),
                    ('Master', 5);`
    );
    await pool.query(
      `INSERT INTO ranger_age (badge_number, age)
             VALUES (1, 28),
                    (2, 34),
                    (3, 45),
                    (4, 38),
                    (5, 50),
                    (6, 41),
                    (7, 29),
                    (8, 32),
                    (9, 37),
                    (10, 41);`
    );
    await pool.query(
      `INSERT INTO ranger_experience (badge_number, certification_level)
             VALUES (1, 1),
                    (2, 1),
                    (3, 1),
                    (4, 2),
                    (5, 3),
                    (6, 2),
                    (7, 4),
                    (8, 5),
                    (9, 1),
                    (10, 5);`
    );
    await pool.query(
      `INSERT INTO project_status (start_date, end_date, status)
             VALUES ('2024-03-20', '2025-12-31', 'Ongoing'),
                    ('2013-01-01', '2026-05-31', 'Ongoing'),
                    ('2007-10-27', '2019-02-13', 'Complete'),
                    ('2022-01-10', '2024-06-30', 'Complete'),
                    ('2023-01-15', '2025-12-31', 'Ongoing'),
                    ('2023-07-15', '2027-12-31', 'Ongoing'),
                    ('2024-05-13', '2027-06-17', 'Ongoing'),
                    ('1994-03-21', '2010-02-19', 'Complete');`
    );
    await pool.query(
      `INSERT INTO project_info (operation_name, budget, start_date, end_date)
             VALUES ('Reforestation Initiative', 6000000, '2024-03-20', '2025-12-31'),
                    ('Arctic Migratory Birds Initiative', 1000000, '2013-01-01', '2026-05-31'),
                    ('Serengeti Cheetah Project', 50000, '2007-10-27', '2019-02-13'),
                    ('Waterhole Restoration', 750000, '2022-01-10', '2024-06-30'),
                    ('Oasis Protection', 900000, '2023-01-15', '2025-12-31'),
                    ('Wetland Preservation', 1500000, '2023-07-15', '2027-12-31'),
                    ('Desert Jaguar Monitoring', 2000000, '2024-05-13', '2027-06-17'),
                    ('Bactrian Camel Protection Program', 800000, '1994-03-21', '2010-02-19');`
    );
    await pool.query(
      `INSERT INTO donor (name, email, address, affiliation)
             VALUES ('Elon Musk', 'elon.musk@example.com', '123 Maple St, Springfield', 'Global Wildlife Fund'),
                    ('Emma Johnson', 'emma.johnson@example.com', '456 Oak Ave, River City',
                     'Global Wildlife Fund'),
                    ('Michael Brown', 'michael.brown@example.com', '789 Pine Rd, Lakeview', 'Forest Alliance'),
                    ('Sophia Williams', 'sophia.williams@example.com', '101 Cedar Ln, Greenwood', 'Rainforest Rescue'),
                    ('James Davis', 'james.davis@example.com', '202 Birch Dr, Meadowbrook', 'Save the Whales'),
                    ('Olivia Martinez', 'olivia.martinez@example.com', '303 Elm St, Seaside',
                     'Wildlife Protection Initiative'),
                    ('Liam Garcia', 'liam.garcia@example.com', '404 Willow Blvd, Hillcrest', 'Forest Alliance'),
                    ('Ava Rodriguez', 'ava.rodriguez@example.com', '505 Poplar Ave, Bayside', 'Nature Conservancy'),
                    ('Ethan Hernandez', 'ethan.hernandez@example.com', '606 Cypress Ct, Mountain View',
                     'Forest Alliance'),
                    ('Isabella Wilson', 'isabella.wilson@example.com', '707 Redwood Ter, Valley Heights',
                     'World Wildlife Trust');`
    );
    await pool.query(
      `INSERT INTO medical_incident_documents (disease_name, incident_date, organism_tag)
             VALUES ('Rabies', '2023-04-12', 1),
                    ('Rabies', '2023-03-11', 2),
                    ('Rabies', '2023-01-21', 4),
                    ('Tuberculosis', '2023-06-07', 3),
                    ('Tuberculosis', '2023-08-05', 5),
                    ('Brucellosis', '2023-09-20', 6),
                    ('Lyme Disease', '2023-10-12', 7),
                    ('Anthrax', '2023-11-18', 8),
                    ('Chronic Wasting Disease', '2024-01-10', 10),
                    ('Root Rot', '2023-05-12', 11),
                    ('Anthracnose', '2023-12-22', 18),
                    ('Crown Gall', '2024-01-15', 19),
                    ('Rust Disease', '2024-02-28', 20);`
    );
    await pool.query(
      `INSERT INTO donates (amount, donor_id, project_operation_name)
             VALUES (250000, 1, 'Reforestation Initiative'),
                    (150000, 2, 'Reforestation Initiative'),
                    (100000, 3, 'Reforestation Initiative'),
                    (500000, 4, 'Reforestation Initiative'),
                    (300000, 5, 'Reforestation Initiative'),
                    (200000, 6, 'Reforestation Initiative'),
                    (180000, 7, 'Reforestation Initiative'),
                    (220000, 8, 'Reforestation Initiative'),
                    (120000, 9, 'Reforestation Initiative'),
                    (270000, 10, 'Reforestation Initiative'),
                    (1000000, 10, 'Arctic Migratory Birds Initiative');`
    );
    await pool.query(
      `INSERT INTO protects (project_operation_name, region_code_name)
             VALUES ('Reforestation Initiative', 'AMZ'),
                    ('Arctic Migratory Birds Initiative', 'ARC'),
                    ('Serengeti Cheetah Project', 'SER'),
                    ('Waterhole Restoration', 'KNP'),
                    ('Oasis Protection', 'SAH'),
                    ('Wetland Preservation', 'GBS'),
                    ('Desert Jaguar Monitoring', 'GBS'),
                    ('Bactrian Camel Protection Program', 'GOB');`
    );
    await pool.query(
      `INSERT INTO houses (organism_tag, habitat_x_coord, habitat_y_coord)
             VALUES (1, 45.12, -75.34),
                    (2, 50.45, -100.23),
                    (3, 39.99, -104.89),
                    (4, 60.12, -150.78),
                    (5, 20.30, 120.45),
                    (6, 15.56, -95.67),
                    (7, -25.34, 131.03),
                    (8, 55.72, 37.61),
                    (9, 35.68, 139.76),
                    (10, 48.85, 2.35);`
    );
    await pool.query(
      `INSERT INTO monitors (region_code_name, ranger_badge_number)
             VALUES ('SAH', 1),
                    ('GBS', 2),
                    ('KNP', 3),
                    ('AZR', 4),
                    ('GOB', 5),
                    ('KD', 6),
                    ('ARC', 7),
                    ('AMZ', 8),
                    ('PSN', 9),
                    ('SBL', 1),
                    ('SAH', 2),
                    ('GBS', 3),
                    ('KNP', 4);`
    );
    await pool.query(
      `INSERT INTO mates_with (female_organism_tag, male_organism_tag)
             VALUES (2, 1),
                    (2, 3),
                    (10, 9),
                    (6, 7);`
    );
    await pool.query(
      `INSERT INTO researches (researcher_id, organism_tag)
             VALUES (1, 10),
                    (2, 9),
                    (3, 8),
                    (4, 7),
                    (5, 6),
                    (1, 9),
                    (2, 6),
                    (3, 7),
                    (7, 1),
                    (2, 3),
                    (3, 9),
                    (4, 9),
                    (5, 9),
                    (6, 9),
                    (7, 9),
                    (8, 9),
                    (9, 9),
                    (10, 9),
                    (1, 6),
                    (3, 6),
                    (4, 6),
                    (6, 6),
                    (7, 6),
                    (8, 6),
                    (9, 6),
                    (10, 6);`
    );
  } catch (error) {
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    // drop tables
    await dropTables();

    // create tables
    await createTables();

    // insert sample data
    await insertSampleData();

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export default pool;

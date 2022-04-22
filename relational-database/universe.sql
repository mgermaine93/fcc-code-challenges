--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    threat_to_earth boolean,
    has_moon boolean,
    galaxy_id integer,
    diameter_in_kilometers numeric(10,3),
    year_discovered integer,
    name character varying(30) NOT NULL
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: comet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.comet (
    comet_id integer NOT NULL,
    diameter_in_thousands_of_kilometers numeric(10,3),
    gravity_in_g_force numeric(10,3),
    has_life boolean,
    primary_composition character varying(30),
    planet_id integer,
    galaxy_id integer,
    year_discovered integer,
    name character varying(30) NOT NULL
);


ALTER TABLE public.comet OWNER TO freecodecamp;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    shape character varying(30),
    num_stars_in_billions numeric(10,3),
    diameter_in_thousands_of_parsecs numeric(20,3),
    year_discovered integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    diameter_in_thousands_of_kilometers numeric(10,3),
    gravity_in_g_force numeric(10,3),
    has_life boolean,
    primary_composition character varying(30),
    planet_id integer,
    year_discovered integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_thousands_of_kilometers numeric(10,3),
    type character varying(30),
    primary_composition character varying(30),
    is_dwarf boolean,
    has_life boolean,
    is_human_inhabitable boolean,
    star_id integer,
    has_moons boolean,
    num_known_moons integer,
    description text,
    age_in_millions_of_years numeric(10,3),
    year_length_in_earth_years numeric(10,3),
    day_length_in_earth_days numeric(10,3),
    year_discovered integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    type character varying(30),
    diameter_in_millions_of_kilometers numeric(10,3),
    core_temp_in_millions_of_kelvins numeric(10,3),
    surface_temp_in_thousands_of_kelvins numeric(10,3),
    primary_composition character varying(30),
    year_discovered integer,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: ufo; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.ufo (
    ufo_id integer NOT NULL,
    is_manned boolean,
    is_scary boolean,
    fuel_type character varying(30),
    planet_id integer,
    description text,
    number_of_inhabitants numeric,
    year_discovered integer,
    name character varying(30) NOT NULL
);


ALTER TABLE public.ufo OWNER TO freecodecamp;

--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--



--
-- Data for Name: comet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--



--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Spiral', 100.000, 32.408, 1610);
INSERT INTO public.galaxy VALUES (2, 'Star Wars Galaxy', 'Spiral', 102.000, 50.201, 1977);
INSERT INTO public.galaxy VALUES (3, 'Andromeda', 'Barred Spiral', 1000.000, 67.000, 964);
INSERT INTO public.galaxy VALUES (4, 'MCU Galaxy', 'Spiral', NULL, NULL, 2008);
INSERT INTO public.galaxy VALUES (5, 'Messier 82 (Cigar)', 'Elliptical', NULL, 11.344, 1774);
INSERT INTO public.galaxy VALUES (6, 'Messier 101 (Pinwheel)', 'Spiral', 1000.000, 52.122, 1781);
INSERT INTO public.galaxy VALUES (7, 'Messier Object 104 (Sombrero)', 'Elliptical', NULL, 15.000, 1781);
INSERT INTO public.galaxy VALUES (8, 'Messier 51a (Whirlpool)', 'Spiral', 160.000, 23.302, 1773);
INSERT INTO public.galaxy VALUES (9, 'Messier 63 (Sunflower)', 'Spiral', 400.000, 80.000, 1779);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 3.475, 0.166, false, 'Helium', 3, NULL);
INSERT INTO public.moon VALUES (2, 'Phobos', 0.023, NULL, false, NULL, 4, 1877);
INSERT INTO public.moon VALUES (3, 'Deimos', 0.012, NULL false, NULL, 4, 1877);
INSERT INTO public.moon VALUES (4, 'Io', NULL, NULL, false, NULL, 5, 1610);
INSERT INTO public.moon VALUES (5, 'Europa', NULL, NULL, false, NULL, 5, 1610);
INSERT INTO public.moon VALUES (6, 'Ganymede', NULL, NULL, false, NULL, 5, 1610);
INSERT INTO public.moon VALUES (7, 'Callisto', NULL, NULL, false, NULL, 5, 1610);
INSERT INTO public.moon VALUES (8, 'Amalthea', NULL, NULL, false, NULL, 5, 1892);
INSERT INTO public.moon VALUES (9, 'Himalia', NULL, NULL, false, NULL, 5, 1904);
INSERT INTO public.moon VALUES (10, 'Elara', NULL, NULL, false, NULL, 5, 1905);
INSERT INTO public.moon VALUES (11, 'Pasiphae', NULL, NULL, false, NULL, 5, 1908);
INSERT INTO public.moon VALUES (12, 'Sinope', NULL, NULL, false, NULL, 5, 1914);
INSERT INTO public.moon VALUES (13, 'Lysithea', NULL, NULL, false, NULL, 5, 1938);
INSERT INTO public.moon VALUES (14, 'Carme', NULL, NULL, false, NULL, 5, 1938);
INSERT INTO public.moon VALUES (15, 'Anake', NULL, NULL, false, NULL, 5, 1951);
INSERT INTO public.moon VALUES (16, 'Leda', NULL, NULL, false, NULL, 5, 1974);
INSERT INTO public.moon VALUES (17, 'Thebe', NULL, NULL, false, NULL, 5, 1979);
INSERT INTO public.moon VALUES (18, 'Mimas', NULL, NULL, false, NULL, 6, 1789);
INSERT INTO public.moon VALUES (19, 'Enceladus', NULL, NULL, false, NULL, 6, 1789);
INSERT INTO public.moon VALUES (20, 'Tethys', NULL, NULL, false, NULL, 6, 1684);
INSERT INTO public.moon VALUES (21, 'Dione', NULL, NULL, false, NULL, 6, 1684);
INSERT INTO public.moon VALUES (22, 'Rhea', NULL, NULL, false, NULL, 6, 1672);
INSERT INTO public.moon VALUES (23, 'Titan', NULL, NULL, false, NULL, 6, 1655);
INSERT INTO public.moon VALUES (24, 'Hyperion', NULL, NULL, false, NULL, 6, 1848);
INSERT INTO public.moon VALUES (25, 'Ariel', NULL, NULL, false, NULL, 7, 1851);
INSERT INTO public.moon VALUES (26, 'Umbriel', NULL, NULL, false, NULL, 7, 1851);
INSERT INTO public.moon VALUES (27, 'Titania', NULL, NULL, false, NULL, 7, 1787);
INSERT INTO public.moon VALUES (28, 'Oberon', NULL, NULL, false, NULL, 7, 1787);
INSERT INTO public.moon VALUES (29, 'Miranda', NULL, NULL, false, NULL, 7, 1948);
INSERT INTO public.moon VALUES (30, 'Triton', NULL, NULL, false, NULL, 8, 1846);
INSERT INTO public.moon VALUES (31, 'Charon', NULL, NULL, false, NULL, 9, 1978);

--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 4.879, 'Terrestrial', 'Oxygen', false, false, false, 1, false, 0, 'Rocky and hot, with surface temperatures that vary significantly between night and day.', 4503.000, 88.000, 59.000, 265);
INSERT INTO public.planet VALUES (2, 'Venus', 12.104, 'Terrestrial', 'Carbon Dioxide', false, false, false, 1, false, 0, 'Covered in thick toxic clouds and hostile surface conditions.  Hot and stinky.', 4503.000, 225.000, 117.000, 1610);
INSERT INTO public.planet VALUES (3, 'Earth', 12.742, 'Terrestrial', 'Nitrogen', false, true, true, 1, true, 1, 'Home', 4543, 1.000, 1.000, NULL, NULL);
INSERT INTO public.planet VALUES (4, 'Mars', 6.779, 'Terrestial', 'Carbon Dioxide', false, false, false, 1, true, 2, 'The Red Planet', 4603, 1.882, 1, 1610);
INSERT INTO public.planet VALUES (5, 'Jupiter', 139.820, 'Gas Giant', 'Hydrogen', false, false, false, 1, true, 80, 'A big planet with at least one giant storm.', 4603, 12, 0.416, 1610);
INSERT INTO public.planet VALUES (6, 'Saturn', 116.460, 'Gas Giant', 'Hydrogen', false, false, false, 1, true, 83, 'Known for its rings.', 4503, 29, 0.458, 1610);
INSERT INTO public.planet VALUES (7, 'Uranus', 50.724, 'Ice Giant', 'Hydrogen', false, false, false, 1, true, 27, 'Super chilly and windy, with an unusual axis of rotation.', 4503, 84, 0.708, 1781);
INSERT INTO public.planet VALUES (8, 'Neptune', 49.244, 'Ice Giant', 'Hydrogen', false, false, false, 1, true, 14, 'Blue in color, with some rings.', 4503, 165, 0.667, 1846);
INSERT INTO public.planet VALUES (9, 'Pluto', 2.376.6, 'Terrestrial', 'Nitrogen', true, false, false, 1, true, 5, 'Tiny former-planet.', 4600, 248, 6.4, 1930);
INSERT INTO public.planet VALUES (10, 'Xandar', NULL, 'Terrestrial', 'Oxygen', false, true, false, 2, true, 2, 'Former home of the power stone.', NULL, NULL, NULL, 1976);
INSERT INTO public.planet VALUES (11, 'Asgard', NULL, 'Terrestrial', 'Oxygen', false, true, true, 2, true, 1, 'Home of Thor and the Asgardians.', NULL, NULL, NULL, NULL);
INSERT INTO public.planet VALUES (12, 'Vormir', NULL, 'Terrestrial', 'Oxygen', false, true, true, 2, true, 1, 'Home of Red Skull and the Soul Stone.', NULL, NULL, NULL, 2018);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 'Main Sequence', 1.390, 15.700, 5.778, 'Hydrogen', 1930, 1);
INSERT INTO public.star VALUES (2, 'Xandar Star', 'Main Sequence', NULL, NULL, NULL, 'Helium', 1930, 4);
INSERT INTO public.star VALUES (3, 'Sirius', 'Binary', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (4, 'Canopus', 'Bright Giant', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (5, 'Arcturus', 'Red Giant', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (6, 'Rigel Kentaurus', 'Binary', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (7, 'Vega', 'Main Sequence', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (8, 'Capella', 'G-Type Giant', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (9, 'Rigel', 'Blue-White Supergiant', NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.star VALUES (10, 'Betelgeuse', 'Red Supergiant', NULL, NULL, NULL, NULL, NULL, 1);

--
-- Data for Name: ufo; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--



--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: comet comet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet
    ADD CONSTRAINT comet_name_key UNIQUE (name);


--
-- Name: comet comet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet
    ADD CONSTRAINT comet_pkey PRIMARY KEY (comet_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: ufo ufo_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.ufo
    ADD CONSTRAINT ufo_name_key UNIQUE (name);


--
-- Name: ufo ufo_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.ufo
    ADD CONSTRAINT ufo_pkey PRIMARY KEY (ufo_id);


--
-- Name: asteroid asteroid_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: comet comet_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.comet
    ADD CONSTRAINT comet_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: ufo ufo_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.ufo
    ADD CONSTRAINT ufo_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- PostgreSQL database dump complete
--


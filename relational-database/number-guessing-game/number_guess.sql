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

DROP DATABASE number_guessing_game;
--
-- Name: number_guessing_game; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guessing_game WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guessing_game OWNER TO freecodecamp;

\connect number_guessing_game

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    num_guesses integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (1, 7, 1);
INSERT INTO public.games VALUES (2, 100, 1);
INSERT INTO public.games VALUES (3, 77, 2);
INSERT INTO public.games VALUES (4, 1, 9);
INSERT INTO public.games VALUES (5, 196, 10);
INSERT INTO public.games VALUES (6, 309, 10);
INSERT INTO public.games VALUES (7, 86, 11);
INSERT INTO public.games VALUES (8, 899, 11);
INSERT INTO public.games VALUES (9, 793, 10);
INSERT INTO public.games VALUES (10, 375, 10);
INSERT INTO public.games VALUES (11, 409, 10);
INSERT INTO public.games VALUES (12, 481, 12);
INSERT INTO public.games VALUES (13, 924, 12);
INSERT INTO public.games VALUES (14, 471, 13);
INSERT INTO public.games VALUES (15, 252, 13);
INSERT INTO public.games VALUES (16, 400, 12);
INSERT INTO public.games VALUES (17, 210, 12);
INSERT INTO public.games VALUES (18, 340, 12);
INSERT INTO public.games VALUES (19, 837, 14);
INSERT INTO public.games VALUES (20, 771, 14);
INSERT INTO public.games VALUES (21, 237, 15);
INSERT INTO public.games VALUES (22, 277, 15);
INSERT INTO public.games VALUES (23, 600, 14);
INSERT INTO public.games VALUES (24, 685, 14);
INSERT INTO public.games VALUES (25, 696, 14);
INSERT INTO public.games VALUES (26, 9, 16);
INSERT INTO public.games VALUES (27, 9, 16);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (1, 'Tony');
INSERT INTO public.users VALUES (2, 'Edwin');
INSERT INTO public.users VALUES (3, 'user_1656435470602');
INSERT INTO public.users VALUES (4, 'user_1656435470603');
INSERT INTO public.users VALUES (5, 'Meredith');
INSERT INTO public.users VALUES (6, 'user_1656435813322');
INSERT INTO public.users VALUES (7, 'user_1656435813321');
INSERT INTO public.users VALUES (8, 'Matt');
INSERT INTO public.users VALUES (9, 'Jorge');
INSERT INTO public.users VALUES (10, 'user_1656437360792');
INSERT INTO public.users VALUES (11, 'user_1656437360791');
INSERT INTO public.users VALUES (12, 'user_1656437518145');
INSERT INTO public.users VALUES (13, 'user_1656437518144');
INSERT INTO public.users VALUES (14, 'user_1656437659512');
INSERT INTO public.users VALUES (15, 'user_1656437659510');
INSERT INTO public.users VALUES (16, 'Saul');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 16, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: games users_fk; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--


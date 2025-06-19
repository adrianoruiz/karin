--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

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

--
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.provinces VALUES (1, 'Acre', 'AC', NULL, NULL);
INSERT INTO public.provinces VALUES (2, 'Alagoas', 'AL', NULL, NULL);
INSERT INTO public.provinces VALUES (3, 'Amapá', 'AP', NULL, NULL);
INSERT INTO public.provinces VALUES (4, 'Amazonas', 'AM', NULL, NULL);
INSERT INTO public.provinces VALUES (5, 'Bahia', 'BA', NULL, NULL);
INSERT INTO public.provinces VALUES (6, 'Ceará', 'CE', NULL, NULL);
INSERT INTO public.provinces VALUES (7, 'Distrito Federal', 'DF', NULL, NULL);
INSERT INTO public.provinces VALUES (8, 'Espírito Santo', 'ES', NULL, NULL);
INSERT INTO public.provinces VALUES (9, 'Goiás', 'GO', NULL, NULL);
INSERT INTO public.provinces VALUES (10, 'Maranhão', 'MA', NULL, NULL);
INSERT INTO public.provinces VALUES (11, 'Mato Grosso', 'MT', NULL, NULL);
INSERT INTO public.provinces VALUES (12, 'Mato Grosso do Sul', 'MS', NULL, NULL);
INSERT INTO public.provinces VALUES (13, 'Minas Gerais', 'MG', NULL, NULL);
INSERT INTO public.provinces VALUES (14, 'Pará', 'PA', NULL, NULL);
INSERT INTO public.provinces VALUES (15, 'Paraíba', 'PB', NULL, NULL);
INSERT INTO public.provinces VALUES (16, 'Paraná', 'PR', NULL, NULL);
INSERT INTO public.provinces VALUES (17, 'Pernambuco', 'PE', NULL, NULL);
INSERT INTO public.provinces VALUES (18, 'Piauí', 'PI', NULL, NULL);
INSERT INTO public.provinces VALUES (19, 'Rio de Janeiro', 'RJ', NULL, NULL);
INSERT INTO public.provinces VALUES (20, 'Rio Grande do Norte', 'RN', NULL, NULL);
INSERT INTO public.provinces VALUES (21, 'Rio Grande do Sul', 'RS', NULL, NULL);
INSERT INTO public.provinces VALUES (22, 'Rondônia', 'RO', NULL, NULL);
INSERT INTO public.provinces VALUES (23, 'Roraima', 'RR', NULL, NULL);
INSERT INTO public.provinces VALUES (24, 'Santa Catarina', 'SC', NULL, NULL);
INSERT INTO public.provinces VALUES (25, 'São Paulo', 'SP', NULL, NULL);
INSERT INTO public.provinces VALUES (26, 'Sergipe', 'SE', NULL, NULL);
INSERT INTO public.provinces VALUES (27, 'Tocantins', 'TO', NULL, NULL);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cities VALUES (1, 1, 'Acrelândia', '1200013', NULL, NULL);
INSERT INTO public.cities VALUES (2, 1, 'Assis Brasil', '1200054', NULL, NULL);
INSERT INTO public.cities VALUES (3, 1, 'Brasiléia', '1200104', NULL, NULL);
INSERT INTO public.cities VALUES (4, 1, 'Bujari', '1200138', NULL, NULL);
INSERT INTO public.cities VALUES (5, 1, 'Capixaba', '1200179', NULL, NULL);
INSERT INTO public.cities VALUES (6, 1, 'Cruzeiro do Sul', '1200203', NULL, NULL);
INSERT INTO public.cities VALUES (7, 1, 'Epitaciolândia', '1200252', NULL, NULL);
INSERT INTO public.cities VALUES (8, 1, 'Feijó', '1200302', NULL, NULL);
INSERT INTO public.cities VALUES (9, 1, 'Jordão', '1200328', NULL, NULL);
INSERT INTO public.cities VALUES (10, 1, 'Mâncio Lima', '1200336', NULL, NULL);
INSERT INTO public.cities VALUES (11, 1, 'Manoel Urbano', '1200344', NULL, NULL);
INSERT INTO public.cities VALUES (12, 1, 'Marechal Thaumaturgo', '1200351', NULL, NULL);
INSERT INTO public.cities VALUES (13, 1, 'Plácido de Castro', '1200385', NULL, NULL);
INSERT INTO public.cities VALUES (14, 1, 'Porto Acre', '1200807', NULL, NULL);
INSERT INTO public.cities VALUES (15, 1, 'Porto Walter', '1200393', NULL, NULL);
INSERT INTO public.cities VALUES (16, 1, 'Rio Branco', '1200401', NULL, NULL);
INSERT INTO public.cities VALUES (17, 1, 'Rodrigues Alves', '1200427', NULL, NULL);
INSERT INTO public.cities VALUES (18, 1, 'Santa Rosa do Purus', '1200435', NULL, NULL);
INSERT INTO public.cities VALUES (19, 1, 'Sena Madureira', '1200500', NULL, NULL);
INSERT INTO public.cities VALUES (20, 1, 'Senador Guiomard', '1200450', NULL, NULL);
INSERT INTO public.cities VALUES (21, 1, 'Tarauacá', '1200609', NULL, NULL);
INSERT INTO public.cities VALUES (22, 1, 'Xapuri', '1200708', NULL, NULL);
INSERT INTO public.cities VALUES (23, 2, 'Água Branca', '2700102', NULL, NULL);
INSERT INTO public.cities VALUES (24, 2, 'Anadia', '2700201', NULL, NULL);
INSERT INTO public.cities VALUES (25, 2, 'Arapiraca', '2700300', NULL, NULL);
INSERT INTO public.cities VALUES (26, 2, 'Atalaia', '2700409', NULL, NULL);
INSERT INTO public.cities VALUES (27, 2, 'Barra de Santo Antônio', '2700508', NULL, NULL);
INSERT INTO public.cities VALUES (28, 2, 'Barra de São Miguel', '2700607', NULL, NULL);
INSERT INTO public.cities VALUES (29, 2, 'Batalha', '2700706', NULL, NULL);
INSERT INTO public.cities VALUES (30, 2, 'Belém', '2700805', NULL, NULL);
INSERT INTO public.cities VALUES (31, 2, 'Belo Monte', '2700904', NULL, NULL);
INSERT INTO public.cities VALUES (32, 2, 'Boca da Mata', '2701001', NULL, NULL);
INSERT INTO public.cities VALUES (33, 2, 'Branquinha', '2701100', NULL, NULL);
INSERT INTO public.cities VALUES (34, 2, 'Cacimbinhas', '2701209', NULL, NULL);
INSERT INTO public.cities VALUES (35, 2, 'Cajueiro', '2701308', NULL, NULL);
INSERT INTO public.cities VALUES (36, 2, 'Campestre', '2701357', NULL, NULL);
INSERT INTO public.cities VALUES (37, 2, 'Campo Alegre', '2701407', NULL, NULL);
INSERT INTO public.cities VALUES (38, 2, 'Campo Grande', '2701506', NULL, NULL);
INSERT INTO public.cities VALUES (39, 2, 'Canapi', '2701605', NULL, NULL);
INSERT INTO public.cities VALUES (40, 2, 'Capela', '2701704', NULL, NULL);
INSERT INTO public.cities VALUES (41, 2, 'Carneiros', '2701803', NULL, NULL);
INSERT INTO public.cities VALUES (42, 2, 'Chã Preta', '2701902', NULL, NULL);
INSERT INTO public.cities VALUES (43, 2, 'Coité do Nóia', '2702009', NULL, NULL);
INSERT INTO public.cities VALUES (44, 2, 'Colônia Leopoldina', '2702108', NULL, NULL);
INSERT INTO public.cities VALUES (45, 2, 'Coqueiro Seco', '2702207', NULL, NULL);
INSERT INTO public.cities VALUES (46, 2, 'Coruripe', '2702306', NULL, NULL);
INSERT INTO public.cities VALUES (47, 2, 'Craíbas', '2702355', NULL, NULL);
INSERT INTO public.cities VALUES (48, 2, 'Delmiro Gouveia', '2702405', NULL, NULL);
INSERT INTO public.cities VALUES (49, 2, 'Dois Riachos', '2702504', NULL, NULL);
INSERT INTO public.cities VALUES (50, 2, 'Estrela de Alagoas', '2702553', NULL, NULL);
INSERT INTO public.cities VALUES (51, 2, 'Feira Grande', '2702603', NULL, NULL);
INSERT INTO public.cities VALUES (52, 2, 'Feliz Deserto', '2702702', NULL, NULL);
INSERT INTO public.cities VALUES (53, 2, 'Flexeiras', '2702801', NULL, NULL);
INSERT INTO public.cities VALUES (54, 2, 'Girau do Ponciano', '2702900', NULL, NULL);
INSERT INTO public.cities VALUES (55, 2, 'Ibateguara', '2703007', NULL, NULL);
INSERT INTO public.cities VALUES (56, 2, 'Igaci', '2703106', NULL, NULL);
INSERT INTO public.cities VALUES (57, 2, 'Igreja Nova', '2703205', NULL, NULL);
INSERT INTO public.cities VALUES (58, 2, 'Inhapi', '2703304', NULL, NULL);
INSERT INTO public.cities VALUES (59, 2, 'Jacaré dos Homens', '2703403', NULL, NULL);
INSERT INTO public.cities VALUES (60, 2, 'Jacuípe', '2703502', NULL, NULL);
INSERT INTO public.cities VALUES (61, 2, 'Japaratinga', '2703601', NULL, NULL);
INSERT INTO public.cities VALUES (62, 2, 'Jaramataia', '2703700', NULL, NULL);
INSERT INTO public.cities VALUES (63, 2, 'Jequiá da Praia', '2703759', NULL, NULL);
INSERT INTO public.cities VALUES (64, 2, 'Joaquim Gomes', '2703809', NULL, NULL);
INSERT INTO public.cities VALUES (65, 2, 'Jundiá', '2703908', NULL, NULL);
INSERT INTO public.cities VALUES (66, 2, 'Junqueiro', '2704005', NULL, NULL);
INSERT INTO public.cities VALUES (67, 2, 'Lagoa da Canoa', '2704104', NULL, NULL);
INSERT INTO public.cities VALUES (68, 2, 'Limoeiro de Anadia', '2704203', NULL, NULL);
INSERT INTO public.cities VALUES (69, 2, 'Maceió', '2704302', NULL, NULL);
INSERT INTO public.cities VALUES (70, 2, 'Major Isidoro', '2704401', NULL, NULL);
INSERT INTO public.cities VALUES (71, 2, 'Mar Vermelho', '2704906', NULL, NULL);
INSERT INTO public.cities VALUES (72, 2, 'Maragogi', '2704500', NULL, NULL);
INSERT INTO public.cities VALUES (73, 2, 'Maravilha', '2704609', NULL, NULL);
INSERT INTO public.cities VALUES (74, 2, 'Marechal Deodoro', '2704708', NULL, NULL);
INSERT INTO public.cities VALUES (75, 2, 'Maribondo', '2704807', NULL, NULL);
INSERT INTO public.cities VALUES (76, 2, 'Mata Grande', '2705002', NULL, NULL);
INSERT INTO public.cities VALUES (77, 2, 'Matriz de Camaragibe', '2705101', NULL, NULL);
INSERT INTO public.cities VALUES (78, 2, 'Messias', '2705200', NULL, NULL);
INSERT INTO public.cities VALUES (79, 2, 'Minador do Negrão', '2705309', NULL, NULL);
INSERT INTO public.cities VALUES (80, 2, 'Monteirópolis', '2705408', NULL, NULL);
INSERT INTO public.cities VALUES (81, 2, 'Murici', '2705507', NULL, NULL);
INSERT INTO public.cities VALUES (82, 2, 'Novo Lino', '2705606', NULL, NULL);
INSERT INTO public.cities VALUES (83, 2, 'Olho d''Água das Flores', '2705705', NULL, NULL);
INSERT INTO public.cities VALUES (84, 2, 'Olho d''Água do Casado', '2705804', NULL, NULL);
INSERT INTO public.cities VALUES (85, 2, 'Olho d''Água Grande', '2705903', NULL, NULL);
INSERT INTO public.cities VALUES (86, 2, 'Olivença', '2706000', NULL, NULL);
INSERT INTO public.cities VALUES (87, 2, 'Ouro Branco', '2706109', NULL, NULL);
INSERT INTO public.cities VALUES (88, 2, 'Palestina', '2706208', NULL, NULL);
INSERT INTO public.cities VALUES (89, 2, 'Palmeira dos Índios', '2706307', NULL, NULL);
INSERT INTO public.cities VALUES (90, 2, 'Pão de Açúcar', '2706406', NULL, NULL);
INSERT INTO public.cities VALUES (91, 2, 'Pariconha', '2706422', NULL, NULL);
INSERT INTO public.cities VALUES (92, 2, 'Paripueira', '2706448', NULL, NULL);
INSERT INTO public.cities VALUES (93, 2, 'Passo de Camaragibe', '2706505', NULL, NULL);
INSERT INTO public.cities VALUES (94, 2, 'Paulo Jacinto', '2706604', NULL, NULL);
INSERT INTO public.cities VALUES (95, 2, 'Penedo', '2706703', NULL, NULL);
INSERT INTO public.cities VALUES (96, 2, 'Piaçabuçu', '2706802', NULL, NULL);
INSERT INTO public.cities VALUES (97, 2, 'Pilar', '2706901', NULL, NULL);
INSERT INTO public.cities VALUES (98, 2, 'Pindoba', '2707008', NULL, NULL);
INSERT INTO public.cities VALUES (99, 2, 'Piranhas', '2707107', NULL, NULL);
INSERT INTO public.cities VALUES (100, 2, 'Poço das Trincheiras', '2707206', NULL, NULL);
INSERT INTO public.cities VALUES (101, 2, 'Porto Calvo', '2707305', NULL, NULL);
INSERT INTO public.cities VALUES (102, 2, 'Porto de Pedras', '2707404', NULL, NULL);
INSERT INTO public.cities VALUES (103, 2, 'Porto Real do Colégio', '2707503', NULL, NULL);
INSERT INTO public.cities VALUES (104, 2, 'Quebrangulo', '2707602', NULL, NULL);
INSERT INTO public.cities VALUES (105, 2, 'Rio Largo', '2707701', NULL, NULL);
INSERT INTO public.cities VALUES (106, 2, 'Roteiro', '2707800', NULL, NULL);
INSERT INTO public.cities VALUES (107, 2, 'Santa Luzia do Norte', '2707909', NULL, NULL);
INSERT INTO public.cities VALUES (108, 2, 'Santana do Ipanema', '2708006', NULL, NULL);
INSERT INTO public.cities VALUES (109, 2, 'Santana do Mundaú', '2708105', NULL, NULL);
INSERT INTO public.cities VALUES (110, 2, 'São Brás', '2708204', NULL, NULL);
INSERT INTO public.cities VALUES (111, 2, 'São José da Laje', '2708303', NULL, NULL);
INSERT INTO public.cities VALUES (112, 2, 'São José da Tapera', '2708402', NULL, NULL);
INSERT INTO public.cities VALUES (113, 2, 'São Luís do Quitunde', '2708501', NULL, NULL);
INSERT INTO public.cities VALUES (114, 2, 'São Miguel dos Campos', '2708600', NULL, NULL);
INSERT INTO public.cities VALUES (115, 2, 'São Miguel dos Milagres', '2708709', NULL, NULL);
INSERT INTO public.cities VALUES (116, 2, 'São Sebastião', '2708808', NULL, NULL);
INSERT INTO public.cities VALUES (117, 2, 'Satuba', '2708907', NULL, NULL);
INSERT INTO public.cities VALUES (118, 2, 'Senador Rui Palmeira', '2708956', NULL, NULL);
INSERT INTO public.cities VALUES (119, 2, 'Tanque d''Arca', '2709004', NULL, NULL);
INSERT INTO public.cities VALUES (120, 2, 'Taquarana', '2709103', NULL, NULL);
INSERT INTO public.cities VALUES (121, 2, 'Teotônio Vilela', '2709152', NULL, NULL);
INSERT INTO public.cities VALUES (122, 2, 'Traipu', '2709202', NULL, NULL);
INSERT INTO public.cities VALUES (123, 2, 'União dos Palmares', '2709301', NULL, NULL);
INSERT INTO public.cities VALUES (124, 2, 'Viçosa', '2709400', NULL, NULL);
INSERT INTO public.cities VALUES (125, 3, 'Amapá', '1600105', NULL, NULL);
INSERT INTO public.cities VALUES (126, 3, 'Calçoene', '1600204', NULL, NULL);
INSERT INTO public.cities VALUES (127, 3, 'Cutias', '1600212', NULL, NULL);
INSERT INTO public.cities VALUES (128, 3, 'Ferreira Gomes', '1600238', NULL, NULL);
INSERT INTO public.cities VALUES (129, 3, 'Itaubal', '1600253', NULL, NULL);
INSERT INTO public.cities VALUES (130, 3, 'Laranjal do Jari', '1600279', NULL, NULL);
INSERT INTO public.cities VALUES (131, 3, 'Macapá', '1600303', NULL, NULL);
INSERT INTO public.cities VALUES (132, 3, 'Mazagão', '1600402', NULL, NULL);
INSERT INTO public.cities VALUES (133, 3, 'Oiapoque', '1600501', NULL, NULL);
INSERT INTO public.cities VALUES (134, 3, 'Pedra Branca do Amapari', '1600154', NULL, NULL);
INSERT INTO public.cities VALUES (135, 3, 'Porto Grande', '1600535', NULL, NULL);
INSERT INTO public.cities VALUES (136, 3, 'Pracuúba', '1600550', NULL, NULL);
INSERT INTO public.cities VALUES (137, 3, 'Santana', '1600600', NULL, NULL);
INSERT INTO public.cities VALUES (138, 3, 'Serra do Navio', '1600055', NULL, NULL);
INSERT INTO public.cities VALUES (139, 3, 'Tartarugalzinho', '1600709', NULL, NULL);
INSERT INTO public.cities VALUES (140, 3, 'Vitória do Jari', '1600808', NULL, NULL);
INSERT INTO public.cities VALUES (141, 4, 'Alvarães', '1300029', NULL, NULL);
INSERT INTO public.cities VALUES (142, 4, 'Amaturá', '1300060', NULL, NULL);
INSERT INTO public.cities VALUES (143, 4, 'Anamã', '1300086', NULL, NULL);
INSERT INTO public.cities VALUES (144, 4, 'Anori', '1300102', NULL, NULL);
INSERT INTO public.cities VALUES (145, 4, 'Apuí', '1300144', NULL, NULL);
INSERT INTO public.cities VALUES (146, 4, 'Atalaia do Norte', '1300201', NULL, NULL);
INSERT INTO public.cities VALUES (147, 4, 'Autazes', '1300300', NULL, NULL);
INSERT INTO public.cities VALUES (148, 4, 'Barcelos', '1300409', NULL, NULL);
INSERT INTO public.cities VALUES (149, 4, 'Barreirinha', '1300508', NULL, NULL);
INSERT INTO public.cities VALUES (150, 4, 'Benjamin Constant', '1300607', NULL, NULL);
INSERT INTO public.cities VALUES (151, 4, 'Beruri', '1300631', NULL, NULL);
INSERT INTO public.cities VALUES (152, 4, 'Boa Vista do Ramos', '1300680', NULL, NULL);
INSERT INTO public.cities VALUES (153, 4, 'Boca do Acre', '1300706', NULL, NULL);
INSERT INTO public.cities VALUES (154, 4, 'Borba', '1300805', NULL, NULL);
INSERT INTO public.cities VALUES (155, 4, 'Caapiranga', '1300839', NULL, NULL);
INSERT INTO public.cities VALUES (156, 4, 'Canutama', '1300904', NULL, NULL);
INSERT INTO public.cities VALUES (157, 4, 'Carauari', '1301001', NULL, NULL);
INSERT INTO public.cities VALUES (158, 4, 'Careiro', '1301100', NULL, NULL);
INSERT INTO public.cities VALUES (159, 4, 'Careiro da Várzea', '1301159', NULL, NULL);
INSERT INTO public.cities VALUES (160, 4, 'Coari', '1301209', NULL, NULL);
INSERT INTO public.cities VALUES (161, 4, 'Codajás', '1301308', NULL, NULL);
INSERT INTO public.cities VALUES (162, 4, 'Eirunepé', '1301407', NULL, NULL);
INSERT INTO public.cities VALUES (163, 4, 'Envira', '1301506', NULL, NULL);
INSERT INTO public.cities VALUES (164, 4, 'Fonte Boa', '1301605', NULL, NULL);
INSERT INTO public.cities VALUES (165, 4, 'Guajará', '1301654', NULL, NULL);
INSERT INTO public.cities VALUES (166, 4, 'Humaitá', '1301704', NULL, NULL);
INSERT INTO public.cities VALUES (167, 4, 'Ipixuna', '1301803', NULL, NULL);
INSERT INTO public.cities VALUES (168, 4, 'Iranduba', '1301852', NULL, NULL);
INSERT INTO public.cities VALUES (169, 4, 'Itacoatiara', '1301902', NULL, NULL);
INSERT INTO public.cities VALUES (170, 4, 'Itamarati', '1301951', NULL, NULL);
INSERT INTO public.cities VALUES (171, 4, 'Itapiranga', '1302009', NULL, NULL);
INSERT INTO public.cities VALUES (172, 4, 'Japurá', '1302108', NULL, NULL);
INSERT INTO public.cities VALUES (173, 4, 'Juruá', '1302207', NULL, NULL);
INSERT INTO public.cities VALUES (174, 4, 'Jutaí', '1302306', NULL, NULL);
INSERT INTO public.cities VALUES (175, 4, 'Lábrea', '1302405', NULL, NULL);
INSERT INTO public.cities VALUES (176, 4, 'Manacapuru', '1302504', NULL, NULL);
INSERT INTO public.cities VALUES (177, 4, 'Manaquiri', '1302553', NULL, NULL);
INSERT INTO public.cities VALUES (178, 4, 'Manaus', '1302603', NULL, NULL);
INSERT INTO public.cities VALUES (179, 4, 'Manicoré', '1302702', NULL, NULL);
INSERT INTO public.cities VALUES (180, 4, 'Maraã', '1302801', NULL, NULL);
INSERT INTO public.cities VALUES (181, 4, 'Maués', '1302900', NULL, NULL);
INSERT INTO public.cities VALUES (182, 4, 'Nhamundá', '1303007', NULL, NULL);
INSERT INTO public.cities VALUES (183, 4, 'Nova Olinda do Norte', '1303106', NULL, NULL);
INSERT INTO public.cities VALUES (184, 4, 'Novo Airão', '1303205', NULL, NULL);
INSERT INTO public.cities VALUES (185, 4, 'Novo Aripuanã', '1303304', NULL, NULL);
INSERT INTO public.cities VALUES (186, 4, 'Parintins', '1303403', NULL, NULL);
INSERT INTO public.cities VALUES (187, 4, 'Pauini', '1303502', NULL, NULL);
INSERT INTO public.cities VALUES (188, 4, 'Presidente Figueiredo', '1303536', NULL, NULL);
INSERT INTO public.cities VALUES (189, 4, 'Rio Preto da Eva', '1303569', NULL, NULL);
INSERT INTO public.cities VALUES (190, 4, 'Santa Isabel do Rio Negro', '1303601', NULL, NULL);
INSERT INTO public.cities VALUES (191, 4, 'Santo Antônio do Içá', '1303700', NULL, NULL);
INSERT INTO public.cities VALUES (192, 4, 'São Gabriel da Cachoeira', '1303809', NULL, NULL);
INSERT INTO public.cities VALUES (193, 4, 'São Paulo de Olivença', '1303908', NULL, NULL);
INSERT INTO public.cities VALUES (194, 4, 'São Sebastião do Uatumã', '1303957', NULL, NULL);
INSERT INTO public.cities VALUES (195, 4, 'Silves', '1304005', NULL, NULL);
INSERT INTO public.cities VALUES (196, 4, 'Tabatinga', '1304062', NULL, NULL);
INSERT INTO public.cities VALUES (197, 4, 'Tapauá', '1304104', NULL, NULL);
INSERT INTO public.cities VALUES (198, 4, 'Tefé', '1304203', NULL, NULL);
INSERT INTO public.cities VALUES (199, 4, 'Tonantins', '1304237', NULL, NULL);
INSERT INTO public.cities VALUES (200, 4, 'Uarini', '1304260', NULL, NULL);
INSERT INTO public.cities VALUES (201, 4, 'Urucará', '1304302', NULL, NULL);
INSERT INTO public.cities VALUES (202, 4, 'Urucurituba', '1304401', NULL, NULL);
INSERT INTO public.cities VALUES (203, 5, 'Abaíra', '2900108', NULL, NULL);
INSERT INTO public.cities VALUES (204, 5, 'Abaré', '2900207', NULL, NULL);
INSERT INTO public.cities VALUES (205, 5, 'Acajutiba', '2900306', NULL, NULL);
INSERT INTO public.cities VALUES (206, 5, 'Adustina', '2900355', NULL, NULL);
INSERT INTO public.cities VALUES (207, 5, 'Água Fria', '2900405', NULL, NULL);
INSERT INTO public.cities VALUES (208, 5, 'Aiquara', '2900603', NULL, NULL);
INSERT INTO public.cities VALUES (209, 5, 'Alagoinhas', '2900702', NULL, NULL);
INSERT INTO public.cities VALUES (210, 5, 'Alcobaça', '2900801', NULL, NULL);
INSERT INTO public.cities VALUES (211, 5, 'Almadina', '2900900', NULL, NULL);
INSERT INTO public.cities VALUES (212, 5, 'Amargosa', '2901007', NULL, NULL);
INSERT INTO public.cities VALUES (213, 5, 'Amélia Rodrigues', '2901106', NULL, NULL);
INSERT INTO public.cities VALUES (214, 5, 'América Dourada', '2901155', NULL, NULL);
INSERT INTO public.cities VALUES (215, 5, 'Anagé', '2901205', NULL, NULL);
INSERT INTO public.cities VALUES (216, 5, 'Andaraí', '2901304', NULL, NULL);
INSERT INTO public.cities VALUES (217, 5, 'Andorinha', '2901353', NULL, NULL);
INSERT INTO public.cities VALUES (218, 5, 'Angical', '2901403', NULL, NULL);
INSERT INTO public.cities VALUES (219, 5, 'Anguera', '2901502', NULL, NULL);
INSERT INTO public.cities VALUES (220, 5, 'Antas', '2901601', NULL, NULL);
INSERT INTO public.cities VALUES (221, 5, 'Antônio Cardoso', '2901700', NULL, NULL);
INSERT INTO public.cities VALUES (222, 5, 'Antônio Gonçalves', '2901809', NULL, NULL);
INSERT INTO public.cities VALUES (223, 5, 'Aporá', '2901908', NULL, NULL);
INSERT INTO public.cities VALUES (224, 5, 'Apuarema', '2901957', NULL, NULL);
INSERT INTO public.cities VALUES (225, 5, 'Araças', '2902054', NULL, NULL);
INSERT INTO public.cities VALUES (226, 5, 'Aracatu', '2902005', NULL, NULL);
INSERT INTO public.cities VALUES (227, 5, 'Araci', '2902104', NULL, NULL);
INSERT INTO public.cities VALUES (228, 5, 'Aramari', '2902203', NULL, NULL);
INSERT INTO public.cities VALUES (229, 5, 'Arataca', '2902252', NULL, NULL);
INSERT INTO public.cities VALUES (230, 5, 'Aratuípe', '2902302', NULL, NULL);
INSERT INTO public.cities VALUES (231, 5, 'Aurelino Leal', '2902401', NULL, NULL);
INSERT INTO public.cities VALUES (232, 5, 'Baianópolis', '2902500', NULL, NULL);
INSERT INTO public.cities VALUES (233, 5, 'Baixa Grande', '2902609', NULL, NULL);
INSERT INTO public.cities VALUES (234, 5, 'Banzaê', '2902658', NULL, NULL);
INSERT INTO public.cities VALUES (235, 5, 'Barra', '2902708', NULL, NULL);
INSERT INTO public.cities VALUES (236, 5, 'Barra da Estiva', '2902807', NULL, NULL);
INSERT INTO public.cities VALUES (237, 5, 'Barra do Choça', '2902906', NULL, NULL);
INSERT INTO public.cities VALUES (238, 5, 'Barra do Mendes', '2903003', NULL, NULL);
INSERT INTO public.cities VALUES (239, 5, 'Barra do Rocha', '2903102', NULL, NULL);
INSERT INTO public.cities VALUES (240, 5, 'Barreiras', '2903201', NULL, NULL);
INSERT INTO public.cities VALUES (241, 5, 'Barro Alto', '2903235', NULL, NULL);
INSERT INTO public.cities VALUES (242, 5, 'Barro Preto', '2903300', NULL, NULL);
INSERT INTO public.cities VALUES (243, 5, 'Barrocas', '2903276', NULL, NULL);
INSERT INTO public.cities VALUES (244, 5, 'Belmonte', '2903409', NULL, NULL);
INSERT INTO public.cities VALUES (245, 5, 'Belo Campo', '2903508', NULL, NULL);
INSERT INTO public.cities VALUES (246, 5, 'Biritinga', '2903607', NULL, NULL);
INSERT INTO public.cities VALUES (247, 5, 'Boa Nova', '2903706', NULL, NULL);
INSERT INTO public.cities VALUES (248, 5, 'Boa Vista do Tupim', '2903805', NULL, NULL);
INSERT INTO public.cities VALUES (249, 5, 'Bom Jesus da Lapa', '2903904', NULL, NULL);
INSERT INTO public.cities VALUES (250, 5, 'Bom Jesus da Serra', '2903953', NULL, NULL);
INSERT INTO public.cities VALUES (251, 5, 'Boninal', '2904001', NULL, NULL);
INSERT INTO public.cities VALUES (252, 5, 'Bonito', '2904050', NULL, NULL);
INSERT INTO public.cities VALUES (253, 5, 'Boquira', '2904100', NULL, NULL);
INSERT INTO public.cities VALUES (254, 5, 'Botuporã', '2904209', NULL, NULL);
INSERT INTO public.cities VALUES (255, 5, 'Brejões', '2904308', NULL, NULL);
INSERT INTO public.cities VALUES (256, 5, 'Brejolândia', '2904407', NULL, NULL);
INSERT INTO public.cities VALUES (257, 5, 'Brotas de Macaúbas', '2904506', NULL, NULL);
INSERT INTO public.cities VALUES (258, 5, 'Brumado', '2904605', NULL, NULL);
INSERT INTO public.cities VALUES (259, 5, 'Buerarema', '2904704', NULL, NULL);
INSERT INTO public.cities VALUES (260, 5, 'Buritirama', '2904753', NULL, NULL);
INSERT INTO public.cities VALUES (261, 5, 'Caatiba', '2904803', NULL, NULL);
INSERT INTO public.cities VALUES (262, 5, 'Cabaceiras do Paraguaçu', '2904852', NULL, NULL);
INSERT INTO public.cities VALUES (263, 5, 'Cachoeira', '2904902', NULL, NULL);
INSERT INTO public.cities VALUES (264, 5, 'Caculé', '2905008', NULL, NULL);
INSERT INTO public.cities VALUES (265, 5, 'Caém', '2905107', NULL, NULL);
INSERT INTO public.cities VALUES (266, 5, 'Caetanos', '2905156', NULL, NULL);
INSERT INTO public.cities VALUES (267, 5, 'Caetité', '2905206', NULL, NULL);
INSERT INTO public.cities VALUES (268, 5, 'Cafarnaum', '2905305', NULL, NULL);
INSERT INTO public.cities VALUES (269, 5, 'Cairu', '2905404', NULL, NULL);
INSERT INTO public.cities VALUES (270, 5, 'Caldeirão Grande', '2905503', NULL, NULL);
INSERT INTO public.cities VALUES (271, 5, 'Camacan', '2905602', NULL, NULL);
INSERT INTO public.cities VALUES (272, 5, 'Camaçari', '2905701', NULL, NULL);
INSERT INTO public.cities VALUES (273, 5, 'Camamu', '2905800', NULL, NULL);
INSERT INTO public.cities VALUES (274, 5, 'Campo Alegre de Lourdes', '2905909', NULL, NULL);
INSERT INTO public.cities VALUES (275, 5, 'Campo Formoso', '2906006', NULL, NULL);
INSERT INTO public.cities VALUES (276, 5, 'Canápolis', '2906105', NULL, NULL);
INSERT INTO public.cities VALUES (277, 5, 'Canarana', '2906204', NULL, NULL);
INSERT INTO public.cities VALUES (278, 5, 'Canavieiras', '2906303', NULL, NULL);
INSERT INTO public.cities VALUES (279, 5, 'Candeal', '2906402', NULL, NULL);
INSERT INTO public.cities VALUES (280, 5, 'Candeias', '2906501', NULL, NULL);
INSERT INTO public.cities VALUES (281, 5, 'Candiba', '2906600', NULL, NULL);
INSERT INTO public.cities VALUES (282, 5, 'Cândido Sales', '2906709', NULL, NULL);
INSERT INTO public.cities VALUES (283, 5, 'Cansanção', '2906808', NULL, NULL);
INSERT INTO public.cities VALUES (284, 5, 'Canudos', '2906824', NULL, NULL);
INSERT INTO public.cities VALUES (285, 5, 'Capela do Alto Alegre', '2906857', NULL, NULL);
INSERT INTO public.cities VALUES (286, 5, 'Capim Grosso', '2906873', NULL, NULL);
INSERT INTO public.cities VALUES (287, 5, 'Caraíbas', '2906899', NULL, NULL);
INSERT INTO public.cities VALUES (288, 5, 'Caravelas', '2906907', NULL, NULL);
INSERT INTO public.cities VALUES (289, 5, 'Cardeal da Silva', '2907004', NULL, NULL);
INSERT INTO public.cities VALUES (290, 5, 'Carinhanha', '2907103', NULL, NULL);
INSERT INTO public.cities VALUES (291, 5, 'Casa Nova', '2907202', NULL, NULL);
INSERT INTO public.cities VALUES (292, 5, 'Castro Alves', '2907301', NULL, NULL);
INSERT INTO public.cities VALUES (293, 5, 'Catolândia', '2907400', NULL, NULL);
INSERT INTO public.cities VALUES (294, 5, 'Catu', '2907509', NULL, NULL);
INSERT INTO public.cities VALUES (295, 5, 'Caturama', '2907558', NULL, NULL);
INSERT INTO public.cities VALUES (296, 5, 'Central', '2907608', NULL, NULL);
INSERT INTO public.cities VALUES (297, 5, 'Chorrochó', '2907707', NULL, NULL);
INSERT INTO public.cities VALUES (298, 5, 'Cícero Dantas', '2907806', NULL, NULL);
INSERT INTO public.cities VALUES (299, 5, 'Cipó', '2907905', NULL, NULL);
INSERT INTO public.cities VALUES (300, 5, 'Coaraci', '2908002', NULL, NULL);
INSERT INTO public.cities VALUES (301, 5, 'Cocos', '2908101', NULL, NULL);
INSERT INTO public.cities VALUES (302, 5, 'Conceição da Feira', '2908200', NULL, NULL);
INSERT INTO public.cities VALUES (303, 5, 'Conceição do Almeida', '2908309', NULL, NULL);
INSERT INTO public.cities VALUES (304, 5, 'Conceição do Coité', '2908408', NULL, NULL);
INSERT INTO public.cities VALUES (305, 5, 'Conceição do Jacuípe', '2908507', NULL, NULL);
INSERT INTO public.cities VALUES (306, 5, 'Conde', '2908606', NULL, NULL);
INSERT INTO public.cities VALUES (307, 5, 'Condeúba', '2908705', NULL, NULL);
INSERT INTO public.cities VALUES (308, 5, 'Contendas do Sincorá', '2908804', NULL, NULL);
INSERT INTO public.cities VALUES (309, 5, 'Coração de Maria', '2908903', NULL, NULL);
INSERT INTO public.cities VALUES (310, 5, 'Cordeiros', '2909000', NULL, NULL);
INSERT INTO public.cities VALUES (311, 5, 'Coribe', '2909109', NULL, NULL);
INSERT INTO public.cities VALUES (312, 5, 'Coronel João Sá', '2909208', NULL, NULL);
INSERT INTO public.cities VALUES (313, 5, 'Correntina', '2909307', NULL, NULL);
INSERT INTO public.cities VALUES (314, 5, 'Cotegipe', '2909406', NULL, NULL);
INSERT INTO public.cities VALUES (315, 5, 'Cravolândia', '2909505', NULL, NULL);
INSERT INTO public.cities VALUES (316, 5, 'Crisópolis', '2909604', NULL, NULL);
INSERT INTO public.cities VALUES (317, 5, 'Cristópolis', '2909703', NULL, NULL);
INSERT INTO public.cities VALUES (318, 5, 'Cruz das Almas', '2909802', NULL, NULL);
INSERT INTO public.cities VALUES (319, 5, 'Curaçá', '2909901', NULL, NULL);
INSERT INTO public.cities VALUES (320, 5, 'Dário Meira', '2910008', NULL, NULL);
INSERT INTO public.cities VALUES (321, 5, 'Dias d''Ávila', '2910057', NULL, NULL);
INSERT INTO public.cities VALUES (322, 5, 'Dom Basílio', '2910107', NULL, NULL);
INSERT INTO public.cities VALUES (323, 5, 'Dom Macedo Costa', '2910206', NULL, NULL);
INSERT INTO public.cities VALUES (324, 5, 'Elísio Medrado', '2910305', NULL, NULL);
INSERT INTO public.cities VALUES (325, 5, 'Encruzilhada', '2910404', NULL, NULL);
INSERT INTO public.cities VALUES (326, 5, 'Entre Rios', '2910503', NULL, NULL);
INSERT INTO public.cities VALUES (327, 5, 'Érico Cardoso', '2900504', NULL, NULL);
INSERT INTO public.cities VALUES (328, 5, 'Esplanada', '2910602', NULL, NULL);
INSERT INTO public.cities VALUES (329, 5, 'Euclides da Cunha', '2910701', NULL, NULL);
INSERT INTO public.cities VALUES (330, 5, 'Eunápolis', '2910727', NULL, NULL);
INSERT INTO public.cities VALUES (331, 5, 'Fátima', '2910750', NULL, NULL);
INSERT INTO public.cities VALUES (332, 5, 'Feira da Mata', '2910776', NULL, NULL);
INSERT INTO public.cities VALUES (333, 5, 'Feira de Santana', '2910800', NULL, NULL);
INSERT INTO public.cities VALUES (334, 5, 'Filadélfia', '2910859', NULL, NULL);
INSERT INTO public.cities VALUES (335, 5, 'Firmino Alves', '2910909', NULL, NULL);
INSERT INTO public.cities VALUES (336, 5, 'Floresta Azul', '2911006', NULL, NULL);
INSERT INTO public.cities VALUES (337, 5, 'Formosa do Rio Preto', '2911105', NULL, NULL);
INSERT INTO public.cities VALUES (338, 5, 'Gandu', '2911204', NULL, NULL);
INSERT INTO public.cities VALUES (339, 5, 'Gavião', '2911253', NULL, NULL);
INSERT INTO public.cities VALUES (340, 5, 'Gentio do Ouro', '2911303', NULL, NULL);
INSERT INTO public.cities VALUES (341, 5, 'Glória', '2911402', NULL, NULL);
INSERT INTO public.cities VALUES (342, 5, 'Gongogi', '2911501', NULL, NULL);
INSERT INTO public.cities VALUES (343, 5, 'Governador Mangabeira', '2911600', NULL, NULL);
INSERT INTO public.cities VALUES (344, 5, 'Guajeru', '2911659', NULL, NULL);
INSERT INTO public.cities VALUES (345, 5, 'Guanambi', '2911709', NULL, NULL);
INSERT INTO public.cities VALUES (346, 5, 'Guaratinga', '2911808', NULL, NULL);
INSERT INTO public.cities VALUES (347, 5, 'Heliópolis', '2911857', NULL, NULL);
INSERT INTO public.cities VALUES (348, 5, 'Iaçu', '2911907', NULL, NULL);
INSERT INTO public.cities VALUES (349, 5, 'Ibiassucê', '2912004', NULL, NULL);
INSERT INTO public.cities VALUES (350, 5, 'Ibicaraí', '2912103', NULL, NULL);
INSERT INTO public.cities VALUES (351, 5, 'Ibicoara', '2912202', NULL, NULL);
INSERT INTO public.cities VALUES (352, 5, 'Ibicuí', '2912301', NULL, NULL);
INSERT INTO public.cities VALUES (353, 5, 'Ibipeba', '2912400', NULL, NULL);
INSERT INTO public.cities VALUES (354, 5, 'Ibipitanga', '2912509', NULL, NULL);
INSERT INTO public.cities VALUES (355, 5, 'Ibiquera', '2912608', NULL, NULL);
INSERT INTO public.cities VALUES (356, 5, 'Ibirapitanga', '2912707', NULL, NULL);
INSERT INTO public.cities VALUES (357, 5, 'Ibirapuã', '2912806', NULL, NULL);
INSERT INTO public.cities VALUES (358, 5, 'Ibirataia', '2912905', NULL, NULL);
INSERT INTO public.cities VALUES (359, 5, 'Ibitiara', '2913002', NULL, NULL);
INSERT INTO public.cities VALUES (360, 5, 'Ibititá', '2913101', NULL, NULL);
INSERT INTO public.cities VALUES (361, 5, 'Ibotirama', '2913200', NULL, NULL);
INSERT INTO public.cities VALUES (362, 5, 'Ichu', '2913309', NULL, NULL);
INSERT INTO public.cities VALUES (363, 5, 'Igaporã', '2913408', NULL, NULL);
INSERT INTO public.cities VALUES (364, 5, 'Igrapiúna', '2913457', NULL, NULL);
INSERT INTO public.cities VALUES (365, 5, 'Iguaí', '2913507', NULL, NULL);
INSERT INTO public.cities VALUES (366, 5, 'Ilhéus', '2913606', NULL, NULL);
INSERT INTO public.cities VALUES (367, 5, 'Inhambupe', '2913705', NULL, NULL);
INSERT INTO public.cities VALUES (368, 5, 'Ipecaetá', '2913804', NULL, NULL);
INSERT INTO public.cities VALUES (369, 5, 'Ipiaú', '2913903', NULL, NULL);
INSERT INTO public.cities VALUES (370, 5, 'Ipirá', '2914000', NULL, NULL);
INSERT INTO public.cities VALUES (371, 5, 'Ipupiara', '2914109', NULL, NULL);
INSERT INTO public.cities VALUES (372, 5, 'Irajuba', '2914208', NULL, NULL);
INSERT INTO public.cities VALUES (373, 5, 'Iramaia', '2914307', NULL, NULL);
INSERT INTO public.cities VALUES (374, 5, 'Iraquara', '2914406', NULL, NULL);
INSERT INTO public.cities VALUES (375, 5, 'Irará', '2914505', NULL, NULL);
INSERT INTO public.cities VALUES (376, 5, 'Irecê', '2914604', NULL, NULL);
INSERT INTO public.cities VALUES (377, 5, 'Itabela', '2914653', NULL, NULL);
INSERT INTO public.cities VALUES (378, 5, 'Itaberaba', '2914703', NULL, NULL);
INSERT INTO public.cities VALUES (379, 5, 'Itabuna', '2914802', NULL, NULL);
INSERT INTO public.cities VALUES (380, 5, 'Itacaré', '2914901', NULL, NULL);
INSERT INTO public.cities VALUES (381, 5, 'Itaeté', '2915007', NULL, NULL);
INSERT INTO public.cities VALUES (382, 5, 'Itagi', '2915106', NULL, NULL);
INSERT INTO public.cities VALUES (383, 5, 'Itagibá', '2915205', NULL, NULL);
INSERT INTO public.cities VALUES (384, 5, 'Itagimirim', '2915304', NULL, NULL);
INSERT INTO public.cities VALUES (385, 5, 'Itaguaçu da Bahia', '2915353', NULL, NULL);
INSERT INTO public.cities VALUES (386, 5, 'Itaju do Colônia', '2915403', NULL, NULL);
INSERT INTO public.cities VALUES (387, 5, 'Itajuípe', '2915502', NULL, NULL);
INSERT INTO public.cities VALUES (388, 5, 'Itamaraju', '2915601', NULL, NULL);
INSERT INTO public.cities VALUES (389, 5, 'Itamari', '2915700', NULL, NULL);
INSERT INTO public.cities VALUES (390, 5, 'Itambé', '2915809', NULL, NULL);
INSERT INTO public.cities VALUES (391, 5, 'Itanagra', '2915908', NULL, NULL);
INSERT INTO public.cities VALUES (392, 5, 'Itanhém', '2916005', NULL, NULL);
INSERT INTO public.cities VALUES (393, 5, 'Itaparica', '2916104', NULL, NULL);
INSERT INTO public.cities VALUES (394, 5, 'Itapé', '2916203', NULL, NULL);
INSERT INTO public.cities VALUES (395, 5, 'Itapebi', '2916302', NULL, NULL);
INSERT INTO public.cities VALUES (396, 5, 'Itapetinga', '2916401', NULL, NULL);
INSERT INTO public.cities VALUES (397, 5, 'Itapicuru', '2916500', NULL, NULL);
INSERT INTO public.cities VALUES (398, 5, 'Itapitanga', '2916609', NULL, NULL);
INSERT INTO public.cities VALUES (399, 5, 'Itaquara', '2916708', NULL, NULL);
INSERT INTO public.cities VALUES (400, 5, 'Itarantim', '2916807', NULL, NULL);
INSERT INTO public.cities VALUES (401, 5, 'Itatim', '2916856', NULL, NULL);
INSERT INTO public.cities VALUES (402, 5, 'Itiruçu', '2916906', NULL, NULL);
INSERT INTO public.cities VALUES (403, 5, 'Itiúba', '2917003', NULL, NULL);
INSERT INTO public.cities VALUES (404, 5, 'Itororó', '2917102', NULL, NULL);
INSERT INTO public.cities VALUES (405, 5, 'Ituaçu', '2917201', NULL, NULL);
INSERT INTO public.cities VALUES (406, 5, 'Ituberá', '2917300', NULL, NULL);
INSERT INTO public.cities VALUES (407, 5, 'Iuiú', '2917334', NULL, NULL);
INSERT INTO public.cities VALUES (408, 5, 'Jaborandi', '2917359', NULL, NULL);
INSERT INTO public.cities VALUES (409, 5, 'Jacaraci', '2917409', NULL, NULL);
INSERT INTO public.cities VALUES (410, 5, 'Jacobina', '2917508', NULL, NULL);
INSERT INTO public.cities VALUES (411, 5, 'Jaguaquara', '2917607', NULL, NULL);
INSERT INTO public.cities VALUES (412, 5, 'Jaguarari', '2917706', NULL, NULL);
INSERT INTO public.cities VALUES (413, 5, 'Jaguaripe', '2917805', NULL, NULL);
INSERT INTO public.cities VALUES (414, 5, 'Jandaíra', '2917904', NULL, NULL);
INSERT INTO public.cities VALUES (415, 5, 'Jequié', '2918001', NULL, NULL);
INSERT INTO public.cities VALUES (416, 5, 'Jeremoabo', '2918100', NULL, NULL);
INSERT INTO public.cities VALUES (417, 5, 'Jiquiriçá', '2918209', NULL, NULL);
INSERT INTO public.cities VALUES (418, 5, 'Jitaúna', '2918308', NULL, NULL);
INSERT INTO public.cities VALUES (419, 5, 'João Dourado', '2918357', NULL, NULL);
INSERT INTO public.cities VALUES (420, 5, 'Juazeiro', '2918407', NULL, NULL);
INSERT INTO public.cities VALUES (421, 5, 'Jucuruçu', '2918456', NULL, NULL);
INSERT INTO public.cities VALUES (422, 5, 'Jussara', '2918506', NULL, NULL);
INSERT INTO public.cities VALUES (423, 5, 'Jussari', '2918555', NULL, NULL);
INSERT INTO public.cities VALUES (424, 5, 'Jussiape', '2918605', NULL, NULL);
INSERT INTO public.cities VALUES (425, 5, 'Lafaiete Coutinho', '2918704', NULL, NULL);
INSERT INTO public.cities VALUES (426, 5, 'Lagoa Real', '2918753', NULL, NULL);
INSERT INTO public.cities VALUES (427, 5, 'Laje', '2918803', NULL, NULL);
INSERT INTO public.cities VALUES (428, 5, 'Lajedão', '2918902', NULL, NULL);
INSERT INTO public.cities VALUES (429, 5, 'Lajedinho', '2919009', NULL, NULL);
INSERT INTO public.cities VALUES (430, 5, 'Lajedo do Tabocal', '2919058', NULL, NULL);
INSERT INTO public.cities VALUES (431, 5, 'Lamarão', '2919108', NULL, NULL);
INSERT INTO public.cities VALUES (432, 5, 'Lapão', '2919157', NULL, NULL);
INSERT INTO public.cities VALUES (433, 5, 'Lauro de Freitas', '2919207', NULL, NULL);
INSERT INTO public.cities VALUES (434, 5, 'Lençóis', '2919306', NULL, NULL);
INSERT INTO public.cities VALUES (435, 5, 'Licínio de Almeida', '2919405', NULL, NULL);
INSERT INTO public.cities VALUES (436, 5, 'Livramento de Nossa Senhora', '2919504', NULL, NULL);
INSERT INTO public.cities VALUES (437, 5, 'Luís Eduardo Magalhães', '2919553', NULL, NULL);
INSERT INTO public.cities VALUES (438, 5, 'Macajuba', '2919603', NULL, NULL);
INSERT INTO public.cities VALUES (439, 5, 'Macarani', '2919702', NULL, NULL);
INSERT INTO public.cities VALUES (440, 5, 'Macaúbas', '2919801', NULL, NULL);
INSERT INTO public.cities VALUES (441, 5, 'Macururé', '2919900', NULL, NULL);
INSERT INTO public.cities VALUES (442, 5, 'Madre de Deus', '2919926', NULL, NULL);
INSERT INTO public.cities VALUES (443, 5, 'Maetinga', '2919959', NULL, NULL);
INSERT INTO public.cities VALUES (444, 5, 'Maiquinique', '2920007', NULL, NULL);
INSERT INTO public.cities VALUES (445, 5, 'Mairi', '2920106', NULL, NULL);
INSERT INTO public.cities VALUES (446, 5, 'Malhada', '2920205', NULL, NULL);
INSERT INTO public.cities VALUES (447, 5, 'Malhada de Pedras', '2920304', NULL, NULL);
INSERT INTO public.cities VALUES (448, 5, 'Manoel Vitorino', '2920403', NULL, NULL);
INSERT INTO public.cities VALUES (449, 5, 'Mansidão', '2920452', NULL, NULL);
INSERT INTO public.cities VALUES (450, 5, 'Maracás', '2920502', NULL, NULL);
INSERT INTO public.cities VALUES (451, 5, 'Maragogipe', '2920601', NULL, NULL);
INSERT INTO public.cities VALUES (452, 5, 'Maraú', '2920700', NULL, NULL);
INSERT INTO public.cities VALUES (453, 5, 'Marcionílio Souza', '2920809', NULL, NULL);
INSERT INTO public.cities VALUES (454, 5, 'Mascote', '2920908', NULL, NULL);
INSERT INTO public.cities VALUES (455, 5, 'Mata de São João', '2921005', NULL, NULL);
INSERT INTO public.cities VALUES (456, 5, 'Matina', '2921054', NULL, NULL);
INSERT INTO public.cities VALUES (457, 5, 'Medeiros Neto', '2921104', NULL, NULL);
INSERT INTO public.cities VALUES (458, 5, 'Miguel Calmon', '2921203', NULL, NULL);
INSERT INTO public.cities VALUES (459, 5, 'Milagres', '2921302', NULL, NULL);
INSERT INTO public.cities VALUES (460, 5, 'Mirangaba', '2921401', NULL, NULL);
INSERT INTO public.cities VALUES (461, 5, 'Mirante', '2921450', NULL, NULL);
INSERT INTO public.cities VALUES (462, 5, 'Monte Santo', '2921500', NULL, NULL);
INSERT INTO public.cities VALUES (463, 5, 'Morpará', '2921609', NULL, NULL);
INSERT INTO public.cities VALUES (464, 5, 'Morro do Chapéu', '2921708', NULL, NULL);
INSERT INTO public.cities VALUES (465, 5, 'Mortugaba', '2921807', NULL, NULL);
INSERT INTO public.cities VALUES (466, 5, 'Mucugê', '2921906', NULL, NULL);
INSERT INTO public.cities VALUES (467, 5, 'Mucuri', '2922003', NULL, NULL);
INSERT INTO public.cities VALUES (468, 5, 'Mulungu do Morro', '2922052', NULL, NULL);
INSERT INTO public.cities VALUES (469, 5, 'Mundo Novo', '2922102', NULL, NULL);
INSERT INTO public.cities VALUES (470, 5, 'Muniz Ferreira', '2922201', NULL, NULL);
INSERT INTO public.cities VALUES (471, 5, 'Muquém de São Francisco', '2922250', NULL, NULL);
INSERT INTO public.cities VALUES (472, 5, 'Muritiba', '2922300', NULL, NULL);
INSERT INTO public.cities VALUES (473, 5, 'Mutuípe', '2922409', NULL, NULL);
INSERT INTO public.cities VALUES (474, 5, 'Nazaré', '2922508', NULL, NULL);
INSERT INTO public.cities VALUES (475, 5, 'Nilo Peçanha', '2922607', NULL, NULL);
INSERT INTO public.cities VALUES (476, 5, 'Nordestina', '2922656', NULL, NULL);
INSERT INTO public.cities VALUES (477, 5, 'Nova Canaã', '2922706', NULL, NULL);
INSERT INTO public.cities VALUES (478, 5, 'Nova Fátima', '2922730', NULL, NULL);
INSERT INTO public.cities VALUES (479, 5, 'Nova Ibiá', '2922755', NULL, NULL);
INSERT INTO public.cities VALUES (480, 5, 'Nova Itarana', '2922805', NULL, NULL);
INSERT INTO public.cities VALUES (481, 5, 'Nova Redenção', '2922854', NULL, NULL);
INSERT INTO public.cities VALUES (482, 5, 'Nova Soure', '2922904', NULL, NULL);
INSERT INTO public.cities VALUES (483, 5, 'Nova Viçosa', '2923001', NULL, NULL);
INSERT INTO public.cities VALUES (484, 5, 'Novo Horizonte', '2923035', NULL, NULL);
INSERT INTO public.cities VALUES (485, 5, 'Novo Triunfo', '2923050', NULL, NULL);
INSERT INTO public.cities VALUES (486, 5, 'Olindina', '2923100', NULL, NULL);
INSERT INTO public.cities VALUES (487, 5, 'Oliveira dos Brejinhos', '2923209', NULL, NULL);
INSERT INTO public.cities VALUES (488, 5, 'Ouriçangas', '2923308', NULL, NULL);
INSERT INTO public.cities VALUES (489, 5, 'Ourolândia', '2923357', NULL, NULL);
INSERT INTO public.cities VALUES (490, 5, 'Palmas de Monte Alto', '2923407', NULL, NULL);
INSERT INTO public.cities VALUES (491, 5, 'Palmeiras', '2923506', NULL, NULL);
INSERT INTO public.cities VALUES (492, 5, 'Paramirim', '2923605', NULL, NULL);
INSERT INTO public.cities VALUES (493, 5, 'Paratinga', '2923704', NULL, NULL);
INSERT INTO public.cities VALUES (494, 5, 'Paripiranga', '2923803', NULL, NULL);
INSERT INTO public.cities VALUES (495, 5, 'Pau Brasil', '2923902', NULL, NULL);
INSERT INTO public.cities VALUES (496, 5, 'Paulo Afonso', '2924009', NULL, NULL);
INSERT INTO public.cities VALUES (497, 5, 'Pé de Serra', '2924058', NULL, NULL);
INSERT INTO public.cities VALUES (498, 5, 'Pedrão', '2924108', NULL, NULL);
INSERT INTO public.cities VALUES (499, 5, 'Pedro Alexandre', '2924207', NULL, NULL);
INSERT INTO public.cities VALUES (500, 5, 'Piatã', '2924306', NULL, NULL);
INSERT INTO public.cities VALUES (501, 5, 'Pilão Arcado', '2924405', NULL, NULL);
INSERT INTO public.cities VALUES (502, 5, 'Pindaí', '2924504', NULL, NULL);
INSERT INTO public.cities VALUES (503, 5, 'Pindobaçu', '2924603', NULL, NULL);
INSERT INTO public.cities VALUES (504, 5, 'Pintadas', '2924652', NULL, NULL);
INSERT INTO public.cities VALUES (505, 5, 'Piraí do Norte', '2924678', NULL, NULL);
INSERT INTO public.cities VALUES (506, 5, 'Piripá', '2924702', NULL, NULL);
INSERT INTO public.cities VALUES (507, 5, 'Piritiba', '2924801', NULL, NULL);
INSERT INTO public.cities VALUES (508, 5, 'Planaltino', '2924900', NULL, NULL);
INSERT INTO public.cities VALUES (509, 5, 'Planalto', '2925006', NULL, NULL);
INSERT INTO public.cities VALUES (510, 5, 'Poções', '2925105', NULL, NULL);
INSERT INTO public.cities VALUES (511, 5, 'Pojuca', '2925204', NULL, NULL);
INSERT INTO public.cities VALUES (512, 5, 'Ponto Novo', '2925253', NULL, NULL);
INSERT INTO public.cities VALUES (513, 5, 'Porto Seguro', '2925303', NULL, NULL);
INSERT INTO public.cities VALUES (514, 5, 'Potiraguá', '2925402', NULL, NULL);
INSERT INTO public.cities VALUES (515, 5, 'Prado', '2925501', NULL, NULL);
INSERT INTO public.cities VALUES (516, 5, 'Presidente Dutra', '2925600', NULL, NULL);
INSERT INTO public.cities VALUES (517, 5, 'Presidente Jânio Quadros', '2925709', NULL, NULL);
INSERT INTO public.cities VALUES (518, 5, 'Presidente Tancredo Neves', '2925758', NULL, NULL);
INSERT INTO public.cities VALUES (519, 5, 'Queimadas', '2925808', NULL, NULL);
INSERT INTO public.cities VALUES (520, 5, 'Quijingue', '2925907', NULL, NULL);
INSERT INTO public.cities VALUES (521, 5, 'Quixabeira', '2925931', NULL, NULL);
INSERT INTO public.cities VALUES (522, 5, 'Rafael Jambeiro', '2925956', NULL, NULL);
INSERT INTO public.cities VALUES (523, 5, 'Remanso', '2926004', NULL, NULL);
INSERT INTO public.cities VALUES (524, 5, 'Retirolândia', '2926103', NULL, NULL);
INSERT INTO public.cities VALUES (525, 5, 'Riachão das Neves', '2926202', NULL, NULL);
INSERT INTO public.cities VALUES (526, 5, 'Riachão do Jacuípe', '2926301', NULL, NULL);
INSERT INTO public.cities VALUES (527, 5, 'Riacho de Santana', '2926400', NULL, NULL);
INSERT INTO public.cities VALUES (528, 5, 'Ribeira do Amparo', '2926509', NULL, NULL);
INSERT INTO public.cities VALUES (529, 5, 'Ribeira do Pombal', '2926608', NULL, NULL);
INSERT INTO public.cities VALUES (530, 5, 'Ribeirão do Largo', '2926657', NULL, NULL);
INSERT INTO public.cities VALUES (531, 5, 'Rio de Contas', '2926707', NULL, NULL);
INSERT INTO public.cities VALUES (532, 5, 'Rio do Antônio', '2926806', NULL, NULL);
INSERT INTO public.cities VALUES (533, 5, 'Rio do Pires', '2926905', NULL, NULL);
INSERT INTO public.cities VALUES (534, 5, 'Rio Real', '2927002', NULL, NULL);
INSERT INTO public.cities VALUES (535, 5, 'Rodelas', '2927101', NULL, NULL);
INSERT INTO public.cities VALUES (536, 5, 'Ruy Barbosa', '2927200', NULL, NULL);
INSERT INTO public.cities VALUES (537, 5, 'Salinas da Margarida', '2927309', NULL, NULL);
INSERT INTO public.cities VALUES (538, 5, 'Salvador', '2927408', NULL, NULL);
INSERT INTO public.cities VALUES (539, 5, 'Santa Bárbara', '2927507', NULL, NULL);
INSERT INTO public.cities VALUES (540, 5, 'Santa Brígida', '2927606', NULL, NULL);
INSERT INTO public.cities VALUES (541, 5, 'Santa Cruz Cabrália', '2927705', NULL, NULL);
INSERT INTO public.cities VALUES (542, 5, 'Santa Cruz da Vitória', '2927804', NULL, NULL);
INSERT INTO public.cities VALUES (543, 5, 'Santa Inês', '2927903', NULL, NULL);
INSERT INTO public.cities VALUES (544, 5, 'Santa Luzia', '2928059', NULL, NULL);
INSERT INTO public.cities VALUES (545, 5, 'Santa Maria da Vitória', '2928109', NULL, NULL);
INSERT INTO public.cities VALUES (546, 5, 'Santa Rita de Cássia', '2928406', NULL, NULL);
INSERT INTO public.cities VALUES (547, 5, 'Santa Teresinha', '2928505', NULL, NULL);
INSERT INTO public.cities VALUES (548, 5, 'Santaluz', '2928000', NULL, NULL);
INSERT INTO public.cities VALUES (549, 5, 'Santana', '2928208', NULL, NULL);
INSERT INTO public.cities VALUES (550, 5, 'Santanópolis', '2928307', NULL, NULL);
INSERT INTO public.cities VALUES (551, 5, 'Santo Amaro', '2928604', NULL, NULL);
INSERT INTO public.cities VALUES (552, 5, 'Santo Antônio de Jesus', '2928703', NULL, NULL);
INSERT INTO public.cities VALUES (553, 5, 'Santo Estêvão', '2928802', NULL, NULL);
INSERT INTO public.cities VALUES (554, 5, 'São Desidério', '2928901', NULL, NULL);
INSERT INTO public.cities VALUES (555, 5, 'São Domingos', '2928950', NULL, NULL);
INSERT INTO public.cities VALUES (556, 5, 'São Felipe', '2929107', NULL, NULL);
INSERT INTO public.cities VALUES (557, 5, 'São Félix', '2929008', NULL, NULL);
INSERT INTO public.cities VALUES (558, 5, 'São Félix do Coribe', '2929057', NULL, NULL);
INSERT INTO public.cities VALUES (559, 5, 'São Francisco do Conde', '2929206', NULL, NULL);
INSERT INTO public.cities VALUES (560, 5, 'São Gabriel', '2929255', NULL, NULL);
INSERT INTO public.cities VALUES (561, 5, 'São Gonçalo dos Campos', '2929305', NULL, NULL);
INSERT INTO public.cities VALUES (562, 5, 'São José da Vitória', '2929354', NULL, NULL);
INSERT INTO public.cities VALUES (563, 5, 'São José do Jacuípe', '2929370', NULL, NULL);
INSERT INTO public.cities VALUES (564, 5, 'São Miguel das Matas', '2929404', NULL, NULL);
INSERT INTO public.cities VALUES (565, 5, 'São Sebastião do Passé', '2929503', NULL, NULL);
INSERT INTO public.cities VALUES (566, 5, 'Sapeaçu', '2929602', NULL, NULL);
INSERT INTO public.cities VALUES (567, 5, 'Sátiro Dias', '2929701', NULL, NULL);
INSERT INTO public.cities VALUES (568, 5, 'Saubara', '2929750', NULL, NULL);
INSERT INTO public.cities VALUES (569, 5, 'Saúde', '2929800', NULL, NULL);
INSERT INTO public.cities VALUES (570, 5, 'Seabra', '2929909', NULL, NULL);
INSERT INTO public.cities VALUES (571, 5, 'Sebastião Laranjeiras', '2930006', NULL, NULL);
INSERT INTO public.cities VALUES (572, 5, 'Senhor do Bonfim', '2930105', NULL, NULL);
INSERT INTO public.cities VALUES (573, 5, 'Sento Sé', '2930204', NULL, NULL);
INSERT INTO public.cities VALUES (574, 5, 'Serra do Ramalho', '2930154', NULL, NULL);
INSERT INTO public.cities VALUES (575, 5, 'Serra Dourada', '2930303', NULL, NULL);
INSERT INTO public.cities VALUES (576, 5, 'Serra Preta', '2930402', NULL, NULL);
INSERT INTO public.cities VALUES (577, 5, 'Serrinha', '2930501', NULL, NULL);
INSERT INTO public.cities VALUES (578, 5, 'Serrolândia', '2930600', NULL, NULL);
INSERT INTO public.cities VALUES (579, 5, 'Simões Filho', '2930709', NULL, NULL);
INSERT INTO public.cities VALUES (580, 5, 'Sítio do Mato', '2930758', NULL, NULL);
INSERT INTO public.cities VALUES (581, 5, 'Sítio do Quinto', '2930766', NULL, NULL);
INSERT INTO public.cities VALUES (582, 5, 'Sobradinho', '2930774', NULL, NULL);
INSERT INTO public.cities VALUES (583, 5, 'Souto Soares', '2930808', NULL, NULL);
INSERT INTO public.cities VALUES (584, 5, 'Tabocas do Brejo Velho', '2930907', NULL, NULL);
INSERT INTO public.cities VALUES (585, 5, 'Tanhaçu', '2931004', NULL, NULL);
INSERT INTO public.cities VALUES (586, 5, 'Tanque Novo', '2931053', NULL, NULL);
INSERT INTO public.cities VALUES (587, 5, 'Tanquinho', '2931103', NULL, NULL);
INSERT INTO public.cities VALUES (588, 5, 'Taperoá', '2931202', NULL, NULL);
INSERT INTO public.cities VALUES (589, 5, 'Tapiramutá', '2931301', NULL, NULL);
INSERT INTO public.cities VALUES (590, 5, 'Teixeira de Freitas', '2931350', NULL, NULL);
INSERT INTO public.cities VALUES (591, 5, 'Teodoro Sampaio', '2931400', NULL, NULL);
INSERT INTO public.cities VALUES (592, 5, 'Teofilândia', '2931509', NULL, NULL);
INSERT INTO public.cities VALUES (593, 5, 'Teolândia', '2931608', NULL, NULL);
INSERT INTO public.cities VALUES (594, 5, 'Terra Nova', '2931707', NULL, NULL);
INSERT INTO public.cities VALUES (595, 5, 'Tremedal', '2931806', NULL, NULL);
INSERT INTO public.cities VALUES (596, 5, 'Tucano', '2931905', NULL, NULL);
INSERT INTO public.cities VALUES (597, 5, 'Uauá', '2932002', NULL, NULL);
INSERT INTO public.cities VALUES (598, 5, 'Ubaíra', '2932101', NULL, NULL);
INSERT INTO public.cities VALUES (599, 5, 'Ubaitaba', '2932200', NULL, NULL);
INSERT INTO public.cities VALUES (600, 5, 'Ubatã', '2932309', NULL, NULL);
INSERT INTO public.cities VALUES (601, 5, 'Uibaí', '2932408', NULL, NULL);
INSERT INTO public.cities VALUES (602, 5, 'Umburanas', '2932457', NULL, NULL);
INSERT INTO public.cities VALUES (603, 5, 'Una', '2932507', NULL, NULL);
INSERT INTO public.cities VALUES (604, 5, 'Urandi', '2932606', NULL, NULL);
INSERT INTO public.cities VALUES (605, 5, 'Uruçuca', '2932705', NULL, NULL);
INSERT INTO public.cities VALUES (606, 5, 'Utinga', '2932804', NULL, NULL);
INSERT INTO public.cities VALUES (607, 5, 'Valença', '2932903', NULL, NULL);
INSERT INTO public.cities VALUES (608, 5, 'Valente', '2933000', NULL, NULL);
INSERT INTO public.cities VALUES (609, 5, 'Várzea da Roça', '2933059', NULL, NULL);
INSERT INTO public.cities VALUES (610, 5, 'Várzea do Poço', '2933109', NULL, NULL);
INSERT INTO public.cities VALUES (611, 5, 'Várzea Nova', '2933158', NULL, NULL);
INSERT INTO public.cities VALUES (612, 5, 'Varzedo', '2933174', NULL, NULL);
INSERT INTO public.cities VALUES (613, 5, 'Vera Cruz', '2933208', NULL, NULL);
INSERT INTO public.cities VALUES (614, 5, 'Vereda', '2933257', NULL, NULL);
INSERT INTO public.cities VALUES (615, 5, 'Vitória da Conquista', '2933307', NULL, NULL);
INSERT INTO public.cities VALUES (616, 5, 'Wagner', '2933406', NULL, NULL);
INSERT INTO public.cities VALUES (617, 5, 'Wanderley', '2933455', NULL, NULL);
INSERT INTO public.cities VALUES (618, 5, 'Wenceslau Guimarães', '2933505', NULL, NULL);
INSERT INTO public.cities VALUES (619, 5, 'Xique-Xique', '2933604', NULL, NULL);
INSERT INTO public.cities VALUES (620, 6, 'Abaiara', '2300101', NULL, NULL);
INSERT INTO public.cities VALUES (621, 6, 'Acarape', '2300150', NULL, NULL);
INSERT INTO public.cities VALUES (622, 6, 'Acaraú', '2300200', NULL, NULL);
INSERT INTO public.cities VALUES (623, 6, 'Acopiara', '2300309', NULL, NULL);
INSERT INTO public.cities VALUES (624, 6, 'Aiuaba', '2300408', NULL, NULL);
INSERT INTO public.cities VALUES (625, 6, 'Alcântaras', '2300507', NULL, NULL);
INSERT INTO public.cities VALUES (626, 6, 'Altaneira', '2300606', NULL, NULL);
INSERT INTO public.cities VALUES (627, 6, 'Alto Santo', '2300705', NULL, NULL);
INSERT INTO public.cities VALUES (628, 6, 'Amontada', '2300754', NULL, NULL);
INSERT INTO public.cities VALUES (629, 6, 'Antonina do Norte', '2300804', NULL, NULL);
INSERT INTO public.cities VALUES (630, 6, 'Apuiarés', '2300903', NULL, NULL);
INSERT INTO public.cities VALUES (631, 6, 'Aquiraz', '2301000', NULL, NULL);
INSERT INTO public.cities VALUES (632, 6, 'Aracati', '2301109', NULL, NULL);
INSERT INTO public.cities VALUES (633, 6, 'Aracoiaba', '2301208', NULL, NULL);
INSERT INTO public.cities VALUES (634, 6, 'Ararendá', '2301257', NULL, NULL);
INSERT INTO public.cities VALUES (635, 6, 'Araripe', '2301307', NULL, NULL);
INSERT INTO public.cities VALUES (636, 6, 'Aratuba', '2301406', NULL, NULL);
INSERT INTO public.cities VALUES (637, 6, 'Arneiroz', '2301505', NULL, NULL);
INSERT INTO public.cities VALUES (638, 6, 'Assaré', '2301604', NULL, NULL);
INSERT INTO public.cities VALUES (639, 6, 'Aurora', '2301703', NULL, NULL);
INSERT INTO public.cities VALUES (640, 6, 'Baixio', '2301802', NULL, NULL);
INSERT INTO public.cities VALUES (641, 6, 'Banabuiú', '2301851', NULL, NULL);
INSERT INTO public.cities VALUES (642, 6, 'Barbalha', '2301901', NULL, NULL);
INSERT INTO public.cities VALUES (643, 6, 'Barreira', '2301950', NULL, NULL);
INSERT INTO public.cities VALUES (644, 6, 'Barro', '2302008', NULL, NULL);
INSERT INTO public.cities VALUES (645, 6, 'Barroquinha', '2302057', NULL, NULL);
INSERT INTO public.cities VALUES (646, 6, 'Baturité', '2302107', NULL, NULL);
INSERT INTO public.cities VALUES (647, 6, 'Beberibe', '2302206', NULL, NULL);
INSERT INTO public.cities VALUES (648, 6, 'Bela Cruz', '2302305', NULL, NULL);
INSERT INTO public.cities VALUES (649, 6, 'Boa Viagem', '2302404', NULL, NULL);
INSERT INTO public.cities VALUES (650, 6, 'Brejo Santo', '2302503', NULL, NULL);
INSERT INTO public.cities VALUES (651, 6, 'Camocim', '2302602', NULL, NULL);
INSERT INTO public.cities VALUES (652, 6, 'Campos Sales', '2302701', NULL, NULL);
INSERT INTO public.cities VALUES (653, 6, 'Canindé', '2302800', NULL, NULL);
INSERT INTO public.cities VALUES (654, 6, 'Capistrano', '2302909', NULL, NULL);
INSERT INTO public.cities VALUES (655, 6, 'Caridade', '2303006', NULL, NULL);
INSERT INTO public.cities VALUES (656, 6, 'Cariré', '2303105', NULL, NULL);
INSERT INTO public.cities VALUES (657, 6, 'Caririaçu', '2303204', NULL, NULL);
INSERT INTO public.cities VALUES (658, 6, 'Cariús', '2303303', NULL, NULL);
INSERT INTO public.cities VALUES (659, 6, 'Carnaubal', '2303402', NULL, NULL);
INSERT INTO public.cities VALUES (660, 6, 'Cascavel', '2303501', NULL, NULL);
INSERT INTO public.cities VALUES (661, 6, 'Catarina', '2303600', NULL, NULL);
INSERT INTO public.cities VALUES (662, 6, 'Catunda', '2303659', NULL, NULL);
INSERT INTO public.cities VALUES (663, 6, 'Caucaia', '2303709', NULL, NULL);
INSERT INTO public.cities VALUES (664, 6, 'Cedro', '2303808', NULL, NULL);
INSERT INTO public.cities VALUES (665, 6, 'Chaval', '2303907', NULL, NULL);
INSERT INTO public.cities VALUES (666, 6, 'Choró', '2303931', NULL, NULL);
INSERT INTO public.cities VALUES (667, 6, 'Chorozinho', '2303956', NULL, NULL);
INSERT INTO public.cities VALUES (668, 6, 'Coreaú', '2304004', NULL, NULL);
INSERT INTO public.cities VALUES (669, 6, 'Crateús', '2304103', NULL, NULL);
INSERT INTO public.cities VALUES (670, 6, 'Crato', '2304202', NULL, NULL);
INSERT INTO public.cities VALUES (671, 6, 'Croatá', '2304236', NULL, NULL);
INSERT INTO public.cities VALUES (672, 6, 'Cruz', '2304251', NULL, NULL);
INSERT INTO public.cities VALUES (673, 6, 'Deputado Irapuan Pinheiro', '2304269', NULL, NULL);
INSERT INTO public.cities VALUES (674, 6, 'Ererê', '2304277', NULL, NULL);
INSERT INTO public.cities VALUES (675, 6, 'Eusébio', '2304285', NULL, NULL);
INSERT INTO public.cities VALUES (676, 6, 'Farias Brito', '2304301', NULL, NULL);
INSERT INTO public.cities VALUES (677, 6, 'Forquilha', '2304350', NULL, NULL);
INSERT INTO public.cities VALUES (678, 6, 'Fortaleza', '2304400', NULL, NULL);
INSERT INTO public.cities VALUES (679, 6, 'Fortim', '2304459', NULL, NULL);
INSERT INTO public.cities VALUES (680, 6, 'Frecheirinha', '2304509', NULL, NULL);
INSERT INTO public.cities VALUES (681, 6, 'General Sampaio', '2304608', NULL, NULL);
INSERT INTO public.cities VALUES (682, 6, 'Graça', '2304657', NULL, NULL);
INSERT INTO public.cities VALUES (683, 6, 'Granja', '2304707', NULL, NULL);
INSERT INTO public.cities VALUES (684, 6, 'Granjeiro', '2304806', NULL, NULL);
INSERT INTO public.cities VALUES (685, 6, 'Groaíras', '2304905', NULL, NULL);
INSERT INTO public.cities VALUES (686, 6, 'Guaiúba', '2304954', NULL, NULL);
INSERT INTO public.cities VALUES (687, 6, 'Guaraciaba do Norte', '2305001', NULL, NULL);
INSERT INTO public.cities VALUES (688, 6, 'Guaramiranga', '2305100', NULL, NULL);
INSERT INTO public.cities VALUES (689, 6, 'Hidrolândia', '2305209', NULL, NULL);
INSERT INTO public.cities VALUES (690, 6, 'Horizonte', '2305233', NULL, NULL);
INSERT INTO public.cities VALUES (691, 6, 'Ibaretama', '2305266', NULL, NULL);
INSERT INTO public.cities VALUES (692, 6, 'Ibiapina', '2305308', NULL, NULL);
INSERT INTO public.cities VALUES (693, 6, 'Ibicuitinga', '2305332', NULL, NULL);
INSERT INTO public.cities VALUES (694, 6, 'Icapuí', '2305357', NULL, NULL);
INSERT INTO public.cities VALUES (695, 6, 'Icó', '2305407', NULL, NULL);
INSERT INTO public.cities VALUES (696, 6, 'Iguatu', '2305506', NULL, NULL);
INSERT INTO public.cities VALUES (697, 6, 'Independência', '2305605', NULL, NULL);
INSERT INTO public.cities VALUES (698, 6, 'Ipaporanga', '2305654', NULL, NULL);
INSERT INTO public.cities VALUES (699, 6, 'Ipaumirim', '2305704', NULL, NULL);
INSERT INTO public.cities VALUES (700, 6, 'Ipu', '2305803', NULL, NULL);
INSERT INTO public.cities VALUES (701, 6, 'Ipueiras', '2305902', NULL, NULL);
INSERT INTO public.cities VALUES (702, 6, 'Iracema', '2306009', NULL, NULL);
INSERT INTO public.cities VALUES (703, 6, 'Irauçuba', '2306108', NULL, NULL);
INSERT INTO public.cities VALUES (704, 6, 'Itaiçaba', '2306207', NULL, NULL);
INSERT INTO public.cities VALUES (705, 6, 'Itaitinga', '2306256', NULL, NULL);
INSERT INTO public.cities VALUES (706, 6, 'Itapagé', '2306306', NULL, NULL);
INSERT INTO public.cities VALUES (707, 6, 'Itapipoca', '2306405', NULL, NULL);
INSERT INTO public.cities VALUES (708, 6, 'Itapiúna', '2306504', NULL, NULL);
INSERT INTO public.cities VALUES (709, 6, 'Itarema', '2306553', NULL, NULL);
INSERT INTO public.cities VALUES (710, 6, 'Itatira', '2306603', NULL, NULL);
INSERT INTO public.cities VALUES (711, 6, 'Jaguaretama', '2306702', NULL, NULL);
INSERT INTO public.cities VALUES (712, 6, 'Jaguaribara', '2306801', NULL, NULL);
INSERT INTO public.cities VALUES (713, 6, 'Jaguaribe', '2306900', NULL, NULL);
INSERT INTO public.cities VALUES (714, 6, 'Jaguaruana', '2307007', NULL, NULL);
INSERT INTO public.cities VALUES (715, 6, 'Jardim', '2307106', NULL, NULL);
INSERT INTO public.cities VALUES (716, 6, 'Jati', '2307205', NULL, NULL);
INSERT INTO public.cities VALUES (717, 6, 'Jijoca de Jericoacoara', '2307254', NULL, NULL);
INSERT INTO public.cities VALUES (718, 6, 'Juazeiro do Norte', '2307304', NULL, NULL);
INSERT INTO public.cities VALUES (719, 6, 'Jucás', '2307403', NULL, NULL);
INSERT INTO public.cities VALUES (720, 6, 'Lavras da Mangabeira', '2307502', NULL, NULL);
INSERT INTO public.cities VALUES (721, 6, 'Limoeiro do Norte', '2307601', NULL, NULL);
INSERT INTO public.cities VALUES (722, 6, 'Madalena', '2307635', NULL, NULL);
INSERT INTO public.cities VALUES (723, 6, 'Maracanaú', '2307650', NULL, NULL);
INSERT INTO public.cities VALUES (724, 6, 'Maranguape', '2307700', NULL, NULL);
INSERT INTO public.cities VALUES (725, 6, 'Marco', '2307809', NULL, NULL);
INSERT INTO public.cities VALUES (726, 6, 'Martinópole', '2307908', NULL, NULL);
INSERT INTO public.cities VALUES (727, 6, 'Massapê', '2308005', NULL, NULL);
INSERT INTO public.cities VALUES (728, 6, 'Mauriti', '2308104', NULL, NULL);
INSERT INTO public.cities VALUES (729, 6, 'Meruoca', '2308203', NULL, NULL);
INSERT INTO public.cities VALUES (730, 6, 'Milagres', '2308302', NULL, NULL);
INSERT INTO public.cities VALUES (731, 6, 'Milhã', '2308351', NULL, NULL);
INSERT INTO public.cities VALUES (732, 6, 'Miraíma', '2308377', NULL, NULL);
INSERT INTO public.cities VALUES (733, 6, 'Missão Velha', '2308401', NULL, NULL);
INSERT INTO public.cities VALUES (734, 6, 'Mombaça', '2308500', NULL, NULL);
INSERT INTO public.cities VALUES (735, 6, 'Monsenhor Tabosa', '2308609', NULL, NULL);
INSERT INTO public.cities VALUES (736, 6, 'Morada Nova', '2308708', NULL, NULL);
INSERT INTO public.cities VALUES (737, 6, 'Moraújo', '2308807', NULL, NULL);
INSERT INTO public.cities VALUES (738, 6, 'Morrinhos', '2308906', NULL, NULL);
INSERT INTO public.cities VALUES (739, 6, 'Mucambo', '2309003', NULL, NULL);
INSERT INTO public.cities VALUES (740, 6, 'Mulungu', '2309102', NULL, NULL);
INSERT INTO public.cities VALUES (741, 6, 'Nova Olinda', '2309201', NULL, NULL);
INSERT INTO public.cities VALUES (742, 6, 'Nova Russas', '2309300', NULL, NULL);
INSERT INTO public.cities VALUES (743, 6, 'Novo Oriente', '2309409', NULL, NULL);
INSERT INTO public.cities VALUES (744, 6, 'Ocara', '2309458', NULL, NULL);
INSERT INTO public.cities VALUES (745, 6, 'Orós', '2309508', NULL, NULL);
INSERT INTO public.cities VALUES (746, 6, 'Pacajus', '2309607', NULL, NULL);
INSERT INTO public.cities VALUES (747, 6, 'Pacatuba', '2309706', NULL, NULL);
INSERT INTO public.cities VALUES (748, 6, 'Pacoti', '2309805', NULL, NULL);
INSERT INTO public.cities VALUES (749, 6, 'Pacujá', '2309904', NULL, NULL);
INSERT INTO public.cities VALUES (750, 6, 'Palhano', '2310001', NULL, NULL);
INSERT INTO public.cities VALUES (751, 6, 'Palmácia', '2310100', NULL, NULL);
INSERT INTO public.cities VALUES (752, 6, 'Paracuru', '2310209', NULL, NULL);
INSERT INTO public.cities VALUES (753, 6, 'Paraipaba', '2310258', NULL, NULL);
INSERT INTO public.cities VALUES (754, 6, 'Parambu', '2310308', NULL, NULL);
INSERT INTO public.cities VALUES (755, 6, 'Paramoti', '2310407', NULL, NULL);
INSERT INTO public.cities VALUES (756, 6, 'Pedra Branca', '2310506', NULL, NULL);
INSERT INTO public.cities VALUES (757, 6, 'Penaforte', '2310605', NULL, NULL);
INSERT INTO public.cities VALUES (758, 6, 'Pentecoste', '2310704', NULL, NULL);
INSERT INTO public.cities VALUES (759, 6, 'Pereiro', '2310803', NULL, NULL);
INSERT INTO public.cities VALUES (760, 6, 'Pindoretama', '2310852', NULL, NULL);
INSERT INTO public.cities VALUES (761, 6, 'Piquet Carneiro', '2310902', NULL, NULL);
INSERT INTO public.cities VALUES (762, 6, 'Pires Ferreira', '2310951', NULL, NULL);
INSERT INTO public.cities VALUES (763, 6, 'Poranga', '2311009', NULL, NULL);
INSERT INTO public.cities VALUES (764, 6, 'Porteiras', '2311108', NULL, NULL);
INSERT INTO public.cities VALUES (765, 6, 'Potengi', '2311207', NULL, NULL);
INSERT INTO public.cities VALUES (766, 6, 'Potiretama', '2311231', NULL, NULL);
INSERT INTO public.cities VALUES (767, 6, 'Quiterianópolis', '2311264', NULL, NULL);
INSERT INTO public.cities VALUES (768, 6, 'Quixadá', '2311306', NULL, NULL);
INSERT INTO public.cities VALUES (769, 6, 'Quixelô', '2311355', NULL, NULL);
INSERT INTO public.cities VALUES (770, 6, 'Quixeramobim', '2311405', NULL, NULL);
INSERT INTO public.cities VALUES (771, 6, 'Quixeré', '2311504', NULL, NULL);
INSERT INTO public.cities VALUES (772, 6, 'Redenção', '2311603', NULL, NULL);
INSERT INTO public.cities VALUES (773, 6, 'Reriutaba', '2311702', NULL, NULL);
INSERT INTO public.cities VALUES (774, 6, 'Russas', '2311801', NULL, NULL);
INSERT INTO public.cities VALUES (775, 6, 'Saboeiro', '2311900', NULL, NULL);
INSERT INTO public.cities VALUES (776, 6, 'Salitre', '2311959', NULL, NULL);
INSERT INTO public.cities VALUES (777, 6, 'Santa Quitéria', '2312205', NULL, NULL);
INSERT INTO public.cities VALUES (778, 6, 'Santana do Acaraú', '2312007', NULL, NULL);
INSERT INTO public.cities VALUES (779, 6, 'Santana do Cariri', '2312106', NULL, NULL);
INSERT INTO public.cities VALUES (780, 6, 'São Benedito', '2312304', NULL, NULL);
INSERT INTO public.cities VALUES (781, 6, 'São Gonçalo do Amarante', '2312403', NULL, NULL);
INSERT INTO public.cities VALUES (782, 6, 'São João do Jaguaribe', '2312502', NULL, NULL);
INSERT INTO public.cities VALUES (783, 6, 'São Luís do Curu', '2312601', NULL, NULL);
INSERT INTO public.cities VALUES (784, 6, 'Senador Pompeu', '2312700', NULL, NULL);
INSERT INTO public.cities VALUES (785, 6, 'Senador Sá', '2312809', NULL, NULL);
INSERT INTO public.cities VALUES (786, 6, 'Sobral', '2312908', NULL, NULL);
INSERT INTO public.cities VALUES (787, 6, 'Solonópole', '2313005', NULL, NULL);
INSERT INTO public.cities VALUES (788, 6, 'Tabuleiro do Norte', '2313104', NULL, NULL);
INSERT INTO public.cities VALUES (789, 6, 'Tamboril', '2313203', NULL, NULL);
INSERT INTO public.cities VALUES (790, 6, 'Tarrafas', '2313252', NULL, NULL);
INSERT INTO public.cities VALUES (791, 6, 'Tauá', '2313302', NULL, NULL);
INSERT INTO public.cities VALUES (792, 6, 'Tejuçuoca', '2313351', NULL, NULL);
INSERT INTO public.cities VALUES (793, 6, 'Tianguá', '2313401', NULL, NULL);
INSERT INTO public.cities VALUES (794, 6, 'Trairi', '2313500', NULL, NULL);
INSERT INTO public.cities VALUES (795, 6, 'Tururu', '2313559', NULL, NULL);
INSERT INTO public.cities VALUES (796, 6, 'Ubajara', '2313609', NULL, NULL);
INSERT INTO public.cities VALUES (797, 6, 'Umari', '2313708', NULL, NULL);
INSERT INTO public.cities VALUES (798, 6, 'Umirim', '2313757', NULL, NULL);
INSERT INTO public.cities VALUES (799, 6, 'Uruburetama', '2313807', NULL, NULL);
INSERT INTO public.cities VALUES (800, 6, 'Uruoca', '2313906', NULL, NULL);
INSERT INTO public.cities VALUES (801, 6, 'Varjota', '2313955', NULL, NULL);
INSERT INTO public.cities VALUES (802, 6, 'Várzea Alegre', '2314003', NULL, NULL);
INSERT INTO public.cities VALUES (803, 6, 'Viçosa do Ceará', '2314102', NULL, NULL);
INSERT INTO public.cities VALUES (804, 7, 'Brasília', '5300108', NULL, NULL);
INSERT INTO public.cities VALUES (805, 8, 'Afonso Cláudio', '3200102', NULL, NULL);
INSERT INTO public.cities VALUES (806, 8, 'Água Doce do Norte', '3200169', NULL, NULL);
INSERT INTO public.cities VALUES (807, 8, 'Águia Branca', '3200136', NULL, NULL);
INSERT INTO public.cities VALUES (808, 8, 'Alegre', '3200201', NULL, NULL);
INSERT INTO public.cities VALUES (809, 8, 'Alfredo Chaves', '3200300', NULL, NULL);
INSERT INTO public.cities VALUES (810, 8, 'Alto Rio Novo', '3200359', NULL, NULL);
INSERT INTO public.cities VALUES (811, 8, 'Anchieta', '3200409', NULL, NULL);
INSERT INTO public.cities VALUES (812, 8, 'Apiacá', '3200508', NULL, NULL);
INSERT INTO public.cities VALUES (813, 8, 'Aracruz', '3200607', NULL, NULL);
INSERT INTO public.cities VALUES (814, 8, 'Atilio Vivacqua', '3200706', NULL, NULL);
INSERT INTO public.cities VALUES (815, 8, 'Baixo Guandu', '3200805', NULL, NULL);
INSERT INTO public.cities VALUES (816, 8, 'Barra de São Francisco', '3200904', NULL, NULL);
INSERT INTO public.cities VALUES (817, 8, 'Boa Esperança', '3201001', NULL, NULL);
INSERT INTO public.cities VALUES (818, 8, 'Bom Jesus do Norte', '3201100', NULL, NULL);
INSERT INTO public.cities VALUES (819, 8, 'Brejetuba', '3201159', NULL, NULL);
INSERT INTO public.cities VALUES (820, 8, 'Cachoeiro de Itapemirim', '3201209', NULL, NULL);
INSERT INTO public.cities VALUES (821, 8, 'Cariacica', '3201308', NULL, NULL);
INSERT INTO public.cities VALUES (822, 8, 'Castelo', '3201407', NULL, NULL);
INSERT INTO public.cities VALUES (823, 8, 'Colatina', '3201506', NULL, NULL);
INSERT INTO public.cities VALUES (824, 8, 'Conceição da Barra', '3201605', NULL, NULL);
INSERT INTO public.cities VALUES (825, 8, 'Conceição do Castelo', '3201704', NULL, NULL);
INSERT INTO public.cities VALUES (826, 8, 'Divino de São Lourenço', '3201803', NULL, NULL);
INSERT INTO public.cities VALUES (827, 8, 'Domingos Martins', '3201902', NULL, NULL);
INSERT INTO public.cities VALUES (828, 8, 'Dores do Rio Preto', '3202009', NULL, NULL);
INSERT INTO public.cities VALUES (829, 8, 'Ecoporanga', '3202108', NULL, NULL);
INSERT INTO public.cities VALUES (830, 8, 'Fundão', '3202207', NULL, NULL);
INSERT INTO public.cities VALUES (831, 8, 'Governador Lindenberg', '3202256', NULL, NULL);
INSERT INTO public.cities VALUES (832, 8, 'Guaçuí', '3202306', NULL, NULL);
INSERT INTO public.cities VALUES (833, 8, 'Guarapari', '3202405', NULL, NULL);
INSERT INTO public.cities VALUES (834, 8, 'Ibatiba', '3202454', NULL, NULL);
INSERT INTO public.cities VALUES (835, 8, 'Ibiraçu', '3202504', NULL, NULL);
INSERT INTO public.cities VALUES (836, 8, 'Ibitirama', '3202553', NULL, NULL);
INSERT INTO public.cities VALUES (837, 8, 'Iconha', '3202603', NULL, NULL);
INSERT INTO public.cities VALUES (838, 8, 'Irupi', '3202652', NULL, NULL);
INSERT INTO public.cities VALUES (839, 8, 'Itaguaçu', '3202702', NULL, NULL);
INSERT INTO public.cities VALUES (840, 8, 'Itapemirim', '3202801', NULL, NULL);
INSERT INTO public.cities VALUES (841, 8, 'Itarana', '3202900', NULL, NULL);
INSERT INTO public.cities VALUES (842, 8, 'Iúna', '3203007', NULL, NULL);
INSERT INTO public.cities VALUES (843, 8, 'Jaguaré', '3203056', NULL, NULL);
INSERT INTO public.cities VALUES (844, 8, 'Jerônimo Monteiro', '3203106', NULL, NULL);
INSERT INTO public.cities VALUES (845, 8, 'João Neiva', '3203130', NULL, NULL);
INSERT INTO public.cities VALUES (846, 8, 'Laranja da Terra', '3203163', NULL, NULL);
INSERT INTO public.cities VALUES (847, 8, 'Linhares', '3203205', NULL, NULL);
INSERT INTO public.cities VALUES (848, 8, 'Mantenópolis', '3203304', NULL, NULL);
INSERT INTO public.cities VALUES (849, 8, 'Marataízes', '3203320', NULL, NULL);
INSERT INTO public.cities VALUES (850, 8, 'Marechal Floriano', '3203346', NULL, NULL);
INSERT INTO public.cities VALUES (851, 8, 'Marilândia', '3203353', NULL, NULL);
INSERT INTO public.cities VALUES (852, 8, 'Mimoso do Sul', '3203403', NULL, NULL);
INSERT INTO public.cities VALUES (853, 8, 'Montanha', '3203502', NULL, NULL);
INSERT INTO public.cities VALUES (854, 8, 'Mucurici', '3203601', NULL, NULL);
INSERT INTO public.cities VALUES (855, 8, 'Muniz Freire', '3203700', NULL, NULL);
INSERT INTO public.cities VALUES (856, 8, 'Muqui', '3203809', NULL, NULL);
INSERT INTO public.cities VALUES (857, 8, 'Nova Venécia', '3203908', NULL, NULL);
INSERT INTO public.cities VALUES (858, 8, 'Pancas', '3204005', NULL, NULL);
INSERT INTO public.cities VALUES (859, 8, 'Pedro Canário', '3204054', NULL, NULL);
INSERT INTO public.cities VALUES (860, 8, 'Pinheiros', '3204104', NULL, NULL);
INSERT INTO public.cities VALUES (861, 8, 'Piúma', '3204203', NULL, NULL);
INSERT INTO public.cities VALUES (862, 8, 'Ponto Belo', '3204252', NULL, NULL);
INSERT INTO public.cities VALUES (863, 8, 'Presidente Kennedy', '3204302', NULL, NULL);
INSERT INTO public.cities VALUES (864, 8, 'Rio Bananal', '3204351', NULL, NULL);
INSERT INTO public.cities VALUES (865, 8, 'Rio Novo do Sul', '3204401', NULL, NULL);
INSERT INTO public.cities VALUES (866, 8, 'Santa Leopoldina', '3204500', NULL, NULL);
INSERT INTO public.cities VALUES (867, 8, 'Santa Maria de Jetibá', '3204559', NULL, NULL);
INSERT INTO public.cities VALUES (868, 8, 'Santa Teresa', '3204609', NULL, NULL);
INSERT INTO public.cities VALUES (869, 8, 'São Domingos do Norte', '3204658', NULL, NULL);
INSERT INTO public.cities VALUES (870, 8, 'São Gabriel da Palha', '3204708', NULL, NULL);
INSERT INTO public.cities VALUES (871, 8, 'São José do Calçado', '3204807', NULL, NULL);
INSERT INTO public.cities VALUES (872, 8, 'São Mateus', '3204906', NULL, NULL);
INSERT INTO public.cities VALUES (873, 8, 'São Roque do Canaã', '3204955', NULL, NULL);
INSERT INTO public.cities VALUES (874, 8, 'Serra', '3205002', NULL, NULL);
INSERT INTO public.cities VALUES (875, 8, 'Sooretama', '3205010', NULL, NULL);
INSERT INTO public.cities VALUES (876, 8, 'Vargem Alta', '3205036', NULL, NULL);
INSERT INTO public.cities VALUES (877, 8, 'Venda Nova do Imigrante', '3205069', NULL, NULL);
INSERT INTO public.cities VALUES (878, 8, 'Viana', '3205101', NULL, NULL);
INSERT INTO public.cities VALUES (879, 8, 'Vila Pavão', '3205150', NULL, NULL);
INSERT INTO public.cities VALUES (880, 8, 'Vila Valério', '3205176', NULL, NULL);
INSERT INTO public.cities VALUES (881, 8, 'Vila Velha', '3205200', NULL, NULL);
INSERT INTO public.cities VALUES (882, 8, 'Vitória', '3205309', NULL, NULL);
INSERT INTO public.cities VALUES (883, 9, 'Abadia de Goiás', '5200050', NULL, NULL);
INSERT INTO public.cities VALUES (884, 9, 'Abadiânia', '5200100', NULL, NULL);
INSERT INTO public.cities VALUES (885, 9, 'Acreúna', '5200134', NULL, NULL);
INSERT INTO public.cities VALUES (886, 9, 'Adelândia', '5200159', NULL, NULL);
INSERT INTO public.cities VALUES (887, 9, 'Água Fria de Goiás', '5200175', NULL, NULL);
INSERT INTO public.cities VALUES (888, 9, 'Água Limpa', '5200209', NULL, NULL);
INSERT INTO public.cities VALUES (889, 9, 'Águas Lindas de Goiás', '5200258', NULL, NULL);
INSERT INTO public.cities VALUES (890, 9, 'Alexânia', '5200308', NULL, NULL);
INSERT INTO public.cities VALUES (891, 9, 'Aloândia', '5200506', NULL, NULL);
INSERT INTO public.cities VALUES (892, 9, 'Alto Horizonte', '5200555', NULL, NULL);
INSERT INTO public.cities VALUES (893, 9, 'Alto Paraíso de Goiás', '5200605', NULL, NULL);
INSERT INTO public.cities VALUES (894, 9, 'Alvorada do Norte', '5200803', NULL, NULL);
INSERT INTO public.cities VALUES (895, 9, 'Amaralina', '5200829', NULL, NULL);
INSERT INTO public.cities VALUES (896, 9, 'Americano do Brasil', '5200852', NULL, NULL);
INSERT INTO public.cities VALUES (897, 9, 'Amorinópolis', '5200902', NULL, NULL);
INSERT INTO public.cities VALUES (898, 9, 'Anápolis', '5201108', NULL, NULL);
INSERT INTO public.cities VALUES (899, 9, 'Anhanguera', '5201207', NULL, NULL);
INSERT INTO public.cities VALUES (900, 9, 'Anicuns', '5201306', NULL, NULL);
INSERT INTO public.cities VALUES (901, 9, 'Aparecida de Goiânia', '5201405', NULL, NULL);
INSERT INTO public.cities VALUES (902, 9, 'Aparecida do Rio Doce', '5201454', NULL, NULL);
INSERT INTO public.cities VALUES (903, 9, 'Aporé', '5201504', NULL, NULL);
INSERT INTO public.cities VALUES (904, 9, 'Araçu', '5201603', NULL, NULL);
INSERT INTO public.cities VALUES (905, 9, 'Aragarças', '5201702', NULL, NULL);
INSERT INTO public.cities VALUES (906, 9, 'Aragoiânia', '5201801', NULL, NULL);
INSERT INTO public.cities VALUES (907, 9, 'Araguapaz', '5202155', NULL, NULL);
INSERT INTO public.cities VALUES (908, 9, 'Arenópolis', '5202353', NULL, NULL);
INSERT INTO public.cities VALUES (909, 9, 'Aruanã', '5202502', NULL, NULL);
INSERT INTO public.cities VALUES (910, 9, 'Aurilândia', '5202601', NULL, NULL);
INSERT INTO public.cities VALUES (911, 9, 'Avelinópolis', '5202809', NULL, NULL);
INSERT INTO public.cities VALUES (912, 9, 'Baliza', '5203104', NULL, NULL);
INSERT INTO public.cities VALUES (913, 9, 'Barro Alto', '5203203', NULL, NULL);
INSERT INTO public.cities VALUES (914, 9, 'Bela Vista de Goiás', '5203302', NULL, NULL);
INSERT INTO public.cities VALUES (915, 9, 'Bom Jardim de Goiás', '5203401', NULL, NULL);
INSERT INTO public.cities VALUES (916, 9, 'Bom Jesus de Goiás', '5203500', NULL, NULL);
INSERT INTO public.cities VALUES (917, 9, 'Bonfinópolis', '5203559', NULL, NULL);
INSERT INTO public.cities VALUES (918, 9, 'Bonópolis', '5203575', NULL, NULL);
INSERT INTO public.cities VALUES (919, 9, 'Brazabrantes', '5203609', NULL, NULL);
INSERT INTO public.cities VALUES (920, 9, 'Britânia', '5203807', NULL, NULL);
INSERT INTO public.cities VALUES (921, 9, 'Buriti Alegre', '5203906', NULL, NULL);
INSERT INTO public.cities VALUES (922, 9, 'Buriti de Goiás', '5203939', NULL, NULL);
INSERT INTO public.cities VALUES (923, 9, 'Buritinópolis', '5203962', NULL, NULL);
INSERT INTO public.cities VALUES (924, 9, 'Cabeceiras', '5204003', NULL, NULL);
INSERT INTO public.cities VALUES (925, 9, 'Cachoeira Alta', '5204102', NULL, NULL);
INSERT INTO public.cities VALUES (926, 9, 'Cachoeira de Goiás', '5204201', NULL, NULL);
INSERT INTO public.cities VALUES (927, 9, 'Cachoeira Dourada', '5204250', NULL, NULL);
INSERT INTO public.cities VALUES (928, 9, 'Caçu', '5204300', NULL, NULL);
INSERT INTO public.cities VALUES (929, 9, 'Caiapônia', '5204409', NULL, NULL);
INSERT INTO public.cities VALUES (930, 9, 'Caldas Novas', '5204508', NULL, NULL);
INSERT INTO public.cities VALUES (931, 9, 'Caldazinha', '5204557', NULL, NULL);
INSERT INTO public.cities VALUES (932, 9, 'Campestre de Goiás', '5204607', NULL, NULL);
INSERT INTO public.cities VALUES (933, 9, 'Campinaçu', '5204656', NULL, NULL);
INSERT INTO public.cities VALUES (934, 9, 'Campinorte', '5204706', NULL, NULL);
INSERT INTO public.cities VALUES (935, 9, 'Campo Alegre de Goiás', '5204805', NULL, NULL);
INSERT INTO public.cities VALUES (936, 9, 'Campo Limpo de Goiás', '5204854', NULL, NULL);
INSERT INTO public.cities VALUES (937, 9, 'Campos Belos', '5204904', NULL, NULL);
INSERT INTO public.cities VALUES (938, 9, 'Campos Verdes', '5204953', NULL, NULL);
INSERT INTO public.cities VALUES (939, 9, 'Carmo do Rio Verde', '5205000', NULL, NULL);
INSERT INTO public.cities VALUES (940, 9, 'Castelândia', '5205059', NULL, NULL);
INSERT INTO public.cities VALUES (941, 9, 'Catalão', '5205109', NULL, NULL);
INSERT INTO public.cities VALUES (942, 9, 'Caturaí', '5205208', NULL, NULL);
INSERT INTO public.cities VALUES (943, 9, 'Cavalcante', '5205307', NULL, NULL);
INSERT INTO public.cities VALUES (944, 9, 'Ceres', '5205406', NULL, NULL);
INSERT INTO public.cities VALUES (945, 9, 'Cezarina', '5205455', NULL, NULL);
INSERT INTO public.cities VALUES (946, 9, 'Chapadão do Céu', '5205471', NULL, NULL);
INSERT INTO public.cities VALUES (947, 9, 'Cidade Ocidental', '5205497', NULL, NULL);
INSERT INTO public.cities VALUES (948, 9, 'Cocalzinho de Goiás', '5205513', NULL, NULL);
INSERT INTO public.cities VALUES (949, 9, 'Colinas do Sul', '5205521', NULL, NULL);
INSERT INTO public.cities VALUES (950, 9, 'Córrego do Ouro', '5205703', NULL, NULL);
INSERT INTO public.cities VALUES (951, 9, 'Corumbá de Goiás', '5205802', NULL, NULL);
INSERT INTO public.cities VALUES (952, 9, 'Corumbaíba', '5205901', NULL, NULL);
INSERT INTO public.cities VALUES (953, 9, 'Cristalina', '5206206', NULL, NULL);
INSERT INTO public.cities VALUES (954, 9, 'Cristianópolis', '5206305', NULL, NULL);
INSERT INTO public.cities VALUES (955, 9, 'Crixás', '5206404', NULL, NULL);
INSERT INTO public.cities VALUES (956, 9, 'Cromínia', '5206503', NULL, NULL);
INSERT INTO public.cities VALUES (957, 9, 'Cumari', '5206602', NULL, NULL);
INSERT INTO public.cities VALUES (958, 9, 'Damianópolis', '5206701', NULL, NULL);
INSERT INTO public.cities VALUES (959, 9, 'Damolândia', '5206800', NULL, NULL);
INSERT INTO public.cities VALUES (960, 9, 'Davinópolis', '5206909', NULL, NULL);
INSERT INTO public.cities VALUES (961, 9, 'Diorama', '5207105', NULL, NULL);
INSERT INTO public.cities VALUES (962, 9, 'Divinópolis de Goiás', '5208301', NULL, NULL);
INSERT INTO public.cities VALUES (963, 9, 'Doverlândia', '5207253', NULL, NULL);
INSERT INTO public.cities VALUES (964, 9, 'Edealina', '5207352', NULL, NULL);
INSERT INTO public.cities VALUES (965, 9, 'Edéia', '5207402', NULL, NULL);
INSERT INTO public.cities VALUES (966, 9, 'Estrela do Norte', '5207501', NULL, NULL);
INSERT INTO public.cities VALUES (967, 9, 'Faina', '5207535', NULL, NULL);
INSERT INTO public.cities VALUES (968, 9, 'Fazenda Nova', '5207600', NULL, NULL);
INSERT INTO public.cities VALUES (969, 9, 'Firminópolis', '5207808', NULL, NULL);
INSERT INTO public.cities VALUES (970, 9, 'Flores de Goiás', '5207907', NULL, NULL);
INSERT INTO public.cities VALUES (971, 9, 'Formosa', '5208004', NULL, NULL);
INSERT INTO public.cities VALUES (972, 9, 'Formoso', '5208103', NULL, NULL);
INSERT INTO public.cities VALUES (973, 9, 'Gameleira de Goiás', '5208152', NULL, NULL);
INSERT INTO public.cities VALUES (974, 9, 'Goianápolis', '5208400', NULL, NULL);
INSERT INTO public.cities VALUES (975, 9, 'Goiandira', '5208509', NULL, NULL);
INSERT INTO public.cities VALUES (976, 9, 'Goianésia', '5208608', NULL, NULL);
INSERT INTO public.cities VALUES (977, 9, 'Goiânia', '5208707', NULL, NULL);
INSERT INTO public.cities VALUES (978, 9, 'Goianira', '5208806', NULL, NULL);
INSERT INTO public.cities VALUES (979, 9, 'Goiás', '5208905', NULL, NULL);
INSERT INTO public.cities VALUES (980, 9, 'Goiatuba', '5209101', NULL, NULL);
INSERT INTO public.cities VALUES (981, 9, 'Gouvelândia', '5209150', NULL, NULL);
INSERT INTO public.cities VALUES (982, 9, 'Guapó', '5209200', NULL, NULL);
INSERT INTO public.cities VALUES (983, 9, 'Guaraíta', '5209291', NULL, NULL);
INSERT INTO public.cities VALUES (984, 9, 'Guarani de Goiás', '5209408', NULL, NULL);
INSERT INTO public.cities VALUES (985, 9, 'Guarinos', '5209457', NULL, NULL);
INSERT INTO public.cities VALUES (986, 9, 'Heitoraí', '5209606', NULL, NULL);
INSERT INTO public.cities VALUES (987, 9, 'Hidrolândia', '5209705', NULL, NULL);
INSERT INTO public.cities VALUES (988, 9, 'Hidrolina', '5209804', NULL, NULL);
INSERT INTO public.cities VALUES (989, 9, 'Iaciara', '5209903', NULL, NULL);
INSERT INTO public.cities VALUES (990, 9, 'Inaciolândia', '5209937', NULL, NULL);
INSERT INTO public.cities VALUES (991, 9, 'Indiara', '5209952', NULL, NULL);
INSERT INTO public.cities VALUES (992, 9, 'Inhumas', '5210000', NULL, NULL);
INSERT INTO public.cities VALUES (993, 9, 'Ipameri', '5210109', NULL, NULL);
INSERT INTO public.cities VALUES (994, 9, 'Ipiranga de Goiás', '5210158', NULL, NULL);
INSERT INTO public.cities VALUES (995, 9, 'Iporá', '5210208', NULL, NULL);
INSERT INTO public.cities VALUES (996, 9, 'Israelândia', '5210307', NULL, NULL);
INSERT INTO public.cities VALUES (997, 9, 'Itaberaí', '5210406', NULL, NULL);
INSERT INTO public.cities VALUES (998, 9, 'Itaguari', '5210562', NULL, NULL);
INSERT INTO public.cities VALUES (999, 9, 'Itaguaru', '5210604', NULL, NULL);
INSERT INTO public.cities VALUES (1000, 9, 'Itajá', '5210802', NULL, NULL);
INSERT INTO public.cities VALUES (1001, 9, 'Itapaci', '5210901', NULL, NULL);
INSERT INTO public.cities VALUES (1002, 9, 'Itapirapuã', '5211008', NULL, NULL);
INSERT INTO public.cities VALUES (1003, 9, 'Itapuranga', '5211206', NULL, NULL);
INSERT INTO public.cities VALUES (1004, 9, 'Itarumã', '5211305', NULL, NULL);
INSERT INTO public.cities VALUES (1005, 9, 'Itauçu', '5211404', NULL, NULL);
INSERT INTO public.cities VALUES (1006, 9, 'Itumbiara', '5211503', NULL, NULL);
INSERT INTO public.cities VALUES (1007, 9, 'Ivolândia', '5211602', NULL, NULL);
INSERT INTO public.cities VALUES (1008, 9, 'Jandaia', '5211701', NULL, NULL);
INSERT INTO public.cities VALUES (1009, 9, 'Jaraguá', '5211800', NULL, NULL);
INSERT INTO public.cities VALUES (1010, 9, 'Jataí', '5211909', NULL, NULL);
INSERT INTO public.cities VALUES (1011, 9, 'Jaupaci', '5212006', NULL, NULL);
INSERT INTO public.cities VALUES (1012, 9, 'Jesúpolis', '5212055', NULL, NULL);
INSERT INTO public.cities VALUES (1013, 9, 'Joviânia', '5212105', NULL, NULL);
INSERT INTO public.cities VALUES (1014, 9, 'Jussara', '5212204', NULL, NULL);
INSERT INTO public.cities VALUES (1015, 9, 'Lagoa Santa', '5212253', NULL, NULL);
INSERT INTO public.cities VALUES (1016, 9, 'Leopoldo de Bulhões', '5212303', NULL, NULL);
INSERT INTO public.cities VALUES (1017, 9, 'Luziânia', '5212501', NULL, NULL);
INSERT INTO public.cities VALUES (1018, 9, 'Mairipotaba', '5212600', NULL, NULL);
INSERT INTO public.cities VALUES (1019, 9, 'Mambaí', '5212709', NULL, NULL);
INSERT INTO public.cities VALUES (1020, 9, 'Mara Rosa', '5212808', NULL, NULL);
INSERT INTO public.cities VALUES (1021, 9, 'Marzagão', '5212907', NULL, NULL);
INSERT INTO public.cities VALUES (1022, 9, 'Matrinchã', '5212956', NULL, NULL);
INSERT INTO public.cities VALUES (1023, 9, 'Maurilândia', '5213004', NULL, NULL);
INSERT INTO public.cities VALUES (1024, 9, 'Mimoso de Goiás', '5213053', NULL, NULL);
INSERT INTO public.cities VALUES (1025, 9, 'Minaçu', '5213087', NULL, NULL);
INSERT INTO public.cities VALUES (1026, 9, 'Mineiros', '5213103', NULL, NULL);
INSERT INTO public.cities VALUES (1027, 9, 'Moiporá', '5213400', NULL, NULL);
INSERT INTO public.cities VALUES (1028, 9, 'Monte Alegre de Goiás', '5213509', NULL, NULL);
INSERT INTO public.cities VALUES (1029, 9, 'Montes Claros de Goiás', '5213707', NULL, NULL);
INSERT INTO public.cities VALUES (1030, 9, 'Montividiu', '5213756', NULL, NULL);
INSERT INTO public.cities VALUES (1031, 9, 'Montividiu do Norte', '5213772', NULL, NULL);
INSERT INTO public.cities VALUES (1032, 9, 'Morrinhos', '5213806', NULL, NULL);
INSERT INTO public.cities VALUES (1033, 9, 'Morro Agudo de Goiás', '5213855', NULL, NULL);
INSERT INTO public.cities VALUES (1034, 9, 'Mossâmedes', '5213905', NULL, NULL);
INSERT INTO public.cities VALUES (1035, 9, 'Mozarlândia', '5214002', NULL, NULL);
INSERT INTO public.cities VALUES (1036, 9, 'Mundo Novo', '5214051', NULL, NULL);
INSERT INTO public.cities VALUES (1037, 9, 'Mutunópolis', '5214101', NULL, NULL);
INSERT INTO public.cities VALUES (1038, 9, 'Nazário', '5214408', NULL, NULL);
INSERT INTO public.cities VALUES (1039, 9, 'Nerópolis', '5214507', NULL, NULL);
INSERT INTO public.cities VALUES (1040, 9, 'Niquelândia', '5214606', NULL, NULL);
INSERT INTO public.cities VALUES (1041, 9, 'Nova América', '5214705', NULL, NULL);
INSERT INTO public.cities VALUES (1042, 9, 'Nova Aurora', '5214804', NULL, NULL);
INSERT INTO public.cities VALUES (1043, 9, 'Nova Crixás', '5214838', NULL, NULL);
INSERT INTO public.cities VALUES (1044, 9, 'Nova Glória', '5214861', NULL, NULL);
INSERT INTO public.cities VALUES (1045, 9, 'Nova Iguaçu de Goiás', '5214879', NULL, NULL);
INSERT INTO public.cities VALUES (1046, 9, 'Nova Roma', '5214903', NULL, NULL);
INSERT INTO public.cities VALUES (1047, 9, 'Nova Veneza', '5215009', NULL, NULL);
INSERT INTO public.cities VALUES (1048, 9, 'Novo Brasil', '5215207', NULL, NULL);
INSERT INTO public.cities VALUES (1049, 9, 'Novo Gama', '5215231', NULL, NULL);
INSERT INTO public.cities VALUES (1050, 9, 'Novo Planalto', '5215256', NULL, NULL);
INSERT INTO public.cities VALUES (1051, 9, 'Orizona', '5215306', NULL, NULL);
INSERT INTO public.cities VALUES (1052, 9, 'Ouro Verde de Goiás', '5215405', NULL, NULL);
INSERT INTO public.cities VALUES (1053, 9, 'Ouvidor', '5215504', NULL, NULL);
INSERT INTO public.cities VALUES (1054, 9, 'Padre Bernardo', '5215603', NULL, NULL);
INSERT INTO public.cities VALUES (1055, 9, 'Palestina de Goiás', '5215652', NULL, NULL);
INSERT INTO public.cities VALUES (1056, 9, 'Palmeiras de Goiás', '5215702', NULL, NULL);
INSERT INTO public.cities VALUES (1057, 9, 'Palmelo', '5215801', NULL, NULL);
INSERT INTO public.cities VALUES (1058, 9, 'Palminópolis', '5215900', NULL, NULL);
INSERT INTO public.cities VALUES (1059, 9, 'Panamá', '5216007', NULL, NULL);
INSERT INTO public.cities VALUES (1060, 9, 'Paranaiguara', '5216304', NULL, NULL);
INSERT INTO public.cities VALUES (1061, 9, 'Paraúna', '5216403', NULL, NULL);
INSERT INTO public.cities VALUES (1062, 9, 'Perolândia', '5216452', NULL, NULL);
INSERT INTO public.cities VALUES (1063, 9, 'Petrolina de Goiás', '5216809', NULL, NULL);
INSERT INTO public.cities VALUES (1064, 9, 'Pilar de Goiás', '5216908', NULL, NULL);
INSERT INTO public.cities VALUES (1065, 9, 'Piracanjuba', '5217104', NULL, NULL);
INSERT INTO public.cities VALUES (1066, 9, 'Piranhas', '5217203', NULL, NULL);
INSERT INTO public.cities VALUES (1067, 9, 'Pirenópolis', '5217302', NULL, NULL);
INSERT INTO public.cities VALUES (1068, 9, 'Pires do Rio', '5217401', NULL, NULL);
INSERT INTO public.cities VALUES (1069, 9, 'Planaltina', '5217609', NULL, NULL);
INSERT INTO public.cities VALUES (1070, 9, 'Pontalina', '5217708', NULL, NULL);
INSERT INTO public.cities VALUES (1071, 9, 'Porangatu', '5218003', NULL, NULL);
INSERT INTO public.cities VALUES (1072, 9, 'Porteirão', '5218052', NULL, NULL);
INSERT INTO public.cities VALUES (1073, 9, 'Portelândia', '5218102', NULL, NULL);
INSERT INTO public.cities VALUES (1074, 9, 'Posse', '5218300', NULL, NULL);
INSERT INTO public.cities VALUES (1075, 9, 'Professor Jamil', '5218391', NULL, NULL);
INSERT INTO public.cities VALUES (1076, 9, 'Quirinópolis', '5218508', NULL, NULL);
INSERT INTO public.cities VALUES (1077, 9, 'Rialma', '5218607', NULL, NULL);
INSERT INTO public.cities VALUES (1078, 9, 'Rianápolis', '5218706', NULL, NULL);
INSERT INTO public.cities VALUES (1079, 9, 'Rio Quente', '5218789', NULL, NULL);
INSERT INTO public.cities VALUES (1080, 9, 'Rio Verde', '5218805', NULL, NULL);
INSERT INTO public.cities VALUES (1081, 9, 'Rubiataba', '5218904', NULL, NULL);
INSERT INTO public.cities VALUES (1082, 9, 'Sanclerlândia', '5219001', NULL, NULL);
INSERT INTO public.cities VALUES (1083, 9, 'Santa Bárbara de Goiás', '5219100', NULL, NULL);
INSERT INTO public.cities VALUES (1084, 9, 'Santa Cruz de Goiás', '5219209', NULL, NULL);
INSERT INTO public.cities VALUES (1085, 9, 'Santa Fé de Goiás', '5219258', NULL, NULL);
INSERT INTO public.cities VALUES (1086, 9, 'Santa Helena de Goiás', '5219308', NULL, NULL);
INSERT INTO public.cities VALUES (1087, 9, 'Santa Isabel', '5219357', NULL, NULL);
INSERT INTO public.cities VALUES (1088, 9, 'Santa Rita do Araguaia', '5219407', NULL, NULL);
INSERT INTO public.cities VALUES (1089, 9, 'Santa Rita do Novo Destino', '5219456', NULL, NULL);
INSERT INTO public.cities VALUES (1090, 9, 'Santa Rosa de Goiás', '5219506', NULL, NULL);
INSERT INTO public.cities VALUES (1091, 9, 'Santa Tereza de Goiás', '5219605', NULL, NULL);
INSERT INTO public.cities VALUES (1092, 9, 'Santa Terezinha de Goiás', '5219704', NULL, NULL);
INSERT INTO public.cities VALUES (1093, 9, 'Santo Antônio da Barra', '5219712', NULL, NULL);
INSERT INTO public.cities VALUES (1094, 9, 'Santo Antônio de Goiás', '5219738', NULL, NULL);
INSERT INTO public.cities VALUES (1095, 9, 'Santo Antônio do Descoberto', '5219753', NULL, NULL);
INSERT INTO public.cities VALUES (1096, 9, 'São Domingos', '5219803', NULL, NULL);
INSERT INTO public.cities VALUES (1097, 9, 'São Francisco de Goiás', '5219902', NULL, NULL);
INSERT INTO public.cities VALUES (1098, 9, 'São João da Paraúna', '5220058', NULL, NULL);
INSERT INTO public.cities VALUES (1099, 9, 'São João d''Aliança', '5220009', NULL, NULL);
INSERT INTO public.cities VALUES (1100, 9, 'São Luís de Montes Belos', '5220108', NULL, NULL);
INSERT INTO public.cities VALUES (1101, 9, 'São Luíz do Norte', '5220157', NULL, NULL);
INSERT INTO public.cities VALUES (1102, 9, 'São Miguel do Araguaia', '5220207', NULL, NULL);
INSERT INTO public.cities VALUES (1103, 9, 'São Miguel do Passa Quatro', '5220264', NULL, NULL);
INSERT INTO public.cities VALUES (1104, 9, 'São Patrício', '5220280', NULL, NULL);
INSERT INTO public.cities VALUES (1105, 9, 'São Simão', '5220405', NULL, NULL);
INSERT INTO public.cities VALUES (1106, 9, 'Senador Canedo', '5220454', NULL, NULL);
INSERT INTO public.cities VALUES (1107, 9, 'Serranópolis', '5220504', NULL, NULL);
INSERT INTO public.cities VALUES (1108, 9, 'Silvânia', '5220603', NULL, NULL);
INSERT INTO public.cities VALUES (1109, 9, 'Simolândia', '5220686', NULL, NULL);
INSERT INTO public.cities VALUES (1110, 9, 'Sítio d''Abadia', '5220702', NULL, NULL);
INSERT INTO public.cities VALUES (1111, 9, 'Taquaral de Goiás', '5221007', NULL, NULL);
INSERT INTO public.cities VALUES (1112, 9, 'Teresina de Goiás', '5221080', NULL, NULL);
INSERT INTO public.cities VALUES (1113, 9, 'Terezópolis de Goiás', '5221197', NULL, NULL);
INSERT INTO public.cities VALUES (1114, 9, 'Três Ranchos', '5221304', NULL, NULL);
INSERT INTO public.cities VALUES (1115, 9, 'Trindade', '5221403', NULL, NULL);
INSERT INTO public.cities VALUES (1116, 9, 'Trombas', '5221452', NULL, NULL);
INSERT INTO public.cities VALUES (1117, 9, 'Turvânia', '5221502', NULL, NULL);
INSERT INTO public.cities VALUES (1118, 9, 'Turvelândia', '5221551', NULL, NULL);
INSERT INTO public.cities VALUES (1119, 9, 'Uirapuru', '5221577', NULL, NULL);
INSERT INTO public.cities VALUES (1120, 9, 'Uruaçu', '5221601', NULL, NULL);
INSERT INTO public.cities VALUES (1121, 9, 'Uruana', '5221700', NULL, NULL);
INSERT INTO public.cities VALUES (1122, 9, 'Urutaí', '5221809', NULL, NULL);
INSERT INTO public.cities VALUES (1123, 9, 'Valparaíso de Goiás', '5221858', NULL, NULL);
INSERT INTO public.cities VALUES (1124, 9, 'Varjão', '5221908', NULL, NULL);
INSERT INTO public.cities VALUES (1125, 9, 'Vianópolis', '5222005', NULL, NULL);
INSERT INTO public.cities VALUES (1126, 9, 'Vicentinópolis', '5222054', NULL, NULL);
INSERT INTO public.cities VALUES (1127, 9, 'Vila Boa', '5222203', NULL, NULL);
INSERT INTO public.cities VALUES (1128, 9, 'Vila Propício', '5222302', NULL, NULL);
INSERT INTO public.cities VALUES (1129, 10, 'Açailândia', '2100055', NULL, NULL);
INSERT INTO public.cities VALUES (1130, 10, 'Afonso Cunha', '2100105', NULL, NULL);
INSERT INTO public.cities VALUES (1131, 10, 'Água Doce do Maranhão', '2100154', NULL, NULL);
INSERT INTO public.cities VALUES (1132, 10, 'Alcântara', '2100204', NULL, NULL);
INSERT INTO public.cities VALUES (1133, 10, 'Aldeias Altas', '2100303', NULL, NULL);
INSERT INTO public.cities VALUES (1134, 10, 'Altamira do Maranhão', '2100402', NULL, NULL);
INSERT INTO public.cities VALUES (1135, 10, 'Alto Alegre do Maranhão', '2100436', NULL, NULL);
INSERT INTO public.cities VALUES (1136, 10, 'Alto Alegre do Pindaré', '2100477', NULL, NULL);
INSERT INTO public.cities VALUES (1137, 10, 'Alto Parnaíba', '2100501', NULL, NULL);
INSERT INTO public.cities VALUES (1138, 10, 'Amapá do Maranhão', '2100550', NULL, NULL);
INSERT INTO public.cities VALUES (1139, 10, 'Amarante do Maranhão', '2100600', NULL, NULL);
INSERT INTO public.cities VALUES (1140, 10, 'Anajatuba', '2100709', NULL, NULL);
INSERT INTO public.cities VALUES (1141, 10, 'Anapurus', '2100808', NULL, NULL);
INSERT INTO public.cities VALUES (1142, 10, 'Apicum-Açu', '2100832', NULL, NULL);
INSERT INTO public.cities VALUES (1143, 10, 'Araguanã', '2100873', NULL, NULL);
INSERT INTO public.cities VALUES (1144, 10, 'Araioses', '2100907', NULL, NULL);
INSERT INTO public.cities VALUES (1145, 10, 'Arame', '2100956', NULL, NULL);
INSERT INTO public.cities VALUES (1146, 10, 'Arari', '2101004', NULL, NULL);
INSERT INTO public.cities VALUES (1147, 10, 'Axixá', '2101103', NULL, NULL);
INSERT INTO public.cities VALUES (1148, 10, 'Bacabal', '2101202', NULL, NULL);
INSERT INTO public.cities VALUES (1149, 10, 'Bacabeira', '2101251', NULL, NULL);
INSERT INTO public.cities VALUES (1150, 10, 'Bacuri', '2101301', NULL, NULL);
INSERT INTO public.cities VALUES (1151, 10, 'Bacurituba', '2101350', NULL, NULL);
INSERT INTO public.cities VALUES (1152, 10, 'Balsas', '2101400', NULL, NULL);
INSERT INTO public.cities VALUES (1153, 10, 'Barão de Grajaú', '2101509', NULL, NULL);
INSERT INTO public.cities VALUES (1154, 10, 'Barra do Corda', '2101608', NULL, NULL);
INSERT INTO public.cities VALUES (1155, 10, 'Barreirinhas', '2101707', NULL, NULL);
INSERT INTO public.cities VALUES (1156, 10, 'Bela Vista do Maranhão', '2101772', NULL, NULL);
INSERT INTO public.cities VALUES (1157, 10, 'Belágua', '2101731', NULL, NULL);
INSERT INTO public.cities VALUES (1158, 10, 'Benedito Leite', '2101806', NULL, NULL);
INSERT INTO public.cities VALUES (1159, 10, 'Bequimão', '2101905', NULL, NULL);
INSERT INTO public.cities VALUES (1160, 10, 'Bernardo do Mearim', '2101939', NULL, NULL);
INSERT INTO public.cities VALUES (1161, 10, 'Boa Vista do Gurupi', '2101970', NULL, NULL);
INSERT INTO public.cities VALUES (1162, 10, 'Bom Jardim', '2102002', NULL, NULL);
INSERT INTO public.cities VALUES (1163, 10, 'Bom Jesus das Selvas', '2102036', NULL, NULL);
INSERT INTO public.cities VALUES (1164, 10, 'Bom Lugar', '2102077', NULL, NULL);
INSERT INTO public.cities VALUES (1165, 10, 'Brejo', '2102101', NULL, NULL);
INSERT INTO public.cities VALUES (1166, 10, 'Brejo de Areia', '2102150', NULL, NULL);
INSERT INTO public.cities VALUES (1167, 10, 'Buriti', '2102200', NULL, NULL);
INSERT INTO public.cities VALUES (1168, 10, 'Buriti Bravo', '2102309', NULL, NULL);
INSERT INTO public.cities VALUES (1169, 10, 'Buriticupu', '2102325', NULL, NULL);
INSERT INTO public.cities VALUES (1170, 10, 'Buritirana', '2102358', NULL, NULL);
INSERT INTO public.cities VALUES (1171, 10, 'Cachoeira Grande', '2102374', NULL, NULL);
INSERT INTO public.cities VALUES (1172, 10, 'Cajapió', '2102408', NULL, NULL);
INSERT INTO public.cities VALUES (1173, 10, 'Cajari', '2102507', NULL, NULL);
INSERT INTO public.cities VALUES (1174, 10, 'Campestre do Maranhão', '2102556', NULL, NULL);
INSERT INTO public.cities VALUES (1175, 10, 'Cândido Mendes', '2102606', NULL, NULL);
INSERT INTO public.cities VALUES (1176, 10, 'Cantanhede', '2102705', NULL, NULL);
INSERT INTO public.cities VALUES (1177, 10, 'Capinzal do Norte', '2102754', NULL, NULL);
INSERT INTO public.cities VALUES (1178, 10, 'Carolina', '2102804', NULL, NULL);
INSERT INTO public.cities VALUES (1179, 10, 'Carutapera', '2102903', NULL, NULL);
INSERT INTO public.cities VALUES (1180, 10, 'Caxias', '2103000', NULL, NULL);
INSERT INTO public.cities VALUES (1181, 10, 'Cedral', '2103109', NULL, NULL);
INSERT INTO public.cities VALUES (1182, 10, 'Central do Maranhão', '2103125', NULL, NULL);
INSERT INTO public.cities VALUES (1183, 10, 'Centro do Guilherme', '2103158', NULL, NULL);
INSERT INTO public.cities VALUES (1184, 10, 'Centro Novo do Maranhão', '2103174', NULL, NULL);
INSERT INTO public.cities VALUES (1185, 10, 'Chapadinha', '2103208', NULL, NULL);
INSERT INTO public.cities VALUES (1186, 10, 'Cidelândia', '2103257', NULL, NULL);
INSERT INTO public.cities VALUES (1187, 10, 'Codó', '2103307', NULL, NULL);
INSERT INTO public.cities VALUES (1188, 10, 'Coelho Neto', '2103406', NULL, NULL);
INSERT INTO public.cities VALUES (1189, 10, 'Colinas', '2103505', NULL, NULL);
INSERT INTO public.cities VALUES (1190, 10, 'Conceição do Lago-Açu', '2103554', NULL, NULL);
INSERT INTO public.cities VALUES (1191, 10, 'Coroatá', '2103604', NULL, NULL);
INSERT INTO public.cities VALUES (1192, 10, 'Cururupu', '2103703', NULL, NULL);
INSERT INTO public.cities VALUES (1193, 10, 'Davinópolis', '2103752', NULL, NULL);
INSERT INTO public.cities VALUES (1194, 10, 'Dom Pedro', '2103802', NULL, NULL);
INSERT INTO public.cities VALUES (1195, 10, 'Duque Bacelar', '2103901', NULL, NULL);
INSERT INTO public.cities VALUES (1196, 10, 'Esperantinópolis', '2104008', NULL, NULL);
INSERT INTO public.cities VALUES (1197, 10, 'Estreito', '2104057', NULL, NULL);
INSERT INTO public.cities VALUES (1198, 10, 'Feira Nova do Maranhão', '2104073', NULL, NULL);
INSERT INTO public.cities VALUES (1199, 10, 'Fernando Falcão', '2104081', NULL, NULL);
INSERT INTO public.cities VALUES (1200, 10, 'Formosa da Serra Negra', '2104099', NULL, NULL);
INSERT INTO public.cities VALUES (1201, 10, 'Fortaleza dos Nogueiras', '2104107', NULL, NULL);
INSERT INTO public.cities VALUES (1202, 10, 'Fortuna', '2104206', NULL, NULL);
INSERT INTO public.cities VALUES (1203, 10, 'Godofredo Viana', '2104305', NULL, NULL);
INSERT INTO public.cities VALUES (1204, 10, 'Gonçalves Dias', '2104404', NULL, NULL);
INSERT INTO public.cities VALUES (1205, 10, 'Governador Archer', '2104503', NULL, NULL);
INSERT INTO public.cities VALUES (1206, 10, 'Governador Edison Lobão', '2104552', NULL, NULL);
INSERT INTO public.cities VALUES (1207, 10, 'Governador Eugênio Barros', '2104602', NULL, NULL);
INSERT INTO public.cities VALUES (1208, 10, 'Governador Luiz Rocha', '2104628', NULL, NULL);
INSERT INTO public.cities VALUES (1209, 10, 'Governador Newton Bello', '2104651', NULL, NULL);
INSERT INTO public.cities VALUES (1210, 10, 'Governador Nunes Freire', '2104677', NULL, NULL);
INSERT INTO public.cities VALUES (1211, 10, 'Graça Aranha', '2104701', NULL, NULL);
INSERT INTO public.cities VALUES (1212, 10, 'Grajaú', '2104800', NULL, NULL);
INSERT INTO public.cities VALUES (1213, 10, 'Guimarães', '2104909', NULL, NULL);
INSERT INTO public.cities VALUES (1214, 10, 'Humberto de Campos', '2105005', NULL, NULL);
INSERT INTO public.cities VALUES (1215, 10, 'Icatu', '2105104', NULL, NULL);
INSERT INTO public.cities VALUES (1216, 10, 'Igarapé do Meio', '2105153', NULL, NULL);
INSERT INTO public.cities VALUES (1217, 10, 'Igarapé Grande', '2105203', NULL, NULL);
INSERT INTO public.cities VALUES (1218, 10, 'Imperatriz', '2105302', NULL, NULL);
INSERT INTO public.cities VALUES (1219, 10, 'Itaipava do Grajaú', '2105351', NULL, NULL);
INSERT INTO public.cities VALUES (1220, 10, 'Itapecuru Mirim', '2105401', NULL, NULL);
INSERT INTO public.cities VALUES (1221, 10, 'Itinga do Maranhão', '2105427', NULL, NULL);
INSERT INTO public.cities VALUES (1222, 10, 'Jatobá', '2105450', NULL, NULL);
INSERT INTO public.cities VALUES (1223, 10, 'Jenipapo dos Vieiras', '2105476', NULL, NULL);
INSERT INTO public.cities VALUES (1224, 10, 'João Lisboa', '2105500', NULL, NULL);
INSERT INTO public.cities VALUES (1225, 10, 'Joselândia', '2105609', NULL, NULL);
INSERT INTO public.cities VALUES (1226, 10, 'Junco do Maranhão', '2105658', NULL, NULL);
INSERT INTO public.cities VALUES (1227, 10, 'Lago da Pedra', '2105708', NULL, NULL);
INSERT INTO public.cities VALUES (1228, 10, 'Lago do Junco', '2105807', NULL, NULL);
INSERT INTO public.cities VALUES (1229, 10, 'Lago dos Rodrigues', '2105948', NULL, NULL);
INSERT INTO public.cities VALUES (1230, 10, 'Lago Verde', '2105906', NULL, NULL);
INSERT INTO public.cities VALUES (1231, 10, 'Lagoa do Mato', '2105922', NULL, NULL);
INSERT INTO public.cities VALUES (1232, 10, 'Lagoa Grande do Maranhão', '2105963', NULL, NULL);
INSERT INTO public.cities VALUES (1233, 10, 'Lajeado Novo', '2105989', NULL, NULL);
INSERT INTO public.cities VALUES (1234, 10, 'Lima Campos', '2106003', NULL, NULL);
INSERT INTO public.cities VALUES (1235, 10, 'Loreto', '2106102', NULL, NULL);
INSERT INTO public.cities VALUES (1236, 10, 'Luís Domingues', '2106201', NULL, NULL);
INSERT INTO public.cities VALUES (1237, 10, 'Magalhães de Almeida', '2106300', NULL, NULL);
INSERT INTO public.cities VALUES (1238, 10, 'Maracaçumé', '2106326', NULL, NULL);
INSERT INTO public.cities VALUES (1239, 10, 'Marajá do Sena', '2106359', NULL, NULL);
INSERT INTO public.cities VALUES (1240, 10, 'Maranhãozinho', '2106375', NULL, NULL);
INSERT INTO public.cities VALUES (1241, 10, 'Mata Roma', '2106409', NULL, NULL);
INSERT INTO public.cities VALUES (1242, 10, 'Matinha', '2106508', NULL, NULL);
INSERT INTO public.cities VALUES (1243, 10, 'Matões', '2106607', NULL, NULL);
INSERT INTO public.cities VALUES (1244, 10, 'Matões do Norte', '2106631', NULL, NULL);
INSERT INTO public.cities VALUES (1245, 10, 'Milagres do Maranhão', '2106672', NULL, NULL);
INSERT INTO public.cities VALUES (1246, 10, 'Mirador', '2106706', NULL, NULL);
INSERT INTO public.cities VALUES (1247, 10, 'Miranda do Norte', '2106755', NULL, NULL);
INSERT INTO public.cities VALUES (1248, 10, 'Mirinzal', '2106805', NULL, NULL);
INSERT INTO public.cities VALUES (1249, 10, 'Monção', '2106904', NULL, NULL);
INSERT INTO public.cities VALUES (1250, 10, 'Montes Altos', '2107001', NULL, NULL);
INSERT INTO public.cities VALUES (1251, 10, 'Morros', '2107100', NULL, NULL);
INSERT INTO public.cities VALUES (1252, 10, 'Nina Rodrigues', '2107209', NULL, NULL);
INSERT INTO public.cities VALUES (1253, 10, 'Nova Colinas', '2107258', NULL, NULL);
INSERT INTO public.cities VALUES (1254, 10, 'Nova Iorque', '2107308', NULL, NULL);
INSERT INTO public.cities VALUES (1255, 10, 'Nova Olinda do Maranhão', '2107357', NULL, NULL);
INSERT INTO public.cities VALUES (1256, 10, 'Olho d''Água das Cunhãs', '2107407', NULL, NULL);
INSERT INTO public.cities VALUES (1257, 10, 'Olinda Nova do Maranhão', '2107456', NULL, NULL);
INSERT INTO public.cities VALUES (1258, 10, 'Paço do Lumiar', '2107506', NULL, NULL);
INSERT INTO public.cities VALUES (1259, 10, 'Palmeirândia', '2107605', NULL, NULL);
INSERT INTO public.cities VALUES (1260, 10, 'Paraibano', '2107704', NULL, NULL);
INSERT INTO public.cities VALUES (1261, 10, 'Parnarama', '2107803', NULL, NULL);
INSERT INTO public.cities VALUES (1262, 10, 'Passagem Franca', '2107902', NULL, NULL);
INSERT INTO public.cities VALUES (1263, 10, 'Pastos Bons', '2108009', NULL, NULL);
INSERT INTO public.cities VALUES (1264, 10, 'Paulino Neves', '2108058', NULL, NULL);
INSERT INTO public.cities VALUES (1265, 10, 'Paulo Ramos', '2108108', NULL, NULL);
INSERT INTO public.cities VALUES (1266, 10, 'Pedreiras', '2108207', NULL, NULL);
INSERT INTO public.cities VALUES (1267, 10, 'Pedro do Rosário', '2108256', NULL, NULL);
INSERT INTO public.cities VALUES (1268, 10, 'Penalva', '2108306', NULL, NULL);
INSERT INTO public.cities VALUES (1269, 10, 'Peri Mirim', '2108405', NULL, NULL);
INSERT INTO public.cities VALUES (1270, 10, 'Peritoró', '2108454', NULL, NULL);
INSERT INTO public.cities VALUES (1271, 10, 'Pindaré-Mirim', '2108504', NULL, NULL);
INSERT INTO public.cities VALUES (1272, 10, 'Pinheiro', '2108603', NULL, NULL);
INSERT INTO public.cities VALUES (1273, 10, 'Pio XII', '2108702', NULL, NULL);
INSERT INTO public.cities VALUES (1274, 10, 'Pirapemas', '2108801', NULL, NULL);
INSERT INTO public.cities VALUES (1275, 10, 'Poção de Pedras', '2108900', NULL, NULL);
INSERT INTO public.cities VALUES (1276, 10, 'Porto Franco', '2109007', NULL, NULL);
INSERT INTO public.cities VALUES (1277, 10, 'Porto Rico do Maranhão', '2109056', NULL, NULL);
INSERT INTO public.cities VALUES (1278, 10, 'Presidente Dutra', '2109106', NULL, NULL);
INSERT INTO public.cities VALUES (1279, 10, 'Presidente Juscelino', '2109205', NULL, NULL);
INSERT INTO public.cities VALUES (1280, 10, 'Presidente Médici', '2109239', NULL, NULL);
INSERT INTO public.cities VALUES (1281, 10, 'Presidente Sarney', '2109270', NULL, NULL);
INSERT INTO public.cities VALUES (1282, 10, 'Presidente Vargas', '2109304', NULL, NULL);
INSERT INTO public.cities VALUES (1283, 10, 'Primeira Cruz', '2109403', NULL, NULL);
INSERT INTO public.cities VALUES (1284, 10, 'Raposa', '2109452', NULL, NULL);
INSERT INTO public.cities VALUES (1285, 10, 'Riachão', '2109502', NULL, NULL);
INSERT INTO public.cities VALUES (1286, 10, 'Ribamar Fiquene', '2109551', NULL, NULL);
INSERT INTO public.cities VALUES (1287, 10, 'Rosário', '2109601', NULL, NULL);
INSERT INTO public.cities VALUES (1288, 10, 'Sambaíba', '2109700', NULL, NULL);
INSERT INTO public.cities VALUES (1289, 10, 'Santa Filomena do Maranhão', '2109759', NULL, NULL);
INSERT INTO public.cities VALUES (1290, 10, 'Santa Helena', '2109809', NULL, NULL);
INSERT INTO public.cities VALUES (1291, 10, 'Santa Inês', '2109908', NULL, NULL);
INSERT INTO public.cities VALUES (1292, 10, 'Santa Luzia', '2110005', NULL, NULL);
INSERT INTO public.cities VALUES (1293, 10, 'Santa Luzia do Paruá', '2110039', NULL, NULL);
INSERT INTO public.cities VALUES (1294, 10, 'Santa Quitéria do Maranhão', '2110104', NULL, NULL);
INSERT INTO public.cities VALUES (1295, 10, 'Santa Rita', '2110203', NULL, NULL);
INSERT INTO public.cities VALUES (1296, 10, 'Santana do Maranhão', '2110237', NULL, NULL);
INSERT INTO public.cities VALUES (1297, 10, 'Santo Amaro do Maranhão', '2110278', NULL, NULL);
INSERT INTO public.cities VALUES (1298, 10, 'Santo Antônio dos Lopes', '2110302', NULL, NULL);
INSERT INTO public.cities VALUES (1299, 10, 'São Benedito do Rio Preto', '2110401', NULL, NULL);
INSERT INTO public.cities VALUES (1300, 10, 'São Bento', '2110500', NULL, NULL);
INSERT INTO public.cities VALUES (1301, 10, 'São Bernardo', '2110609', NULL, NULL);
INSERT INTO public.cities VALUES (1302, 10, 'São Domingos do Azeitão', '2110658', NULL, NULL);
INSERT INTO public.cities VALUES (1303, 10, 'São Domingos do Maranhão', '2110708', NULL, NULL);
INSERT INTO public.cities VALUES (1304, 10, 'São Félix de Balsas', '2110807', NULL, NULL);
INSERT INTO public.cities VALUES (1305, 10, 'São Francisco do Brejão', '2110856', NULL, NULL);
INSERT INTO public.cities VALUES (1306, 10, 'São Francisco do Maranhão', '2110906', NULL, NULL);
INSERT INTO public.cities VALUES (1307, 10, 'São João Batista', '2111003', NULL, NULL);
INSERT INTO public.cities VALUES (1308, 10, 'São João do Carú', '2111029', NULL, NULL);
INSERT INTO public.cities VALUES (1309, 10, 'São João do Paraíso', '2111052', NULL, NULL);
INSERT INTO public.cities VALUES (1310, 10, 'São João do Soter', '2111078', NULL, NULL);
INSERT INTO public.cities VALUES (1311, 10, 'São João dos Patos', '2111102', NULL, NULL);
INSERT INTO public.cities VALUES (1312, 10, 'São José de Ribamar', '2111201', NULL, NULL);
INSERT INTO public.cities VALUES (1429, 11, 'Nova Xavantina', '5106257', NULL, NULL);
INSERT INTO public.cities VALUES (1313, 10, 'São José dos Basílios', '2111250', NULL, NULL);
INSERT INTO public.cities VALUES (1314, 10, 'São Luís', '2111300', NULL, NULL);
INSERT INTO public.cities VALUES (1315, 10, 'São Luís Gonzaga do Maranhão', '2111409', NULL, NULL);
INSERT INTO public.cities VALUES (1316, 10, 'São Mateus do Maranhão', '2111508', NULL, NULL);
INSERT INTO public.cities VALUES (1317, 10, 'São Pedro da Água Branca', '2111532', NULL, NULL);
INSERT INTO public.cities VALUES (1318, 10, 'São Pedro dos Crentes', '2111573', NULL, NULL);
INSERT INTO public.cities VALUES (1319, 10, 'São Raimundo das Mangabeiras', '2111607', NULL, NULL);
INSERT INTO public.cities VALUES (1320, 10, 'São Raimundo do Doca Bezerra', '2111631', NULL, NULL);
INSERT INTO public.cities VALUES (1321, 10, 'São Roberto', '2111672', NULL, NULL);
INSERT INTO public.cities VALUES (1322, 10, 'São Vicente Ferrer', '2111706', NULL, NULL);
INSERT INTO public.cities VALUES (1323, 10, 'Satubinha', '2111722', NULL, NULL);
INSERT INTO public.cities VALUES (1324, 10, 'Senador Alexandre Costa', '2111748', NULL, NULL);
INSERT INTO public.cities VALUES (1325, 10, 'Senador La Rocque', '2111763', NULL, NULL);
INSERT INTO public.cities VALUES (1326, 10, 'Serrano do Maranhão', '2111789', NULL, NULL);
INSERT INTO public.cities VALUES (1327, 10, 'Sítio Novo', '2111805', NULL, NULL);
INSERT INTO public.cities VALUES (1328, 10, 'Sucupira do Norte', '2111904', NULL, NULL);
INSERT INTO public.cities VALUES (1329, 10, 'Sucupira do Riachão', '2111953', NULL, NULL);
INSERT INTO public.cities VALUES (1330, 10, 'Tasso Fragoso', '2112001', NULL, NULL);
INSERT INTO public.cities VALUES (1331, 10, 'Timbiras', '2112100', NULL, NULL);
INSERT INTO public.cities VALUES (1332, 10, 'Timon', '2112209', NULL, NULL);
INSERT INTO public.cities VALUES (1333, 10, 'Trizidela do Vale', '2112233', NULL, NULL);
INSERT INTO public.cities VALUES (1334, 10, 'Tufilândia', '2112274', NULL, NULL);
INSERT INTO public.cities VALUES (1335, 10, 'Tuntum', '2112308', NULL, NULL);
INSERT INTO public.cities VALUES (1336, 10, 'Turiaçu', '2112407', NULL, NULL);
INSERT INTO public.cities VALUES (1337, 10, 'Turilândia', '2112456', NULL, NULL);
INSERT INTO public.cities VALUES (1338, 10, 'Tutóia', '2112506', NULL, NULL);
INSERT INTO public.cities VALUES (1339, 10, 'Urbano Santos', '2112605', NULL, NULL);
INSERT INTO public.cities VALUES (1340, 10, 'Vargem Grande', '2112704', NULL, NULL);
INSERT INTO public.cities VALUES (1341, 10, 'Viana', '2112803', NULL, NULL);
INSERT INTO public.cities VALUES (1342, 10, 'Vila Nova dos Martírios', '2112852', NULL, NULL);
INSERT INTO public.cities VALUES (1343, 10, 'Vitória do Mearim', '2112902', NULL, NULL);
INSERT INTO public.cities VALUES (1344, 10, 'Vitorino Freire', '2113009', NULL, NULL);
INSERT INTO public.cities VALUES (1345, 10, 'Zé Doca', '2114007', NULL, NULL);
INSERT INTO public.cities VALUES (1346, 11, 'Acorizal', '5100102', NULL, NULL);
INSERT INTO public.cities VALUES (1347, 11, 'Água Boa', '5100201', NULL, NULL);
INSERT INTO public.cities VALUES (1348, 11, 'Alta Floresta', '5100250', NULL, NULL);
INSERT INTO public.cities VALUES (1349, 11, 'Alto Araguaia', '5100300', NULL, NULL);
INSERT INTO public.cities VALUES (1350, 11, 'Alto Boa Vista', '5100359', NULL, NULL);
INSERT INTO public.cities VALUES (1351, 11, 'Alto Garças', '5100409', NULL, NULL);
INSERT INTO public.cities VALUES (1352, 11, 'Alto Paraguai', '5100508', NULL, NULL);
INSERT INTO public.cities VALUES (1353, 11, 'Alto Taquari', '5100607', NULL, NULL);
INSERT INTO public.cities VALUES (1354, 11, 'Apiacás', '5100805', NULL, NULL);
INSERT INTO public.cities VALUES (1355, 11, 'Araguaiana', '5101001', NULL, NULL);
INSERT INTO public.cities VALUES (1356, 11, 'Araguainha', '5101209', NULL, NULL);
INSERT INTO public.cities VALUES (1357, 11, 'Araputanga', '5101258', NULL, NULL);
INSERT INTO public.cities VALUES (1358, 11, 'Arenápolis', '5101308', NULL, NULL);
INSERT INTO public.cities VALUES (1359, 11, 'Aripuanã', '5101407', NULL, NULL);
INSERT INTO public.cities VALUES (1360, 11, 'Barão de Melgaço', '5101605', NULL, NULL);
INSERT INTO public.cities VALUES (1361, 11, 'Barra do Bugres', '5101704', NULL, NULL);
INSERT INTO public.cities VALUES (1362, 11, 'Barra do Garças', '5101803', NULL, NULL);
INSERT INTO public.cities VALUES (1363, 11, 'Bom Jesus do Araguaia', '5101852', NULL, NULL);
INSERT INTO public.cities VALUES (1364, 11, 'Brasnorte', '5101902', NULL, NULL);
INSERT INTO public.cities VALUES (1365, 11, 'Cáceres', '5102504', NULL, NULL);
INSERT INTO public.cities VALUES (1366, 11, 'Campinápolis', '5102603', NULL, NULL);
INSERT INTO public.cities VALUES (1367, 11, 'Campo Novo do Parecis', '5102637', NULL, NULL);
INSERT INTO public.cities VALUES (1368, 11, 'Campo Verde', '5102678', NULL, NULL);
INSERT INTO public.cities VALUES (1369, 11, 'Campos de Júlio', '5102686', NULL, NULL);
INSERT INTO public.cities VALUES (1370, 11, 'Canabrava do Norte', '5102694', NULL, NULL);
INSERT INTO public.cities VALUES (1371, 11, 'Canarana', '5102702', NULL, NULL);
INSERT INTO public.cities VALUES (1372, 11, 'Carlinda', '5102793', NULL, NULL);
INSERT INTO public.cities VALUES (1373, 11, 'Castanheira', '5102850', NULL, NULL);
INSERT INTO public.cities VALUES (1374, 11, 'Chapada dos Guimarães', '5103007', NULL, NULL);
INSERT INTO public.cities VALUES (1375, 11, 'Cláudia', '5103056', NULL, NULL);
INSERT INTO public.cities VALUES (1376, 11, 'Cocalinho', '5103106', NULL, NULL);
INSERT INTO public.cities VALUES (1377, 11, 'Colíder', '5103205', NULL, NULL);
INSERT INTO public.cities VALUES (1378, 11, 'Colniza', '5103254', NULL, NULL);
INSERT INTO public.cities VALUES (1379, 11, 'Comodoro', '5103304', NULL, NULL);
INSERT INTO public.cities VALUES (1380, 11, 'Confresa', '5103353', NULL, NULL);
INSERT INTO public.cities VALUES (1381, 11, 'Conquista D''Oeste', '5103361', NULL, NULL);
INSERT INTO public.cities VALUES (1382, 11, 'Cotriguaçu', '5103379', NULL, NULL);
INSERT INTO public.cities VALUES (1383, 11, 'Cuiabá', '5103403', NULL, NULL);
INSERT INTO public.cities VALUES (1384, 11, 'Curvelândia', '5103437', NULL, NULL);
INSERT INTO public.cities VALUES (1385, 11, 'Denise', '5103452', NULL, NULL);
INSERT INTO public.cities VALUES (1386, 11, 'Diamantino', '5103502', NULL, NULL);
INSERT INTO public.cities VALUES (1387, 11, 'Dom Aquino', '5103601', NULL, NULL);
INSERT INTO public.cities VALUES (1388, 11, 'Feliz Natal', '5103700', NULL, NULL);
INSERT INTO public.cities VALUES (1389, 11, 'Figueirópolis D''Oeste', '5103809', NULL, NULL);
INSERT INTO public.cities VALUES (1390, 11, 'Gaúcha do Norte', '5103858', NULL, NULL);
INSERT INTO public.cities VALUES (1391, 11, 'General Carneiro', '5103908', NULL, NULL);
INSERT INTO public.cities VALUES (1392, 11, 'Glória D''Oeste', '5103957', NULL, NULL);
INSERT INTO public.cities VALUES (1393, 11, 'Guarantã do Norte', '5104104', NULL, NULL);
INSERT INTO public.cities VALUES (1394, 11, 'Guiratinga', '5104203', NULL, NULL);
INSERT INTO public.cities VALUES (1395, 11, 'Indiavaí', '5104500', NULL, NULL);
INSERT INTO public.cities VALUES (1396, 11, 'Ipiranga do Norte', '5104526', NULL, NULL);
INSERT INTO public.cities VALUES (1397, 11, 'Itanhangá', '5104542', NULL, NULL);
INSERT INTO public.cities VALUES (1398, 11, 'Itaúba', '5104559', NULL, NULL);
INSERT INTO public.cities VALUES (1399, 11, 'Itiquira', '5104609', NULL, NULL);
INSERT INTO public.cities VALUES (1400, 11, 'Jaciara', '5104807', NULL, NULL);
INSERT INTO public.cities VALUES (1401, 11, 'Jangada', '5104906', NULL, NULL);
INSERT INTO public.cities VALUES (1402, 11, 'Jauru', '5105002', NULL, NULL);
INSERT INTO public.cities VALUES (1403, 11, 'Juara', '5105101', NULL, NULL);
INSERT INTO public.cities VALUES (1404, 11, 'Juína', '5105150', NULL, NULL);
INSERT INTO public.cities VALUES (1405, 11, 'Juruena', '5105176', NULL, NULL);
INSERT INTO public.cities VALUES (1406, 11, 'Juscimeira', '5105200', NULL, NULL);
INSERT INTO public.cities VALUES (1407, 11, 'Lambari D''Oeste', '5105234', NULL, NULL);
INSERT INTO public.cities VALUES (1408, 11, 'Lucas do Rio Verde', '5105259', NULL, NULL);
INSERT INTO public.cities VALUES (1409, 11, 'Luciara', '5105309', NULL, NULL);
INSERT INTO public.cities VALUES (1410, 11, 'Marcelândia', '5105580', NULL, NULL);
INSERT INTO public.cities VALUES (1411, 11, 'Matupá', '5105606', NULL, NULL);
INSERT INTO public.cities VALUES (1412, 11, 'Mirassol d''Oeste', '5105622', NULL, NULL);
INSERT INTO public.cities VALUES (1413, 11, 'Nobres', '5105903', NULL, NULL);
INSERT INTO public.cities VALUES (1414, 11, 'Nortelândia', '5106000', NULL, NULL);
INSERT INTO public.cities VALUES (1415, 11, 'Nossa Senhora do Livramento', '5106109', NULL, NULL);
INSERT INTO public.cities VALUES (1416, 11, 'Nova Bandeirantes', '5106158', NULL, NULL);
INSERT INTO public.cities VALUES (1417, 11, 'Nova Brasilândia', '5106208', NULL, NULL);
INSERT INTO public.cities VALUES (1418, 11, 'Nova Canaã do Norte', '5106216', NULL, NULL);
INSERT INTO public.cities VALUES (1419, 11, 'Nova Guarita', '5108808', NULL, NULL);
INSERT INTO public.cities VALUES (1420, 11, 'Nova Lacerda', '5106182', NULL, NULL);
INSERT INTO public.cities VALUES (1421, 11, 'Nova Marilândia', '5108857', NULL, NULL);
INSERT INTO public.cities VALUES (1422, 11, 'Nova Maringá', '5108907', NULL, NULL);
INSERT INTO public.cities VALUES (1423, 11, 'Nova Monte Verde', '5108956', NULL, NULL);
INSERT INTO public.cities VALUES (1424, 11, 'Nova Mutum', '5106224', NULL, NULL);
INSERT INTO public.cities VALUES (1425, 11, 'Nova Nazaré', '5106174', NULL, NULL);
INSERT INTO public.cities VALUES (1426, 11, 'Nova Olímpia', '5106232', NULL, NULL);
INSERT INTO public.cities VALUES (1427, 11, 'Nova Santa Helena', '5106190', NULL, NULL);
INSERT INTO public.cities VALUES (1428, 11, 'Nova Ubiratã', '5106240', NULL, NULL);
INSERT INTO public.cities VALUES (1430, 11, 'Novo Horizonte do Norte', '5106273', NULL, NULL);
INSERT INTO public.cities VALUES (1431, 11, 'Novo Mundo', '5106265', NULL, NULL);
INSERT INTO public.cities VALUES (1432, 11, 'Novo Santo Antônio', '5106315', NULL, NULL);
INSERT INTO public.cities VALUES (1433, 11, 'Novo São Joaquim', '5106281', NULL, NULL);
INSERT INTO public.cities VALUES (1434, 11, 'Paranaíta', '5106299', NULL, NULL);
INSERT INTO public.cities VALUES (1435, 11, 'Paranatinga', '5106307', NULL, NULL);
INSERT INTO public.cities VALUES (1436, 11, 'Pedra Preta', '5106372', NULL, NULL);
INSERT INTO public.cities VALUES (1437, 11, 'Peixoto de Azevedo', '5106422', NULL, NULL);
INSERT INTO public.cities VALUES (1438, 11, 'Planalto da Serra', '5106455', NULL, NULL);
INSERT INTO public.cities VALUES (1439, 11, 'Poconé', '5106505', NULL, NULL);
INSERT INTO public.cities VALUES (1440, 11, 'Pontal do Araguaia', '5106653', NULL, NULL);
INSERT INTO public.cities VALUES (1441, 11, 'Ponte Branca', '5106703', NULL, NULL);
INSERT INTO public.cities VALUES (1442, 11, 'Pontes e Lacerda', '5106752', NULL, NULL);
INSERT INTO public.cities VALUES (1443, 11, 'Porto Alegre do Norte', '5106778', NULL, NULL);
INSERT INTO public.cities VALUES (1444, 11, 'Porto dos Gaúchos', '5106802', NULL, NULL);
INSERT INTO public.cities VALUES (1445, 11, 'Porto Esperidião', '5106828', NULL, NULL);
INSERT INTO public.cities VALUES (1446, 11, 'Porto Estrela', '5106851', NULL, NULL);
INSERT INTO public.cities VALUES (1447, 11, 'Poxoréo', '5107008', NULL, NULL);
INSERT INTO public.cities VALUES (1448, 11, 'Primavera do Leste', '5107040', NULL, NULL);
INSERT INTO public.cities VALUES (1449, 11, 'Querência', '5107065', NULL, NULL);
INSERT INTO public.cities VALUES (1450, 11, 'Reserva do Cabaçal', '5107156', NULL, NULL);
INSERT INTO public.cities VALUES (1451, 11, 'Ribeirão Cascalheira', '5107180', NULL, NULL);
INSERT INTO public.cities VALUES (1452, 11, 'Ribeirãozinho', '5107198', NULL, NULL);
INSERT INTO public.cities VALUES (1453, 11, 'Rio Branco', '5107206', NULL, NULL);
INSERT INTO public.cities VALUES (1454, 11, 'Rondolândia', '5107578', NULL, NULL);
INSERT INTO public.cities VALUES (1455, 11, 'Rondonópolis', '5107602', NULL, NULL);
INSERT INTO public.cities VALUES (1456, 11, 'Rosário Oeste', '5107701', NULL, NULL);
INSERT INTO public.cities VALUES (1457, 11, 'Salto do Céu', '5107750', NULL, NULL);
INSERT INTO public.cities VALUES (1458, 11, 'Santa Carmem', '5107248', NULL, NULL);
INSERT INTO public.cities VALUES (1459, 11, 'Santa Cruz do Xingu', '5107743', NULL, NULL);
INSERT INTO public.cities VALUES (1460, 11, 'Santa Rita do Trivelato', '5107768', NULL, NULL);
INSERT INTO public.cities VALUES (1461, 11, 'Santa Terezinha', '5107776', NULL, NULL);
INSERT INTO public.cities VALUES (1462, 11, 'Santo Afonso', '5107263', NULL, NULL);
INSERT INTO public.cities VALUES (1463, 11, 'Santo Antônio do Leste', '5107792', NULL, NULL);
INSERT INTO public.cities VALUES (1464, 11, 'Santo Antônio do Leverger', '5107800', NULL, NULL);
INSERT INTO public.cities VALUES (1465, 11, 'São Félix do Araguaia', '5107859', NULL, NULL);
INSERT INTO public.cities VALUES (1466, 11, 'São José do Povo', '5107297', NULL, NULL);
INSERT INTO public.cities VALUES (1467, 11, 'São José do Rio Claro', '5107305', NULL, NULL);
INSERT INTO public.cities VALUES (1468, 11, 'São José do Xingu', '5107354', NULL, NULL);
INSERT INTO public.cities VALUES (1469, 11, 'São José dos Quatro Marcos', '5107107', NULL, NULL);
INSERT INTO public.cities VALUES (1470, 11, 'São Pedro da Cipa', '5107404', NULL, NULL);
INSERT INTO public.cities VALUES (1471, 11, 'Sapezal', '5107875', NULL, NULL);
INSERT INTO public.cities VALUES (1472, 11, 'Serra Nova Dourada', '5107883', NULL, NULL);
INSERT INTO public.cities VALUES (1473, 11, 'Sinop', '5107909', NULL, NULL);
INSERT INTO public.cities VALUES (1474, 11, 'Sorriso', '5107925', NULL, NULL);
INSERT INTO public.cities VALUES (1475, 11, 'Tabaporã', '5107941', NULL, NULL);
INSERT INTO public.cities VALUES (1476, 11, 'Tangará da Serra', '5107958', NULL, NULL);
INSERT INTO public.cities VALUES (1477, 11, 'Tapurah', '5108006', NULL, NULL);
INSERT INTO public.cities VALUES (1478, 11, 'Terra Nova do Norte', '5108055', NULL, NULL);
INSERT INTO public.cities VALUES (1479, 11, 'Tesouro', '5108105', NULL, NULL);
INSERT INTO public.cities VALUES (1480, 11, 'Torixoréu', '5108204', NULL, NULL);
INSERT INTO public.cities VALUES (1481, 11, 'União do Sul', '5108303', NULL, NULL);
INSERT INTO public.cities VALUES (1482, 11, 'Vale de São Domingos', '5108352', NULL, NULL);
INSERT INTO public.cities VALUES (1483, 11, 'Várzea Grande', '5108402', NULL, NULL);
INSERT INTO public.cities VALUES (1484, 11, 'Vera', '5108501', NULL, NULL);
INSERT INTO public.cities VALUES (1485, 11, 'Vila Bela da Santíssima Trindade', '5105507', NULL, NULL);
INSERT INTO public.cities VALUES (1486, 11, 'Vila Rica', '5108600', NULL, NULL);
INSERT INTO public.cities VALUES (1487, 12, 'Água Clara', '5000203', NULL, NULL);
INSERT INTO public.cities VALUES (1488, 12, 'Alcinópolis', '5000252', NULL, NULL);
INSERT INTO public.cities VALUES (1489, 12, 'Amambai', '5000609', NULL, NULL);
INSERT INTO public.cities VALUES (1490, 12, 'Anastácio', '5000708', NULL, NULL);
INSERT INTO public.cities VALUES (1491, 12, 'Anaurilândia', '5000807', NULL, NULL);
INSERT INTO public.cities VALUES (1492, 12, 'Angélica', '5000856', NULL, NULL);
INSERT INTO public.cities VALUES (1493, 12, 'Antônio João', '5000906', NULL, NULL);
INSERT INTO public.cities VALUES (1494, 12, 'Aparecida do Taboado', '5001003', NULL, NULL);
INSERT INTO public.cities VALUES (1495, 12, 'Aquidauana', '5001102', NULL, NULL);
INSERT INTO public.cities VALUES (1496, 12, 'Aral Moreira', '5001243', NULL, NULL);
INSERT INTO public.cities VALUES (1497, 12, 'Bandeirantes', '5001508', NULL, NULL);
INSERT INTO public.cities VALUES (1498, 12, 'Bataguassu', '5001904', NULL, NULL);
INSERT INTO public.cities VALUES (1499, 12, 'Batayporã', '5002001', NULL, NULL);
INSERT INTO public.cities VALUES (1500, 12, 'Bela Vista', '5002100', NULL, NULL);
INSERT INTO public.cities VALUES (1501, 12, 'Bodoquena', '5002159', NULL, NULL);
INSERT INTO public.cities VALUES (1502, 12, 'Bonito', '5002209', NULL, NULL);
INSERT INTO public.cities VALUES (1503, 12, 'Brasilândia', '5002308', NULL, NULL);
INSERT INTO public.cities VALUES (1504, 12, 'Caarapó', '5002407', NULL, NULL);
INSERT INTO public.cities VALUES (1505, 12, 'Camapuã', '5002605', NULL, NULL);
INSERT INTO public.cities VALUES (1506, 12, 'Campo Grande', '5002704', NULL, NULL);
INSERT INTO public.cities VALUES (1507, 12, 'Caracol', '5002803', NULL, NULL);
INSERT INTO public.cities VALUES (1508, 12, 'Cassilândia', '5002902', NULL, NULL);
INSERT INTO public.cities VALUES (1509, 12, 'Chapadão do Sul', '5002951', NULL, NULL);
INSERT INTO public.cities VALUES (1510, 12, 'Corguinho', '5003108', NULL, NULL);
INSERT INTO public.cities VALUES (1511, 12, 'Coronel Sapucaia', '5003157', NULL, NULL);
INSERT INTO public.cities VALUES (1512, 12, 'Corumbá', '5003207', NULL, NULL);
INSERT INTO public.cities VALUES (1513, 12, 'Costa Rica', '5003256', NULL, NULL);
INSERT INTO public.cities VALUES (1514, 12, 'Coxim', '5003306', NULL, NULL);
INSERT INTO public.cities VALUES (1515, 12, 'Deodápolis', '5003454', NULL, NULL);
INSERT INTO public.cities VALUES (1516, 12, 'Dois Irmãos do Buriti', '5003488', NULL, NULL);
INSERT INTO public.cities VALUES (1517, 12, 'Douradina', '5003504', NULL, NULL);
INSERT INTO public.cities VALUES (1518, 12, 'Dourados', '5003702', NULL, NULL);
INSERT INTO public.cities VALUES (1519, 12, 'Eldorado', '5003751', NULL, NULL);
INSERT INTO public.cities VALUES (1520, 12, 'Fátima do Sul', '5003801', NULL, NULL);
INSERT INTO public.cities VALUES (1521, 12, 'Figueirão', '5003900', NULL, NULL);
INSERT INTO public.cities VALUES (1522, 12, 'Glória de Dourados', '5004007', NULL, NULL);
INSERT INTO public.cities VALUES (1523, 12, 'Guia Lopes da Laguna', '5004106', NULL, NULL);
INSERT INTO public.cities VALUES (1524, 12, 'Iguatemi', '5004304', NULL, NULL);
INSERT INTO public.cities VALUES (1525, 12, 'Inocência', '5004403', NULL, NULL);
INSERT INTO public.cities VALUES (1526, 12, 'Itaporã', '5004502', NULL, NULL);
INSERT INTO public.cities VALUES (1527, 12, 'Itaquiraí', '5004601', NULL, NULL);
INSERT INTO public.cities VALUES (1528, 12, 'Ivinhema', '5004700', NULL, NULL);
INSERT INTO public.cities VALUES (1529, 12, 'Japorã', '5004809', NULL, NULL);
INSERT INTO public.cities VALUES (1530, 12, 'Jaraguari', '5004908', NULL, NULL);
INSERT INTO public.cities VALUES (1531, 12, 'Jardim', '5005004', NULL, NULL);
INSERT INTO public.cities VALUES (1532, 12, 'Jateí', '5005103', NULL, NULL);
INSERT INTO public.cities VALUES (1533, 12, 'Juti', '5005152', NULL, NULL);
INSERT INTO public.cities VALUES (1534, 12, 'Ladário', '5005202', NULL, NULL);
INSERT INTO public.cities VALUES (1535, 12, 'Laguna Carapã', '5005251', NULL, NULL);
INSERT INTO public.cities VALUES (1536, 12, 'Maracaju', '5005400', NULL, NULL);
INSERT INTO public.cities VALUES (1537, 12, 'Miranda', '5005608', NULL, NULL);
INSERT INTO public.cities VALUES (1538, 12, 'Mundo Novo', '5005681', NULL, NULL);
INSERT INTO public.cities VALUES (1539, 12, 'Naviraí', '5005707', NULL, NULL);
INSERT INTO public.cities VALUES (1540, 12, 'Nioaque', '5005806', NULL, NULL);
INSERT INTO public.cities VALUES (1541, 12, 'Nova Alvorada do Sul', '5006002', NULL, NULL);
INSERT INTO public.cities VALUES (1542, 12, 'Nova Andradina', '5006200', NULL, NULL);
INSERT INTO public.cities VALUES (1543, 12, 'Novo Horizonte do Sul', '5006259', NULL, NULL);
INSERT INTO public.cities VALUES (1544, 12, 'Paranaíba', '5006309', NULL, NULL);
INSERT INTO public.cities VALUES (1545, 12, 'Paranhos', '5006358', NULL, NULL);
INSERT INTO public.cities VALUES (1546, 12, 'Pedro Gomes', '5006408', NULL, NULL);
INSERT INTO public.cities VALUES (1547, 12, 'Ponta Porã', '5006606', NULL, NULL);
INSERT INTO public.cities VALUES (1548, 12, 'Porto Murtinho', '5006903', NULL, NULL);
INSERT INTO public.cities VALUES (1549, 12, 'Ribas do Rio Pardo', '5007109', NULL, NULL);
INSERT INTO public.cities VALUES (1550, 12, 'Rio Brilhante', '5007208', NULL, NULL);
INSERT INTO public.cities VALUES (1551, 12, 'Rio Negro', '5007307', NULL, NULL);
INSERT INTO public.cities VALUES (1552, 12, 'Rio Verde de Mato Grosso', '5007406', NULL, NULL);
INSERT INTO public.cities VALUES (1553, 12, 'Rochedo', '5007505', NULL, NULL);
INSERT INTO public.cities VALUES (1554, 12, 'Santa Rita do Pardo', '5007554', NULL, NULL);
INSERT INTO public.cities VALUES (1555, 12, 'São Gabriel do Oeste', '5007695', NULL, NULL);
INSERT INTO public.cities VALUES (1556, 12, 'Selvíria', '5007802', NULL, NULL);
INSERT INTO public.cities VALUES (1557, 12, 'Sete Quedas', '5007703', NULL, NULL);
INSERT INTO public.cities VALUES (1558, 12, 'Sidrolândia', '5007901', NULL, NULL);
INSERT INTO public.cities VALUES (1559, 12, 'Sonora', '5007935', NULL, NULL);
INSERT INTO public.cities VALUES (1560, 12, 'Tacuru', '5007950', NULL, NULL);
INSERT INTO public.cities VALUES (1561, 12, 'Taquarussu', '5007976', NULL, NULL);
INSERT INTO public.cities VALUES (1562, 12, 'Terenos', '5008008', NULL, NULL);
INSERT INTO public.cities VALUES (1563, 12, 'Três Lagoas', '5008305', NULL, NULL);
INSERT INTO public.cities VALUES (1564, 12, 'Vicentina', '5008404', NULL, NULL);
INSERT INTO public.cities VALUES (1565, 13, 'Abadia dos Dourados', '3100104', NULL, NULL);
INSERT INTO public.cities VALUES (1566, 13, 'Abaeté', '3100203', NULL, NULL);
INSERT INTO public.cities VALUES (1567, 13, 'Abre Campo', '3100302', NULL, NULL);
INSERT INTO public.cities VALUES (1568, 13, 'Acaiaca', '3100401', NULL, NULL);
INSERT INTO public.cities VALUES (1569, 13, 'Açucena', '3100500', NULL, NULL);
INSERT INTO public.cities VALUES (1570, 13, 'Água Boa', '3100609', NULL, NULL);
INSERT INTO public.cities VALUES (1571, 13, 'Água Comprida', '3100708', NULL, NULL);
INSERT INTO public.cities VALUES (1572, 13, 'Aguanil', '3100807', NULL, NULL);
INSERT INTO public.cities VALUES (1573, 13, 'Águas Formosas', '3100906', NULL, NULL);
INSERT INTO public.cities VALUES (1574, 13, 'Águas Vermelhas', '3101003', NULL, NULL);
INSERT INTO public.cities VALUES (1575, 13, 'Aimorés', '3101102', NULL, NULL);
INSERT INTO public.cities VALUES (1576, 13, 'Aiuruoca', '3101201', NULL, NULL);
INSERT INTO public.cities VALUES (1577, 13, 'Alagoa', '3101300', NULL, NULL);
INSERT INTO public.cities VALUES (1578, 13, 'Albertina', '3101409', NULL, NULL);
INSERT INTO public.cities VALUES (1579, 13, 'Além Paraíba', '3101508', NULL, NULL);
INSERT INTO public.cities VALUES (1580, 13, 'Alfenas', '3101607', NULL, NULL);
INSERT INTO public.cities VALUES (1581, 13, 'Alfredo Vasconcelos', '3101631', NULL, NULL);
INSERT INTO public.cities VALUES (1582, 13, 'Almenara', '3101706', NULL, NULL);
INSERT INTO public.cities VALUES (1583, 13, 'Alpercata', '3101805', NULL, NULL);
INSERT INTO public.cities VALUES (1584, 13, 'Alpinópolis', '3101904', NULL, NULL);
INSERT INTO public.cities VALUES (1585, 13, 'Alterosa', '3102001', NULL, NULL);
INSERT INTO public.cities VALUES (1586, 13, 'Alto Caparaó', '3102050', NULL, NULL);
INSERT INTO public.cities VALUES (1587, 13, 'Alto Jequitibá', '3153509', NULL, NULL);
INSERT INTO public.cities VALUES (1588, 13, 'Alto Rio Doce', '3102100', NULL, NULL);
INSERT INTO public.cities VALUES (1589, 13, 'Alvarenga', '3102209', NULL, NULL);
INSERT INTO public.cities VALUES (1590, 13, 'Alvinópolis', '3102308', NULL, NULL);
INSERT INTO public.cities VALUES (1591, 13, 'Alvorada de Minas', '3102407', NULL, NULL);
INSERT INTO public.cities VALUES (1592, 13, 'Amparo do Serra', '3102506', NULL, NULL);
INSERT INTO public.cities VALUES (1593, 13, 'Andradas', '3102605', NULL, NULL);
INSERT INTO public.cities VALUES (1594, 13, 'Andrelândia', '3102803', NULL, NULL);
INSERT INTO public.cities VALUES (1595, 13, 'Angelândia', '3102852', NULL, NULL);
INSERT INTO public.cities VALUES (1596, 13, 'Antônio Carlos', '3102902', NULL, NULL);
INSERT INTO public.cities VALUES (1597, 13, 'Antônio Dias', '3103009', NULL, NULL);
INSERT INTO public.cities VALUES (1598, 13, 'Antônio Prado de Minas', '3103108', NULL, NULL);
INSERT INTO public.cities VALUES (1599, 13, 'Araçaí', '3103207', NULL, NULL);
INSERT INTO public.cities VALUES (1600, 13, 'Aracitaba', '3103306', NULL, NULL);
INSERT INTO public.cities VALUES (1601, 13, 'Araçuaí', '3103405', NULL, NULL);
INSERT INTO public.cities VALUES (1602, 13, 'Araguari', '3103504', NULL, NULL);
INSERT INTO public.cities VALUES (1603, 13, 'Arantina', '3103603', NULL, NULL);
INSERT INTO public.cities VALUES (1604, 13, 'Araponga', '3103702', NULL, NULL);
INSERT INTO public.cities VALUES (1605, 13, 'Araporã', '3103751', NULL, NULL);
INSERT INTO public.cities VALUES (1606, 13, 'Arapuá', '3103801', NULL, NULL);
INSERT INTO public.cities VALUES (1607, 13, 'Araújos', '3103900', NULL, NULL);
INSERT INTO public.cities VALUES (1608, 13, 'Araxá', '3104007', NULL, NULL);
INSERT INTO public.cities VALUES (1609, 13, 'Arceburgo', '3104106', NULL, NULL);
INSERT INTO public.cities VALUES (1610, 13, 'Arcos', '3104205', NULL, NULL);
INSERT INTO public.cities VALUES (1611, 13, 'Areado', '3104304', NULL, NULL);
INSERT INTO public.cities VALUES (1612, 13, 'Argirita', '3104403', NULL, NULL);
INSERT INTO public.cities VALUES (1613, 13, 'Aricanduva', '3104452', NULL, NULL);
INSERT INTO public.cities VALUES (1614, 13, 'Arinos', '3104502', NULL, NULL);
INSERT INTO public.cities VALUES (1615, 13, 'Astolfo Dutra', '3104601', NULL, NULL);
INSERT INTO public.cities VALUES (1616, 13, 'Ataléia', '3104700', NULL, NULL);
INSERT INTO public.cities VALUES (1617, 13, 'Augusto de Lima', '3104809', NULL, NULL);
INSERT INTO public.cities VALUES (1618, 13, 'Baependi', '3104908', NULL, NULL);
INSERT INTO public.cities VALUES (1619, 13, 'Baldim', '3105004', NULL, NULL);
INSERT INTO public.cities VALUES (1620, 13, 'Bambuí', '3105103', NULL, NULL);
INSERT INTO public.cities VALUES (1621, 13, 'Bandeira', '3105202', NULL, NULL);
INSERT INTO public.cities VALUES (1622, 13, 'Bandeira do Sul', '3105301', NULL, NULL);
INSERT INTO public.cities VALUES (1623, 13, 'Barão de Cocais', '3105400', NULL, NULL);
INSERT INTO public.cities VALUES (1624, 13, 'Barão de Monte Alto', '3105509', NULL, NULL);
INSERT INTO public.cities VALUES (1625, 13, 'Barbacena', '3105608', NULL, NULL);
INSERT INTO public.cities VALUES (1626, 13, 'Barra Longa', '3105707', NULL, NULL);
INSERT INTO public.cities VALUES (1627, 13, 'Barroso', '3105905', NULL, NULL);
INSERT INTO public.cities VALUES (1628, 13, 'Bela Vista de Minas', '3106002', NULL, NULL);
INSERT INTO public.cities VALUES (1629, 13, 'Belmiro Braga', '3106101', NULL, NULL);
INSERT INTO public.cities VALUES (1630, 13, 'Belo Horizonte', '3106200', NULL, NULL);
INSERT INTO public.cities VALUES (1631, 13, 'Belo Oriente', '3106309', NULL, NULL);
INSERT INTO public.cities VALUES (1632, 13, 'Belo Vale', '3106408', NULL, NULL);
INSERT INTO public.cities VALUES (1633, 13, 'Berilo', '3106507', NULL, NULL);
INSERT INTO public.cities VALUES (1634, 13, 'Berizal', '3106655', NULL, NULL);
INSERT INTO public.cities VALUES (1635, 13, 'Bertópolis', '3106606', NULL, NULL);
INSERT INTO public.cities VALUES (1636, 13, 'Betim', '3106705', NULL, NULL);
INSERT INTO public.cities VALUES (1637, 13, 'Bias Fortes', '3106804', NULL, NULL);
INSERT INTO public.cities VALUES (1638, 13, 'Bicas', '3106903', NULL, NULL);
INSERT INTO public.cities VALUES (1639, 13, 'Biquinhas', '3107000', NULL, NULL);
INSERT INTO public.cities VALUES (1640, 13, 'Boa Esperança', '3107109', NULL, NULL);
INSERT INTO public.cities VALUES (1641, 13, 'Bocaina de Minas', '3107208', NULL, NULL);
INSERT INTO public.cities VALUES (1642, 13, 'Bocaiúva', '3107307', NULL, NULL);
INSERT INTO public.cities VALUES (1643, 13, 'Bom Despacho', '3107406', NULL, NULL);
INSERT INTO public.cities VALUES (1644, 13, 'Bom Jardim de Minas', '3107505', NULL, NULL);
INSERT INTO public.cities VALUES (1645, 13, 'Bom Jesus da Penha', '3107604', NULL, NULL);
INSERT INTO public.cities VALUES (1646, 13, 'Bom Jesus do Amparo', '3107703', NULL, NULL);
INSERT INTO public.cities VALUES (1647, 13, 'Bom Jesus do Galho', '3107802', NULL, NULL);
INSERT INTO public.cities VALUES (1648, 13, 'Bom Repouso', '3107901', NULL, NULL);
INSERT INTO public.cities VALUES (1649, 13, 'Bom Sucesso', '3108008', NULL, NULL);
INSERT INTO public.cities VALUES (1650, 13, 'Bonfim', '3108107', NULL, NULL);
INSERT INTO public.cities VALUES (1651, 13, 'Bonfinópolis de Minas', '3108206', NULL, NULL);
INSERT INTO public.cities VALUES (1652, 13, 'Bonito de Minas', '3108255', NULL, NULL);
INSERT INTO public.cities VALUES (1653, 13, 'Borda da Mata', '3108305', NULL, NULL);
INSERT INTO public.cities VALUES (1654, 13, 'Botelhos', '3108404', NULL, NULL);
INSERT INTO public.cities VALUES (1655, 13, 'Botumirim', '3108503', NULL, NULL);
INSERT INTO public.cities VALUES (1656, 13, 'Brás Pires', '3108701', NULL, NULL);
INSERT INTO public.cities VALUES (1657, 13, 'Brasilândia de Minas', '3108552', NULL, NULL);
INSERT INTO public.cities VALUES (1658, 13, 'Brasília de Minas', '3108602', NULL, NULL);
INSERT INTO public.cities VALUES (1659, 13, 'Brasópolis', '3108909', NULL, NULL);
INSERT INTO public.cities VALUES (1660, 13, 'Braúnas', '3108800', NULL, NULL);
INSERT INTO public.cities VALUES (1661, 13, 'Brumadinho', '3109006', NULL, NULL);
INSERT INTO public.cities VALUES (1662, 13, 'Bueno Brandão', '3109105', NULL, NULL);
INSERT INTO public.cities VALUES (1663, 13, 'Buenópolis', '3109204', NULL, NULL);
INSERT INTO public.cities VALUES (1664, 13, 'Bugre', '3109253', NULL, NULL);
INSERT INTO public.cities VALUES (1665, 13, 'Buritis', '3109303', NULL, NULL);
INSERT INTO public.cities VALUES (1666, 13, 'Buritizeiro', '3109402', NULL, NULL);
INSERT INTO public.cities VALUES (1667, 13, 'Cabeceira Grande', '3109451', NULL, NULL);
INSERT INTO public.cities VALUES (1668, 13, 'Cabo Verde', '3109501', NULL, NULL);
INSERT INTO public.cities VALUES (1669, 13, 'Cachoeira da Prata', '3109600', NULL, NULL);
INSERT INTO public.cities VALUES (1670, 13, 'Cachoeira de Minas', '3109709', NULL, NULL);
INSERT INTO public.cities VALUES (1671, 13, 'Cachoeira de Pajeú', '3102704', NULL, NULL);
INSERT INTO public.cities VALUES (1672, 13, 'Cachoeira Dourada', '3109808', NULL, NULL);
INSERT INTO public.cities VALUES (1673, 13, 'Caetanópolis', '3109907', NULL, NULL);
INSERT INTO public.cities VALUES (1674, 13, 'Caeté', '3110004', NULL, NULL);
INSERT INTO public.cities VALUES (1675, 13, 'Caiana', '3110103', NULL, NULL);
INSERT INTO public.cities VALUES (1676, 13, 'Cajuri', '3110202', NULL, NULL);
INSERT INTO public.cities VALUES (1677, 13, 'Caldas', '3110301', NULL, NULL);
INSERT INTO public.cities VALUES (1678, 13, 'Camacho', '3110400', NULL, NULL);
INSERT INTO public.cities VALUES (1679, 13, 'Camanducaia', '3110509', NULL, NULL);
INSERT INTO public.cities VALUES (1680, 13, 'Cambuí', '3110608', NULL, NULL);
INSERT INTO public.cities VALUES (1681, 13, 'Cambuquira', '3110707', NULL, NULL);
INSERT INTO public.cities VALUES (1682, 13, 'Campanário', '3110806', NULL, NULL);
INSERT INTO public.cities VALUES (1683, 13, 'Campanha', '3110905', NULL, NULL);
INSERT INTO public.cities VALUES (1684, 13, 'Campestre', '3111002', NULL, NULL);
INSERT INTO public.cities VALUES (1685, 13, 'Campina Verde', '3111101', NULL, NULL);
INSERT INTO public.cities VALUES (1686, 13, 'Campo Azul', '3111150', NULL, NULL);
INSERT INTO public.cities VALUES (1687, 13, 'Campo Belo', '3111200', NULL, NULL);
INSERT INTO public.cities VALUES (1688, 13, 'Campo do Meio', '3111309', NULL, NULL);
INSERT INTO public.cities VALUES (1689, 13, 'Campo Florido', '3111408', NULL, NULL);
INSERT INTO public.cities VALUES (1690, 13, 'Campos Altos', '3111507', NULL, NULL);
INSERT INTO public.cities VALUES (1691, 13, 'Campos Gerais', '3111606', NULL, NULL);
INSERT INTO public.cities VALUES (1692, 13, 'Cana Verde', '3111903', NULL, NULL);
INSERT INTO public.cities VALUES (1693, 13, 'Canaã', '3111705', NULL, NULL);
INSERT INTO public.cities VALUES (1694, 13, 'Canápolis', '3111804', NULL, NULL);
INSERT INTO public.cities VALUES (1695, 13, 'Candeias', '3112000', NULL, NULL);
INSERT INTO public.cities VALUES (1696, 13, 'Cantagalo', '3112059', NULL, NULL);
INSERT INTO public.cities VALUES (1697, 13, 'Caparaó', '3112109', NULL, NULL);
INSERT INTO public.cities VALUES (1698, 13, 'Capela Nova', '3112208', NULL, NULL);
INSERT INTO public.cities VALUES (1699, 13, 'Capelinha', '3112307', NULL, NULL);
INSERT INTO public.cities VALUES (1700, 13, 'Capetinga', '3112406', NULL, NULL);
INSERT INTO public.cities VALUES (1701, 13, 'Capim Branco', '3112505', NULL, NULL);
INSERT INTO public.cities VALUES (1702, 13, 'Capinópolis', '3112604', NULL, NULL);
INSERT INTO public.cities VALUES (1703, 13, 'Capitão Andrade', '3112653', NULL, NULL);
INSERT INTO public.cities VALUES (1704, 13, 'Capitão Enéas', '3112703', NULL, NULL);
INSERT INTO public.cities VALUES (1705, 13, 'Capitólio', '3112802', NULL, NULL);
INSERT INTO public.cities VALUES (1706, 13, 'Caputira', '3112901', NULL, NULL);
INSERT INTO public.cities VALUES (1707, 13, 'Caraí', '3113008', NULL, NULL);
INSERT INTO public.cities VALUES (1708, 13, 'Caranaíba', '3113107', NULL, NULL);
INSERT INTO public.cities VALUES (1709, 13, 'Carandaí', '3113206', NULL, NULL);
INSERT INTO public.cities VALUES (1710, 13, 'Carangola', '3113305', NULL, NULL);
INSERT INTO public.cities VALUES (1711, 13, 'Caratinga', '3113404', NULL, NULL);
INSERT INTO public.cities VALUES (1712, 13, 'Carbonita', '3113503', NULL, NULL);
INSERT INTO public.cities VALUES (1713, 13, 'Careaçu', '3113602', NULL, NULL);
INSERT INTO public.cities VALUES (1714, 13, 'Carlos Chagas', '3113701', NULL, NULL);
INSERT INTO public.cities VALUES (1715, 13, 'Carmésia', '3113800', NULL, NULL);
INSERT INTO public.cities VALUES (1716, 13, 'Carmo da Cachoeira', '3113909', NULL, NULL);
INSERT INTO public.cities VALUES (1717, 13, 'Carmo da Mata', '3114006', NULL, NULL);
INSERT INTO public.cities VALUES (1718, 13, 'Carmo de Minas', '3114105', NULL, NULL);
INSERT INTO public.cities VALUES (1719, 13, 'Carmo do Cajuru', '3114204', NULL, NULL);
INSERT INTO public.cities VALUES (1720, 13, 'Carmo do Paranaíba', '3114303', NULL, NULL);
INSERT INTO public.cities VALUES (1721, 13, 'Carmo do Rio Claro', '3114402', NULL, NULL);
INSERT INTO public.cities VALUES (1722, 13, 'Carmópolis de Minas', '3114501', NULL, NULL);
INSERT INTO public.cities VALUES (1723, 13, 'Carneirinho', '3114550', NULL, NULL);
INSERT INTO public.cities VALUES (1724, 13, 'Carrancas', '3114600', NULL, NULL);
INSERT INTO public.cities VALUES (1725, 13, 'Carvalhópolis', '3114709', NULL, NULL);
INSERT INTO public.cities VALUES (1726, 13, 'Carvalhos', '3114808', NULL, NULL);
INSERT INTO public.cities VALUES (1727, 13, 'Casa Grande', '3114907', NULL, NULL);
INSERT INTO public.cities VALUES (1728, 13, 'Cascalho Rico', '3115003', NULL, NULL);
INSERT INTO public.cities VALUES (1729, 13, 'Cássia', '3115102', NULL, NULL);
INSERT INTO public.cities VALUES (1730, 13, 'Cataguases', '3115300', NULL, NULL);
INSERT INTO public.cities VALUES (1731, 13, 'Catas Altas', '3115359', NULL, NULL);
INSERT INTO public.cities VALUES (1732, 13, 'Catas Altas da Noruega', '3115409', NULL, NULL);
INSERT INTO public.cities VALUES (1733, 13, 'Catuji', '3115458', NULL, NULL);
INSERT INTO public.cities VALUES (1734, 13, 'Catuti', '3115474', NULL, NULL);
INSERT INTO public.cities VALUES (1735, 13, 'Caxambu', '3115508', NULL, NULL);
INSERT INTO public.cities VALUES (1736, 13, 'Cedro do Abaeté', '3115607', NULL, NULL);
INSERT INTO public.cities VALUES (1737, 13, 'Central de Minas', '3115706', NULL, NULL);
INSERT INTO public.cities VALUES (1738, 13, 'Centralina', '3115805', NULL, NULL);
INSERT INTO public.cities VALUES (1739, 13, 'Chácara', '3115904', NULL, NULL);
INSERT INTO public.cities VALUES (1740, 13, 'Chalé', '3116001', NULL, NULL);
INSERT INTO public.cities VALUES (1741, 13, 'Chapada do Norte', '3116100', NULL, NULL);
INSERT INTO public.cities VALUES (1742, 13, 'Chapada Gaúcha', '3116159', NULL, NULL);
INSERT INTO public.cities VALUES (1743, 13, 'Chiador', '3116209', NULL, NULL);
INSERT INTO public.cities VALUES (1744, 13, 'Cipotânea', '3116308', NULL, NULL);
INSERT INTO public.cities VALUES (1745, 13, 'Claraval', '3116407', NULL, NULL);
INSERT INTO public.cities VALUES (1746, 13, 'Claro dos Poções', '3116506', NULL, NULL);
INSERT INTO public.cities VALUES (1747, 13, 'Cláudio', '3116605', NULL, NULL);
INSERT INTO public.cities VALUES (1748, 13, 'Coimbra', '3116704', NULL, NULL);
INSERT INTO public.cities VALUES (1749, 13, 'Coluna', '3116803', NULL, NULL);
INSERT INTO public.cities VALUES (1750, 13, 'Comendador Gomes', '3116902', NULL, NULL);
INSERT INTO public.cities VALUES (1751, 13, 'Comercinho', '3117009', NULL, NULL);
INSERT INTO public.cities VALUES (1752, 13, 'Conceição da Aparecida', '3117108', NULL, NULL);
INSERT INTO public.cities VALUES (1753, 13, 'Conceição da Barra de Minas', '3115201', NULL, NULL);
INSERT INTO public.cities VALUES (1754, 13, 'Conceição das Alagoas', '3117306', NULL, NULL);
INSERT INTO public.cities VALUES (1755, 13, 'Conceição das Pedras', '3117207', NULL, NULL);
INSERT INTO public.cities VALUES (1756, 13, 'Conceição de Ipanema', '3117405', NULL, NULL);
INSERT INTO public.cities VALUES (1757, 13, 'Conceição do Mato Dentro', '3117504', NULL, NULL);
INSERT INTO public.cities VALUES (1758, 13, 'Conceição do Pará', '3117603', NULL, NULL);
INSERT INTO public.cities VALUES (1759, 13, 'Conceição do Rio Verde', '3117702', NULL, NULL);
INSERT INTO public.cities VALUES (1760, 13, 'Conceição dos Ouros', '3117801', NULL, NULL);
INSERT INTO public.cities VALUES (1761, 13, 'Cônego Marinho', '3117836', NULL, NULL);
INSERT INTO public.cities VALUES (1762, 13, 'Confins', '3117876', NULL, NULL);
INSERT INTO public.cities VALUES (1763, 13, 'Congonhal', '3117900', NULL, NULL);
INSERT INTO public.cities VALUES (1764, 13, 'Congonhas', '3118007', NULL, NULL);
INSERT INTO public.cities VALUES (1765, 13, 'Congonhas do Norte', '3118106', NULL, NULL);
INSERT INTO public.cities VALUES (1766, 13, 'Conquista', '3118205', NULL, NULL);
INSERT INTO public.cities VALUES (1767, 13, 'Conselheiro Lafaiete', '3118304', NULL, NULL);
INSERT INTO public.cities VALUES (1768, 13, 'Conselheiro Pena', '3118403', NULL, NULL);
INSERT INTO public.cities VALUES (1769, 13, 'Consolação', '3118502', NULL, NULL);
INSERT INTO public.cities VALUES (1770, 13, 'Contagem', '3118601', NULL, NULL);
INSERT INTO public.cities VALUES (1771, 13, 'Coqueiral', '3118700', NULL, NULL);
INSERT INTO public.cities VALUES (1772, 13, 'Coração de Jesus', '3118809', NULL, NULL);
INSERT INTO public.cities VALUES (1773, 13, 'Cordisburgo', '3118908', NULL, NULL);
INSERT INTO public.cities VALUES (1774, 13, 'Cordislândia', '3119005', NULL, NULL);
INSERT INTO public.cities VALUES (1775, 13, 'Corinto', '3119104', NULL, NULL);
INSERT INTO public.cities VALUES (1776, 13, 'Coroaci', '3119203', NULL, NULL);
INSERT INTO public.cities VALUES (1777, 13, 'Coromandel', '3119302', NULL, NULL);
INSERT INTO public.cities VALUES (1778, 13, 'Coronel Fabriciano', '3119401', NULL, NULL);
INSERT INTO public.cities VALUES (1779, 13, 'Coronel Murta', '3119500', NULL, NULL);
INSERT INTO public.cities VALUES (1780, 13, 'Coronel Pacheco', '3119609', NULL, NULL);
INSERT INTO public.cities VALUES (1781, 13, 'Coronel Xavier Chaves', '3119708', NULL, NULL);
INSERT INTO public.cities VALUES (1782, 13, 'Córrego Danta', '3119807', NULL, NULL);
INSERT INTO public.cities VALUES (1783, 13, 'Córrego do Bom Jesus', '3119906', NULL, NULL);
INSERT INTO public.cities VALUES (1784, 13, 'Córrego Fundo', '3119955', NULL, NULL);
INSERT INTO public.cities VALUES (1785, 13, 'Córrego Novo', '3120003', NULL, NULL);
INSERT INTO public.cities VALUES (1786, 13, 'Couto de Magalhães de Minas', '3120102', NULL, NULL);
INSERT INTO public.cities VALUES (1787, 13, 'Crisólita', '3120151', NULL, NULL);
INSERT INTO public.cities VALUES (1788, 13, 'Cristais', '3120201', NULL, NULL);
INSERT INTO public.cities VALUES (1789, 13, 'Cristália', '3120300', NULL, NULL);
INSERT INTO public.cities VALUES (1790, 13, 'Cristiano Otoni', '3120409', NULL, NULL);
INSERT INTO public.cities VALUES (1791, 13, 'Cristina', '3120508', NULL, NULL);
INSERT INTO public.cities VALUES (1792, 13, 'Crucilândia', '3120607', NULL, NULL);
INSERT INTO public.cities VALUES (1793, 13, 'Cruzeiro da Fortaleza', '3120706', NULL, NULL);
INSERT INTO public.cities VALUES (1794, 13, 'Cruzília', '3120805', NULL, NULL);
INSERT INTO public.cities VALUES (1795, 13, 'Cuparaque', '3120839', NULL, NULL);
INSERT INTO public.cities VALUES (1796, 13, 'Curral de Dentro', '3120870', NULL, NULL);
INSERT INTO public.cities VALUES (1797, 13, 'Curvelo', '3120904', NULL, NULL);
INSERT INTO public.cities VALUES (1798, 13, 'Datas', '3121001', NULL, NULL);
INSERT INTO public.cities VALUES (1799, 13, 'Delfim Moreira', '3121100', NULL, NULL);
INSERT INTO public.cities VALUES (1800, 13, 'Delfinópolis', '3121209', NULL, NULL);
INSERT INTO public.cities VALUES (1801, 13, 'Delta', '3121258', NULL, NULL);
INSERT INTO public.cities VALUES (1802, 13, 'Descoberto', '3121308', NULL, NULL);
INSERT INTO public.cities VALUES (1803, 13, 'Desterro de Entre Rios', '3121407', NULL, NULL);
INSERT INTO public.cities VALUES (1804, 13, 'Desterro do Melo', '3121506', NULL, NULL);
INSERT INTO public.cities VALUES (1805, 13, 'Diamantina', '3121605', NULL, NULL);
INSERT INTO public.cities VALUES (1806, 13, 'Diogo de Vasconcelos', '3121704', NULL, NULL);
INSERT INTO public.cities VALUES (1807, 13, 'Dionísio', '3121803', NULL, NULL);
INSERT INTO public.cities VALUES (1808, 13, 'Divinésia', '3121902', NULL, NULL);
INSERT INTO public.cities VALUES (1809, 13, 'Divino', '3122009', NULL, NULL);
INSERT INTO public.cities VALUES (1810, 13, 'Divino das Laranjeiras', '3122108', NULL, NULL);
INSERT INTO public.cities VALUES (1811, 13, 'Divinolândia de Minas', '3122207', NULL, NULL);
INSERT INTO public.cities VALUES (1812, 13, 'Divinópolis', '3122306', NULL, NULL);
INSERT INTO public.cities VALUES (1813, 13, 'Divisa Alegre', '3122355', NULL, NULL);
INSERT INTO public.cities VALUES (1814, 13, 'Divisa Nova', '3122405', NULL, NULL);
INSERT INTO public.cities VALUES (1815, 13, 'Divisópolis', '3122454', NULL, NULL);
INSERT INTO public.cities VALUES (1816, 13, 'Dom Bosco', '3122470', NULL, NULL);
INSERT INTO public.cities VALUES (1817, 13, 'Dom Cavati', '3122504', NULL, NULL);
INSERT INTO public.cities VALUES (1818, 13, 'Dom Joaquim', '3122603', NULL, NULL);
INSERT INTO public.cities VALUES (1819, 13, 'Dom Silvério', '3122702', NULL, NULL);
INSERT INTO public.cities VALUES (1820, 13, 'Dom Viçoso', '3122801', NULL, NULL);
INSERT INTO public.cities VALUES (1821, 13, 'Dona Eusébia', '3122900', NULL, NULL);
INSERT INTO public.cities VALUES (1822, 13, 'Dores de Campos', '3123007', NULL, NULL);
INSERT INTO public.cities VALUES (1823, 13, 'Dores de Guanhães', '3123106', NULL, NULL);
INSERT INTO public.cities VALUES (1824, 13, 'Dores do Indaiá', '3123205', NULL, NULL);
INSERT INTO public.cities VALUES (1825, 13, 'Dores do Turvo', '3123304', NULL, NULL);
INSERT INTO public.cities VALUES (1826, 13, 'Doresópolis', '3123403', NULL, NULL);
INSERT INTO public.cities VALUES (1827, 13, 'Douradoquara', '3123502', NULL, NULL);
INSERT INTO public.cities VALUES (1828, 13, 'Durandé', '3123528', NULL, NULL);
INSERT INTO public.cities VALUES (1829, 13, 'Elói Mendes', '3123601', NULL, NULL);
INSERT INTO public.cities VALUES (1830, 13, 'Engenheiro Caldas', '3123700', NULL, NULL);
INSERT INTO public.cities VALUES (1831, 13, 'Engenheiro Navarro', '3123809', NULL, NULL);
INSERT INTO public.cities VALUES (1832, 13, 'Entre Folhas', '3123858', NULL, NULL);
INSERT INTO public.cities VALUES (1833, 13, 'Entre Rios de Minas', '3123908', NULL, NULL);
INSERT INTO public.cities VALUES (1834, 13, 'Ervália', '3124005', NULL, NULL);
INSERT INTO public.cities VALUES (1835, 13, 'Esmeraldas', '3124104', NULL, NULL);
INSERT INTO public.cities VALUES (1836, 13, 'Espera Feliz', '3124203', NULL, NULL);
INSERT INTO public.cities VALUES (1837, 13, 'Espinosa', '3124302', NULL, NULL);
INSERT INTO public.cities VALUES (1838, 13, 'Espírito Santo do Dourado', '3124401', NULL, NULL);
INSERT INTO public.cities VALUES (1839, 13, 'Estiva', '3124500', NULL, NULL);
INSERT INTO public.cities VALUES (1840, 13, 'Estrela Dalva', '3124609', NULL, NULL);
INSERT INTO public.cities VALUES (1841, 13, 'Estrela do Indaiá', '3124708', NULL, NULL);
INSERT INTO public.cities VALUES (1842, 13, 'Estrela do Sul', '3124807', NULL, NULL);
INSERT INTO public.cities VALUES (1843, 13, 'Eugenópolis', '3124906', NULL, NULL);
INSERT INTO public.cities VALUES (1844, 13, 'Ewbank da Câmara', '3125002', NULL, NULL);
INSERT INTO public.cities VALUES (1845, 13, 'Extrema', '3125101', NULL, NULL);
INSERT INTO public.cities VALUES (1846, 13, 'Fama', '3125200', NULL, NULL);
INSERT INTO public.cities VALUES (1847, 13, 'Faria Lemos', '3125309', NULL, NULL);
INSERT INTO public.cities VALUES (1848, 13, 'Felício dos Santos', '3125408', NULL, NULL);
INSERT INTO public.cities VALUES (1849, 13, 'Felisburgo', '3125606', NULL, NULL);
INSERT INTO public.cities VALUES (1850, 13, 'Felixlândia', '3125705', NULL, NULL);
INSERT INTO public.cities VALUES (1851, 13, 'Fernandes Tourinho', '3125804', NULL, NULL);
INSERT INTO public.cities VALUES (1852, 13, 'Ferros', '3125903', NULL, NULL);
INSERT INTO public.cities VALUES (1853, 13, 'Fervedouro', '3125952', NULL, NULL);
INSERT INTO public.cities VALUES (1854, 13, 'Florestal', '3126000', NULL, NULL);
INSERT INTO public.cities VALUES (1855, 13, 'Formiga', '3126109', NULL, NULL);
INSERT INTO public.cities VALUES (1856, 13, 'Formoso', '3126208', NULL, NULL);
INSERT INTO public.cities VALUES (1857, 13, 'Fortaleza de Minas', '3126307', NULL, NULL);
INSERT INTO public.cities VALUES (1858, 13, 'Fortuna de Minas', '3126406', NULL, NULL);
INSERT INTO public.cities VALUES (1859, 13, 'Francisco Badaró', '3126505', NULL, NULL);
INSERT INTO public.cities VALUES (1860, 13, 'Francisco Dumont', '3126604', NULL, NULL);
INSERT INTO public.cities VALUES (1861, 13, 'Francisco Sá', '3126703', NULL, NULL);
INSERT INTO public.cities VALUES (1862, 13, 'Franciscópolis', '3126752', NULL, NULL);
INSERT INTO public.cities VALUES (1863, 13, 'Frei Gaspar', '3126802', NULL, NULL);
INSERT INTO public.cities VALUES (1864, 13, 'Frei Inocêncio', '3126901', NULL, NULL);
INSERT INTO public.cities VALUES (1865, 13, 'Frei Lagonegro', '3126950', NULL, NULL);
INSERT INTO public.cities VALUES (1866, 13, 'Fronteira', '3127008', NULL, NULL);
INSERT INTO public.cities VALUES (1867, 13, 'Fronteira dos Vales', '3127057', NULL, NULL);
INSERT INTO public.cities VALUES (1868, 13, 'Fruta de Leite', '3127073', NULL, NULL);
INSERT INTO public.cities VALUES (1869, 13, 'Frutal', '3127107', NULL, NULL);
INSERT INTO public.cities VALUES (1870, 13, 'Funilândia', '3127206', NULL, NULL);
INSERT INTO public.cities VALUES (1871, 13, 'Galiléia', '3127305', NULL, NULL);
INSERT INTO public.cities VALUES (1872, 13, 'Gameleiras', '3127339', NULL, NULL);
INSERT INTO public.cities VALUES (1873, 13, 'Glaucilândia', '3127354', NULL, NULL);
INSERT INTO public.cities VALUES (1874, 13, 'Goiabeira', '3127370', NULL, NULL);
INSERT INTO public.cities VALUES (1875, 13, 'Goianá', '3127388', NULL, NULL);
INSERT INTO public.cities VALUES (1876, 13, 'Gonçalves', '3127404', NULL, NULL);
INSERT INTO public.cities VALUES (1877, 13, 'Gonzaga', '3127503', NULL, NULL);
INSERT INTO public.cities VALUES (1878, 13, 'Gouveia', '3127602', NULL, NULL);
INSERT INTO public.cities VALUES (1879, 13, 'Governador Valadares', '3127701', NULL, NULL);
INSERT INTO public.cities VALUES (1880, 13, 'Grão Mogol', '3127800', NULL, NULL);
INSERT INTO public.cities VALUES (1881, 13, 'Grupiara', '3127909', NULL, NULL);
INSERT INTO public.cities VALUES (1882, 13, 'Guanhães', '3128006', NULL, NULL);
INSERT INTO public.cities VALUES (1883, 13, 'Guapé', '3128105', NULL, NULL);
INSERT INTO public.cities VALUES (1884, 13, 'Guaraciaba', '3128204', NULL, NULL);
INSERT INTO public.cities VALUES (1885, 13, 'Guaraciama', '3128253', NULL, NULL);
INSERT INTO public.cities VALUES (1886, 13, 'Guaranésia', '3128303', NULL, NULL);
INSERT INTO public.cities VALUES (1887, 13, 'Guarani', '3128402', NULL, NULL);
INSERT INTO public.cities VALUES (1888, 13, 'Guarará', '3128501', NULL, NULL);
INSERT INTO public.cities VALUES (1889, 13, 'Guarda-Mor', '3128600', NULL, NULL);
INSERT INTO public.cities VALUES (1890, 13, 'Guaxupé', '3128709', NULL, NULL);
INSERT INTO public.cities VALUES (1891, 13, 'Guidoval', '3128808', NULL, NULL);
INSERT INTO public.cities VALUES (1892, 13, 'Guimarânia', '3128907', NULL, NULL);
INSERT INTO public.cities VALUES (1893, 13, 'Guiricema', '3129004', NULL, NULL);
INSERT INTO public.cities VALUES (1894, 13, 'Gurinhatã', '3129103', NULL, NULL);
INSERT INTO public.cities VALUES (1895, 13, 'Heliodora', '3129202', NULL, NULL);
INSERT INTO public.cities VALUES (1896, 13, 'Iapu', '3129301', NULL, NULL);
INSERT INTO public.cities VALUES (1897, 13, 'Ibertioga', '3129400', NULL, NULL);
INSERT INTO public.cities VALUES (1898, 13, 'Ibiá', '3129509', NULL, NULL);
INSERT INTO public.cities VALUES (1899, 13, 'Ibiaí', '3129608', NULL, NULL);
INSERT INTO public.cities VALUES (1900, 13, 'Ibiracatu', '3129657', NULL, NULL);
INSERT INTO public.cities VALUES (1901, 13, 'Ibiraci', '3129707', NULL, NULL);
INSERT INTO public.cities VALUES (1902, 13, 'Ibirité', '3129806', NULL, NULL);
INSERT INTO public.cities VALUES (1903, 13, 'Ibitiúra de Minas', '3129905', NULL, NULL);
INSERT INTO public.cities VALUES (1904, 13, 'Ibituruna', '3130002', NULL, NULL);
INSERT INTO public.cities VALUES (1905, 13, 'Icaraí de Minas', '3130051', NULL, NULL);
INSERT INTO public.cities VALUES (1906, 13, 'Igarapé', '3130101', NULL, NULL);
INSERT INTO public.cities VALUES (1907, 13, 'Igaratinga', '3130200', NULL, NULL);
INSERT INTO public.cities VALUES (1908, 13, 'Iguatama', '3130309', NULL, NULL);
INSERT INTO public.cities VALUES (1909, 13, 'Ijaci', '3130408', NULL, NULL);
INSERT INTO public.cities VALUES (1910, 13, 'Ilicínea', '3130507', NULL, NULL);
INSERT INTO public.cities VALUES (1911, 13, 'Imbé de Minas', '3130556', NULL, NULL);
INSERT INTO public.cities VALUES (1912, 13, 'Inconfidentes', '3130606', NULL, NULL);
INSERT INTO public.cities VALUES (1913, 13, 'Indaiabira', '3130655', NULL, NULL);
INSERT INTO public.cities VALUES (1914, 13, 'Indianópolis', '3130705', NULL, NULL);
INSERT INTO public.cities VALUES (1915, 13, 'Ingaí', '3130804', NULL, NULL);
INSERT INTO public.cities VALUES (1916, 13, 'Inhapim', '3130903', NULL, NULL);
INSERT INTO public.cities VALUES (1917, 13, 'Inhaúma', '3131000', NULL, NULL);
INSERT INTO public.cities VALUES (1918, 13, 'Inimutaba', '3131109', NULL, NULL);
INSERT INTO public.cities VALUES (1919, 13, 'Ipaba', '3131158', NULL, NULL);
INSERT INTO public.cities VALUES (1920, 13, 'Ipanema', '3131208', NULL, NULL);
INSERT INTO public.cities VALUES (1921, 13, 'Ipatinga', '3131307', NULL, NULL);
INSERT INTO public.cities VALUES (1922, 13, 'Ipiaçu', '3131406', NULL, NULL);
INSERT INTO public.cities VALUES (1923, 13, 'Ipuiúna', '3131505', NULL, NULL);
INSERT INTO public.cities VALUES (1924, 13, 'Iraí de Minas', '3131604', NULL, NULL);
INSERT INTO public.cities VALUES (1925, 13, 'Itabira', '3131703', NULL, NULL);
INSERT INTO public.cities VALUES (1926, 13, 'Itabirinha', '3131802', NULL, NULL);
INSERT INTO public.cities VALUES (1927, 13, 'Itabirito', '3131901', NULL, NULL);
INSERT INTO public.cities VALUES (1928, 13, 'Itacambira', '3132008', NULL, NULL);
INSERT INTO public.cities VALUES (1929, 13, 'Itacarambi', '3132107', NULL, NULL);
INSERT INTO public.cities VALUES (1930, 13, 'Itaguara', '3132206', NULL, NULL);
INSERT INTO public.cities VALUES (1931, 13, 'Itaipé', '3132305', NULL, NULL);
INSERT INTO public.cities VALUES (1932, 13, 'Itajubá', '3132404', NULL, NULL);
INSERT INTO public.cities VALUES (1933, 13, 'Itamarandiba', '3132503', NULL, NULL);
INSERT INTO public.cities VALUES (1934, 13, 'Itamarati de Minas', '3132602', NULL, NULL);
INSERT INTO public.cities VALUES (1935, 13, 'Itambacuri', '3132701', NULL, NULL);
INSERT INTO public.cities VALUES (1936, 13, 'Itambé do Mato Dentro', '3132800', NULL, NULL);
INSERT INTO public.cities VALUES (1937, 13, 'Itamogi', '3132909', NULL, NULL);
INSERT INTO public.cities VALUES (1938, 13, 'Itamonte', '3133006', NULL, NULL);
INSERT INTO public.cities VALUES (1939, 13, 'Itanhandu', '3133105', NULL, NULL);
INSERT INTO public.cities VALUES (1940, 13, 'Itanhomi', '3133204', NULL, NULL);
INSERT INTO public.cities VALUES (1941, 13, 'Itaobim', '3133303', NULL, NULL);
INSERT INTO public.cities VALUES (1942, 13, 'Itapagipe', '3133402', NULL, NULL);
INSERT INTO public.cities VALUES (1943, 13, 'Itapecerica', '3133501', NULL, NULL);
INSERT INTO public.cities VALUES (1944, 13, 'Itapeva', '3133600', NULL, NULL);
INSERT INTO public.cities VALUES (1945, 13, 'Itatiaiuçu', '3133709', NULL, NULL);
INSERT INTO public.cities VALUES (1946, 13, 'Itaú de Minas', '3133758', NULL, NULL);
INSERT INTO public.cities VALUES (1947, 13, 'Itaúna', '3133808', NULL, NULL);
INSERT INTO public.cities VALUES (1948, 13, 'Itaverava', '3133907', NULL, NULL);
INSERT INTO public.cities VALUES (1949, 13, 'Itinga', '3134004', NULL, NULL);
INSERT INTO public.cities VALUES (1950, 13, 'Itueta', '3134103', NULL, NULL);
INSERT INTO public.cities VALUES (1951, 13, 'Ituiutaba', '3134202', NULL, NULL);
INSERT INTO public.cities VALUES (1952, 13, 'Itumirim', '3134301', NULL, NULL);
INSERT INTO public.cities VALUES (1953, 13, 'Iturama', '3134400', NULL, NULL);
INSERT INTO public.cities VALUES (1954, 13, 'Itutinga', '3134509', NULL, NULL);
INSERT INTO public.cities VALUES (1955, 13, 'Jaboticatubas', '3134608', NULL, NULL);
INSERT INTO public.cities VALUES (1956, 13, 'Jacinto', '3134707', NULL, NULL);
INSERT INTO public.cities VALUES (1957, 13, 'Jacuí', '3134806', NULL, NULL);
INSERT INTO public.cities VALUES (1958, 13, 'Jacutinga', '3134905', NULL, NULL);
INSERT INTO public.cities VALUES (1959, 13, 'Jaguaraçu', '3135001', NULL, NULL);
INSERT INTO public.cities VALUES (1960, 13, 'Jaíba', '3135050', NULL, NULL);
INSERT INTO public.cities VALUES (1961, 13, 'Jampruca', '3135076', NULL, NULL);
INSERT INTO public.cities VALUES (1962, 13, 'Janaúba', '3135100', NULL, NULL);
INSERT INTO public.cities VALUES (1963, 13, 'Januária', '3135209', NULL, NULL);
INSERT INTO public.cities VALUES (1964, 13, 'Japaraíba', '3135308', NULL, NULL);
INSERT INTO public.cities VALUES (1965, 13, 'Japonvar', '3135357', NULL, NULL);
INSERT INTO public.cities VALUES (1966, 13, 'Jeceaba', '3135407', NULL, NULL);
INSERT INTO public.cities VALUES (1967, 13, 'Jenipapo de Minas', '3135456', NULL, NULL);
INSERT INTO public.cities VALUES (1968, 13, 'Jequeri', '3135506', NULL, NULL);
INSERT INTO public.cities VALUES (1969, 13, 'Jequitaí', '3135605', NULL, NULL);
INSERT INTO public.cities VALUES (1970, 13, 'Jequitibá', '3135704', NULL, NULL);
INSERT INTO public.cities VALUES (1971, 13, 'Jequitinhonha', '3135803', NULL, NULL);
INSERT INTO public.cities VALUES (1972, 13, 'Jesuânia', '3135902', NULL, NULL);
INSERT INTO public.cities VALUES (1973, 13, 'Joaíma', '3136009', NULL, NULL);
INSERT INTO public.cities VALUES (1974, 13, 'Joanésia', '3136108', NULL, NULL);
INSERT INTO public.cities VALUES (1975, 13, 'João Monlevade', '3136207', NULL, NULL);
INSERT INTO public.cities VALUES (1976, 13, 'João Pinheiro', '3136306', NULL, NULL);
INSERT INTO public.cities VALUES (1977, 13, 'Joaquim Felício', '3136405', NULL, NULL);
INSERT INTO public.cities VALUES (1978, 13, 'Jordânia', '3136504', NULL, NULL);
INSERT INTO public.cities VALUES (1979, 13, 'José Gonçalves de Minas', '3136520', NULL, NULL);
INSERT INTO public.cities VALUES (1980, 13, 'José Raydan', '3136553', NULL, NULL);
INSERT INTO public.cities VALUES (1981, 13, 'Josenópolis', '3136579', NULL, NULL);
INSERT INTO public.cities VALUES (1982, 13, 'Juatuba', '3136652', NULL, NULL);
INSERT INTO public.cities VALUES (1983, 13, 'Juiz de Fora', '3136702', NULL, NULL);
INSERT INTO public.cities VALUES (1984, 13, 'Juramento', '3136801', NULL, NULL);
INSERT INTO public.cities VALUES (1985, 13, 'Juruaia', '3136900', NULL, NULL);
INSERT INTO public.cities VALUES (1986, 13, 'Juvenília', '3136959', NULL, NULL);
INSERT INTO public.cities VALUES (1987, 13, 'Ladainha', '3137007', NULL, NULL);
INSERT INTO public.cities VALUES (1988, 13, 'Lagamar', '3137106', NULL, NULL);
INSERT INTO public.cities VALUES (1989, 13, 'Lagoa da Prata', '3137205', NULL, NULL);
INSERT INTO public.cities VALUES (1990, 13, 'Lagoa dos Patos', '3137304', NULL, NULL);
INSERT INTO public.cities VALUES (1991, 13, 'Lagoa Dourada', '3137403', NULL, NULL);
INSERT INTO public.cities VALUES (1992, 13, 'Lagoa Formosa', '3137502', NULL, NULL);
INSERT INTO public.cities VALUES (1993, 13, 'Lagoa Grande', '3137536', NULL, NULL);
INSERT INTO public.cities VALUES (1994, 13, 'Lagoa Santa', '3137601', NULL, NULL);
INSERT INTO public.cities VALUES (1995, 13, 'Lajinha', '3137700', NULL, NULL);
INSERT INTO public.cities VALUES (1996, 13, 'Lambari', '3137809', NULL, NULL);
INSERT INTO public.cities VALUES (1997, 13, 'Lamim', '3137908', NULL, NULL);
INSERT INTO public.cities VALUES (1998, 13, 'Laranjal', '3138005', NULL, NULL);
INSERT INTO public.cities VALUES (1999, 13, 'Lassance', '3138104', NULL, NULL);
INSERT INTO public.cities VALUES (2000, 13, 'Lavras', '3138203', NULL, NULL);
INSERT INTO public.cities VALUES (2001, 13, 'Leandro Ferreira', '3138302', NULL, NULL);
INSERT INTO public.cities VALUES (2002, 13, 'Leme do Prado', '3138351', NULL, NULL);
INSERT INTO public.cities VALUES (2003, 13, 'Leopoldina', '3138401', NULL, NULL);
INSERT INTO public.cities VALUES (2004, 13, 'Liberdade', '3138500', NULL, NULL);
INSERT INTO public.cities VALUES (2005, 13, 'Lima Duarte', '3138609', NULL, NULL);
INSERT INTO public.cities VALUES (2006, 13, 'Limeira do Oeste', '3138625', NULL, NULL);
INSERT INTO public.cities VALUES (2007, 13, 'Lontra', '3138658', NULL, NULL);
INSERT INTO public.cities VALUES (2008, 13, 'Luisburgo', '3138674', NULL, NULL);
INSERT INTO public.cities VALUES (2009, 13, 'Luislândia', '3138682', NULL, NULL);
INSERT INTO public.cities VALUES (2010, 13, 'Luminárias', '3138708', NULL, NULL);
INSERT INTO public.cities VALUES (2011, 13, 'Luz', '3138807', NULL, NULL);
INSERT INTO public.cities VALUES (2012, 13, 'Machacalis', '3138906', NULL, NULL);
INSERT INTO public.cities VALUES (2013, 13, 'Machado', '3139003', NULL, NULL);
INSERT INTO public.cities VALUES (2014, 13, 'Madre de Deus de Minas', '3139102', NULL, NULL);
INSERT INTO public.cities VALUES (2015, 13, 'Malacacheta', '3139201', NULL, NULL);
INSERT INTO public.cities VALUES (2016, 13, 'Mamonas', '3139250', NULL, NULL);
INSERT INTO public.cities VALUES (2017, 13, 'Manga', '3139300', NULL, NULL);
INSERT INTO public.cities VALUES (2018, 13, 'Manhuaçu', '3139409', NULL, NULL);
INSERT INTO public.cities VALUES (2019, 13, 'Manhumirim', '3139508', NULL, NULL);
INSERT INTO public.cities VALUES (2020, 13, 'Mantena', '3139607', NULL, NULL);
INSERT INTO public.cities VALUES (2021, 13, 'Mar de Espanha', '3139805', NULL, NULL);
INSERT INTO public.cities VALUES (2022, 13, 'Maravilhas', '3139706', NULL, NULL);
INSERT INTO public.cities VALUES (2023, 13, 'Maria da Fé', '3139904', NULL, NULL);
INSERT INTO public.cities VALUES (2024, 13, 'Mariana', '3140001', NULL, NULL);
INSERT INTO public.cities VALUES (2025, 13, 'Marilac', '3140100', NULL, NULL);
INSERT INTO public.cities VALUES (2026, 13, 'Mário Campos', '3140159', NULL, NULL);
INSERT INTO public.cities VALUES (2027, 13, 'Maripá de Minas', '3140209', NULL, NULL);
INSERT INTO public.cities VALUES (2028, 13, 'Marliéria', '3140308', NULL, NULL);
INSERT INTO public.cities VALUES (2029, 13, 'Marmelópolis', '3140407', NULL, NULL);
INSERT INTO public.cities VALUES (2030, 13, 'Martinho Campos', '3140506', NULL, NULL);
INSERT INTO public.cities VALUES (2031, 13, 'Martins Soares', '3140530', NULL, NULL);
INSERT INTO public.cities VALUES (2032, 13, 'Mata Verde', '3140555', NULL, NULL);
INSERT INTO public.cities VALUES (2033, 13, 'Materlândia', '3140605', NULL, NULL);
INSERT INTO public.cities VALUES (2034, 13, 'Mateus Leme', '3140704', NULL, NULL);
INSERT INTO public.cities VALUES (2035, 13, 'Mathias Lobato', '3171501', NULL, NULL);
INSERT INTO public.cities VALUES (2036, 13, 'Matias Barbosa', '3140803', NULL, NULL);
INSERT INTO public.cities VALUES (2037, 13, 'Matias Cardoso', '3140852', NULL, NULL);
INSERT INTO public.cities VALUES (2038, 13, 'Matipó', '3140902', NULL, NULL);
INSERT INTO public.cities VALUES (2039, 13, 'Mato Verde', '3141009', NULL, NULL);
INSERT INTO public.cities VALUES (2040, 13, 'Matozinhos', '3141108', NULL, NULL);
INSERT INTO public.cities VALUES (2041, 13, 'Matutina', '3141207', NULL, NULL);
INSERT INTO public.cities VALUES (2042, 13, 'Medeiros', '3141306', NULL, NULL);
INSERT INTO public.cities VALUES (2043, 13, 'Medina', '3141405', NULL, NULL);
INSERT INTO public.cities VALUES (2044, 13, 'Mendes Pimentel', '3141504', NULL, NULL);
INSERT INTO public.cities VALUES (2045, 13, 'Mercês', '3141603', NULL, NULL);
INSERT INTO public.cities VALUES (2046, 13, 'Mesquita', '3141702', NULL, NULL);
INSERT INTO public.cities VALUES (2047, 13, 'Minas Novas', '3141801', NULL, NULL);
INSERT INTO public.cities VALUES (2048, 13, 'Minduri', '3141900', NULL, NULL);
INSERT INTO public.cities VALUES (2049, 13, 'Mirabela', '3142007', NULL, NULL);
INSERT INTO public.cities VALUES (2050, 13, 'Miradouro', '3142106', NULL, NULL);
INSERT INTO public.cities VALUES (2051, 13, 'Miraí', '3142205', NULL, NULL);
INSERT INTO public.cities VALUES (2052, 13, 'Miravânia', '3142254', NULL, NULL);
INSERT INTO public.cities VALUES (2053, 13, 'Moeda', '3142304', NULL, NULL);
INSERT INTO public.cities VALUES (2054, 13, 'Moema', '3142403', NULL, NULL);
INSERT INTO public.cities VALUES (2055, 13, 'Monjolos', '3142502', NULL, NULL);
INSERT INTO public.cities VALUES (2056, 13, 'Monsenhor Paulo', '3142601', NULL, NULL);
INSERT INTO public.cities VALUES (2057, 13, 'Montalvânia', '3142700', NULL, NULL);
INSERT INTO public.cities VALUES (2058, 13, 'Monte Alegre de Minas', '3142809', NULL, NULL);
INSERT INTO public.cities VALUES (2059, 13, 'Monte Azul', '3142908', NULL, NULL);
INSERT INTO public.cities VALUES (2060, 13, 'Monte Belo', '3143005', NULL, NULL);
INSERT INTO public.cities VALUES (2061, 13, 'Monte Carmelo', '3143104', NULL, NULL);
INSERT INTO public.cities VALUES (2062, 13, 'Monte Formoso', '3143153', NULL, NULL);
INSERT INTO public.cities VALUES (2063, 13, 'Monte Santo de Minas', '3143203', NULL, NULL);
INSERT INTO public.cities VALUES (2064, 13, 'Monte Sião', '3143401', NULL, NULL);
INSERT INTO public.cities VALUES (2065, 13, 'Montes Claros', '3143302', NULL, NULL);
INSERT INTO public.cities VALUES (2066, 13, 'Montezuma', '3143450', NULL, NULL);
INSERT INTO public.cities VALUES (2067, 13, 'Morada Nova de Minas', '3143500', NULL, NULL);
INSERT INTO public.cities VALUES (2068, 13, 'Morro da Garça', '3143609', NULL, NULL);
INSERT INTO public.cities VALUES (2069, 13, 'Morro do Pilar', '3143708', NULL, NULL);
INSERT INTO public.cities VALUES (2070, 13, 'Munhoz', '3143807', NULL, NULL);
INSERT INTO public.cities VALUES (2071, 13, 'Muriaé', '3143906', NULL, NULL);
INSERT INTO public.cities VALUES (2072, 13, 'Mutum', '3144003', NULL, NULL);
INSERT INTO public.cities VALUES (2073, 13, 'Muzambinho', '3144102', NULL, NULL);
INSERT INTO public.cities VALUES (2074, 13, 'Nacip Raydan', '3144201', NULL, NULL);
INSERT INTO public.cities VALUES (2075, 13, 'Nanuque', '3144300', NULL, NULL);
INSERT INTO public.cities VALUES (2076, 13, 'Naque', '3144359', NULL, NULL);
INSERT INTO public.cities VALUES (2077, 13, 'Natalândia', '3144375', NULL, NULL);
INSERT INTO public.cities VALUES (2078, 13, 'Natércia', '3144409', NULL, NULL);
INSERT INTO public.cities VALUES (2079, 13, 'Nazareno', '3144508', NULL, NULL);
INSERT INTO public.cities VALUES (2080, 13, 'Nepomuceno', '3144607', NULL, NULL);
INSERT INTO public.cities VALUES (2081, 13, 'Ninheira', '3144656', NULL, NULL);
INSERT INTO public.cities VALUES (2082, 13, 'Nova Belém', '3144672', NULL, NULL);
INSERT INTO public.cities VALUES (2083, 13, 'Nova Era', '3144706', NULL, NULL);
INSERT INTO public.cities VALUES (2084, 13, 'Nova Lima', '3144805', NULL, NULL);
INSERT INTO public.cities VALUES (2085, 13, 'Nova Módica', '3144904', NULL, NULL);
INSERT INTO public.cities VALUES (2086, 13, 'Nova Ponte', '3145000', NULL, NULL);
INSERT INTO public.cities VALUES (2087, 13, 'Nova Porteirinha', '3145059', NULL, NULL);
INSERT INTO public.cities VALUES (2088, 13, 'Nova Resende', '3145109', NULL, NULL);
INSERT INTO public.cities VALUES (2089, 13, 'Nova Serrana', '3145208', NULL, NULL);
INSERT INTO public.cities VALUES (2090, 13, 'Nova União', '3136603', NULL, NULL);
INSERT INTO public.cities VALUES (2091, 13, 'Novo Cruzeiro', '3145307', NULL, NULL);
INSERT INTO public.cities VALUES (2092, 13, 'Novo Oriente de Minas', '3145356', NULL, NULL);
INSERT INTO public.cities VALUES (2093, 13, 'Novorizonte', '3145372', NULL, NULL);
INSERT INTO public.cities VALUES (2094, 13, 'Olaria', '3145406', NULL, NULL);
INSERT INTO public.cities VALUES (2095, 13, 'Olhos-d''Água', '3145455', NULL, NULL);
INSERT INTO public.cities VALUES (2096, 13, 'Olímpio Noronha', '3145505', NULL, NULL);
INSERT INTO public.cities VALUES (2097, 13, 'Oliveira', '3145604', NULL, NULL);
INSERT INTO public.cities VALUES (2098, 13, 'Oliveira Fortes', '3145703', NULL, NULL);
INSERT INTO public.cities VALUES (2099, 13, 'Onça de Pitangui', '3145802', NULL, NULL);
INSERT INTO public.cities VALUES (2100, 13, 'Oratórios', '3145851', NULL, NULL);
INSERT INTO public.cities VALUES (2101, 13, 'Orizânia', '3145877', NULL, NULL);
INSERT INTO public.cities VALUES (2102, 13, 'Ouro Branco', '3145901', NULL, NULL);
INSERT INTO public.cities VALUES (2103, 13, 'Ouro Fino', '3146008', NULL, NULL);
INSERT INTO public.cities VALUES (2104, 13, 'Ouro Preto', '3146107', NULL, NULL);
INSERT INTO public.cities VALUES (2105, 13, 'Ouro Verde de Minas', '3146206', NULL, NULL);
INSERT INTO public.cities VALUES (2106, 13, 'Padre Carvalho', '3146255', NULL, NULL);
INSERT INTO public.cities VALUES (2107, 13, 'Padre Paraíso', '3146305', NULL, NULL);
INSERT INTO public.cities VALUES (2108, 13, 'Pai Pedro', '3146552', NULL, NULL);
INSERT INTO public.cities VALUES (2109, 13, 'Paineiras', '3146404', NULL, NULL);
INSERT INTO public.cities VALUES (2110, 13, 'Pains', '3146503', NULL, NULL);
INSERT INTO public.cities VALUES (2111, 13, 'Paiva', '3146602', NULL, NULL);
INSERT INTO public.cities VALUES (2112, 13, 'Palma', '3146701', NULL, NULL);
INSERT INTO public.cities VALUES (2113, 13, 'Palmópolis', '3146750', NULL, NULL);
INSERT INTO public.cities VALUES (2114, 13, 'Papagaios', '3146909', NULL, NULL);
INSERT INTO public.cities VALUES (2115, 13, 'Pará de Minas', '3147105', NULL, NULL);
INSERT INTO public.cities VALUES (2116, 13, 'Paracatu', '3147006', NULL, NULL);
INSERT INTO public.cities VALUES (2117, 13, 'Paraguaçu', '3147204', NULL, NULL);
INSERT INTO public.cities VALUES (2118, 13, 'Paraisópolis', '3147303', NULL, NULL);
INSERT INTO public.cities VALUES (2119, 13, 'Paraopeba', '3147402', NULL, NULL);
INSERT INTO public.cities VALUES (2120, 13, 'Passa Quatro', '3147600', NULL, NULL);
INSERT INTO public.cities VALUES (2121, 13, 'Passa Tempo', '3147709', NULL, NULL);
INSERT INTO public.cities VALUES (2122, 13, 'Passabém', '3147501', NULL, NULL);
INSERT INTO public.cities VALUES (2123, 13, 'Passa-Vinte', '3147808', NULL, NULL);
INSERT INTO public.cities VALUES (2124, 13, 'Passos', '3147907', NULL, NULL);
INSERT INTO public.cities VALUES (2125, 13, 'Patis', '3147956', NULL, NULL);
INSERT INTO public.cities VALUES (2126, 13, 'Patos de Minas', '3148004', NULL, NULL);
INSERT INTO public.cities VALUES (2127, 13, 'Patrocínio', '3148103', NULL, NULL);
INSERT INTO public.cities VALUES (2128, 13, 'Patrocínio do Muriaé', '3148202', NULL, NULL);
INSERT INTO public.cities VALUES (2129, 13, 'Paula Cândido', '3148301', NULL, NULL);
INSERT INTO public.cities VALUES (2130, 13, 'Paulistas', '3148400', NULL, NULL);
INSERT INTO public.cities VALUES (2131, 13, 'Pavão', '3148509', NULL, NULL);
INSERT INTO public.cities VALUES (2132, 13, 'Peçanha', '3148608', NULL, NULL);
INSERT INTO public.cities VALUES (2133, 13, 'Pedra Azul', '3148707', NULL, NULL);
INSERT INTO public.cities VALUES (2134, 13, 'Pedra Bonita', '3148756', NULL, NULL);
INSERT INTO public.cities VALUES (2135, 13, 'Pedra do Anta', '3148806', NULL, NULL);
INSERT INTO public.cities VALUES (2136, 13, 'Pedra do Indaiá', '3148905', NULL, NULL);
INSERT INTO public.cities VALUES (2137, 13, 'Pedra Dourada', '3149002', NULL, NULL);
INSERT INTO public.cities VALUES (2138, 13, 'Pedralva', '3149101', NULL, NULL);
INSERT INTO public.cities VALUES (2139, 13, 'Pedras de Maria da Cruz', '3149150', NULL, NULL);
INSERT INTO public.cities VALUES (2140, 13, 'Pedrinópolis', '3149200', NULL, NULL);
INSERT INTO public.cities VALUES (2141, 13, 'Pedro Leopoldo', '3149309', NULL, NULL);
INSERT INTO public.cities VALUES (2142, 13, 'Pedro Teixeira', '3149408', NULL, NULL);
INSERT INTO public.cities VALUES (2143, 13, 'Pequeri', '3149507', NULL, NULL);
INSERT INTO public.cities VALUES (2144, 13, 'Pequi', '3149606', NULL, NULL);
INSERT INTO public.cities VALUES (2145, 13, 'Perdigão', '3149705', NULL, NULL);
INSERT INTO public.cities VALUES (2146, 13, 'Perdizes', '3149804', NULL, NULL);
INSERT INTO public.cities VALUES (2147, 13, 'Perdões', '3149903', NULL, NULL);
INSERT INTO public.cities VALUES (2148, 13, 'Periquito', '3149952', NULL, NULL);
INSERT INTO public.cities VALUES (2149, 13, 'Pescador', '3150000', NULL, NULL);
INSERT INTO public.cities VALUES (2150, 13, 'Piau', '3150109', NULL, NULL);
INSERT INTO public.cities VALUES (2151, 13, 'Piedade de Caratinga', '3150158', NULL, NULL);
INSERT INTO public.cities VALUES (2152, 13, 'Piedade de Ponte Nova', '3150208', NULL, NULL);
INSERT INTO public.cities VALUES (2153, 13, 'Piedade do Rio Grande', '3150307', NULL, NULL);
INSERT INTO public.cities VALUES (2154, 13, 'Piedade dos Gerais', '3150406', NULL, NULL);
INSERT INTO public.cities VALUES (2155, 13, 'Pimenta', '3150505', NULL, NULL);
INSERT INTO public.cities VALUES (2156, 13, 'Pingo-d''Água', '3150539', NULL, NULL);
INSERT INTO public.cities VALUES (2157, 13, 'Pintópolis', '3150570', NULL, NULL);
INSERT INTO public.cities VALUES (2158, 13, 'Piracema', '3150604', NULL, NULL);
INSERT INTO public.cities VALUES (2159, 13, 'Pirajuba', '3150703', NULL, NULL);
INSERT INTO public.cities VALUES (2160, 13, 'Piranga', '3150802', NULL, NULL);
INSERT INTO public.cities VALUES (2161, 13, 'Piranguçu', '3150901', NULL, NULL);
INSERT INTO public.cities VALUES (2162, 13, 'Piranguinho', '3151008', NULL, NULL);
INSERT INTO public.cities VALUES (2163, 13, 'Pirapetinga', '3151107', NULL, NULL);
INSERT INTO public.cities VALUES (2164, 13, 'Pirapora', '3151206', NULL, NULL);
INSERT INTO public.cities VALUES (2165, 13, 'Piraúba', '3151305', NULL, NULL);
INSERT INTO public.cities VALUES (2166, 13, 'Pitangui', '3151404', NULL, NULL);
INSERT INTO public.cities VALUES (2167, 13, 'Piumhi', '3151503', NULL, NULL);
INSERT INTO public.cities VALUES (2168, 13, 'Planura', '3151602', NULL, NULL);
INSERT INTO public.cities VALUES (2169, 13, 'Poço Fundo', '3151701', NULL, NULL);
INSERT INTO public.cities VALUES (2170, 13, 'Poços de Caldas', '3151800', NULL, NULL);
INSERT INTO public.cities VALUES (2171, 13, 'Pocrane', '3151909', NULL, NULL);
INSERT INTO public.cities VALUES (2172, 13, 'Pompéu', '3152006', NULL, NULL);
INSERT INTO public.cities VALUES (2173, 13, 'Ponte Nova', '3152105', NULL, NULL);
INSERT INTO public.cities VALUES (2174, 13, 'Ponto Chique', '3152131', NULL, NULL);
INSERT INTO public.cities VALUES (2175, 13, 'Ponto dos Volantes', '3152170', NULL, NULL);
INSERT INTO public.cities VALUES (2176, 13, 'Porteirinha', '3152204', NULL, NULL);
INSERT INTO public.cities VALUES (2177, 13, 'Porto Firme', '3152303', NULL, NULL);
INSERT INTO public.cities VALUES (2178, 13, 'Poté', '3152402', NULL, NULL);
INSERT INTO public.cities VALUES (2179, 13, 'Pouso Alegre', '3152501', NULL, NULL);
INSERT INTO public.cities VALUES (2180, 13, 'Pouso Alto', '3152600', NULL, NULL);
INSERT INTO public.cities VALUES (2181, 13, 'Prados', '3152709', NULL, NULL);
INSERT INTO public.cities VALUES (2182, 13, 'Prata', '3152808', NULL, NULL);
INSERT INTO public.cities VALUES (2183, 13, 'Pratápolis', '3152907', NULL, NULL);
INSERT INTO public.cities VALUES (2184, 13, 'Pratinha', '3153004', NULL, NULL);
INSERT INTO public.cities VALUES (2185, 13, 'Presidente Bernardes', '3153103', NULL, NULL);
INSERT INTO public.cities VALUES (2186, 13, 'Presidente Juscelino', '3153202', NULL, NULL);
INSERT INTO public.cities VALUES (2187, 13, 'Presidente Kubitschek', '3153301', NULL, NULL);
INSERT INTO public.cities VALUES (2188, 13, 'Presidente Olegário', '3153400', NULL, NULL);
INSERT INTO public.cities VALUES (2189, 13, 'Prudente de Morais', '3153608', NULL, NULL);
INSERT INTO public.cities VALUES (2190, 13, 'Quartel Geral', '3153707', NULL, NULL);
INSERT INTO public.cities VALUES (2191, 13, 'Queluzito', '3153806', NULL, NULL);
INSERT INTO public.cities VALUES (2192, 13, 'Raposos', '3153905', NULL, NULL);
INSERT INTO public.cities VALUES (2193, 13, 'Raul Soares', '3154002', NULL, NULL);
INSERT INTO public.cities VALUES (2194, 13, 'Recreio', '3154101', NULL, NULL);
INSERT INTO public.cities VALUES (2195, 13, 'Reduto', '3154150', NULL, NULL);
INSERT INTO public.cities VALUES (2196, 13, 'Resende Costa', '3154200', NULL, NULL);
INSERT INTO public.cities VALUES (2197, 13, 'Resplendor', '3154309', NULL, NULL);
INSERT INTO public.cities VALUES (2198, 13, 'Ressaquinha', '3154408', NULL, NULL);
INSERT INTO public.cities VALUES (2199, 13, 'Riachinho', '3154457', NULL, NULL);
INSERT INTO public.cities VALUES (2200, 13, 'Riacho dos Machados', '3154507', NULL, NULL);
INSERT INTO public.cities VALUES (2201, 13, 'Ribeirão das Neves', '3154606', NULL, NULL);
INSERT INTO public.cities VALUES (2202, 13, 'Ribeirão Vermelho', '3154705', NULL, NULL);
INSERT INTO public.cities VALUES (2203, 13, 'Rio Acima', '3154804', NULL, NULL);
INSERT INTO public.cities VALUES (2204, 13, 'Rio Casca', '3154903', NULL, NULL);
INSERT INTO public.cities VALUES (2205, 13, 'Rio do Prado', '3155108', NULL, NULL);
INSERT INTO public.cities VALUES (2206, 13, 'Rio Doce', '3155009', NULL, NULL);
INSERT INTO public.cities VALUES (2207, 13, 'Rio Espera', '3155207', NULL, NULL);
INSERT INTO public.cities VALUES (2208, 13, 'Rio Manso', '3155306', NULL, NULL);
INSERT INTO public.cities VALUES (2209, 13, 'Rio Novo', '3155405', NULL, NULL);
INSERT INTO public.cities VALUES (2210, 13, 'Rio Paranaíba', '3155504', NULL, NULL);
INSERT INTO public.cities VALUES (2211, 13, 'Rio Pardo de Minas', '3155603', NULL, NULL);
INSERT INTO public.cities VALUES (2212, 13, 'Rio Piracicaba', '3155702', NULL, NULL);
INSERT INTO public.cities VALUES (2213, 13, 'Rio Pomba', '3155801', NULL, NULL);
INSERT INTO public.cities VALUES (2214, 13, 'Rio Preto', '3155900', NULL, NULL);
INSERT INTO public.cities VALUES (2215, 13, 'Rio Vermelho', '3156007', NULL, NULL);
INSERT INTO public.cities VALUES (2216, 13, 'Ritápolis', '3156106', NULL, NULL);
INSERT INTO public.cities VALUES (2217, 13, 'Rochedo de Minas', '3156205', NULL, NULL);
INSERT INTO public.cities VALUES (2218, 13, 'Rodeiro', '3156304', NULL, NULL);
INSERT INTO public.cities VALUES (2219, 13, 'Romaria', '3156403', NULL, NULL);
INSERT INTO public.cities VALUES (2220, 13, 'Rosário da Limeira', '3156452', NULL, NULL);
INSERT INTO public.cities VALUES (2221, 13, 'Rubelita', '3156502', NULL, NULL);
INSERT INTO public.cities VALUES (2222, 13, 'Rubim', '3156601', NULL, NULL);
INSERT INTO public.cities VALUES (2223, 13, 'Sabará', '3156700', NULL, NULL);
INSERT INTO public.cities VALUES (2224, 13, 'Sabinópolis', '3156809', NULL, NULL);
INSERT INTO public.cities VALUES (2225, 13, 'Sacramento', '3156908', NULL, NULL);
INSERT INTO public.cities VALUES (2226, 13, 'Salinas', '3157005', NULL, NULL);
INSERT INTO public.cities VALUES (2227, 13, 'Salto da Divisa', '3157104', NULL, NULL);
INSERT INTO public.cities VALUES (2228, 13, 'Santa Bárbara', '3157203', NULL, NULL);
INSERT INTO public.cities VALUES (2229, 13, 'Santa Bárbara do Leste', '3157252', NULL, NULL);
INSERT INTO public.cities VALUES (2230, 13, 'Santa Bárbara do Monte Verde', '3157278', NULL, NULL);
INSERT INTO public.cities VALUES (2231, 13, 'Santa Bárbara do Tugúrio', '3157302', NULL, NULL);
INSERT INTO public.cities VALUES (2232, 13, 'Santa Cruz de Minas', '3157336', NULL, NULL);
INSERT INTO public.cities VALUES (2233, 13, 'Santa Cruz de Salinas', '3157377', NULL, NULL);
INSERT INTO public.cities VALUES (2234, 13, 'Santa Cruz do Escalvado', '3157401', NULL, NULL);
INSERT INTO public.cities VALUES (2235, 13, 'Santa Efigênia de Minas', '3157500', NULL, NULL);
INSERT INTO public.cities VALUES (2236, 13, 'Santa Fé de Minas', '3157609', NULL, NULL);
INSERT INTO public.cities VALUES (2237, 13, 'Santa Helena de Minas', '3157658', NULL, NULL);
INSERT INTO public.cities VALUES (2238, 13, 'Santa Juliana', '3157708', NULL, NULL);
INSERT INTO public.cities VALUES (2239, 13, 'Santa Luzia', '3157807', NULL, NULL);
INSERT INTO public.cities VALUES (2240, 13, 'Santa Margarida', '3157906', NULL, NULL);
INSERT INTO public.cities VALUES (2241, 13, 'Santa Maria de Itabira', '3158003', NULL, NULL);
INSERT INTO public.cities VALUES (2242, 13, 'Santa Maria do Salto', '3158102', NULL, NULL);
INSERT INTO public.cities VALUES (2243, 13, 'Santa Maria do Suaçuí', '3158201', NULL, NULL);
INSERT INTO public.cities VALUES (2244, 13, 'Santa Rita de Caldas', '3159209', NULL, NULL);
INSERT INTO public.cities VALUES (2245, 13, 'Santa Rita de Ibitipoca', '3159407', NULL, NULL);
INSERT INTO public.cities VALUES (2246, 13, 'Santa Rita de Jacutinga', '3159308', NULL, NULL);
INSERT INTO public.cities VALUES (2247, 13, 'Santa Rita de Minas', '3159357', NULL, NULL);
INSERT INTO public.cities VALUES (2248, 13, 'Santa Rita do Itueto', '3159506', NULL, NULL);
INSERT INTO public.cities VALUES (2249, 13, 'Santa Rita do Sapucaí', '3159605', NULL, NULL);
INSERT INTO public.cities VALUES (2250, 13, 'Santa Rosa da Serra', '3159704', NULL, NULL);
INSERT INTO public.cities VALUES (2251, 13, 'Santa Vitória', '3159803', NULL, NULL);
INSERT INTO public.cities VALUES (2252, 13, 'Santana da Vargem', '3158300', NULL, NULL);
INSERT INTO public.cities VALUES (2253, 13, 'Santana de Cataguases', '3158409', NULL, NULL);
INSERT INTO public.cities VALUES (2254, 13, 'Santana de Pirapama', '3158508', NULL, NULL);
INSERT INTO public.cities VALUES (2255, 13, 'Santana do Deserto', '3158607', NULL, NULL);
INSERT INTO public.cities VALUES (2256, 13, 'Santana do Garambéu', '3158706', NULL, NULL);
INSERT INTO public.cities VALUES (2257, 13, 'Santana do Jacaré', '3158805', NULL, NULL);
INSERT INTO public.cities VALUES (2258, 13, 'Santana do Manhuaçu', '3158904', NULL, NULL);
INSERT INTO public.cities VALUES (2259, 13, 'Santana do Paraíso', '3158953', NULL, NULL);
INSERT INTO public.cities VALUES (2260, 13, 'Santana do Riacho', '3159001', NULL, NULL);
INSERT INTO public.cities VALUES (2261, 13, 'Santana dos Montes', '3159100', NULL, NULL);
INSERT INTO public.cities VALUES (2262, 13, 'Santo Antônio do Amparo', '3159902', NULL, NULL);
INSERT INTO public.cities VALUES (2263, 13, 'Santo Antônio do Aventureiro', '3160009', NULL, NULL);
INSERT INTO public.cities VALUES (2264, 13, 'Santo Antônio do Grama', '3160108', NULL, NULL);
INSERT INTO public.cities VALUES (2265, 13, 'Santo Antônio do Itambé', '3160207', NULL, NULL);
INSERT INTO public.cities VALUES (2266, 13, 'Santo Antônio do Jacinto', '3160306', NULL, NULL);
INSERT INTO public.cities VALUES (2267, 13, 'Santo Antônio do Monte', '3160405', NULL, NULL);
INSERT INTO public.cities VALUES (2268, 13, 'Santo Antônio do Retiro', '3160454', NULL, NULL);
INSERT INTO public.cities VALUES (2269, 13, 'Santo Antônio do Rio Abaixo', '3160504', NULL, NULL);
INSERT INTO public.cities VALUES (2270, 13, 'Santo Hipólito', '3160603', NULL, NULL);
INSERT INTO public.cities VALUES (2271, 13, 'Santos Dumont', '3160702', NULL, NULL);
INSERT INTO public.cities VALUES (2272, 13, 'São Bento Abade', '3160801', NULL, NULL);
INSERT INTO public.cities VALUES (2273, 13, 'São Brás do Suaçuí', '3160900', NULL, NULL);
INSERT INTO public.cities VALUES (2274, 13, 'São Domingos das Dores', '3160959', NULL, NULL);
INSERT INTO public.cities VALUES (2275, 13, 'São Domingos do Prata', '3161007', NULL, NULL);
INSERT INTO public.cities VALUES (2276, 13, 'São Félix de Minas', '3161056', NULL, NULL);
INSERT INTO public.cities VALUES (2277, 13, 'São Francisco', '3161106', NULL, NULL);
INSERT INTO public.cities VALUES (2278, 13, 'São Francisco de Paula', '3161205', NULL, NULL);
INSERT INTO public.cities VALUES (2279, 13, 'São Francisco de Sales', '3161304', NULL, NULL);
INSERT INTO public.cities VALUES (2280, 13, 'São Francisco do Glória', '3161403', NULL, NULL);
INSERT INTO public.cities VALUES (2281, 13, 'São Geraldo', '3161502', NULL, NULL);
INSERT INTO public.cities VALUES (2282, 13, 'São Geraldo da Piedade', '3161601', NULL, NULL);
INSERT INTO public.cities VALUES (2283, 13, 'São Geraldo do Baixio', '3161650', NULL, NULL);
INSERT INTO public.cities VALUES (2284, 13, 'São Gonçalo do Abaeté', '3161700', NULL, NULL);
INSERT INTO public.cities VALUES (2285, 13, 'São Gonçalo do Pará', '3161809', NULL, NULL);
INSERT INTO public.cities VALUES (2286, 13, 'São Gonçalo do Rio Abaixo', '3161908', NULL, NULL);
INSERT INTO public.cities VALUES (2287, 13, 'São Gonçalo do Rio Preto', '3125507', NULL, NULL);
INSERT INTO public.cities VALUES (2288, 13, 'São Gonçalo do Sapucaí', '3162005', NULL, NULL);
INSERT INTO public.cities VALUES (2289, 13, 'São Gotardo', '3162104', NULL, NULL);
INSERT INTO public.cities VALUES (2290, 13, 'São João Batista do Glória', '3162203', NULL, NULL);
INSERT INTO public.cities VALUES (2291, 13, 'São João da Lagoa', '3162252', NULL, NULL);
INSERT INTO public.cities VALUES (2292, 13, 'São João da Mata', '3162302', NULL, NULL);
INSERT INTO public.cities VALUES (2293, 13, 'São João da Ponte', '3162401', NULL, NULL);
INSERT INTO public.cities VALUES (2294, 13, 'São João das Missões', '3162450', NULL, NULL);
INSERT INTO public.cities VALUES (2295, 13, 'São João del Rei', '3162500', NULL, NULL);
INSERT INTO public.cities VALUES (2296, 13, 'São João do Manhuaçu', '3162559', NULL, NULL);
INSERT INTO public.cities VALUES (2297, 13, 'São João do Manteninha', '3162575', NULL, NULL);
INSERT INTO public.cities VALUES (2298, 13, 'São João do Oriente', '3162609', NULL, NULL);
INSERT INTO public.cities VALUES (2299, 13, 'São João do Pacuí', '3162658', NULL, NULL);
INSERT INTO public.cities VALUES (2300, 13, 'São João do Paraíso', '3162708', NULL, NULL);
INSERT INTO public.cities VALUES (2301, 13, 'São João Evangelista', '3162807', NULL, NULL);
INSERT INTO public.cities VALUES (2302, 13, 'São João Nepomuceno', '3162906', NULL, NULL);
INSERT INTO public.cities VALUES (2303, 13, 'São Joaquim de Bicas', '3162922', NULL, NULL);
INSERT INTO public.cities VALUES (2304, 13, 'São José da Barra', '3162948', NULL, NULL);
INSERT INTO public.cities VALUES (2305, 13, 'São José da Lapa', '3162955', NULL, NULL);
INSERT INTO public.cities VALUES (2306, 13, 'São José da Safira', '3163003', NULL, NULL);
INSERT INTO public.cities VALUES (2307, 13, 'São José da Varginha', '3163102', NULL, NULL);
INSERT INTO public.cities VALUES (2308, 13, 'São José do Alegre', '3163201', NULL, NULL);
INSERT INTO public.cities VALUES (2309, 13, 'São José do Divino', '3163300', NULL, NULL);
INSERT INTO public.cities VALUES (2310, 13, 'São José do Goiabal', '3163409', NULL, NULL);
INSERT INTO public.cities VALUES (2311, 13, 'São José do Jacuri', '3163508', NULL, NULL);
INSERT INTO public.cities VALUES (2312, 13, 'São José do Mantimento', '3163607', NULL, NULL);
INSERT INTO public.cities VALUES (2313, 13, 'São Lourenço', '3163706', NULL, NULL);
INSERT INTO public.cities VALUES (2314, 13, 'São Miguel do Anta', '3163805', NULL, NULL);
INSERT INTO public.cities VALUES (2315, 13, 'São Pedro da União', '3163904', NULL, NULL);
INSERT INTO public.cities VALUES (2316, 13, 'São Pedro do Suaçuí', '3164100', NULL, NULL);
INSERT INTO public.cities VALUES (2317, 13, 'São Pedro dos Ferros', '3164001', NULL, NULL);
INSERT INTO public.cities VALUES (2318, 13, 'São Romão', '3164209', NULL, NULL);
INSERT INTO public.cities VALUES (2319, 13, 'São Roque de Minas', '3164308', NULL, NULL);
INSERT INTO public.cities VALUES (2320, 13, 'São Sebastião da Bela Vista', '3164407', NULL, NULL);
INSERT INTO public.cities VALUES (2321, 13, 'São Sebastião da Vargem Alegre', '3164431', NULL, NULL);
INSERT INTO public.cities VALUES (2322, 13, 'São Sebastião do Anta', '3164472', NULL, NULL);
INSERT INTO public.cities VALUES (2323, 13, 'São Sebastião do Maranhão', '3164506', NULL, NULL);
INSERT INTO public.cities VALUES (2324, 13, 'São Sebastião do Oeste', '3164605', NULL, NULL);
INSERT INTO public.cities VALUES (2325, 13, 'São Sebastião do Paraíso', '3164704', NULL, NULL);
INSERT INTO public.cities VALUES (2326, 13, 'São Sebastião do Rio Preto', '3164803', NULL, NULL);
INSERT INTO public.cities VALUES (2327, 13, 'São Sebastião do Rio Verde', '3164902', NULL, NULL);
INSERT INTO public.cities VALUES (2328, 13, 'São Thomé das Letras', '3165206', NULL, NULL);
INSERT INTO public.cities VALUES (2329, 13, 'São Tiago', '3165008', NULL, NULL);
INSERT INTO public.cities VALUES (2330, 13, 'São Tomás de Aquino', '3165107', NULL, NULL);
INSERT INTO public.cities VALUES (2331, 13, 'São Vicente de Minas', '3165305', NULL, NULL);
INSERT INTO public.cities VALUES (2332, 13, 'Sapucaí-Mirim', '3165404', NULL, NULL);
INSERT INTO public.cities VALUES (2333, 13, 'Sardoá', '3165503', NULL, NULL);
INSERT INTO public.cities VALUES (2334, 13, 'Sarzedo', '3165537', NULL, NULL);
INSERT INTO public.cities VALUES (2335, 13, 'Sem-Peixe', '3165560', NULL, NULL);
INSERT INTO public.cities VALUES (2336, 13, 'Senador Amaral', '3165578', NULL, NULL);
INSERT INTO public.cities VALUES (2337, 13, 'Senador Cortes', '3165602', NULL, NULL);
INSERT INTO public.cities VALUES (2338, 13, 'Senador Firmino', '3165701', NULL, NULL);
INSERT INTO public.cities VALUES (2339, 13, 'Senador José Bento', '3165800', NULL, NULL);
INSERT INTO public.cities VALUES (2340, 13, 'Senador Modestino Gonçalves', '3165909', NULL, NULL);
INSERT INTO public.cities VALUES (2341, 13, 'Senhora de Oliveira', '3166006', NULL, NULL);
INSERT INTO public.cities VALUES (2342, 13, 'Senhora do Porto', '3166105', NULL, NULL);
INSERT INTO public.cities VALUES (2343, 13, 'Senhora dos Remédios', '3166204', NULL, NULL);
INSERT INTO public.cities VALUES (2344, 13, 'Sericita', '3166303', NULL, NULL);
INSERT INTO public.cities VALUES (2345, 13, 'Seritinga', '3166402', NULL, NULL);
INSERT INTO public.cities VALUES (2346, 13, 'Serra Azul de Minas', '3166501', NULL, NULL);
INSERT INTO public.cities VALUES (2347, 13, 'Serra da Saudade', '3166600', NULL, NULL);
INSERT INTO public.cities VALUES (2348, 13, 'Serra do Salitre', '3166808', NULL, NULL);
INSERT INTO public.cities VALUES (2349, 13, 'Serra dos Aimorés', '3166709', NULL, NULL);
INSERT INTO public.cities VALUES (2350, 13, 'Serrania', '3166907', NULL, NULL);
INSERT INTO public.cities VALUES (2351, 13, 'Serranópolis de Minas', '3166956', NULL, NULL);
INSERT INTO public.cities VALUES (2352, 13, 'Serranos', '3167004', NULL, NULL);
INSERT INTO public.cities VALUES (2353, 13, 'Serro', '3167103', NULL, NULL);
INSERT INTO public.cities VALUES (2354, 13, 'Sete Lagoas', '3167202', NULL, NULL);
INSERT INTO public.cities VALUES (2355, 13, 'Setubinha', '3165552', NULL, NULL);
INSERT INTO public.cities VALUES (2356, 13, 'Silveirânia', '3167301', NULL, NULL);
INSERT INTO public.cities VALUES (2357, 13, 'Silvianópolis', '3167400', NULL, NULL);
INSERT INTO public.cities VALUES (2358, 13, 'Simão Pereira', '3167509', NULL, NULL);
INSERT INTO public.cities VALUES (2359, 13, 'Simonésia', '3167608', NULL, NULL);
INSERT INTO public.cities VALUES (2360, 13, 'Sobrália', '3167707', NULL, NULL);
INSERT INTO public.cities VALUES (2361, 13, 'Soledade de Minas', '3167806', NULL, NULL);
INSERT INTO public.cities VALUES (2362, 13, 'Tabuleiro', '3167905', NULL, NULL);
INSERT INTO public.cities VALUES (2363, 13, 'Taiobeiras', '3168002', NULL, NULL);
INSERT INTO public.cities VALUES (2364, 13, 'Taparuba', '3168051', NULL, NULL);
INSERT INTO public.cities VALUES (2365, 13, 'Tapira', '3168101', NULL, NULL);
INSERT INTO public.cities VALUES (2366, 13, 'Tapiraí', '3168200', NULL, NULL);
INSERT INTO public.cities VALUES (2367, 13, 'Taquaraçu de Minas', '3168309', NULL, NULL);
INSERT INTO public.cities VALUES (2368, 13, 'Tarumirim', '3168408', NULL, NULL);
INSERT INTO public.cities VALUES (2369, 13, 'Teixeiras', '3168507', NULL, NULL);
INSERT INTO public.cities VALUES (2370, 13, 'Teófilo Otoni', '3168606', NULL, NULL);
INSERT INTO public.cities VALUES (2371, 13, 'Timóteo', '3168705', NULL, NULL);
INSERT INTO public.cities VALUES (2372, 13, 'Tiradentes', '3168804', NULL, NULL);
INSERT INTO public.cities VALUES (2373, 13, 'Tiros', '3168903', NULL, NULL);
INSERT INTO public.cities VALUES (2374, 13, 'Tocantins', '3169000', NULL, NULL);
INSERT INTO public.cities VALUES (2375, 13, 'Tocos do Moji', '3169059', NULL, NULL);
INSERT INTO public.cities VALUES (2376, 13, 'Toledo', '3169109', NULL, NULL);
INSERT INTO public.cities VALUES (2377, 13, 'Tombos', '3169208', NULL, NULL);
INSERT INTO public.cities VALUES (2378, 13, 'Três Corações', '3169307', NULL, NULL);
INSERT INTO public.cities VALUES (2379, 13, 'Três Marias', '3169356', NULL, NULL);
INSERT INTO public.cities VALUES (2380, 13, 'Três Pontas', '3169406', NULL, NULL);
INSERT INTO public.cities VALUES (2381, 13, 'Tumiritinga', '3169505', NULL, NULL);
INSERT INTO public.cities VALUES (2382, 13, 'Tupaciguara', '3169604', NULL, NULL);
INSERT INTO public.cities VALUES (2383, 13, 'Turmalina', '3169703', NULL, NULL);
INSERT INTO public.cities VALUES (2384, 13, 'Turvolândia', '3169802', NULL, NULL);
INSERT INTO public.cities VALUES (2385, 13, 'Ubá', '3169901', NULL, NULL);
INSERT INTO public.cities VALUES (2386, 13, 'Ubaí', '3170008', NULL, NULL);
INSERT INTO public.cities VALUES (2387, 13, 'Ubaporanga', '3170057', NULL, NULL);
INSERT INTO public.cities VALUES (2388, 13, 'Uberaba', '3170107', NULL, NULL);
INSERT INTO public.cities VALUES (2389, 13, 'Uberlândia', '3170206', NULL, NULL);
INSERT INTO public.cities VALUES (2390, 13, 'Umburatiba', '3170305', NULL, NULL);
INSERT INTO public.cities VALUES (2391, 13, 'Unaí', '3170404', NULL, NULL);
INSERT INTO public.cities VALUES (2392, 13, 'União de Minas', '3170438', NULL, NULL);
INSERT INTO public.cities VALUES (2393, 13, 'Uruana de Minas', '3170479', NULL, NULL);
INSERT INTO public.cities VALUES (2394, 13, 'Urucânia', '3170503', NULL, NULL);
INSERT INTO public.cities VALUES (2395, 13, 'Urucuia', '3170529', NULL, NULL);
INSERT INTO public.cities VALUES (2396, 13, 'Vargem Alegre', '3170578', NULL, NULL);
INSERT INTO public.cities VALUES (2397, 13, 'Vargem Bonita', '3170602', NULL, NULL);
INSERT INTO public.cities VALUES (2398, 13, 'Vargem Grande do Rio Pardo', '3170651', NULL, NULL);
INSERT INTO public.cities VALUES (2399, 13, 'Varginha', '3170701', NULL, NULL);
INSERT INTO public.cities VALUES (2400, 13, 'Varjão de Minas', '3170750', NULL, NULL);
INSERT INTO public.cities VALUES (2401, 13, 'Várzea da Palma', '3170800', NULL, NULL);
INSERT INTO public.cities VALUES (2402, 13, 'Varzelândia', '3170909', NULL, NULL);
INSERT INTO public.cities VALUES (2403, 13, 'Vazante', '3171006', NULL, NULL);
INSERT INTO public.cities VALUES (2404, 13, 'Verdelândia', '3171030', NULL, NULL);
INSERT INTO public.cities VALUES (2405, 13, 'Veredinha', '3171071', NULL, NULL);
INSERT INTO public.cities VALUES (2406, 13, 'Veríssimo', '3171105', NULL, NULL);
INSERT INTO public.cities VALUES (2407, 13, 'Vermelho Novo', '3171154', NULL, NULL);
INSERT INTO public.cities VALUES (2408, 13, 'Vespasiano', '3171204', NULL, NULL);
INSERT INTO public.cities VALUES (2409, 13, 'Viçosa', '3171303', NULL, NULL);
INSERT INTO public.cities VALUES (2410, 13, 'Vieiras', '3171402', NULL, NULL);
INSERT INTO public.cities VALUES (2411, 13, 'Virgem da Lapa', '3171600', NULL, NULL);
INSERT INTO public.cities VALUES (2412, 13, 'Virgínia', '3171709', NULL, NULL);
INSERT INTO public.cities VALUES (2413, 13, 'Virginópolis', '3171808', NULL, NULL);
INSERT INTO public.cities VALUES (2414, 13, 'Virgolândia', '3171907', NULL, NULL);
INSERT INTO public.cities VALUES (2415, 13, 'Visconde do Rio Branco', '3172004', NULL, NULL);
INSERT INTO public.cities VALUES (2416, 13, 'Volta Grande', '3172103', NULL, NULL);
INSERT INTO public.cities VALUES (2417, 13, 'Wenceslau Braz', '3172202', NULL, NULL);
INSERT INTO public.cities VALUES (2418, 14, 'Abaetetuba', '1500107', NULL, NULL);
INSERT INTO public.cities VALUES (2419, 14, 'Abel Figueiredo', '1500131', NULL, NULL);
INSERT INTO public.cities VALUES (2420, 14, 'Acará', '1500206', NULL, NULL);
INSERT INTO public.cities VALUES (2421, 14, 'Afuá', '1500305', NULL, NULL);
INSERT INTO public.cities VALUES (2422, 14, 'Água Azul do Norte', '1500347', NULL, NULL);
INSERT INTO public.cities VALUES (2423, 14, 'Alenquer', '1500404', NULL, NULL);
INSERT INTO public.cities VALUES (2424, 14, 'Almeirim', '1500503', NULL, NULL);
INSERT INTO public.cities VALUES (2425, 14, 'Altamira', '1500602', NULL, NULL);
INSERT INTO public.cities VALUES (2426, 14, 'Anajás', '1500701', NULL, NULL);
INSERT INTO public.cities VALUES (2427, 14, 'Ananindeua', '1500800', NULL, NULL);
INSERT INTO public.cities VALUES (2428, 14, 'Anapu', '1500859', NULL, NULL);
INSERT INTO public.cities VALUES (2429, 14, 'Augusto Corrêa', '1500909', NULL, NULL);
INSERT INTO public.cities VALUES (2430, 14, 'Aurora do Pará', '1500958', NULL, NULL);
INSERT INTO public.cities VALUES (2431, 14, 'Aveiro', '1501006', NULL, NULL);
INSERT INTO public.cities VALUES (2432, 14, 'Bagre', '1501105', NULL, NULL);
INSERT INTO public.cities VALUES (2433, 14, 'Baião', '1501204', NULL, NULL);
INSERT INTO public.cities VALUES (2434, 14, 'Bannach', '1501253', NULL, NULL);
INSERT INTO public.cities VALUES (2435, 14, 'Barcarena', '1501303', NULL, NULL);
INSERT INTO public.cities VALUES (2436, 14, 'Belém', '1501402', NULL, NULL);
INSERT INTO public.cities VALUES (2437, 14, 'Belterra', '1501451', NULL, NULL);
INSERT INTO public.cities VALUES (2438, 14, 'Benevides', '1501501', NULL, NULL);
INSERT INTO public.cities VALUES (2439, 14, 'Bom Jesus do Tocantins', '1501576', NULL, NULL);
INSERT INTO public.cities VALUES (2440, 14, 'Bonito', '1501600', NULL, NULL);
INSERT INTO public.cities VALUES (2441, 14, 'Bragança', '1501709', NULL, NULL);
INSERT INTO public.cities VALUES (2442, 14, 'Brasil Novo', '1501725', NULL, NULL);
INSERT INTO public.cities VALUES (2443, 14, 'Brejo Grande do Araguaia', '1501758', NULL, NULL);
INSERT INTO public.cities VALUES (2444, 14, 'Breu Branco', '1501782', NULL, NULL);
INSERT INTO public.cities VALUES (2445, 14, 'Breves', '1501808', NULL, NULL);
INSERT INTO public.cities VALUES (2446, 14, 'Bujaru', '1501907', NULL, NULL);
INSERT INTO public.cities VALUES (2447, 14, 'Cachoeira do Arari', '1502004', NULL, NULL);
INSERT INTO public.cities VALUES (2448, 14, 'Cachoeira do Piriá', '1501956', NULL, NULL);
INSERT INTO public.cities VALUES (2449, 14, 'Cametá', '1502103', NULL, NULL);
INSERT INTO public.cities VALUES (2450, 14, 'Canaã dos Carajás', '1502152', NULL, NULL);
INSERT INTO public.cities VALUES (2451, 14, 'Capanema', '1502202', NULL, NULL);
INSERT INTO public.cities VALUES (2452, 14, 'Capitão Poço', '1502301', NULL, NULL);
INSERT INTO public.cities VALUES (2453, 14, 'Castanhal', '1502400', NULL, NULL);
INSERT INTO public.cities VALUES (2454, 14, 'Chaves', '1502509', NULL, NULL);
INSERT INTO public.cities VALUES (2455, 14, 'Colares', '1502608', NULL, NULL);
INSERT INTO public.cities VALUES (2456, 14, 'Conceição do Araguaia', '1502707', NULL, NULL);
INSERT INTO public.cities VALUES (2457, 14, 'Concórdia do Pará', '1502756', NULL, NULL);
INSERT INTO public.cities VALUES (2458, 14, 'Cumaru do Norte', '1502764', NULL, NULL);
INSERT INTO public.cities VALUES (2459, 14, 'Curionópolis', '1502772', NULL, NULL);
INSERT INTO public.cities VALUES (2460, 14, 'Curralinho', '1502806', NULL, NULL);
INSERT INTO public.cities VALUES (2461, 14, 'Curuá', '1502855', NULL, NULL);
INSERT INTO public.cities VALUES (2462, 14, 'Curuçá', '1502905', NULL, NULL);
INSERT INTO public.cities VALUES (2463, 14, 'Dom Eliseu', '1502939', NULL, NULL);
INSERT INTO public.cities VALUES (2464, 14, 'Eldorado dos Carajás', '1502954', NULL, NULL);
INSERT INTO public.cities VALUES (2465, 14, 'Faro', '1503002', NULL, NULL);
INSERT INTO public.cities VALUES (2466, 14, 'Floresta do Araguaia', '1503044', NULL, NULL);
INSERT INTO public.cities VALUES (2467, 14, 'Garrafão do Norte', '1503077', NULL, NULL);
INSERT INTO public.cities VALUES (2468, 14, 'Goianésia do Pará', '1503093', NULL, NULL);
INSERT INTO public.cities VALUES (2469, 14, 'Gurupá', '1503101', NULL, NULL);
INSERT INTO public.cities VALUES (2470, 14, 'Igarapé-Açu', '1503200', NULL, NULL);
INSERT INTO public.cities VALUES (2471, 14, 'Igarapé-Miri', '1503309', NULL, NULL);
INSERT INTO public.cities VALUES (2472, 14, 'Inhangapi', '1503408', NULL, NULL);
INSERT INTO public.cities VALUES (2473, 14, 'Ipixuna do Pará', '1503457', NULL, NULL);
INSERT INTO public.cities VALUES (2474, 14, 'Irituia', '1503507', NULL, NULL);
INSERT INTO public.cities VALUES (2475, 14, 'Itaituba', '1503606', NULL, NULL);
INSERT INTO public.cities VALUES (2476, 14, 'Itupiranga', '1503705', NULL, NULL);
INSERT INTO public.cities VALUES (2477, 14, 'Jacareacanga', '1503754', NULL, NULL);
INSERT INTO public.cities VALUES (2478, 14, 'Jacundá', '1503804', NULL, NULL);
INSERT INTO public.cities VALUES (2479, 14, 'Juruti', '1503903', NULL, NULL);
INSERT INTO public.cities VALUES (2480, 14, 'Limoeiro do Ajuru', '1504000', NULL, NULL);
INSERT INTO public.cities VALUES (2481, 14, 'Mãe do Rio', '1504059', NULL, NULL);
INSERT INTO public.cities VALUES (2482, 14, 'Magalhães Barata', '1504109', NULL, NULL);
INSERT INTO public.cities VALUES (2483, 14, 'Marabá', '1504208', NULL, NULL);
INSERT INTO public.cities VALUES (2484, 14, 'Maracanã', '1504307', NULL, NULL);
INSERT INTO public.cities VALUES (2485, 14, 'Marapanim', '1504406', NULL, NULL);
INSERT INTO public.cities VALUES (2486, 14, 'Marituba', '1504422', NULL, NULL);
INSERT INTO public.cities VALUES (2487, 14, 'Medicilândia', '1504455', NULL, NULL);
INSERT INTO public.cities VALUES (2488, 14, 'Melgaço', '1504505', NULL, NULL);
INSERT INTO public.cities VALUES (2489, 14, 'Mocajuba', '1504604', NULL, NULL);
INSERT INTO public.cities VALUES (2490, 14, 'Moju', '1504703', NULL, NULL);
INSERT INTO public.cities VALUES (2491, 14, 'Monte Alegre', '1504802', NULL, NULL);
INSERT INTO public.cities VALUES (2492, 14, 'Muaná', '1504901', NULL, NULL);
INSERT INTO public.cities VALUES (2493, 14, 'Nova Esperança do Piriá', '1504950', NULL, NULL);
INSERT INTO public.cities VALUES (2494, 14, 'Nova Ipixuna', '1504976', NULL, NULL);
INSERT INTO public.cities VALUES (2495, 14, 'Nova Timboteua', '1505007', NULL, NULL);
INSERT INTO public.cities VALUES (2496, 14, 'Novo Progresso', '1505031', NULL, NULL);
INSERT INTO public.cities VALUES (2497, 14, 'Novo Repartimento', '1505064', NULL, NULL);
INSERT INTO public.cities VALUES (2498, 14, 'Óbidos', '1505106', NULL, NULL);
INSERT INTO public.cities VALUES (2499, 14, 'Oeiras do Pará', '1505205', NULL, NULL);
INSERT INTO public.cities VALUES (2500, 14, 'Oriximiná', '1505304', NULL, NULL);
INSERT INTO public.cities VALUES (2501, 14, 'Ourém', '1505403', NULL, NULL);
INSERT INTO public.cities VALUES (2502, 14, 'Ourilândia do Norte', '1505437', NULL, NULL);
INSERT INTO public.cities VALUES (2503, 14, 'Pacajá', '1505486', NULL, NULL);
INSERT INTO public.cities VALUES (2504, 14, 'Palestina do Pará', '1505494', NULL, NULL);
INSERT INTO public.cities VALUES (2505, 14, 'Paragominas', '1505502', NULL, NULL);
INSERT INTO public.cities VALUES (2506, 14, 'Parauapebas', '1505536', NULL, NULL);
INSERT INTO public.cities VALUES (2507, 14, 'Pau D''Arco', '1505551', NULL, NULL);
INSERT INTO public.cities VALUES (2508, 14, 'Peixe-Boi', '1505601', NULL, NULL);
INSERT INTO public.cities VALUES (2509, 14, 'Piçarra', '1505635', NULL, NULL);
INSERT INTO public.cities VALUES (2510, 14, 'Placas', '1505650', NULL, NULL);
INSERT INTO public.cities VALUES (2511, 14, 'Ponta de Pedras', '1505700', NULL, NULL);
INSERT INTO public.cities VALUES (2512, 14, 'Portel', '1505809', NULL, NULL);
INSERT INTO public.cities VALUES (2513, 14, 'Porto de Moz', '1505908', NULL, NULL);
INSERT INTO public.cities VALUES (2514, 14, 'Prainha', '1506005', NULL, NULL);
INSERT INTO public.cities VALUES (2515, 14, 'Primavera', '1506104', NULL, NULL);
INSERT INTO public.cities VALUES (2516, 14, 'Quatipuru', '1506112', NULL, NULL);
INSERT INTO public.cities VALUES (2517, 14, 'Redenção', '1506138', NULL, NULL);
INSERT INTO public.cities VALUES (2518, 14, 'Rio Maria', '1506161', NULL, NULL);
INSERT INTO public.cities VALUES (2519, 14, 'Rondon do Pará', '1506187', NULL, NULL);
INSERT INTO public.cities VALUES (2520, 14, 'Rurópolis', '1506195', NULL, NULL);
INSERT INTO public.cities VALUES (2521, 14, 'Salinópolis', '1506203', NULL, NULL);
INSERT INTO public.cities VALUES (2522, 14, 'Salvaterra', '1506302', NULL, NULL);
INSERT INTO public.cities VALUES (2523, 14, 'Santa Bárbara do Pará', '1506351', NULL, NULL);
INSERT INTO public.cities VALUES (2524, 14, 'Santa Cruz do Arari', '1506401', NULL, NULL);
INSERT INTO public.cities VALUES (2525, 14, 'Santa Isabel do Pará', '1506500', NULL, NULL);
INSERT INTO public.cities VALUES (2526, 14, 'Santa Luzia do Pará', '1506559', NULL, NULL);
INSERT INTO public.cities VALUES (2527, 14, 'Santa Maria das Barreiras', '1506583', NULL, NULL);
INSERT INTO public.cities VALUES (2528, 14, 'Santa Maria do Pará', '1506609', NULL, NULL);
INSERT INTO public.cities VALUES (2529, 14, 'Santana do Araguaia', '1506708', NULL, NULL);
INSERT INTO public.cities VALUES (2530, 14, 'Santarém', '1506807', NULL, NULL);
INSERT INTO public.cities VALUES (2531, 14, 'Santarém Novo', '1506906', NULL, NULL);
INSERT INTO public.cities VALUES (2532, 14, 'Santo Antônio do Tauá', '1507003', NULL, NULL);
INSERT INTO public.cities VALUES (2533, 14, 'São Caetano de Odivelas', '1507102', NULL, NULL);
INSERT INTO public.cities VALUES (2534, 14, 'São Domingos do Araguaia', '1507151', NULL, NULL);
INSERT INTO public.cities VALUES (2535, 14, 'São Domingos do Capim', '1507201', NULL, NULL);
INSERT INTO public.cities VALUES (2536, 14, 'São Félix do Xingu', '1507300', NULL, NULL);
INSERT INTO public.cities VALUES (2537, 14, 'São Francisco do Pará', '1507409', NULL, NULL);
INSERT INTO public.cities VALUES (2538, 14, 'São Geraldo do Araguaia', '1507458', NULL, NULL);
INSERT INTO public.cities VALUES (2539, 14, 'São João da Ponta', '1507466', NULL, NULL);
INSERT INTO public.cities VALUES (2540, 14, 'São João de Pirabas', '1507474', NULL, NULL);
INSERT INTO public.cities VALUES (2541, 14, 'São João do Araguaia', '1507508', NULL, NULL);
INSERT INTO public.cities VALUES (2542, 14, 'São Miguel do Guamá', '1507607', NULL, NULL);
INSERT INTO public.cities VALUES (2543, 14, 'São Sebastião da Boa Vista', '1507706', NULL, NULL);
INSERT INTO public.cities VALUES (2544, 14, 'Sapucaia', '1507755', NULL, NULL);
INSERT INTO public.cities VALUES (2545, 14, 'Senador José Porfírio', '1507805', NULL, NULL);
INSERT INTO public.cities VALUES (2546, 14, 'Soure', '1507904', NULL, NULL);
INSERT INTO public.cities VALUES (2547, 14, 'Tailândia', '1507953', NULL, NULL);
INSERT INTO public.cities VALUES (2548, 14, 'Terra Alta', '1507961', NULL, NULL);
INSERT INTO public.cities VALUES (2549, 14, 'Terra Santa', '1507979', NULL, NULL);
INSERT INTO public.cities VALUES (2550, 14, 'Tomé-Açu', '1508001', NULL, NULL);
INSERT INTO public.cities VALUES (2551, 14, 'Tracuateua', '1508035', NULL, NULL);
INSERT INTO public.cities VALUES (2552, 14, 'Trairão', '1508050', NULL, NULL);
INSERT INTO public.cities VALUES (2553, 14, 'Tucumã', '1508084', NULL, NULL);
INSERT INTO public.cities VALUES (2554, 14, 'Tucuruí', '1508100', NULL, NULL);
INSERT INTO public.cities VALUES (2555, 14, 'Ulianópolis', '1508126', NULL, NULL);
INSERT INTO public.cities VALUES (2556, 14, 'Uruará', '1508159', NULL, NULL);
INSERT INTO public.cities VALUES (2557, 14, 'Vigia', '1508209', NULL, NULL);
INSERT INTO public.cities VALUES (2558, 14, 'Viseu', '1508308', NULL, NULL);
INSERT INTO public.cities VALUES (2559, 14, 'Vitória do Xingu', '1508357', NULL, NULL);
INSERT INTO public.cities VALUES (2560, 14, 'Xinguara', '1508407', NULL, NULL);
INSERT INTO public.cities VALUES (2561, 15, 'Água Branca', '2500106', NULL, NULL);
INSERT INTO public.cities VALUES (2562, 15, 'Aguiar', '2500205', NULL, NULL);
INSERT INTO public.cities VALUES (2563, 15, 'Alagoa Grande', '2500304', NULL, NULL);
INSERT INTO public.cities VALUES (2564, 15, 'Alagoa Nova', '2500403', NULL, NULL);
INSERT INTO public.cities VALUES (2565, 15, 'Alagoinha', '2500502', NULL, NULL);
INSERT INTO public.cities VALUES (2566, 15, 'Alcantil', '2500536', NULL, NULL);
INSERT INTO public.cities VALUES (2567, 15, 'Algodão de Jandaíra', '2500577', NULL, NULL);
INSERT INTO public.cities VALUES (2568, 15, 'Alhandra', '2500601', NULL, NULL);
INSERT INTO public.cities VALUES (2569, 15, 'Amparo', '2500734', NULL, NULL);
INSERT INTO public.cities VALUES (2570, 15, 'Aparecida', '2500775', NULL, NULL);
INSERT INTO public.cities VALUES (2571, 15, 'Araçagi', '2500809', NULL, NULL);
INSERT INTO public.cities VALUES (2572, 15, 'Arara', '2500908', NULL, NULL);
INSERT INTO public.cities VALUES (2573, 15, 'Araruna', '2501005', NULL, NULL);
INSERT INTO public.cities VALUES (2574, 15, 'Areia', '2501104', NULL, NULL);
INSERT INTO public.cities VALUES (2575, 15, 'Areia de Baraúnas', '2501153', NULL, NULL);
INSERT INTO public.cities VALUES (2576, 15, 'Areial', '2501203', NULL, NULL);
INSERT INTO public.cities VALUES (2577, 15, 'Aroeiras', '2501302', NULL, NULL);
INSERT INTO public.cities VALUES (2578, 15, 'Assunção', '2501351', NULL, NULL);
INSERT INTO public.cities VALUES (2579, 15, 'Baía da Traição', '2501401', NULL, NULL);
INSERT INTO public.cities VALUES (2580, 15, 'Bananeiras', '2501500', NULL, NULL);
INSERT INTO public.cities VALUES (2581, 15, 'Baraúna', '2501534', NULL, NULL);
INSERT INTO public.cities VALUES (2582, 15, 'Barra de Santa Rosa', '2501609', NULL, NULL);
INSERT INTO public.cities VALUES (2583, 15, 'Barra de Santana', '2501575', NULL, NULL);
INSERT INTO public.cities VALUES (2584, 15, 'Barra de São Miguel', '2501708', NULL, NULL);
INSERT INTO public.cities VALUES (2585, 15, 'Bayeux', '2501807', NULL, NULL);
INSERT INTO public.cities VALUES (2586, 15, 'Belém', '2501906', NULL, NULL);
INSERT INTO public.cities VALUES (2587, 15, 'Belém do Brejo do Cruz', '2502003', NULL, NULL);
INSERT INTO public.cities VALUES (2588, 15, 'Bernardino Batista', '2502052', NULL, NULL);
INSERT INTO public.cities VALUES (2589, 15, 'Boa Ventura', '2502102', NULL, NULL);
INSERT INTO public.cities VALUES (2590, 15, 'Boa Vista', '2502151', NULL, NULL);
INSERT INTO public.cities VALUES (2591, 15, 'Bom Jesus', '2502201', NULL, NULL);
INSERT INTO public.cities VALUES (2592, 15, 'Bom Sucesso', '2502300', NULL, NULL);
INSERT INTO public.cities VALUES (2593, 15, 'Bonito de Santa Fé', '2502409', NULL, NULL);
INSERT INTO public.cities VALUES (2594, 15, 'Boqueirão', '2502508', NULL, NULL);
INSERT INTO public.cities VALUES (2595, 15, 'Borborema', '2502706', NULL, NULL);
INSERT INTO public.cities VALUES (2596, 15, 'Brejo do Cruz', '2502805', NULL, NULL);
INSERT INTO public.cities VALUES (2597, 15, 'Brejo dos Santos', '2502904', NULL, NULL);
INSERT INTO public.cities VALUES (2598, 15, 'Caaporã', '2503001', NULL, NULL);
INSERT INTO public.cities VALUES (2599, 15, 'Cabaceiras', '2503100', NULL, NULL);
INSERT INTO public.cities VALUES (2600, 15, 'Cabedelo', '2503209', NULL, NULL);
INSERT INTO public.cities VALUES (2601, 15, 'Cachoeira dos Índios', '2503308', NULL, NULL);
INSERT INTO public.cities VALUES (2602, 15, 'Cacimba de Areia', '2503407', NULL, NULL);
INSERT INTO public.cities VALUES (2603, 15, 'Cacimba de Dentro', '2503506', NULL, NULL);
INSERT INTO public.cities VALUES (2604, 15, 'Cacimbas', '2503555', NULL, NULL);
INSERT INTO public.cities VALUES (2605, 15, 'Caiçara', '2503605', NULL, NULL);
INSERT INTO public.cities VALUES (2606, 15, 'Cajazeiras', '2503704', NULL, NULL);
INSERT INTO public.cities VALUES (2607, 15, 'Cajazeirinhas', '2503753', NULL, NULL);
INSERT INTO public.cities VALUES (2608, 15, 'Caldas Brandão', '2503803', NULL, NULL);
INSERT INTO public.cities VALUES (2609, 15, 'Camalaú', '2503902', NULL, NULL);
INSERT INTO public.cities VALUES (2610, 15, 'Campina Grande', '2504009', NULL, NULL);
INSERT INTO public.cities VALUES (2611, 15, 'Tacima', '2516409', NULL, NULL);
INSERT INTO public.cities VALUES (2612, 15, 'Capim', '2504033', NULL, NULL);
INSERT INTO public.cities VALUES (2613, 15, 'Caraúbas', '2504074', NULL, NULL);
INSERT INTO public.cities VALUES (2614, 15, 'Carrapateira', '2504108', NULL, NULL);
INSERT INTO public.cities VALUES (2615, 15, 'Casserengue', '2504157', NULL, NULL);
INSERT INTO public.cities VALUES (2616, 15, 'Catingueira', '2504207', NULL, NULL);
INSERT INTO public.cities VALUES (2617, 15, 'Catolé do Rocha', '2504306', NULL, NULL);
INSERT INTO public.cities VALUES (2618, 15, 'Caturité', '2504355', NULL, NULL);
INSERT INTO public.cities VALUES (2619, 15, 'Conceição', '2504405', NULL, NULL);
INSERT INTO public.cities VALUES (2620, 15, 'Condado', '2504504', NULL, NULL);
INSERT INTO public.cities VALUES (2621, 15, 'Conde', '2504603', NULL, NULL);
INSERT INTO public.cities VALUES (2622, 15, 'Congo', '2504702', NULL, NULL);
INSERT INTO public.cities VALUES (2623, 15, 'Coremas', '2504801', NULL, NULL);
INSERT INTO public.cities VALUES (2624, 15, 'Coxixola', '2504850', NULL, NULL);
INSERT INTO public.cities VALUES (2625, 15, 'Cruz do Espírito Santo', '2504900', NULL, NULL);
INSERT INTO public.cities VALUES (2626, 15, 'Cubati', '2505006', NULL, NULL);
INSERT INTO public.cities VALUES (2627, 15, 'Cuité', '2505105', NULL, NULL);
INSERT INTO public.cities VALUES (2628, 15, 'Cuité de Mamanguape', '2505238', NULL, NULL);
INSERT INTO public.cities VALUES (2629, 15, 'Cuitegi', '2505204', NULL, NULL);
INSERT INTO public.cities VALUES (2630, 15, 'Curral de Cima', '2505279', NULL, NULL);
INSERT INTO public.cities VALUES (2631, 15, 'Curral Velho', '2505303', NULL, NULL);
INSERT INTO public.cities VALUES (2632, 15, 'Damião', '2505352', NULL, NULL);
INSERT INTO public.cities VALUES (2633, 15, 'Desterro', '2505402', NULL, NULL);
INSERT INTO public.cities VALUES (2634, 15, 'Diamante', '2505600', NULL, NULL);
INSERT INTO public.cities VALUES (2635, 15, 'Dona Inês', '2505709', NULL, NULL);
INSERT INTO public.cities VALUES (2636, 15, 'Duas Estradas', '2505808', NULL, NULL);
INSERT INTO public.cities VALUES (2637, 15, 'Emas', '2505907', NULL, NULL);
INSERT INTO public.cities VALUES (2638, 15, 'Esperança', '2506004', NULL, NULL);
INSERT INTO public.cities VALUES (2639, 15, 'Fagundes', '2506103', NULL, NULL);
INSERT INTO public.cities VALUES (2640, 15, 'Frei Martinho', '2506202', NULL, NULL);
INSERT INTO public.cities VALUES (2641, 15, 'Gado Bravo', '2506251', NULL, NULL);
INSERT INTO public.cities VALUES (2642, 15, 'Guarabira', '2506301', NULL, NULL);
INSERT INTO public.cities VALUES (2643, 15, 'Gurinhém', '2506400', NULL, NULL);
INSERT INTO public.cities VALUES (2644, 15, 'Gurjão', '2506509', NULL, NULL);
INSERT INTO public.cities VALUES (2645, 15, 'Ibiara', '2506608', NULL, NULL);
INSERT INTO public.cities VALUES (2646, 15, 'Igaracy', '2502607', NULL, NULL);
INSERT INTO public.cities VALUES (2647, 15, 'Imaculada', '2506707', NULL, NULL);
INSERT INTO public.cities VALUES (2648, 15, 'Ingá', '2506806', NULL, NULL);
INSERT INTO public.cities VALUES (2649, 15, 'Itabaiana', '2506905', NULL, NULL);
INSERT INTO public.cities VALUES (2650, 15, 'Itaporanga', '2507002', NULL, NULL);
INSERT INTO public.cities VALUES (2651, 15, 'Itapororoca', '2507101', NULL, NULL);
INSERT INTO public.cities VALUES (2652, 15, 'Itatuba', '2507200', NULL, NULL);
INSERT INTO public.cities VALUES (2653, 15, 'Jacaraú', '2507309', NULL, NULL);
INSERT INTO public.cities VALUES (2654, 15, 'Jericó', '2507408', NULL, NULL);
INSERT INTO public.cities VALUES (2655, 15, 'João Pessoa', '2507507', NULL, NULL);
INSERT INTO public.cities VALUES (2656, 15, 'Juarez Távora', '2507606', NULL, NULL);
INSERT INTO public.cities VALUES (2657, 15, 'Juazeirinho', '2507705', NULL, NULL);
INSERT INTO public.cities VALUES (2658, 15, 'Junco do Seridó', '2507804', NULL, NULL);
INSERT INTO public.cities VALUES (2659, 15, 'Juripiranga', '2507903', NULL, NULL);
INSERT INTO public.cities VALUES (2660, 15, 'Juru', '2508000', NULL, NULL);
INSERT INTO public.cities VALUES (2661, 15, 'Lagoa', '2508109', NULL, NULL);
INSERT INTO public.cities VALUES (2662, 15, 'Lagoa de Dentro', '2508208', NULL, NULL);
INSERT INTO public.cities VALUES (2663, 15, 'Lagoa Seca', '2508307', NULL, NULL);
INSERT INTO public.cities VALUES (2664, 15, 'Lastro', '2508406', NULL, NULL);
INSERT INTO public.cities VALUES (2665, 15, 'Livramento', '2508505', NULL, NULL);
INSERT INTO public.cities VALUES (2666, 15, 'Logradouro', '2508554', NULL, NULL);
INSERT INTO public.cities VALUES (2667, 15, 'Lucena', '2508604', NULL, NULL);
INSERT INTO public.cities VALUES (2668, 15, 'Mãe d''Água', '2508703', NULL, NULL);
INSERT INTO public.cities VALUES (2669, 15, 'Malta', '2508802', NULL, NULL);
INSERT INTO public.cities VALUES (2670, 15, 'Mamanguape', '2508901', NULL, NULL);
INSERT INTO public.cities VALUES (2671, 15, 'Manaíra', '2509008', NULL, NULL);
INSERT INTO public.cities VALUES (2672, 15, 'Marcação', '2509057', NULL, NULL);
INSERT INTO public.cities VALUES (2673, 15, 'Mari', '2509107', NULL, NULL);
INSERT INTO public.cities VALUES (2674, 15, 'Marizópolis', '2509156', NULL, NULL);
INSERT INTO public.cities VALUES (2675, 15, 'Massaranduba', '2509206', NULL, NULL);
INSERT INTO public.cities VALUES (2676, 15, 'Mataraca', '2509305', NULL, NULL);
INSERT INTO public.cities VALUES (2677, 15, 'Matinhas', '2509339', NULL, NULL);
INSERT INTO public.cities VALUES (2678, 15, 'Mato Grosso', '2509370', NULL, NULL);
INSERT INTO public.cities VALUES (2679, 15, 'Maturéia', '2509396', NULL, NULL);
INSERT INTO public.cities VALUES (2680, 15, 'Mogeiro', '2509404', NULL, NULL);
INSERT INTO public.cities VALUES (2681, 15, 'Montadas', '2509503', NULL, NULL);
INSERT INTO public.cities VALUES (2682, 15, 'Monte Horebe', '2509602', NULL, NULL);
INSERT INTO public.cities VALUES (2683, 15, 'Monteiro', '2509701', NULL, NULL);
INSERT INTO public.cities VALUES (2684, 15, 'Mulungu', '2509800', NULL, NULL);
INSERT INTO public.cities VALUES (2685, 15, 'Natuba', '2509909', NULL, NULL);
INSERT INTO public.cities VALUES (2686, 15, 'Nazarezinho', '2510006', NULL, NULL);
INSERT INTO public.cities VALUES (2687, 15, 'Nova Floresta', '2510105', NULL, NULL);
INSERT INTO public.cities VALUES (2688, 15, 'Nova Olinda', '2510204', NULL, NULL);
INSERT INTO public.cities VALUES (2689, 15, 'Nova Palmeira', '2510303', NULL, NULL);
INSERT INTO public.cities VALUES (2690, 15, 'Olho d''Água', '2510402', NULL, NULL);
INSERT INTO public.cities VALUES (2691, 15, 'Olivedos', '2510501', NULL, NULL);
INSERT INTO public.cities VALUES (2692, 15, 'Ouro Velho', '2510600', NULL, NULL);
INSERT INTO public.cities VALUES (2693, 15, 'Parari', '2510659', NULL, NULL);
INSERT INTO public.cities VALUES (2694, 15, 'Passagem', '2510709', NULL, NULL);
INSERT INTO public.cities VALUES (2695, 15, 'Patos', '2510808', NULL, NULL);
INSERT INTO public.cities VALUES (2696, 15, 'Paulista', '2510907', NULL, NULL);
INSERT INTO public.cities VALUES (2697, 15, 'Pedra Branca', '2511004', NULL, NULL);
INSERT INTO public.cities VALUES (2698, 15, 'Pedra Lavrada', '2511103', NULL, NULL);
INSERT INTO public.cities VALUES (2699, 15, 'Pedras de Fogo', '2511202', NULL, NULL);
INSERT INTO public.cities VALUES (2700, 15, 'Pedro Régis', '2512721', NULL, NULL);
INSERT INTO public.cities VALUES (2701, 15, 'Piancó', '2511301', NULL, NULL);
INSERT INTO public.cities VALUES (2702, 15, 'Picuí', '2511400', NULL, NULL);
INSERT INTO public.cities VALUES (2703, 15, 'Pilar', '2511509', NULL, NULL);
INSERT INTO public.cities VALUES (2704, 15, 'Pilões', '2511608', NULL, NULL);
INSERT INTO public.cities VALUES (2705, 15, 'Pilõezinhos', '2511707', NULL, NULL);
INSERT INTO public.cities VALUES (2706, 15, 'Pirpirituba', '2511806', NULL, NULL);
INSERT INTO public.cities VALUES (2707, 15, 'Pitimbu', '2511905', NULL, NULL);
INSERT INTO public.cities VALUES (2708, 15, 'Pocinhos', '2512002', NULL, NULL);
INSERT INTO public.cities VALUES (2709, 15, 'Poço Dantas', '2512036', NULL, NULL);
INSERT INTO public.cities VALUES (2710, 15, 'Poço de José de Moura', '2512077', NULL, NULL);
INSERT INTO public.cities VALUES (2711, 15, 'Pombal', '2512101', NULL, NULL);
INSERT INTO public.cities VALUES (2712, 15, 'Prata', '2512200', NULL, NULL);
INSERT INTO public.cities VALUES (2713, 15, 'Princesa Isabel', '2512309', NULL, NULL);
INSERT INTO public.cities VALUES (2714, 15, 'Puxinanã', '2512408', NULL, NULL);
INSERT INTO public.cities VALUES (2715, 15, 'Queimadas', '2512507', NULL, NULL);
INSERT INTO public.cities VALUES (2716, 15, 'Quixabá', '2512606', NULL, NULL);
INSERT INTO public.cities VALUES (2717, 15, 'Remígio', '2512705', NULL, NULL);
INSERT INTO public.cities VALUES (2718, 15, 'Riachão', '2512747', NULL, NULL);
INSERT INTO public.cities VALUES (2719, 15, 'Riachão do Bacamarte', '2512754', NULL, NULL);
INSERT INTO public.cities VALUES (2720, 15, 'Riachão do Poço', '2512762', NULL, NULL);
INSERT INTO public.cities VALUES (2721, 15, 'Riacho de Santo Antônio', '2512788', NULL, NULL);
INSERT INTO public.cities VALUES (2722, 15, 'Riacho dos Cavalos', '2512804', NULL, NULL);
INSERT INTO public.cities VALUES (2723, 15, 'Rio Tinto', '2512903', NULL, NULL);
INSERT INTO public.cities VALUES (2724, 15, 'Salgadinho', '2513000', NULL, NULL);
INSERT INTO public.cities VALUES (2725, 15, 'Salgado de São Félix', '2513109', NULL, NULL);
INSERT INTO public.cities VALUES (2726, 15, 'Santa Cecília', '2513158', NULL, NULL);
INSERT INTO public.cities VALUES (2727, 15, 'Santa Cruz', '2513208', NULL, NULL);
INSERT INTO public.cities VALUES (2728, 15, 'Santa Helena', '2513307', NULL, NULL);
INSERT INTO public.cities VALUES (2729, 15, 'Santa Inês', '2513356', NULL, NULL);
INSERT INTO public.cities VALUES (2730, 15, 'Santa Luzia', '2513406', NULL, NULL);
INSERT INTO public.cities VALUES (2731, 15, 'Santa Rita', '2513703', NULL, NULL);
INSERT INTO public.cities VALUES (2732, 15, 'Santa Teresinha', '2513802', NULL, NULL);
INSERT INTO public.cities VALUES (2733, 15, 'Santana de Mangueira', '2513505', NULL, NULL);
INSERT INTO public.cities VALUES (2734, 15, 'Santana dos Garrotes', '2513604', NULL, NULL);
INSERT INTO public.cities VALUES (2735, 15, 'Joca Claudino', '2513653', NULL, NULL);
INSERT INTO public.cities VALUES (2736, 15, 'Santo André', '2513851', NULL, NULL);
INSERT INTO public.cities VALUES (2737, 15, 'São Bentinho', '2513927', NULL, NULL);
INSERT INTO public.cities VALUES (2738, 15, 'São Bento', '2513901', NULL, NULL);
INSERT INTO public.cities VALUES (2739, 15, 'São Domingos', '2513968', NULL, NULL);
INSERT INTO public.cities VALUES (2740, 15, 'São Domingos do Cariri', '2513943', NULL, NULL);
INSERT INTO public.cities VALUES (2741, 15, 'São Francisco', '2513984', NULL, NULL);
INSERT INTO public.cities VALUES (2742, 15, 'São João do Cariri', '2514008', NULL, NULL);
INSERT INTO public.cities VALUES (2743, 15, 'São João do Rio do Peixe', '2500700', NULL, NULL);
INSERT INTO public.cities VALUES (2744, 15, 'São João do Tigre', '2514107', NULL, NULL);
INSERT INTO public.cities VALUES (2745, 15, 'São José da Lagoa Tapada', '2514206', NULL, NULL);
INSERT INTO public.cities VALUES (2746, 15, 'São José de Caiana', '2514305', NULL, NULL);
INSERT INTO public.cities VALUES (2747, 15, 'São José de Espinharas', '2514404', NULL, NULL);
INSERT INTO public.cities VALUES (2748, 15, 'São José de Piranhas', '2514503', NULL, NULL);
INSERT INTO public.cities VALUES (2749, 15, 'São José de Princesa', '2514552', NULL, NULL);
INSERT INTO public.cities VALUES (2750, 15, 'São José do Bonfim', '2514602', NULL, NULL);
INSERT INTO public.cities VALUES (2751, 15, 'São José do Brejo do Cruz', '2514651', NULL, NULL);
INSERT INTO public.cities VALUES (2752, 15, 'São José do Sabugi', '2514701', NULL, NULL);
INSERT INTO public.cities VALUES (2753, 15, 'São José dos Cordeiros', '2514800', NULL, NULL);
INSERT INTO public.cities VALUES (2754, 15, 'São José dos Ramos', '2514453', NULL, NULL);
INSERT INTO public.cities VALUES (2755, 15, 'São Mamede', '2514909', NULL, NULL);
INSERT INTO public.cities VALUES (2756, 15, 'São Miguel de Taipu', '2515005', NULL, NULL);
INSERT INTO public.cities VALUES (2757, 15, 'São Sebastião de Lagoa de Roça', '2515104', NULL, NULL);
INSERT INTO public.cities VALUES (2758, 15, 'São Sebastião do Umbuzeiro', '2515203', NULL, NULL);
INSERT INTO public.cities VALUES (2759, 15, 'Sapé', '2515302', NULL, NULL);
INSERT INTO public.cities VALUES (2760, 15, 'Seridó', '2515401', NULL, NULL);
INSERT INTO public.cities VALUES (2761, 15, 'Serra Branca', '2515500', NULL, NULL);
INSERT INTO public.cities VALUES (2762, 15, 'Serra da Raiz', '2515609', NULL, NULL);
INSERT INTO public.cities VALUES (2763, 15, 'Serra Grande', '2515708', NULL, NULL);
INSERT INTO public.cities VALUES (2764, 15, 'Serra Redonda', '2515807', NULL, NULL);
INSERT INTO public.cities VALUES (2765, 15, 'Serraria', '2515906', NULL, NULL);
INSERT INTO public.cities VALUES (2766, 15, 'Sertãozinho', '2515930', NULL, NULL);
INSERT INTO public.cities VALUES (2767, 15, 'Sobrado', '2515971', NULL, NULL);
INSERT INTO public.cities VALUES (2768, 15, 'Solânea', '2516003', NULL, NULL);
INSERT INTO public.cities VALUES (2769, 15, 'Soledade', '2516102', NULL, NULL);
INSERT INTO public.cities VALUES (2770, 15, 'Sossêgo', '2516151', NULL, NULL);
INSERT INTO public.cities VALUES (2771, 15, 'Sousa', '2516201', NULL, NULL);
INSERT INTO public.cities VALUES (2772, 15, 'Sumé', '2516300', NULL, NULL);
INSERT INTO public.cities VALUES (2773, 15, 'Taperoá', '2516508', NULL, NULL);
INSERT INTO public.cities VALUES (2774, 15, 'Tavares', '2516607', NULL, NULL);
INSERT INTO public.cities VALUES (2775, 15, 'Teixeira', '2516706', NULL, NULL);
INSERT INTO public.cities VALUES (2776, 15, 'Tenório', '2516755', NULL, NULL);
INSERT INTO public.cities VALUES (2777, 15, 'Triunfo', '2516805', NULL, NULL);
INSERT INTO public.cities VALUES (2778, 15, 'Uiraúna', '2516904', NULL, NULL);
INSERT INTO public.cities VALUES (2779, 15, 'Umbuzeiro', '2517001', NULL, NULL);
INSERT INTO public.cities VALUES (2780, 15, 'Várzea', '2517100', NULL, NULL);
INSERT INTO public.cities VALUES (2781, 15, 'Vieirópolis', '2517209', NULL, NULL);
INSERT INTO public.cities VALUES (2782, 15, 'Vista Serrana', '2505501', NULL, NULL);
INSERT INTO public.cities VALUES (2783, 15, 'Zabelê', '2517407', NULL, NULL);
INSERT INTO public.cities VALUES (2784, 16, 'Abatiá', '4100103', NULL, NULL);
INSERT INTO public.cities VALUES (2785, 16, 'Adrianópolis', '4100202', NULL, NULL);
INSERT INTO public.cities VALUES (2786, 16, 'Agudos do Sul', '4100301', NULL, NULL);
INSERT INTO public.cities VALUES (2787, 16, 'Almirante Tamandaré', '4100400', NULL, NULL);
INSERT INTO public.cities VALUES (2788, 16, 'Altamira do Paraná', '4100459', NULL, NULL);
INSERT INTO public.cities VALUES (2789, 16, 'Alto Paraíso', '4128625', NULL, NULL);
INSERT INTO public.cities VALUES (2790, 16, 'Alto Paraná', '4100608', NULL, NULL);
INSERT INTO public.cities VALUES (2791, 16, 'Alto Piquiri', '4100707', NULL, NULL);
INSERT INTO public.cities VALUES (2792, 16, 'Altônia', '4100509', NULL, NULL);
INSERT INTO public.cities VALUES (2793, 16, 'Alvorada do Sul', '4100806', NULL, NULL);
INSERT INTO public.cities VALUES (2794, 16, 'Amaporã', '4100905', NULL, NULL);
INSERT INTO public.cities VALUES (2795, 16, 'Ampére', '4101002', NULL, NULL);
INSERT INTO public.cities VALUES (2796, 16, 'Anahy', '4101051', NULL, NULL);
INSERT INTO public.cities VALUES (2797, 16, 'Andirá', '4101101', NULL, NULL);
INSERT INTO public.cities VALUES (2798, 16, 'Ângulo', '4101150', NULL, NULL);
INSERT INTO public.cities VALUES (2799, 16, 'Antonina', '4101200', NULL, NULL);
INSERT INTO public.cities VALUES (2800, 16, 'Antônio Olinto', '4101309', NULL, NULL);
INSERT INTO public.cities VALUES (2801, 16, 'Apucarana', '4101408', NULL, NULL);
INSERT INTO public.cities VALUES (2802, 16, 'Arapongas', '4101507', NULL, NULL);
INSERT INTO public.cities VALUES (2803, 16, 'Arapoti', '4101606', NULL, NULL);
INSERT INTO public.cities VALUES (2804, 16, 'Arapuã', '4101655', NULL, NULL);
INSERT INTO public.cities VALUES (2805, 16, 'Araruna', '4101705', NULL, NULL);
INSERT INTO public.cities VALUES (2806, 16, 'Araucária', '4101804', NULL, NULL);
INSERT INTO public.cities VALUES (2807, 16, 'Ariranha do Ivaí', '4101853', NULL, NULL);
INSERT INTO public.cities VALUES (2808, 16, 'Assaí', '4101903', NULL, NULL);
INSERT INTO public.cities VALUES (2809, 16, 'Assis Chateaubriand', '4102000', NULL, NULL);
INSERT INTO public.cities VALUES (2810, 16, 'Astorga', '4102109', NULL, NULL);
INSERT INTO public.cities VALUES (2811, 16, 'Atalaia', '4102208', NULL, NULL);
INSERT INTO public.cities VALUES (2812, 16, 'Balsa Nova', '4102307', NULL, NULL);
INSERT INTO public.cities VALUES (2813, 16, 'Bandeirantes', '4102406', NULL, NULL);
INSERT INTO public.cities VALUES (2814, 16, 'Barbosa Ferraz', '4102505', NULL, NULL);
INSERT INTO public.cities VALUES (2815, 16, 'Barra do Jacaré', '4102703', NULL, NULL);
INSERT INTO public.cities VALUES (2816, 16, 'Barracão', '4102604', NULL, NULL);
INSERT INTO public.cities VALUES (2817, 16, 'Bela Vista da Caroba', '4102752', NULL, NULL);
INSERT INTO public.cities VALUES (2818, 16, 'Bela Vista do Paraíso', '4102802', NULL, NULL);
INSERT INTO public.cities VALUES (2819, 16, 'Bituruna', '4102901', NULL, NULL);
INSERT INTO public.cities VALUES (2820, 16, 'Boa Esperança', '4103008', NULL, NULL);
INSERT INTO public.cities VALUES (2821, 16, 'Boa Esperança do Iguaçu', '4103024', NULL, NULL);
INSERT INTO public.cities VALUES (2822, 16, 'Boa Ventura de São Roque', '4103040', NULL, NULL);
INSERT INTO public.cities VALUES (2823, 16, 'Boa Vista da Aparecida', '4103057', NULL, NULL);
INSERT INTO public.cities VALUES (2824, 16, 'Bocaiúva do Sul', '4103107', NULL, NULL);
INSERT INTO public.cities VALUES (2825, 16, 'Bom Jesus do Sul', '4103156', NULL, NULL);
INSERT INTO public.cities VALUES (2826, 16, 'Bom Sucesso', '4103206', NULL, NULL);
INSERT INTO public.cities VALUES (2827, 16, 'Bom Sucesso do Sul', '4103222', NULL, NULL);
INSERT INTO public.cities VALUES (2828, 16, 'Borrazópolis', '4103305', NULL, NULL);
INSERT INTO public.cities VALUES (2829, 16, 'Braganey', '4103354', NULL, NULL);
INSERT INTO public.cities VALUES (2830, 16, 'Brasilândia do Sul', '4103370', NULL, NULL);
INSERT INTO public.cities VALUES (2831, 16, 'Cafeara', '4103404', NULL, NULL);
INSERT INTO public.cities VALUES (2832, 16, 'Cafelândia', '4103453', NULL, NULL);
INSERT INTO public.cities VALUES (2833, 16, 'Cafezal do Sul', '4103479', NULL, NULL);
INSERT INTO public.cities VALUES (2834, 16, 'Califórnia', '4103503', NULL, NULL);
INSERT INTO public.cities VALUES (2835, 16, 'Cambará', '4103602', NULL, NULL);
INSERT INTO public.cities VALUES (2836, 16, 'Cambé', '4103701', NULL, NULL);
INSERT INTO public.cities VALUES (2837, 16, 'Cambira', '4103800', NULL, NULL);
INSERT INTO public.cities VALUES (2838, 16, 'Campina da Lagoa', '4103909', NULL, NULL);
INSERT INTO public.cities VALUES (2839, 16, 'Campina do Simão', '4103958', NULL, NULL);
INSERT INTO public.cities VALUES (2840, 16, 'Campina Grande do Sul', '4104006', NULL, NULL);
INSERT INTO public.cities VALUES (2841, 16, 'Campo Bonito', '4104055', NULL, NULL);
INSERT INTO public.cities VALUES (2842, 16, 'Campo do Tenente', '4104105', NULL, NULL);
INSERT INTO public.cities VALUES (2843, 16, 'Campo Largo', '4104204', NULL, NULL);
INSERT INTO public.cities VALUES (2844, 16, 'Campo Magro', '4104253', NULL, NULL);
INSERT INTO public.cities VALUES (2845, 16, 'Campo Mourão', '4104303', NULL, NULL);
INSERT INTO public.cities VALUES (2846, 16, 'Cândido de Abreu', '4104402', NULL, NULL);
INSERT INTO public.cities VALUES (2847, 16, 'Candói', '4104428', NULL, NULL);
INSERT INTO public.cities VALUES (2848, 16, 'Cantagalo', '4104451', NULL, NULL);
INSERT INTO public.cities VALUES (2849, 16, 'Capanema', '4104501', NULL, NULL);
INSERT INTO public.cities VALUES (2850, 16, 'Capitão Leônidas Marques', '4104600', NULL, NULL);
INSERT INTO public.cities VALUES (2851, 16, 'Carambeí', '4104659', NULL, NULL);
INSERT INTO public.cities VALUES (2852, 16, 'Carlópolis', '4104709', NULL, NULL);
INSERT INTO public.cities VALUES (2853, 16, 'Cascavel', '4104808', NULL, NULL);
INSERT INTO public.cities VALUES (2854, 16, 'Castro', '4104907', NULL, NULL);
INSERT INTO public.cities VALUES (2855, 16, 'Catanduvas', '4105003', NULL, NULL);
INSERT INTO public.cities VALUES (2856, 16, 'Centenário do Sul', '4105102', NULL, NULL);
INSERT INTO public.cities VALUES (2857, 16, 'Cerro Azul', '4105201', NULL, NULL);
INSERT INTO public.cities VALUES (2858, 16, 'Céu Azul', '4105300', NULL, NULL);
INSERT INTO public.cities VALUES (2859, 16, 'Chopinzinho', '4105409', NULL, NULL);
INSERT INTO public.cities VALUES (2860, 16, 'Cianorte', '4105508', NULL, NULL);
INSERT INTO public.cities VALUES (2861, 16, 'Cidade Gaúcha', '4105607', NULL, NULL);
INSERT INTO public.cities VALUES (2862, 16, 'Clevelândia', '4105706', NULL, NULL);
INSERT INTO public.cities VALUES (2863, 16, 'Colombo', '4105805', NULL, NULL);
INSERT INTO public.cities VALUES (2864, 16, 'Colorado', '4105904', NULL, NULL);
INSERT INTO public.cities VALUES (2865, 16, 'Congonhinhas', '4106001', NULL, NULL);
INSERT INTO public.cities VALUES (2866, 16, 'Conselheiro Mairinck', '4106100', NULL, NULL);
INSERT INTO public.cities VALUES (2867, 16, 'Contenda', '4106209', NULL, NULL);
INSERT INTO public.cities VALUES (2868, 16, 'Corbélia', '4106308', NULL, NULL);
INSERT INTO public.cities VALUES (2869, 16, 'Cornélio Procópio', '4106407', NULL, NULL);
INSERT INTO public.cities VALUES (2870, 16, 'Coronel Domingos Soares', '4106456', NULL, NULL);
INSERT INTO public.cities VALUES (2871, 16, 'Coronel Vivida', '4106506', NULL, NULL);
INSERT INTO public.cities VALUES (2872, 16, 'Corumbataí do Sul', '4106555', NULL, NULL);
INSERT INTO public.cities VALUES (2873, 16, 'Cruz Machado', '4106803', NULL, NULL);
INSERT INTO public.cities VALUES (2874, 16, 'Cruzeiro do Iguaçu', '4106571', NULL, NULL);
INSERT INTO public.cities VALUES (2875, 16, 'Cruzeiro do Oeste', '4106605', NULL, NULL);
INSERT INTO public.cities VALUES (2876, 16, 'Cruzeiro do Sul', '4106704', NULL, NULL);
INSERT INTO public.cities VALUES (2877, 16, 'Cruzmaltina', '4106852', NULL, NULL);
INSERT INTO public.cities VALUES (2878, 16, 'Curitiba', '4106902', NULL, NULL);
INSERT INTO public.cities VALUES (2879, 16, 'Curiúva', '4107009', NULL, NULL);
INSERT INTO public.cities VALUES (2880, 16, 'Diamante do Norte', '4107108', NULL, NULL);
INSERT INTO public.cities VALUES (2881, 16, 'Diamante do Sul', '4107124', NULL, NULL);
INSERT INTO public.cities VALUES (2882, 16, 'Diamante D''Oeste', '4107157', NULL, NULL);
INSERT INTO public.cities VALUES (2883, 16, 'Dois Vizinhos', '4107207', NULL, NULL);
INSERT INTO public.cities VALUES (2884, 16, 'Douradina', '4107256', NULL, NULL);
INSERT INTO public.cities VALUES (2885, 16, 'Doutor Camargo', '4107306', NULL, NULL);
INSERT INTO public.cities VALUES (2886, 16, 'Doutor Ulysses', '4128633', NULL, NULL);
INSERT INTO public.cities VALUES (2887, 16, 'Enéas Marques', '4107405', NULL, NULL);
INSERT INTO public.cities VALUES (2888, 16, 'Engenheiro Beltrão', '4107504', NULL, NULL);
INSERT INTO public.cities VALUES (2889, 16, 'Entre Rios do Oeste', '4107538', NULL, NULL);
INSERT INTO public.cities VALUES (2890, 16, 'Esperança Nova', '4107520', NULL, NULL);
INSERT INTO public.cities VALUES (2891, 16, 'Espigão Alto do Iguaçu', '4107546', NULL, NULL);
INSERT INTO public.cities VALUES (2892, 16, 'Farol', '4107553', NULL, NULL);
INSERT INTO public.cities VALUES (2893, 16, 'Faxinal', '4107603', NULL, NULL);
INSERT INTO public.cities VALUES (2894, 16, 'Fazenda Rio Grande', '4107652', NULL, NULL);
INSERT INTO public.cities VALUES (2895, 16, 'Fênix', '4107702', NULL, NULL);
INSERT INTO public.cities VALUES (2896, 16, 'Fernandes Pinheiro', '4107736', NULL, NULL);
INSERT INTO public.cities VALUES (2897, 16, 'Figueira', '4107751', NULL, NULL);
INSERT INTO public.cities VALUES (2898, 16, 'Flor da Serra do Sul', '4107850', NULL, NULL);
INSERT INTO public.cities VALUES (2899, 16, 'Floraí', '4107801', NULL, NULL);
INSERT INTO public.cities VALUES (2900, 16, 'Floresta', '4107900', NULL, NULL);
INSERT INTO public.cities VALUES (2901, 16, 'Florestópolis', '4108007', NULL, NULL);
INSERT INTO public.cities VALUES (2902, 16, 'Flórida', '4108106', NULL, NULL);
INSERT INTO public.cities VALUES (2903, 16, 'Formosa do Oeste', '4108205', NULL, NULL);
INSERT INTO public.cities VALUES (2904, 16, 'Foz do Iguaçu', '4108304', NULL, NULL);
INSERT INTO public.cities VALUES (2905, 16, 'Foz do Jordão', '4108452', NULL, NULL);
INSERT INTO public.cities VALUES (2906, 16, 'Francisco Alves', '4108320', NULL, NULL);
INSERT INTO public.cities VALUES (2907, 16, 'Francisco Beltrão', '4108403', NULL, NULL);
INSERT INTO public.cities VALUES (2908, 16, 'General Carneiro', '4108502', NULL, NULL);
INSERT INTO public.cities VALUES (2909, 16, 'Godoy Moreira', '4108551', NULL, NULL);
INSERT INTO public.cities VALUES (2910, 16, 'Goioerê', '4108601', NULL, NULL);
INSERT INTO public.cities VALUES (2911, 16, 'Goioxim', '4108650', NULL, NULL);
INSERT INTO public.cities VALUES (2912, 16, 'Grandes Rios', '4108700', NULL, NULL);
INSERT INTO public.cities VALUES (2913, 16, 'Guaíra', '4108809', NULL, NULL);
INSERT INTO public.cities VALUES (2914, 16, 'Guairaçá', '4108908', NULL, NULL);
INSERT INTO public.cities VALUES (2915, 16, 'Guamiranga', '4108957', NULL, NULL);
INSERT INTO public.cities VALUES (2916, 16, 'Guapirama', '4109005', NULL, NULL);
INSERT INTO public.cities VALUES (2917, 16, 'Guaporema', '4109104', NULL, NULL);
INSERT INTO public.cities VALUES (2918, 16, 'Guaraci', '4109203', NULL, NULL);
INSERT INTO public.cities VALUES (2919, 16, 'Guaraniaçu', '4109302', NULL, NULL);
INSERT INTO public.cities VALUES (2920, 16, 'Guarapuava', '4109401', NULL, NULL);
INSERT INTO public.cities VALUES (2921, 16, 'Guaraqueçaba', '4109500', NULL, NULL);
INSERT INTO public.cities VALUES (2922, 16, 'Guaratuba', '4109609', NULL, NULL);
INSERT INTO public.cities VALUES (2923, 16, 'Honório Serpa', '4109658', NULL, NULL);
INSERT INTO public.cities VALUES (2924, 16, 'Ibaiti', '4109708', NULL, NULL);
INSERT INTO public.cities VALUES (2925, 16, 'Ibema', '4109757', NULL, NULL);
INSERT INTO public.cities VALUES (2926, 16, 'Ibiporã', '4109807', NULL, NULL);
INSERT INTO public.cities VALUES (2927, 16, 'Icaraíma', '4109906', NULL, NULL);
INSERT INTO public.cities VALUES (2928, 16, 'Iguaraçu', '4110003', NULL, NULL);
INSERT INTO public.cities VALUES (2929, 16, 'Iguatu', '4110052', NULL, NULL);
INSERT INTO public.cities VALUES (2930, 16, 'Imbaú', '4110078', NULL, NULL);
INSERT INTO public.cities VALUES (2931, 16, 'Imbituva', '4110102', NULL, NULL);
INSERT INTO public.cities VALUES (2932, 16, 'Inácio Martins', '4110201', NULL, NULL);
INSERT INTO public.cities VALUES (2933, 16, 'Inajá', '4110300', NULL, NULL);
INSERT INTO public.cities VALUES (2934, 16, 'Indianópolis', '4110409', NULL, NULL);
INSERT INTO public.cities VALUES (2935, 16, 'Ipiranga', '4110508', NULL, NULL);
INSERT INTO public.cities VALUES (2936, 16, 'Iporã', '4110607', NULL, NULL);
INSERT INTO public.cities VALUES (2937, 16, 'Iracema do Oeste', '4110656', NULL, NULL);
INSERT INTO public.cities VALUES (2938, 16, 'Irati', '4110706', NULL, NULL);
INSERT INTO public.cities VALUES (2939, 16, 'Iretama', '4110805', NULL, NULL);
INSERT INTO public.cities VALUES (2940, 16, 'Itaguajé', '4110904', NULL, NULL);
INSERT INTO public.cities VALUES (2941, 16, 'Itaipulândia', '4110953', NULL, NULL);
INSERT INTO public.cities VALUES (2942, 16, 'Itambaracá', '4111001', NULL, NULL);
INSERT INTO public.cities VALUES (2943, 16, 'Itambé', '4111100', NULL, NULL);
INSERT INTO public.cities VALUES (2944, 16, 'Itapejara d''Oeste', '4111209', NULL, NULL);
INSERT INTO public.cities VALUES (2945, 16, 'Itaperuçu', '4111258', NULL, NULL);
INSERT INTO public.cities VALUES (2946, 16, 'Itaúna do Sul', '4111308', NULL, NULL);
INSERT INTO public.cities VALUES (2947, 16, 'Ivaí', '4111407', NULL, NULL);
INSERT INTO public.cities VALUES (2948, 16, 'Ivaiporã', '4111506', NULL, NULL);
INSERT INTO public.cities VALUES (2949, 16, 'Ivaté', '4111555', NULL, NULL);
INSERT INTO public.cities VALUES (2950, 16, 'Ivatuba', '4111605', NULL, NULL);
INSERT INTO public.cities VALUES (2951, 16, 'Jaboti', '4111704', NULL, NULL);
INSERT INTO public.cities VALUES (2952, 16, 'Jacarezinho', '4111803', NULL, NULL);
INSERT INTO public.cities VALUES (2953, 16, 'Jaguapitã', '4111902', NULL, NULL);
INSERT INTO public.cities VALUES (2954, 16, 'Jaguariaíva', '4112009', NULL, NULL);
INSERT INTO public.cities VALUES (2955, 16, 'Jandaia do Sul', '4112108', NULL, NULL);
INSERT INTO public.cities VALUES (2956, 16, 'Janiópolis', '4112207', NULL, NULL);
INSERT INTO public.cities VALUES (2957, 16, 'Japira', '4112306', NULL, NULL);
INSERT INTO public.cities VALUES (2958, 16, 'Japurá', '4112405', NULL, NULL);
INSERT INTO public.cities VALUES (2959, 16, 'Jardim Alegre', '4112504', NULL, NULL);
INSERT INTO public.cities VALUES (2960, 16, 'Jardim Olinda', '4112603', NULL, NULL);
INSERT INTO public.cities VALUES (2961, 16, 'Jataizinho', '4112702', NULL, NULL);
INSERT INTO public.cities VALUES (2962, 16, 'Jesuítas', '4112751', NULL, NULL);
INSERT INTO public.cities VALUES (2963, 16, 'Joaquim Távora', '4112801', NULL, NULL);
INSERT INTO public.cities VALUES (2964, 16, 'Jundiaí do Sul', '4112900', NULL, NULL);
INSERT INTO public.cities VALUES (2965, 16, 'Juranda', '4112959', NULL, NULL);
INSERT INTO public.cities VALUES (2966, 16, 'Jussara', '4113007', NULL, NULL);
INSERT INTO public.cities VALUES (2967, 16, 'Kaloré', '4113106', NULL, NULL);
INSERT INTO public.cities VALUES (2968, 16, 'Lapa', '4113205', NULL, NULL);
INSERT INTO public.cities VALUES (2969, 16, 'Laranjal', '4113254', NULL, NULL);
INSERT INTO public.cities VALUES (2970, 16, 'Laranjeiras do Sul', '4113304', NULL, NULL);
INSERT INTO public.cities VALUES (2971, 16, 'Leópolis', '4113403', NULL, NULL);
INSERT INTO public.cities VALUES (2972, 16, 'Lidianópolis', '4113429', NULL, NULL);
INSERT INTO public.cities VALUES (2973, 16, 'Lindoeste', '4113452', NULL, NULL);
INSERT INTO public.cities VALUES (2974, 16, 'Loanda', '4113502', NULL, NULL);
INSERT INTO public.cities VALUES (2975, 16, 'Lobato', '4113601', NULL, NULL);
INSERT INTO public.cities VALUES (2976, 16, 'Londrina', '4113700', NULL, NULL);
INSERT INTO public.cities VALUES (2977, 16, 'Luiziana', '4113734', NULL, NULL);
INSERT INTO public.cities VALUES (2978, 16, 'Lunardelli', '4113759', NULL, NULL);
INSERT INTO public.cities VALUES (2979, 16, 'Lupionópolis', '4113809', NULL, NULL);
INSERT INTO public.cities VALUES (2980, 16, 'Mallet', '4113908', NULL, NULL);
INSERT INTO public.cities VALUES (2981, 16, 'Mamborê', '4114005', NULL, NULL);
INSERT INTO public.cities VALUES (2982, 16, 'Mandaguaçu', '4114104', NULL, NULL);
INSERT INTO public.cities VALUES (2983, 16, 'Mandaguari', '4114203', NULL, NULL);
INSERT INTO public.cities VALUES (2984, 16, 'Mandirituba', '4114302', NULL, NULL);
INSERT INTO public.cities VALUES (2985, 16, 'Manfrinópolis', '4114351', NULL, NULL);
INSERT INTO public.cities VALUES (2986, 16, 'Mangueirinha', '4114401', NULL, NULL);
INSERT INTO public.cities VALUES (2987, 16, 'Manoel Ribas', '4114500', NULL, NULL);
INSERT INTO public.cities VALUES (2988, 16, 'Marechal Cândido Rondon', '4114609', NULL, NULL);
INSERT INTO public.cities VALUES (2989, 16, 'Maria Helena', '4114708', NULL, NULL);
INSERT INTO public.cities VALUES (2990, 16, 'Marialva', '4114807', NULL, NULL);
INSERT INTO public.cities VALUES (2991, 16, 'Marilândia do Sul', '4114906', NULL, NULL);
INSERT INTO public.cities VALUES (2992, 16, 'Marilena', '4115002', NULL, NULL);
INSERT INTO public.cities VALUES (2993, 16, 'Mariluz', '4115101', NULL, NULL);
INSERT INTO public.cities VALUES (2994, 16, 'Maringá', '4115200', NULL, NULL);
INSERT INTO public.cities VALUES (2995, 16, 'Mariópolis', '4115309', NULL, NULL);
INSERT INTO public.cities VALUES (2996, 16, 'Maripá', '4115358', NULL, NULL);
INSERT INTO public.cities VALUES (2997, 16, 'Marmeleiro', '4115408', NULL, NULL);
INSERT INTO public.cities VALUES (2998, 16, 'Marquinho', '4115457', NULL, NULL);
INSERT INTO public.cities VALUES (2999, 16, 'Marumbi', '4115507', NULL, NULL);
INSERT INTO public.cities VALUES (3000, 16, 'Matelândia', '4115606', NULL, NULL);
INSERT INTO public.cities VALUES (3001, 16, 'Matinhos', '4115705', NULL, NULL);
INSERT INTO public.cities VALUES (3002, 16, 'Mato Rico', '4115739', NULL, NULL);
INSERT INTO public.cities VALUES (3003, 16, 'Mauá da Serra', '4115754', NULL, NULL);
INSERT INTO public.cities VALUES (3004, 16, 'Medianeira', '4115804', NULL, NULL);
INSERT INTO public.cities VALUES (3005, 16, 'Mercedes', '4115853', NULL, NULL);
INSERT INTO public.cities VALUES (3006, 16, 'Mirador', '4115903', NULL, NULL);
INSERT INTO public.cities VALUES (3007, 16, 'Miraselva', '4116000', NULL, NULL);
INSERT INTO public.cities VALUES (3008, 16, 'Missal', '4116059', NULL, NULL);
INSERT INTO public.cities VALUES (3009, 16, 'Moreira Sales', '4116109', NULL, NULL);
INSERT INTO public.cities VALUES (3010, 16, 'Morretes', '4116208', NULL, NULL);
INSERT INTO public.cities VALUES (3011, 16, 'Munhoz de Melo', '4116307', NULL, NULL);
INSERT INTO public.cities VALUES (3012, 16, 'Nossa Senhora das Graças', '4116406', NULL, NULL);
INSERT INTO public.cities VALUES (3013, 16, 'Nova Aliança do Ivaí', '4116505', NULL, NULL);
INSERT INTO public.cities VALUES (3014, 16, 'Nova América da Colina', '4116604', NULL, NULL);
INSERT INTO public.cities VALUES (3015, 16, 'Nova Aurora', '4116703', NULL, NULL);
INSERT INTO public.cities VALUES (3016, 16, 'Nova Cantu', '4116802', NULL, NULL);
INSERT INTO public.cities VALUES (3017, 16, 'Nova Esperança', '4116901', NULL, NULL);
INSERT INTO public.cities VALUES (3018, 16, 'Nova Esperança do Sudoeste', '4116950', NULL, NULL);
INSERT INTO public.cities VALUES (3019, 16, 'Nova Fátima', '4117008', NULL, NULL);
INSERT INTO public.cities VALUES (3020, 16, 'Nova Laranjeiras', '4117057', NULL, NULL);
INSERT INTO public.cities VALUES (3021, 16, 'Nova Londrina', '4117107', NULL, NULL);
INSERT INTO public.cities VALUES (3022, 16, 'Nova Olímpia', '4117206', NULL, NULL);
INSERT INTO public.cities VALUES (3023, 16, 'Nova Prata do Iguaçu', '4117255', NULL, NULL);
INSERT INTO public.cities VALUES (3024, 16, 'Nova Santa Bárbara', '4117214', NULL, NULL);
INSERT INTO public.cities VALUES (3025, 16, 'Nova Santa Rosa', '4117222', NULL, NULL);
INSERT INTO public.cities VALUES (3026, 16, 'Nova Tebas', '4117271', NULL, NULL);
INSERT INTO public.cities VALUES (3027, 16, 'Novo Itacolomi', '4117297', NULL, NULL);
INSERT INTO public.cities VALUES (3028, 16, 'Ortigueira', '4117305', NULL, NULL);
INSERT INTO public.cities VALUES (3029, 16, 'Ourizona', '4117404', NULL, NULL);
INSERT INTO public.cities VALUES (3030, 16, 'Ouro Verde do Oeste', '4117453', NULL, NULL);
INSERT INTO public.cities VALUES (3031, 16, 'Paiçandu', '4117503', NULL, NULL);
INSERT INTO public.cities VALUES (3032, 16, 'Palmas', '4117602', NULL, NULL);
INSERT INTO public.cities VALUES (3033, 16, 'Palmeira', '4117701', NULL, NULL);
INSERT INTO public.cities VALUES (3034, 16, 'Palmital', '4117800', NULL, NULL);
INSERT INTO public.cities VALUES (3035, 16, 'Palotina', '4117909', NULL, NULL);
INSERT INTO public.cities VALUES (3036, 16, 'Paraíso do Norte', '4118006', NULL, NULL);
INSERT INTO public.cities VALUES (3037, 16, 'Paranacity', '4118105', NULL, NULL);
INSERT INTO public.cities VALUES (3038, 16, 'Paranaguá', '4118204', NULL, NULL);
INSERT INTO public.cities VALUES (3039, 16, 'Paranapoema', '4118303', NULL, NULL);
INSERT INTO public.cities VALUES (3040, 16, 'Paranavaí', '4118402', NULL, NULL);
INSERT INTO public.cities VALUES (3041, 16, 'Pato Bragado', '4118451', NULL, NULL);
INSERT INTO public.cities VALUES (3042, 16, 'Pato Branco', '4118501', NULL, NULL);
INSERT INTO public.cities VALUES (3043, 16, 'Paula Freitas', '4118600', NULL, NULL);
INSERT INTO public.cities VALUES (3044, 16, 'Paulo Frontin', '4118709', NULL, NULL);
INSERT INTO public.cities VALUES (3045, 16, 'Peabiru', '4118808', NULL, NULL);
INSERT INTO public.cities VALUES (3046, 16, 'Perobal', '4118857', NULL, NULL);
INSERT INTO public.cities VALUES (3047, 16, 'Pérola', '4118907', NULL, NULL);
INSERT INTO public.cities VALUES (3048, 16, 'Pérola d''Oeste', '4119004', NULL, NULL);
INSERT INTO public.cities VALUES (3049, 16, 'Piên', '4119103', NULL, NULL);
INSERT INTO public.cities VALUES (3050, 16, 'Pinhais', '4119152', NULL, NULL);
INSERT INTO public.cities VALUES (3051, 16, 'Pinhal de São Bento', '4119251', NULL, NULL);
INSERT INTO public.cities VALUES (3052, 16, 'Pinhalão', '4119202', NULL, NULL);
INSERT INTO public.cities VALUES (3053, 16, 'Pinhão', '4119301', NULL, NULL);
INSERT INTO public.cities VALUES (3054, 16, 'Piraí do Sul', '4119400', NULL, NULL);
INSERT INTO public.cities VALUES (3055, 16, 'Piraquara', '4119509', NULL, NULL);
INSERT INTO public.cities VALUES (3056, 16, 'Pitanga', '4119608', NULL, NULL);
INSERT INTO public.cities VALUES (3057, 16, 'Pitangueiras', '4119657', NULL, NULL);
INSERT INTO public.cities VALUES (3058, 16, 'Planaltina do Paraná', '4119707', NULL, NULL);
INSERT INTO public.cities VALUES (3059, 16, 'Planalto', '4119806', NULL, NULL);
INSERT INTO public.cities VALUES (3060, 16, 'Ponta Grossa', '4119905', NULL, NULL);
INSERT INTO public.cities VALUES (3061, 16, 'Pontal do Paraná', '4119954', NULL, NULL);
INSERT INTO public.cities VALUES (3062, 16, 'Porecatu', '4120002', NULL, NULL);
INSERT INTO public.cities VALUES (3063, 16, 'Porto Amazonas', '4120101', NULL, NULL);
INSERT INTO public.cities VALUES (3064, 16, 'Porto Barreiro', '4120150', NULL, NULL);
INSERT INTO public.cities VALUES (3065, 16, 'Porto Rico', '4120200', NULL, NULL);
INSERT INTO public.cities VALUES (3066, 16, 'Porto Vitória', '4120309', NULL, NULL);
INSERT INTO public.cities VALUES (3067, 16, 'Prado Ferreira', '4120333', NULL, NULL);
INSERT INTO public.cities VALUES (3068, 16, 'Pranchita', '4120358', NULL, NULL);
INSERT INTO public.cities VALUES (3069, 16, 'Presidente Castelo Branco', '4120408', NULL, NULL);
INSERT INTO public.cities VALUES (3070, 16, 'Primeiro de Maio', '4120507', NULL, NULL);
INSERT INTO public.cities VALUES (3071, 16, 'Prudentópolis', '4120606', NULL, NULL);
INSERT INTO public.cities VALUES (3072, 16, 'Quarto Centenário', '4120655', NULL, NULL);
INSERT INTO public.cities VALUES (3073, 16, 'Quatiguá', '4120705', NULL, NULL);
INSERT INTO public.cities VALUES (3074, 16, 'Quatro Barras', '4120804', NULL, NULL);
INSERT INTO public.cities VALUES (3075, 16, 'Quatro Pontes', '4120853', NULL, NULL);
INSERT INTO public.cities VALUES (3076, 16, 'Quedas do Iguaçu', '4120903', NULL, NULL);
INSERT INTO public.cities VALUES (3077, 16, 'Querência do Norte', '4121000', NULL, NULL);
INSERT INTO public.cities VALUES (3078, 16, 'Quinta do Sol', '4121109', NULL, NULL);
INSERT INTO public.cities VALUES (3079, 16, 'Quitandinha', '4121208', NULL, NULL);
INSERT INTO public.cities VALUES (3080, 16, 'Ramilândia', '4121257', NULL, NULL);
INSERT INTO public.cities VALUES (3081, 16, 'Rancho Alegre', '4121307', NULL, NULL);
INSERT INTO public.cities VALUES (3082, 16, 'Rancho Alegre D''Oeste', '4121356', NULL, NULL);
INSERT INTO public.cities VALUES (3083, 16, 'Realeza', '4121406', NULL, NULL);
INSERT INTO public.cities VALUES (3084, 16, 'Rebouças', '4121505', NULL, NULL);
INSERT INTO public.cities VALUES (3085, 16, 'Renascença', '4121604', NULL, NULL);
INSERT INTO public.cities VALUES (3086, 16, 'Reserva', '4121703', NULL, NULL);
INSERT INTO public.cities VALUES (3087, 16, 'Reserva do Iguaçu', '4121752', NULL, NULL);
INSERT INTO public.cities VALUES (3088, 16, 'Ribeirão Claro', '4121802', NULL, NULL);
INSERT INTO public.cities VALUES (3089, 16, 'Ribeirão do Pinhal', '4121901', NULL, NULL);
INSERT INTO public.cities VALUES (3090, 16, 'Rio Azul', '4122008', NULL, NULL);
INSERT INTO public.cities VALUES (3091, 16, 'Rio Bom', '4122107', NULL, NULL);
INSERT INTO public.cities VALUES (3092, 16, 'Rio Bonito do Iguaçu', '4122156', NULL, NULL);
INSERT INTO public.cities VALUES (3093, 16, 'Rio Branco do Ivaí', '4122172', NULL, NULL);
INSERT INTO public.cities VALUES (3094, 16, 'Rio Branco do Sul', '4122206', NULL, NULL);
INSERT INTO public.cities VALUES (3095, 16, 'Rio Negro', '4122305', NULL, NULL);
INSERT INTO public.cities VALUES (3096, 16, 'Rolândia', '4122404', NULL, NULL);
INSERT INTO public.cities VALUES (3097, 16, 'Roncador', '4122503', NULL, NULL);
INSERT INTO public.cities VALUES (3098, 16, 'Rondon', '4122602', NULL, NULL);
INSERT INTO public.cities VALUES (3099, 16, 'Rosário do Ivaí', '4122651', NULL, NULL);
INSERT INTO public.cities VALUES (3100, 16, 'Sabáudia', '4122701', NULL, NULL);
INSERT INTO public.cities VALUES (3101, 16, 'Salgado Filho', '4122800', NULL, NULL);
INSERT INTO public.cities VALUES (3102, 16, 'Salto do Itararé', '4122909', NULL, NULL);
INSERT INTO public.cities VALUES (3103, 16, 'Salto do Lontra', '4123006', NULL, NULL);
INSERT INTO public.cities VALUES (3104, 16, 'Santa Amélia', '4123105', NULL, NULL);
INSERT INTO public.cities VALUES (3105, 16, 'Santa Cecília do Pavão', '4123204', NULL, NULL);
INSERT INTO public.cities VALUES (3106, 16, 'Santa Cruz de Monte Castelo', '4123303', NULL, NULL);
INSERT INTO public.cities VALUES (3107, 16, 'Santa Fé', '4123402', NULL, NULL);
INSERT INTO public.cities VALUES (3108, 16, 'Santa Helena', '4123501', NULL, NULL);
INSERT INTO public.cities VALUES (3109, 16, 'Santa Inês', '4123600', NULL, NULL);
INSERT INTO public.cities VALUES (3110, 16, 'Santa Isabel do Ivaí', '4123709', NULL, NULL);
INSERT INTO public.cities VALUES (3111, 16, 'Santa Izabel do Oeste', '4123808', NULL, NULL);
INSERT INTO public.cities VALUES (3112, 16, 'Santa Lúcia', '4123824', NULL, NULL);
INSERT INTO public.cities VALUES (3113, 16, 'Santa Maria do Oeste', '4123857', NULL, NULL);
INSERT INTO public.cities VALUES (3114, 16, 'Santa Mariana', '4123907', NULL, NULL);
INSERT INTO public.cities VALUES (3115, 16, 'Santa Mônica', '4123956', NULL, NULL);
INSERT INTO public.cities VALUES (3116, 16, 'Santa Tereza do Oeste', '4124020', NULL, NULL);
INSERT INTO public.cities VALUES (3117, 16, 'Santa Terezinha de Itaipu', '4124053', NULL, NULL);
INSERT INTO public.cities VALUES (3118, 16, 'Santana do Itararé', '4124004', NULL, NULL);
INSERT INTO public.cities VALUES (3119, 16, 'Santo Antônio da Platina', '4124103', NULL, NULL);
INSERT INTO public.cities VALUES (3120, 16, 'Santo Antônio do Caiuá', '4124202', NULL, NULL);
INSERT INTO public.cities VALUES (3121, 16, 'Santo Antônio do Paraíso', '4124301', NULL, NULL);
INSERT INTO public.cities VALUES (3122, 16, 'Santo Antônio do Sudoeste', '4124400', NULL, NULL);
INSERT INTO public.cities VALUES (3123, 16, 'Santo Inácio', '4124509', NULL, NULL);
INSERT INTO public.cities VALUES (3124, 16, 'São Carlos do Ivaí', '4124608', NULL, NULL);
INSERT INTO public.cities VALUES (3125, 16, 'São Jerônimo da Serra', '4124707', NULL, NULL);
INSERT INTO public.cities VALUES (3126, 16, 'São João', '4124806', NULL, NULL);
INSERT INTO public.cities VALUES (3127, 16, 'São João do Caiuá', '4124905', NULL, NULL);
INSERT INTO public.cities VALUES (3128, 16, 'São João do Ivaí', '4125001', NULL, NULL);
INSERT INTO public.cities VALUES (3129, 16, 'São João do Triunfo', '4125100', NULL, NULL);
INSERT INTO public.cities VALUES (3130, 16, 'São Jorge do Ivaí', '4125308', NULL, NULL);
INSERT INTO public.cities VALUES (3131, 16, 'São Jorge do Patrocínio', '4125357', NULL, NULL);
INSERT INTO public.cities VALUES (3132, 16, 'São Jorge d''Oeste', '4125209', NULL, NULL);
INSERT INTO public.cities VALUES (3133, 16, 'São José da Boa Vista', '4125407', NULL, NULL);
INSERT INTO public.cities VALUES (3134, 16, 'São José das Palmeiras', '4125456', NULL, NULL);
INSERT INTO public.cities VALUES (3135, 16, 'São José dos Pinhais', '4125506', NULL, NULL);
INSERT INTO public.cities VALUES (3136, 16, 'São Manoel do Paraná', '4125555', NULL, NULL);
INSERT INTO public.cities VALUES (3137, 16, 'São Mateus do Sul', '4125605', NULL, NULL);
INSERT INTO public.cities VALUES (3138, 16, 'São Miguel do Iguaçu', '4125704', NULL, NULL);
INSERT INTO public.cities VALUES (3139, 16, 'São Pedro do Iguaçu', '4125753', NULL, NULL);
INSERT INTO public.cities VALUES (3140, 16, 'São Pedro do Ivaí', '4125803', NULL, NULL);
INSERT INTO public.cities VALUES (3141, 16, 'São Pedro do Paraná', '4125902', NULL, NULL);
INSERT INTO public.cities VALUES (3142, 16, 'São Sebastião da Amoreira', '4126009', NULL, NULL);
INSERT INTO public.cities VALUES (3143, 16, 'São Tomé', '4126108', NULL, NULL);
INSERT INTO public.cities VALUES (3144, 16, 'Sapopema', '4126207', NULL, NULL);
INSERT INTO public.cities VALUES (3145, 16, 'Sarandi', '4126256', NULL, NULL);
INSERT INTO public.cities VALUES (3146, 16, 'Saudade do Iguaçu', '4126272', NULL, NULL);
INSERT INTO public.cities VALUES (3147, 16, 'Sengés', '4126306', NULL, NULL);
INSERT INTO public.cities VALUES (3148, 16, 'Serranópolis do Iguaçu', '4126355', NULL, NULL);
INSERT INTO public.cities VALUES (3149, 16, 'Sertaneja', '4126405', NULL, NULL);
INSERT INTO public.cities VALUES (3150, 16, 'Sertanópolis', '4126504', NULL, NULL);
INSERT INTO public.cities VALUES (3151, 16, 'Siqueira Campos', '4126603', NULL, NULL);
INSERT INTO public.cities VALUES (3152, 16, 'Sulina', '4126652', NULL, NULL);
INSERT INTO public.cities VALUES (3153, 16, 'Tamarana', '4126678', NULL, NULL);
INSERT INTO public.cities VALUES (3154, 16, 'Tamboara', '4126702', NULL, NULL);
INSERT INTO public.cities VALUES (3155, 16, 'Tapejara', '4126801', NULL, NULL);
INSERT INTO public.cities VALUES (3156, 16, 'Tapira', '4126900', NULL, NULL);
INSERT INTO public.cities VALUES (3157, 16, 'Teixeira Soares', '4127007', NULL, NULL);
INSERT INTO public.cities VALUES (3158, 16, 'Telêmaco Borba', '4127106', NULL, NULL);
INSERT INTO public.cities VALUES (3159, 16, 'Terra Boa', '4127205', NULL, NULL);
INSERT INTO public.cities VALUES (3160, 16, 'Terra Rica', '4127304', NULL, NULL);
INSERT INTO public.cities VALUES (3161, 16, 'Terra Roxa', '4127403', NULL, NULL);
INSERT INTO public.cities VALUES (3162, 16, 'Tibagi', '4127502', NULL, NULL);
INSERT INTO public.cities VALUES (3163, 16, 'Tijucas do Sul', '4127601', NULL, NULL);
INSERT INTO public.cities VALUES (3164, 16, 'Toledo', '4127700', NULL, NULL);
INSERT INTO public.cities VALUES (3165, 16, 'Tomazina', '4127809', NULL, NULL);
INSERT INTO public.cities VALUES (3166, 16, 'Três Barras do Paraná', '4127858', NULL, NULL);
INSERT INTO public.cities VALUES (3167, 16, 'Tunas do Paraná', '4127882', NULL, NULL);
INSERT INTO public.cities VALUES (3168, 16, 'Tuneiras do Oeste', '4127908', NULL, NULL);
INSERT INTO public.cities VALUES (3169, 16, 'Tupãssi', '4127957', NULL, NULL);
INSERT INTO public.cities VALUES (3170, 16, 'Turvo', '4127965', NULL, NULL);
INSERT INTO public.cities VALUES (3171, 16, 'Ubiratã', '4128005', NULL, NULL);
INSERT INTO public.cities VALUES (3172, 16, 'Umuarama', '4128104', NULL, NULL);
INSERT INTO public.cities VALUES (3173, 16, 'União da Vitória', '4128203', NULL, NULL);
INSERT INTO public.cities VALUES (3174, 16, 'Uniflor', '4128302', NULL, NULL);
INSERT INTO public.cities VALUES (3175, 16, 'Uraí', '4128401', NULL, NULL);
INSERT INTO public.cities VALUES (3176, 16, 'Ventania', '4128534', NULL, NULL);
INSERT INTO public.cities VALUES (3177, 16, 'Vera Cruz do Oeste', '4128559', NULL, NULL);
INSERT INTO public.cities VALUES (3178, 16, 'Verê', '4128609', NULL, NULL);
INSERT INTO public.cities VALUES (3179, 16, 'Virmond', '4128658', NULL, NULL);
INSERT INTO public.cities VALUES (3180, 16, 'Vitorino', '4128708', NULL, NULL);
INSERT INTO public.cities VALUES (3181, 16, 'Wenceslau Braz', '4128500', NULL, NULL);
INSERT INTO public.cities VALUES (3182, 16, 'Xambrê', '4128807', NULL, NULL);
INSERT INTO public.cities VALUES (3183, 17, 'Abreu e Lima', '2600054', NULL, NULL);
INSERT INTO public.cities VALUES (3184, 17, 'Afogados da Ingazeira', '2600104', NULL, NULL);
INSERT INTO public.cities VALUES (3185, 17, 'Afrânio', '2600203', NULL, NULL);
INSERT INTO public.cities VALUES (3186, 17, 'Agrestina', '2600302', NULL, NULL);
INSERT INTO public.cities VALUES (3187, 17, 'Água Preta', '2600401', NULL, NULL);
INSERT INTO public.cities VALUES (3188, 17, 'Águas Belas', '2600500', NULL, NULL);
INSERT INTO public.cities VALUES (3189, 17, 'Alagoinha', '2600609', NULL, NULL);
INSERT INTO public.cities VALUES (3190, 17, 'Aliança', '2600708', NULL, NULL);
INSERT INTO public.cities VALUES (3191, 17, 'Altinho', '2600807', NULL, NULL);
INSERT INTO public.cities VALUES (3192, 17, 'Amaraji', '2600906', NULL, NULL);
INSERT INTO public.cities VALUES (3193, 17, 'Angelim', '2601003', NULL, NULL);
INSERT INTO public.cities VALUES (3194, 17, 'Araçoiaba', '2601052', NULL, NULL);
INSERT INTO public.cities VALUES (3195, 17, 'Araripina', '2601102', NULL, NULL);
INSERT INTO public.cities VALUES (3196, 17, 'Arcoverde', '2601201', NULL, NULL);
INSERT INTO public.cities VALUES (3197, 17, 'Barra de Guabiraba', '2601300', NULL, NULL);
INSERT INTO public.cities VALUES (3198, 17, 'Barreiros', '2601409', NULL, NULL);
INSERT INTO public.cities VALUES (3199, 17, 'Belém de Maria', '2601508', NULL, NULL);
INSERT INTO public.cities VALUES (3200, 17, 'Belém do São Francisco', '2601607', NULL, NULL);
INSERT INTO public.cities VALUES (3201, 17, 'Belo Jardim', '2601706', NULL, NULL);
INSERT INTO public.cities VALUES (3202, 17, 'Betânia', '2601805', NULL, NULL);
INSERT INTO public.cities VALUES (3203, 17, 'Bezerros', '2601904', NULL, NULL);
INSERT INTO public.cities VALUES (3204, 17, 'Bodocó', '2602001', NULL, NULL);
INSERT INTO public.cities VALUES (3205, 17, 'Bom Conselho', '2602100', NULL, NULL);
INSERT INTO public.cities VALUES (3206, 17, 'Bom Jardim', '2602209', NULL, NULL);
INSERT INTO public.cities VALUES (3207, 17, 'Bonito', '2602308', NULL, NULL);
INSERT INTO public.cities VALUES (3208, 17, 'Brejão', '2602407', NULL, NULL);
INSERT INTO public.cities VALUES (3209, 17, 'Brejinho', '2602506', NULL, NULL);
INSERT INTO public.cities VALUES (3210, 17, 'Brejo da Madre de Deus', '2602605', NULL, NULL);
INSERT INTO public.cities VALUES (3211, 17, 'Buenos Aires', '2602704', NULL, NULL);
INSERT INTO public.cities VALUES (3212, 17, 'Buíque', '2602803', NULL, NULL);
INSERT INTO public.cities VALUES (3213, 17, 'Cabo de Santo Agostinho', '2602902', NULL, NULL);
INSERT INTO public.cities VALUES (3214, 17, 'Cabrobó', '2603009', NULL, NULL);
INSERT INTO public.cities VALUES (3215, 17, 'Cachoeirinha', '2603108', NULL, NULL);
INSERT INTO public.cities VALUES (3216, 17, 'Caetés', '2603207', NULL, NULL);
INSERT INTO public.cities VALUES (3217, 17, 'Calçado', '2603306', NULL, NULL);
INSERT INTO public.cities VALUES (3218, 17, 'Calumbi', '2603405', NULL, NULL);
INSERT INTO public.cities VALUES (3219, 17, 'Camaragibe', '2603454', NULL, NULL);
INSERT INTO public.cities VALUES (3220, 17, 'Camocim de São Félix', '2603504', NULL, NULL);
INSERT INTO public.cities VALUES (3221, 17, 'Camutanga', '2603603', NULL, NULL);
INSERT INTO public.cities VALUES (3222, 17, 'Canhotinho', '2603702', NULL, NULL);
INSERT INTO public.cities VALUES (3223, 17, 'Capoeiras', '2603801', NULL, NULL);
INSERT INTO public.cities VALUES (3224, 17, 'Carnaíba', '2603900', NULL, NULL);
INSERT INTO public.cities VALUES (3225, 17, 'Carnaubeira da Penha', '2603926', NULL, NULL);
INSERT INTO public.cities VALUES (3226, 17, 'Carpina', '2604007', NULL, NULL);
INSERT INTO public.cities VALUES (3227, 17, 'Caruaru', '2604106', NULL, NULL);
INSERT INTO public.cities VALUES (3228, 17, 'Casinhas', '2604155', NULL, NULL);
INSERT INTO public.cities VALUES (3229, 17, 'Catende', '2604205', NULL, NULL);
INSERT INTO public.cities VALUES (3230, 17, 'Cedro', '2604304', NULL, NULL);
INSERT INTO public.cities VALUES (3231, 17, 'Chã de Alegria', '2604403', NULL, NULL);
INSERT INTO public.cities VALUES (3232, 17, 'Chã Grande', '2604502', NULL, NULL);
INSERT INTO public.cities VALUES (3233, 17, 'Condado', '2604601', NULL, NULL);
INSERT INTO public.cities VALUES (3234, 17, 'Correntes', '2604700', NULL, NULL);
INSERT INTO public.cities VALUES (3235, 17, 'Cortês', '2604809', NULL, NULL);
INSERT INTO public.cities VALUES (3236, 17, 'Cumaru', '2604908', NULL, NULL);
INSERT INTO public.cities VALUES (3237, 17, 'Cupira', '2605004', NULL, NULL);
INSERT INTO public.cities VALUES (3238, 17, 'Custódia', '2605103', NULL, NULL);
INSERT INTO public.cities VALUES (3239, 17, 'Dormentes', '2605152', NULL, NULL);
INSERT INTO public.cities VALUES (3240, 17, 'Escada', '2605202', NULL, NULL);
INSERT INTO public.cities VALUES (3241, 17, 'Exu', '2605301', NULL, NULL);
INSERT INTO public.cities VALUES (3242, 17, 'Feira Nova', '2605400', NULL, NULL);
INSERT INTO public.cities VALUES (3243, 17, 'Fernando de Noronha', '2605459', NULL, NULL);
INSERT INTO public.cities VALUES (3244, 17, 'Ferreiros', '2605509', NULL, NULL);
INSERT INTO public.cities VALUES (3245, 17, 'Flores', '2605608', NULL, NULL);
INSERT INTO public.cities VALUES (3246, 17, 'Floresta', '2605707', NULL, NULL);
INSERT INTO public.cities VALUES (3247, 17, 'Frei Miguelinho', '2605806', NULL, NULL);
INSERT INTO public.cities VALUES (3248, 17, 'Gameleira', '2605905', NULL, NULL);
INSERT INTO public.cities VALUES (3249, 17, 'Garanhuns', '2606002', NULL, NULL);
INSERT INTO public.cities VALUES (3250, 17, 'Glória do Goitá', '2606101', NULL, NULL);
INSERT INTO public.cities VALUES (3251, 17, 'Goiana', '2606200', NULL, NULL);
INSERT INTO public.cities VALUES (3252, 17, 'Granito', '2606309', NULL, NULL);
INSERT INTO public.cities VALUES (3253, 17, 'Gravatá', '2606408', NULL, NULL);
INSERT INTO public.cities VALUES (3254, 17, 'Iati', '2606507', NULL, NULL);
INSERT INTO public.cities VALUES (3255, 17, 'Ibimirim', '2606606', NULL, NULL);
INSERT INTO public.cities VALUES (3256, 17, 'Ibirajuba', '2606705', NULL, NULL);
INSERT INTO public.cities VALUES (3257, 17, 'Igarassu', '2606804', NULL, NULL);
INSERT INTO public.cities VALUES (3258, 17, 'Iguaraci', '2606903', NULL, NULL);
INSERT INTO public.cities VALUES (3259, 17, 'Ilha de Itamaracá', '2607604', NULL, NULL);
INSERT INTO public.cities VALUES (3260, 17, 'Inajá', '2607000', NULL, NULL);
INSERT INTO public.cities VALUES (3261, 17, 'Ingazeira', '2607109', NULL, NULL);
INSERT INTO public.cities VALUES (3262, 17, 'Ipojuca', '2607208', NULL, NULL);
INSERT INTO public.cities VALUES (3263, 17, 'Ipubi', '2607307', NULL, NULL);
INSERT INTO public.cities VALUES (3264, 17, 'Itacuruba', '2607406', NULL, NULL);
INSERT INTO public.cities VALUES (3265, 17, 'Itaíba', '2607505', NULL, NULL);
INSERT INTO public.cities VALUES (3266, 17, 'Itambé', '2607653', NULL, NULL);
INSERT INTO public.cities VALUES (3267, 17, 'Itapetim', '2607703', NULL, NULL);
INSERT INTO public.cities VALUES (3268, 17, 'Itapissuma', '2607752', NULL, NULL);
INSERT INTO public.cities VALUES (3269, 17, 'Itaquitinga', '2607802', NULL, NULL);
INSERT INTO public.cities VALUES (3270, 17, 'Jaboatão dos Guararapes', '2607901', NULL, NULL);
INSERT INTO public.cities VALUES (3271, 17, 'Jaqueira', '2607950', NULL, NULL);
INSERT INTO public.cities VALUES (3272, 17, 'Jataúba', '2608008', NULL, NULL);
INSERT INTO public.cities VALUES (3273, 17, 'Jatobá', '2608057', NULL, NULL);
INSERT INTO public.cities VALUES (3274, 17, 'João Alfredo', '2608107', NULL, NULL);
INSERT INTO public.cities VALUES (3275, 17, 'Joaquim Nabuco', '2608206', NULL, NULL);
INSERT INTO public.cities VALUES (3276, 17, 'Jucati', '2608255', NULL, NULL);
INSERT INTO public.cities VALUES (3277, 17, 'Jupi', '2608305', NULL, NULL);
INSERT INTO public.cities VALUES (3278, 17, 'Jurema', '2608404', NULL, NULL);
INSERT INTO public.cities VALUES (3279, 17, 'Lagoa do Carro', '2608453', NULL, NULL);
INSERT INTO public.cities VALUES (3280, 17, 'Lagoa de Itaenga', '2608503', NULL, NULL);
INSERT INTO public.cities VALUES (3281, 17, 'Lagoa do Ouro', '2608602', NULL, NULL);
INSERT INTO public.cities VALUES (3282, 17, 'Lagoa dos Gatos', '2608701', NULL, NULL);
INSERT INTO public.cities VALUES (3283, 17, 'Lagoa Grande', '2608750', NULL, NULL);
INSERT INTO public.cities VALUES (3284, 17, 'Lajedo', '2608800', NULL, NULL);
INSERT INTO public.cities VALUES (3285, 17, 'Limoeiro', '2608909', NULL, NULL);
INSERT INTO public.cities VALUES (3286, 17, 'Macaparana', '2609006', NULL, NULL);
INSERT INTO public.cities VALUES (3287, 17, 'Machados', '2609105', NULL, NULL);
INSERT INTO public.cities VALUES (3288, 17, 'Manari', '2609154', NULL, NULL);
INSERT INTO public.cities VALUES (3289, 17, 'Maraial', '2609204', NULL, NULL);
INSERT INTO public.cities VALUES (3290, 17, 'Mirandiba', '2609303', NULL, NULL);
INSERT INTO public.cities VALUES (3291, 17, 'Moreilândia', '2614303', NULL, NULL);
INSERT INTO public.cities VALUES (3292, 17, 'Moreno', '2609402', NULL, NULL);
INSERT INTO public.cities VALUES (3293, 17, 'Nazaré da Mata', '2609501', NULL, NULL);
INSERT INTO public.cities VALUES (3294, 17, 'Olinda', '2609600', NULL, NULL);
INSERT INTO public.cities VALUES (3295, 17, 'Orobó', '2609709', NULL, NULL);
INSERT INTO public.cities VALUES (3296, 17, 'Orocó', '2609808', NULL, NULL);
INSERT INTO public.cities VALUES (3297, 17, 'Ouricuri', '2609907', NULL, NULL);
INSERT INTO public.cities VALUES (3298, 17, 'Palmares', '2610004', NULL, NULL);
INSERT INTO public.cities VALUES (3299, 17, 'Palmeirina', '2610103', NULL, NULL);
INSERT INTO public.cities VALUES (3300, 17, 'Panelas', '2610202', NULL, NULL);
INSERT INTO public.cities VALUES (3301, 17, 'Paranatama', '2610301', NULL, NULL);
INSERT INTO public.cities VALUES (3302, 17, 'Parnamirim', '2610400', NULL, NULL);
INSERT INTO public.cities VALUES (3303, 17, 'Passira', '2610509', NULL, NULL);
INSERT INTO public.cities VALUES (3304, 17, 'Paudalho', '2610608', NULL, NULL);
INSERT INTO public.cities VALUES (3305, 17, 'Paulista', '2610707', NULL, NULL);
INSERT INTO public.cities VALUES (3306, 17, 'Pedra', '2610806', NULL, NULL);
INSERT INTO public.cities VALUES (3307, 17, 'Pesqueira', '2610905', NULL, NULL);
INSERT INTO public.cities VALUES (3308, 17, 'Petrolândia', '2611002', NULL, NULL);
INSERT INTO public.cities VALUES (3309, 17, 'Petrolina', '2611101', NULL, NULL);
INSERT INTO public.cities VALUES (3310, 17, 'Poção', '2611200', NULL, NULL);
INSERT INTO public.cities VALUES (3311, 17, 'Pombos', '2611309', NULL, NULL);
INSERT INTO public.cities VALUES (3312, 17, 'Primavera', '2611408', NULL, NULL);
INSERT INTO public.cities VALUES (3313, 17, 'Quipapá', '2611507', NULL, NULL);
INSERT INTO public.cities VALUES (3314, 17, 'Quixaba', '2611533', NULL, NULL);
INSERT INTO public.cities VALUES (3315, 17, 'Recife', '2611606', NULL, NULL);
INSERT INTO public.cities VALUES (3316, 17, 'Riacho das Almas', '2611705', NULL, NULL);
INSERT INTO public.cities VALUES (3317, 17, 'Ribeirão', '2611804', NULL, NULL);
INSERT INTO public.cities VALUES (3318, 17, 'Rio Formoso', '2611903', NULL, NULL);
INSERT INTO public.cities VALUES (3319, 17, 'Sairé', '2612000', NULL, NULL);
INSERT INTO public.cities VALUES (3320, 17, 'Salgadinho', '2612109', NULL, NULL);
INSERT INTO public.cities VALUES (3321, 17, 'Salgueiro', '2612208', NULL, NULL);
INSERT INTO public.cities VALUES (3322, 17, 'Saloá', '2612307', NULL, NULL);
INSERT INTO public.cities VALUES (3323, 17, 'Sanharó', '2612406', NULL, NULL);
INSERT INTO public.cities VALUES (3324, 17, 'Santa Cruz', '2612455', NULL, NULL);
INSERT INTO public.cities VALUES (3325, 17, 'Santa Cruz da Baixa Verde', '2612471', NULL, NULL);
INSERT INTO public.cities VALUES (3326, 17, 'Santa Cruz do Capibaribe', '2612505', NULL, NULL);
INSERT INTO public.cities VALUES (3327, 17, 'Santa Filomena', '2612554', NULL, NULL);
INSERT INTO public.cities VALUES (3328, 17, 'Santa Maria da Boa Vista', '2612604', NULL, NULL);
INSERT INTO public.cities VALUES (3329, 17, 'Santa Maria do Cambucá', '2612703', NULL, NULL);
INSERT INTO public.cities VALUES (3330, 17, 'Santa Terezinha', '2612802', NULL, NULL);
INSERT INTO public.cities VALUES (3331, 17, 'São Benedito do Sul', '2612901', NULL, NULL);
INSERT INTO public.cities VALUES (3332, 17, 'São Bento do Una', '2613008', NULL, NULL);
INSERT INTO public.cities VALUES (3333, 17, 'São Caitano', '2613107', NULL, NULL);
INSERT INTO public.cities VALUES (3334, 17, 'São João', '2613206', NULL, NULL);
INSERT INTO public.cities VALUES (3335, 17, 'São Joaquim do Monte', '2613305', NULL, NULL);
INSERT INTO public.cities VALUES (3336, 17, 'São José da Coroa Grande', '2613404', NULL, NULL);
INSERT INTO public.cities VALUES (3337, 17, 'São José do Belmonte', '2613503', NULL, NULL);
INSERT INTO public.cities VALUES (3338, 17, 'São José do Egito', '2613602', NULL, NULL);
INSERT INTO public.cities VALUES (3339, 17, 'São Lourenço da Mata', '2613701', NULL, NULL);
INSERT INTO public.cities VALUES (3340, 17, 'São Vicente Ferrer', '2613800', NULL, NULL);
INSERT INTO public.cities VALUES (3341, 17, 'Serra Talhada', '2613909', NULL, NULL);
INSERT INTO public.cities VALUES (3342, 17, 'Serrita', '2614006', NULL, NULL);
INSERT INTO public.cities VALUES (3343, 17, 'Sertânia', '2614105', NULL, NULL);
INSERT INTO public.cities VALUES (3344, 17, 'Sirinhaém', '2614204', NULL, NULL);
INSERT INTO public.cities VALUES (3345, 17, 'Solidão', '2614402', NULL, NULL);
INSERT INTO public.cities VALUES (3346, 17, 'Surubim', '2614501', NULL, NULL);
INSERT INTO public.cities VALUES (3347, 17, 'Tabira', '2614600', NULL, NULL);
INSERT INTO public.cities VALUES (3348, 17, 'Tacaimbó', '2614709', NULL, NULL);
INSERT INTO public.cities VALUES (3349, 17, 'Tacaratu', '2614808', NULL, NULL);
INSERT INTO public.cities VALUES (3350, 17, 'Tamandaré', '2614857', NULL, NULL);
INSERT INTO public.cities VALUES (3351, 17, 'Taquaritinga do Norte', '2615003', NULL, NULL);
INSERT INTO public.cities VALUES (3352, 17, 'Terezinha', '2615102', NULL, NULL);
INSERT INTO public.cities VALUES (3353, 17, 'Terra Nova', '2615201', NULL, NULL);
INSERT INTO public.cities VALUES (3354, 17, 'Timbaúba', '2615300', NULL, NULL);
INSERT INTO public.cities VALUES (3355, 17, 'Toritama', '2615409', NULL, NULL);
INSERT INTO public.cities VALUES (3356, 17, 'Tracunhaém', '2615508', NULL, NULL);
INSERT INTO public.cities VALUES (3357, 17, 'Trindade', '2615607', NULL, NULL);
INSERT INTO public.cities VALUES (3358, 17, 'Triunfo', '2615706', NULL, NULL);
INSERT INTO public.cities VALUES (3359, 17, 'Tupanatinga', '2615805', NULL, NULL);
INSERT INTO public.cities VALUES (3360, 17, 'Tuparetama', '2615904', NULL, NULL);
INSERT INTO public.cities VALUES (3361, 17, 'Venturosa', '2616001', NULL, NULL);
INSERT INTO public.cities VALUES (3362, 17, 'Verdejante', '2616100', NULL, NULL);
INSERT INTO public.cities VALUES (3363, 17, 'Vertente do Lério', '2616183', NULL, NULL);
INSERT INTO public.cities VALUES (3364, 17, 'Vertentes', '2616209', NULL, NULL);
INSERT INTO public.cities VALUES (3365, 17, 'Vicência', '2616308', NULL, NULL);
INSERT INTO public.cities VALUES (3366, 17, 'Vitória de Santo Antão', '2616407', NULL, NULL);
INSERT INTO public.cities VALUES (3367, 17, 'Xexéu', '2616506', NULL, NULL);
INSERT INTO public.cities VALUES (3368, 18, 'Acauã', '2200053', NULL, NULL);
INSERT INTO public.cities VALUES (3369, 18, 'Agricolândia', '2200103', NULL, NULL);
INSERT INTO public.cities VALUES (3370, 18, 'Água Branca', '2200202', NULL, NULL);
INSERT INTO public.cities VALUES (3371, 18, 'Alagoinha do Piauí', '2200251', NULL, NULL);
INSERT INTO public.cities VALUES (3372, 18, 'Alegrete do Piauí', '2200277', NULL, NULL);
INSERT INTO public.cities VALUES (3373, 18, 'Alto Longá', '2200301', NULL, NULL);
INSERT INTO public.cities VALUES (3374, 18, 'Altos', '2200400', NULL, NULL);
INSERT INTO public.cities VALUES (3375, 18, 'Alvorada do Gurguéia', '2200459', NULL, NULL);
INSERT INTO public.cities VALUES (3376, 18, 'Amarante', '2200509', NULL, NULL);
INSERT INTO public.cities VALUES (3377, 18, 'Angical do Piauí', '2200608', NULL, NULL);
INSERT INTO public.cities VALUES (3378, 18, 'Anísio de Abreu', '2200707', NULL, NULL);
INSERT INTO public.cities VALUES (3379, 18, 'Antônio Almeida', '2200806', NULL, NULL);
INSERT INTO public.cities VALUES (3380, 18, 'Aroazes', '2200905', NULL, NULL);
INSERT INTO public.cities VALUES (3381, 18, 'Aroeiras do Itaim', '2200954', NULL, NULL);
INSERT INTO public.cities VALUES (3382, 18, 'Arraial', '2201002', NULL, NULL);
INSERT INTO public.cities VALUES (3383, 18, 'Assunção do Piauí', '2201051', NULL, NULL);
INSERT INTO public.cities VALUES (3384, 18, 'Avelino Lopes', '2201101', NULL, NULL);
INSERT INTO public.cities VALUES (3385, 18, 'Baixa Grande do Ribeiro', '2201150', NULL, NULL);
INSERT INTO public.cities VALUES (3386, 18, 'Barra D''Alcântara', '2201176', NULL, NULL);
INSERT INTO public.cities VALUES (3387, 18, 'Barras', '2201200', NULL, NULL);
INSERT INTO public.cities VALUES (3388, 18, 'Barreiras do Piauí', '2201309', NULL, NULL);
INSERT INTO public.cities VALUES (3389, 18, 'Barro Duro', '2201408', NULL, NULL);
INSERT INTO public.cities VALUES (3390, 18, 'Batalha', '2201507', NULL, NULL);
INSERT INTO public.cities VALUES (3391, 18, 'Bela Vista do Piauí', '2201556', NULL, NULL);
INSERT INTO public.cities VALUES (3392, 18, 'Belém do Piauí', '2201572', NULL, NULL);
INSERT INTO public.cities VALUES (3393, 18, 'Beneditinos', '2201606', NULL, NULL);
INSERT INTO public.cities VALUES (3394, 18, 'Bertolínia', '2201705', NULL, NULL);
INSERT INTO public.cities VALUES (3395, 18, 'Betânia do Piauí', '2201739', NULL, NULL);
INSERT INTO public.cities VALUES (3396, 18, 'Boa Hora', '2201770', NULL, NULL);
INSERT INTO public.cities VALUES (3397, 18, 'Bocaina', '2201804', NULL, NULL);
INSERT INTO public.cities VALUES (3398, 18, 'Bom Jesus', '2201903', NULL, NULL);
INSERT INTO public.cities VALUES (3399, 18, 'Bom Princípio do Piauí', '2201919', NULL, NULL);
INSERT INTO public.cities VALUES (3400, 18, 'Bonfim do Piauí', '2201929', NULL, NULL);
INSERT INTO public.cities VALUES (3401, 18, 'Boqueirão do Piauí', '2201945', NULL, NULL);
INSERT INTO public.cities VALUES (3402, 18, 'Brasileira', '2201960', NULL, NULL);
INSERT INTO public.cities VALUES (3403, 18, 'Brejo do Piauí', '2201988', NULL, NULL);
INSERT INTO public.cities VALUES (3404, 18, 'Buriti dos Lopes', '2202000', NULL, NULL);
INSERT INTO public.cities VALUES (3405, 18, 'Buriti dos Montes', '2202026', NULL, NULL);
INSERT INTO public.cities VALUES (3406, 18, 'Cabeceiras do Piauí', '2202059', NULL, NULL);
INSERT INTO public.cities VALUES (3407, 18, 'Cajazeiras do Piauí', '2202075', NULL, NULL);
INSERT INTO public.cities VALUES (3408, 18, 'Cajueiro da Praia', '2202083', NULL, NULL);
INSERT INTO public.cities VALUES (3409, 18, 'Caldeirão Grande do Piauí', '2202091', NULL, NULL);
INSERT INTO public.cities VALUES (3410, 18, 'Campinas do Piauí', '2202109', NULL, NULL);
INSERT INTO public.cities VALUES (3411, 18, 'Campo Alegre do Fidalgo', '2202117', NULL, NULL);
INSERT INTO public.cities VALUES (3412, 18, 'Campo Grande do Piauí', '2202133', NULL, NULL);
INSERT INTO public.cities VALUES (3413, 18, 'Campo Largo do Piauí', '2202174', NULL, NULL);
INSERT INTO public.cities VALUES (3414, 18, 'Campo Maior', '2202208', NULL, NULL);
INSERT INTO public.cities VALUES (3415, 18, 'Canavieira', '2202251', NULL, NULL);
INSERT INTO public.cities VALUES (3416, 18, 'Canto do Buriti', '2202307', NULL, NULL);
INSERT INTO public.cities VALUES (3417, 18, 'Capitão de Campos', '2202406', NULL, NULL);
INSERT INTO public.cities VALUES (3418, 18, 'Capitão Gervásio Oliveira', '2202455', NULL, NULL);
INSERT INTO public.cities VALUES (3419, 18, 'Caracol', '2202505', NULL, NULL);
INSERT INTO public.cities VALUES (3420, 18, 'Caraúbas do Piauí', '2202539', NULL, NULL);
INSERT INTO public.cities VALUES (3421, 18, 'Caridade do Piauí', '2202554', NULL, NULL);
INSERT INTO public.cities VALUES (3422, 18, 'Castelo do Piauí', '2202604', NULL, NULL);
INSERT INTO public.cities VALUES (3423, 18, 'Caxingó', '2202653', NULL, NULL);
INSERT INTO public.cities VALUES (3424, 18, 'Cocal', '2202703', NULL, NULL);
INSERT INTO public.cities VALUES (3425, 18, 'Cocal de Telha', '2202711', NULL, NULL);
INSERT INTO public.cities VALUES (3426, 18, 'Cocal dos Alves', '2202729', NULL, NULL);
INSERT INTO public.cities VALUES (3427, 18, 'Coivaras', '2202737', NULL, NULL);
INSERT INTO public.cities VALUES (3428, 18, 'Colônia do Gurguéia', '2202752', NULL, NULL);
INSERT INTO public.cities VALUES (3429, 18, 'Colônia do Piauí', '2202778', NULL, NULL);
INSERT INTO public.cities VALUES (3430, 18, 'Conceição do Canindé', '2202802', NULL, NULL);
INSERT INTO public.cities VALUES (3431, 18, 'Coronel José Dias', '2202851', NULL, NULL);
INSERT INTO public.cities VALUES (3432, 18, 'Corrente', '2202901', NULL, NULL);
INSERT INTO public.cities VALUES (3433, 18, 'Cristalândia do Piauí', '2203008', NULL, NULL);
INSERT INTO public.cities VALUES (3434, 18, 'Cristino Castro', '2203107', NULL, NULL);
INSERT INTO public.cities VALUES (3435, 18, 'Curimatá', '2203206', NULL, NULL);
INSERT INTO public.cities VALUES (3436, 18, 'Currais', '2203230', NULL, NULL);
INSERT INTO public.cities VALUES (3437, 18, 'Curral Novo do Piauí', '2203271', NULL, NULL);
INSERT INTO public.cities VALUES (3438, 18, 'Curralinhos', '2203255', NULL, NULL);
INSERT INTO public.cities VALUES (3439, 18, 'Demerval Lobão', '2203305', NULL, NULL);
INSERT INTO public.cities VALUES (3440, 18, 'Dirceu Arcoverde', '2203354', NULL, NULL);
INSERT INTO public.cities VALUES (3671, 19, 'Sapucaia', '3305406', NULL, NULL);
INSERT INTO public.cities VALUES (3441, 18, 'Dom Expedito Lopes', '2203404', NULL, NULL);
INSERT INTO public.cities VALUES (3442, 18, 'Dom Inocêncio', '2203453', NULL, NULL);
INSERT INTO public.cities VALUES (3443, 18, 'Domingos Mourão', '2203420', NULL, NULL);
INSERT INTO public.cities VALUES (3444, 18, 'Elesbão Veloso', '2203503', NULL, NULL);
INSERT INTO public.cities VALUES (3445, 18, 'Eliseu Martins', '2203602', NULL, NULL);
INSERT INTO public.cities VALUES (3446, 18, 'Esperantina', '2203701', NULL, NULL);
INSERT INTO public.cities VALUES (3447, 18, 'Fartura do Piauí', '2203750', NULL, NULL);
INSERT INTO public.cities VALUES (3448, 18, 'Flores do Piauí', '2203800', NULL, NULL);
INSERT INTO public.cities VALUES (3449, 18, 'Floresta do Piauí', '2203859', NULL, NULL);
INSERT INTO public.cities VALUES (3450, 18, 'Floriano', '2203909', NULL, NULL);
INSERT INTO public.cities VALUES (3451, 18, 'Francinópolis', '2204006', NULL, NULL);
INSERT INTO public.cities VALUES (3452, 18, 'Francisco Ayres', '2204105', NULL, NULL);
INSERT INTO public.cities VALUES (3453, 18, 'Francisco Macedo', '2204154', NULL, NULL);
INSERT INTO public.cities VALUES (3454, 18, 'Francisco Santos', '2204204', NULL, NULL);
INSERT INTO public.cities VALUES (3455, 18, 'Fronteiras', '2204303', NULL, NULL);
INSERT INTO public.cities VALUES (3456, 18, 'Geminiano', '2204352', NULL, NULL);
INSERT INTO public.cities VALUES (3457, 18, 'Gilbués', '2204402', NULL, NULL);
INSERT INTO public.cities VALUES (3458, 18, 'Guadalupe', '2204501', NULL, NULL);
INSERT INTO public.cities VALUES (3459, 18, 'Guaribas', '2204550', NULL, NULL);
INSERT INTO public.cities VALUES (3460, 18, 'Hugo Napoleão', '2204600', NULL, NULL);
INSERT INTO public.cities VALUES (3461, 18, 'Ilha Grande', '2204659', NULL, NULL);
INSERT INTO public.cities VALUES (3462, 18, 'Inhuma', '2204709', NULL, NULL);
INSERT INTO public.cities VALUES (3463, 18, 'Ipiranga do Piauí', '2204808', NULL, NULL);
INSERT INTO public.cities VALUES (3464, 18, 'Isaías Coelho', '2204907', NULL, NULL);
INSERT INTO public.cities VALUES (3465, 18, 'Itainópolis', '2205003', NULL, NULL);
INSERT INTO public.cities VALUES (3466, 18, 'Itaueira', '2205102', NULL, NULL);
INSERT INTO public.cities VALUES (3467, 18, 'Jacobina do Piauí', '2205151', NULL, NULL);
INSERT INTO public.cities VALUES (3468, 18, 'Jaicós', '2205201', NULL, NULL);
INSERT INTO public.cities VALUES (3469, 18, 'Jardim do Mulato', '2205250', NULL, NULL);
INSERT INTO public.cities VALUES (3470, 18, 'Jatobá do Piauí', '2205276', NULL, NULL);
INSERT INTO public.cities VALUES (3471, 18, 'Jerumenha', '2205300', NULL, NULL);
INSERT INTO public.cities VALUES (3472, 18, 'João Costa', '2205359', NULL, NULL);
INSERT INTO public.cities VALUES (3473, 18, 'Joaquim Pires', '2205409', NULL, NULL);
INSERT INTO public.cities VALUES (3474, 18, 'Joca Marques', '2205458', NULL, NULL);
INSERT INTO public.cities VALUES (3475, 18, 'José de Freitas', '2205508', NULL, NULL);
INSERT INTO public.cities VALUES (3476, 18, 'Juazeiro do Piauí', '2205516', NULL, NULL);
INSERT INTO public.cities VALUES (3477, 18, 'Júlio Borges', '2205524', NULL, NULL);
INSERT INTO public.cities VALUES (3478, 18, 'Jurema', '2205532', NULL, NULL);
INSERT INTO public.cities VALUES (3479, 18, 'Lagoa Alegre', '2205557', NULL, NULL);
INSERT INTO public.cities VALUES (3480, 18, 'Lagoa de São Francisco', '2205573', NULL, NULL);
INSERT INTO public.cities VALUES (3481, 18, 'Lagoa do Barro do Piauí', '2205565', NULL, NULL);
INSERT INTO public.cities VALUES (3482, 18, 'Lagoa do Piauí', '2205581', NULL, NULL);
INSERT INTO public.cities VALUES (3483, 18, 'Lagoa do Sítio', '2205599', NULL, NULL);
INSERT INTO public.cities VALUES (3484, 18, 'Lagoinha do Piauí', '2205540', NULL, NULL);
INSERT INTO public.cities VALUES (3485, 18, 'Landri Sales', '2205607', NULL, NULL);
INSERT INTO public.cities VALUES (3486, 18, 'Luís Correia', '2205706', NULL, NULL);
INSERT INTO public.cities VALUES (3487, 18, 'Luzilândia', '2205805', NULL, NULL);
INSERT INTO public.cities VALUES (3488, 18, 'Madeiro', '2205854', NULL, NULL);
INSERT INTO public.cities VALUES (3489, 18, 'Manoel Emídio', '2205904', NULL, NULL);
INSERT INTO public.cities VALUES (3490, 18, 'Marcolândia', '2205953', NULL, NULL);
INSERT INTO public.cities VALUES (3491, 18, 'Marcos Parente', '2206001', NULL, NULL);
INSERT INTO public.cities VALUES (3492, 18, 'Massapê do Piauí', '2206050', NULL, NULL);
INSERT INTO public.cities VALUES (3493, 18, 'Matias Olímpio', '2206100', NULL, NULL);
INSERT INTO public.cities VALUES (3494, 18, 'Miguel Alves', '2206209', NULL, NULL);
INSERT INTO public.cities VALUES (3495, 18, 'Miguel Leão', '2206308', NULL, NULL);
INSERT INTO public.cities VALUES (3496, 18, 'Milton Brandão', '2206357', NULL, NULL);
INSERT INTO public.cities VALUES (3497, 18, 'Monsenhor Gil', '2206407', NULL, NULL);
INSERT INTO public.cities VALUES (3498, 18, 'Monsenhor Hipólito', '2206506', NULL, NULL);
INSERT INTO public.cities VALUES (3499, 18, 'Monte Alegre do Piauí', '2206605', NULL, NULL);
INSERT INTO public.cities VALUES (3500, 18, 'Morro Cabeça no Tempo', '2206654', NULL, NULL);
INSERT INTO public.cities VALUES (3501, 18, 'Morro do Chapéu do Piauí', '2206670', NULL, NULL);
INSERT INTO public.cities VALUES (3502, 18, 'Murici dos Portelas', '2206696', NULL, NULL);
INSERT INTO public.cities VALUES (3503, 18, 'Nazaré do Piauí', '2206704', NULL, NULL);
INSERT INTO public.cities VALUES (3504, 18, 'Nazária ', '2206720', NULL, NULL);
INSERT INTO public.cities VALUES (3505, 18, 'Nossa Senhora de Nazaré', '2206753', NULL, NULL);
INSERT INTO public.cities VALUES (3506, 18, 'Nossa Senhora dos Remédios', '2206803', NULL, NULL);
INSERT INTO public.cities VALUES (3507, 18, 'Nova Santa Rita', '2207959', NULL, NULL);
INSERT INTO public.cities VALUES (3508, 18, 'Novo Oriente do Piauí', '2206902', NULL, NULL);
INSERT INTO public.cities VALUES (3509, 18, 'Novo Santo Antônio', '2206951', NULL, NULL);
INSERT INTO public.cities VALUES (3510, 18, 'Oeiras', '2207009', NULL, NULL);
INSERT INTO public.cities VALUES (3511, 18, 'Olho D''Água do Piauí', '2207108', NULL, NULL);
INSERT INTO public.cities VALUES (3512, 18, 'Padre Marcos', '2207207', NULL, NULL);
INSERT INTO public.cities VALUES (3513, 18, 'Paes Landim', '2207306', NULL, NULL);
INSERT INTO public.cities VALUES (3514, 18, 'Pajeú do Piauí', '2207355', NULL, NULL);
INSERT INTO public.cities VALUES (3515, 18, 'Palmeira do Piauí', '2207405', NULL, NULL);
INSERT INTO public.cities VALUES (3516, 18, 'Palmeirais', '2207504', NULL, NULL);
INSERT INTO public.cities VALUES (3517, 18, 'Paquetá', '2207553', NULL, NULL);
INSERT INTO public.cities VALUES (3518, 18, 'Parnaguá', '2207603', NULL, NULL);
INSERT INTO public.cities VALUES (3519, 18, 'Parnaíba', '2207702', NULL, NULL);
INSERT INTO public.cities VALUES (3520, 18, 'Passagem Franca do Piauí', '2207751', NULL, NULL);
INSERT INTO public.cities VALUES (3521, 18, 'Patos do Piauí', '2207777', NULL, NULL);
INSERT INTO public.cities VALUES (3522, 18, 'Pau D''Arco do Piauí', '2207793', NULL, NULL);
INSERT INTO public.cities VALUES (3523, 18, 'Paulistana', '2207801', NULL, NULL);
INSERT INTO public.cities VALUES (3524, 18, 'Pavussu', '2207850', NULL, NULL);
INSERT INTO public.cities VALUES (3525, 18, 'Pedro II', '2207900', NULL, NULL);
INSERT INTO public.cities VALUES (3526, 18, 'Pedro Laurentino', '2207934', NULL, NULL);
INSERT INTO public.cities VALUES (3527, 18, 'Picos', '2208007', NULL, NULL);
INSERT INTO public.cities VALUES (3528, 18, 'Pimenteiras', '2208106', NULL, NULL);
INSERT INTO public.cities VALUES (3529, 18, 'Pio IX', '2208205', NULL, NULL);
INSERT INTO public.cities VALUES (3530, 18, 'Piracuruca', '2208304', NULL, NULL);
INSERT INTO public.cities VALUES (3531, 18, 'Piripiri', '2208403', NULL, NULL);
INSERT INTO public.cities VALUES (3532, 18, 'Porto', '2208502', NULL, NULL);
INSERT INTO public.cities VALUES (3533, 18, 'Porto Alegre do Piauí', '2208551', NULL, NULL);
INSERT INTO public.cities VALUES (3534, 18, 'Prata do Piauí', '2208601', NULL, NULL);
INSERT INTO public.cities VALUES (3535, 18, 'Queimada Nova', '2208650', NULL, NULL);
INSERT INTO public.cities VALUES (3536, 18, 'Redenção do Gurguéia', '2208700', NULL, NULL);
INSERT INTO public.cities VALUES (3537, 18, 'Regeneração', '2208809', NULL, NULL);
INSERT INTO public.cities VALUES (3538, 18, 'Riacho Frio', '2208858', NULL, NULL);
INSERT INTO public.cities VALUES (3539, 18, 'Ribeira do Piauí', '2208874', NULL, NULL);
INSERT INTO public.cities VALUES (3540, 18, 'Ribeiro Gonçalves', '2208908', NULL, NULL);
INSERT INTO public.cities VALUES (3541, 18, 'Rio Grande do Piauí', '2209005', NULL, NULL);
INSERT INTO public.cities VALUES (3542, 18, 'Santa Cruz do Piauí', '2209104', NULL, NULL);
INSERT INTO public.cities VALUES (3543, 18, 'Santa Cruz dos Milagres', '2209153', NULL, NULL);
INSERT INTO public.cities VALUES (3544, 18, 'Santa Filomena', '2209203', NULL, NULL);
INSERT INTO public.cities VALUES (3545, 18, 'Santa Luz', '2209302', NULL, NULL);
INSERT INTO public.cities VALUES (3546, 18, 'Santa Rosa do Piauí', '2209377', NULL, NULL);
INSERT INTO public.cities VALUES (3547, 18, 'Santana do Piauí', '2209351', NULL, NULL);
INSERT INTO public.cities VALUES (3548, 18, 'Santo Antônio de Lisboa', '2209401', NULL, NULL);
INSERT INTO public.cities VALUES (3549, 18, 'Santo Antônio dos Milagres', '2209450', NULL, NULL);
INSERT INTO public.cities VALUES (3550, 18, 'Santo Inácio do Piauí', '2209500', NULL, NULL);
INSERT INTO public.cities VALUES (3551, 18, 'São Braz do Piauí', '2209559', NULL, NULL);
INSERT INTO public.cities VALUES (3552, 18, 'São Félix do Piauí', '2209609', NULL, NULL);
INSERT INTO public.cities VALUES (3553, 18, 'São Francisco de Assis do Piauí', '2209658', NULL, NULL);
INSERT INTO public.cities VALUES (3554, 18, 'São Francisco do Piauí', '2209708', NULL, NULL);
INSERT INTO public.cities VALUES (3555, 18, 'São Gonçalo do Gurguéia', '2209757', NULL, NULL);
INSERT INTO public.cities VALUES (3556, 18, 'São Gonçalo do Piauí', '2209807', NULL, NULL);
INSERT INTO public.cities VALUES (3557, 18, 'São João da Canabrava', '2209856', NULL, NULL);
INSERT INTO public.cities VALUES (3558, 18, 'São João da Fronteira', '2209872', NULL, NULL);
INSERT INTO public.cities VALUES (3559, 18, 'São João da Serra', '2209906', NULL, NULL);
INSERT INTO public.cities VALUES (3560, 18, 'São João da Varjota', '2209955', NULL, NULL);
INSERT INTO public.cities VALUES (3561, 18, 'São João do Arraial', '2209971', NULL, NULL);
INSERT INTO public.cities VALUES (3562, 18, 'São João do Piauí', '2210003', NULL, NULL);
INSERT INTO public.cities VALUES (3563, 18, 'São José do Divino', '2210052', NULL, NULL);
INSERT INTO public.cities VALUES (3564, 18, 'São José do Peixe', '2210102', NULL, NULL);
INSERT INTO public.cities VALUES (3565, 18, 'São José do Piauí', '2210201', NULL, NULL);
INSERT INTO public.cities VALUES (3566, 18, 'São Julião', '2210300', NULL, NULL);
INSERT INTO public.cities VALUES (3567, 18, 'São Lourenço do Piauí', '2210359', NULL, NULL);
INSERT INTO public.cities VALUES (3568, 18, 'São Luis do Piauí', '2210375', NULL, NULL);
INSERT INTO public.cities VALUES (3569, 18, 'São Miguel da Baixa Grande', '2210383', NULL, NULL);
INSERT INTO public.cities VALUES (3570, 18, 'São Miguel do Fidalgo', '2210391', NULL, NULL);
INSERT INTO public.cities VALUES (3571, 18, 'São Miguel do Tapuio', '2210409', NULL, NULL);
INSERT INTO public.cities VALUES (3572, 18, 'São Pedro do Piauí', '2210508', NULL, NULL);
INSERT INTO public.cities VALUES (3573, 18, 'São Raimundo Nonato', '2210607', NULL, NULL);
INSERT INTO public.cities VALUES (3574, 18, 'Sebastião Barros', '2210623', NULL, NULL);
INSERT INTO public.cities VALUES (3575, 18, 'Sebastião Leal', '2210631', NULL, NULL);
INSERT INTO public.cities VALUES (3576, 18, 'Sigefredo Pacheco', '2210656', NULL, NULL);
INSERT INTO public.cities VALUES (3577, 18, 'Simões', '2210706', NULL, NULL);
INSERT INTO public.cities VALUES (3578, 18, 'Simplício Mendes', '2210805', NULL, NULL);
INSERT INTO public.cities VALUES (3579, 18, 'Socorro do Piauí', '2210904', NULL, NULL);
INSERT INTO public.cities VALUES (3580, 18, 'Sussuapara', '2210938', NULL, NULL);
INSERT INTO public.cities VALUES (3581, 18, 'Tamboril do Piauí', '2210953', NULL, NULL);
INSERT INTO public.cities VALUES (3582, 18, 'Tanque do Piauí', '2210979', NULL, NULL);
INSERT INTO public.cities VALUES (3583, 18, 'Teresina', '2211001', NULL, NULL);
INSERT INTO public.cities VALUES (3584, 18, 'União', '2211100', NULL, NULL);
INSERT INTO public.cities VALUES (3585, 18, 'Uruçuí', '2211209', NULL, NULL);
INSERT INTO public.cities VALUES (3586, 18, 'Valença do Piauí', '2211308', NULL, NULL);
INSERT INTO public.cities VALUES (3587, 18, 'Várzea Branca', '2211357', NULL, NULL);
INSERT INTO public.cities VALUES (3588, 18, 'Várzea Grande', '2211407', NULL, NULL);
INSERT INTO public.cities VALUES (3589, 18, 'Vera Mendes', '2211506', NULL, NULL);
INSERT INTO public.cities VALUES (3590, 18, 'Vila Nova do Piauí', '2211605', NULL, NULL);
INSERT INTO public.cities VALUES (3591, 18, 'Wall Ferraz', '2211704', NULL, NULL);
INSERT INTO public.cities VALUES (3592, 19, 'Angra dos Reis', '3300100', NULL, NULL);
INSERT INTO public.cities VALUES (3593, 19, 'Aperibé', '3300159', NULL, NULL);
INSERT INTO public.cities VALUES (3594, 19, 'Araruama', '3300209', NULL, NULL);
INSERT INTO public.cities VALUES (3595, 19, 'Areal', '3300225', NULL, NULL);
INSERT INTO public.cities VALUES (3596, 19, 'Armação dos Búzios', '3300233', NULL, NULL);
INSERT INTO public.cities VALUES (3597, 19, 'Arraial do Cabo', '3300258', NULL, NULL);
INSERT INTO public.cities VALUES (3598, 19, 'Barra do Piraí', '3300308', NULL, NULL);
INSERT INTO public.cities VALUES (3599, 19, 'Barra Mansa', '3300407', NULL, NULL);
INSERT INTO public.cities VALUES (3600, 19, 'Belford Roxo', '3300456', NULL, NULL);
INSERT INTO public.cities VALUES (3601, 19, 'Bom Jardim', '3300506', NULL, NULL);
INSERT INTO public.cities VALUES (3602, 19, 'Bom Jesus do Itabapoana', '3300605', NULL, NULL);
INSERT INTO public.cities VALUES (3603, 19, 'Cabo Frio', '3300704', NULL, NULL);
INSERT INTO public.cities VALUES (3604, 19, 'Cachoeiras de Macacu', '3300803', NULL, NULL);
INSERT INTO public.cities VALUES (3605, 19, 'Cambuci', '3300902', NULL, NULL);
INSERT INTO public.cities VALUES (3606, 19, 'Campos dos Goytacazes', '3301009', NULL, NULL);
INSERT INTO public.cities VALUES (3607, 19, 'Cantagalo', '3301108', NULL, NULL);
INSERT INTO public.cities VALUES (3608, 19, 'Carapebus', '3300936', NULL, NULL);
INSERT INTO public.cities VALUES (3609, 19, 'Cardoso Moreira', '3301157', NULL, NULL);
INSERT INTO public.cities VALUES (3610, 19, 'Carmo', '3301207', NULL, NULL);
INSERT INTO public.cities VALUES (3611, 19, 'Casimiro de Abreu', '3301306', NULL, NULL);
INSERT INTO public.cities VALUES (3612, 19, 'Comendador Levy Gasparian', '3300951', NULL, NULL);
INSERT INTO public.cities VALUES (3613, 19, 'Conceição de Macabu', '3301405', NULL, NULL);
INSERT INTO public.cities VALUES (3614, 19, 'Cordeiro', '3301504', NULL, NULL);
INSERT INTO public.cities VALUES (3615, 19, 'Duas Barras', '3301603', NULL, NULL);
INSERT INTO public.cities VALUES (3616, 19, 'Duque de Caxias', '3301702', NULL, NULL);
INSERT INTO public.cities VALUES (3617, 19, 'Engenheiro Paulo de Frontin', '3301801', NULL, NULL);
INSERT INTO public.cities VALUES (3618, 19, 'Guapimirim', '3301850', NULL, NULL);
INSERT INTO public.cities VALUES (3619, 19, 'Iguaba Grande', '3301876', NULL, NULL);
INSERT INTO public.cities VALUES (3620, 19, 'Itaboraí', '3301900', NULL, NULL);
INSERT INTO public.cities VALUES (3621, 19, 'Itaguaí', '3302007', NULL, NULL);
INSERT INTO public.cities VALUES (3622, 19, 'Italva', '3302056', NULL, NULL);
INSERT INTO public.cities VALUES (3623, 19, 'Itaocara', '3302106', NULL, NULL);
INSERT INTO public.cities VALUES (3624, 19, 'Itaperuna', '3302205', NULL, NULL);
INSERT INTO public.cities VALUES (3625, 19, 'Itatiaia', '3302254', NULL, NULL);
INSERT INTO public.cities VALUES (3626, 19, 'Japeri', '3302270', NULL, NULL);
INSERT INTO public.cities VALUES (3627, 19, 'Laje do Muriaé', '3302304', NULL, NULL);
INSERT INTO public.cities VALUES (3628, 19, 'Macaé', '3302403', NULL, NULL);
INSERT INTO public.cities VALUES (3629, 19, 'Macuco', '3302452', NULL, NULL);
INSERT INTO public.cities VALUES (3630, 19, 'Magé', '3302502', NULL, NULL);
INSERT INTO public.cities VALUES (3631, 19, 'Mangaratiba', '3302601', NULL, NULL);
INSERT INTO public.cities VALUES (3632, 19, 'Maricá', '3302700', NULL, NULL);
INSERT INTO public.cities VALUES (3633, 19, 'Mendes', '3302809', NULL, NULL);
INSERT INTO public.cities VALUES (3634, 19, 'Mesquita', '3302858', NULL, NULL);
INSERT INTO public.cities VALUES (3635, 19, 'Miguel Pereira', '3302908', NULL, NULL);
INSERT INTO public.cities VALUES (3636, 19, 'Miracema', '3303005', NULL, NULL);
INSERT INTO public.cities VALUES (3637, 19, 'Natividade', '3303104', NULL, NULL);
INSERT INTO public.cities VALUES (3638, 19, 'Nilópolis', '3303203', NULL, NULL);
INSERT INTO public.cities VALUES (3639, 19, 'Niterói', '3303302', NULL, NULL);
INSERT INTO public.cities VALUES (3640, 19, 'Nova Friburgo', '3303401', NULL, NULL);
INSERT INTO public.cities VALUES (3641, 19, 'Nova Iguaçu', '3303500', NULL, NULL);
INSERT INTO public.cities VALUES (3642, 19, 'Paracambi', '3303609', NULL, NULL);
INSERT INTO public.cities VALUES (3643, 19, 'Paraíba do Sul', '3303708', NULL, NULL);
INSERT INTO public.cities VALUES (3644, 19, 'Paraty', '3303807', NULL, NULL);
INSERT INTO public.cities VALUES (3645, 19, 'Paty do Alferes', '3303856', NULL, NULL);
INSERT INTO public.cities VALUES (3646, 19, 'Petrópolis', '3303906', NULL, NULL);
INSERT INTO public.cities VALUES (3647, 19, 'Pinheiral', '3303955', NULL, NULL);
INSERT INTO public.cities VALUES (3648, 19, 'Piraí', '3304003', NULL, NULL);
INSERT INTO public.cities VALUES (3649, 19, 'Porciúncula', '3304102', NULL, NULL);
INSERT INTO public.cities VALUES (3650, 19, 'Porto Real', '3304110', NULL, NULL);
INSERT INTO public.cities VALUES (3651, 19, 'Quatis', '3304128', NULL, NULL);
INSERT INTO public.cities VALUES (3652, 19, 'Queimados', '3304144', NULL, NULL);
INSERT INTO public.cities VALUES (3653, 19, 'Quissamã', '3304151', NULL, NULL);
INSERT INTO public.cities VALUES (3654, 19, 'Resende', '3304201', NULL, NULL);
INSERT INTO public.cities VALUES (3655, 19, 'Rio Bonito', '3304300', NULL, NULL);
INSERT INTO public.cities VALUES (3656, 19, 'Rio Claro', '3304409', NULL, NULL);
INSERT INTO public.cities VALUES (3657, 19, 'Rio das Flores', '3304508', NULL, NULL);
INSERT INTO public.cities VALUES (3658, 19, 'Rio das Ostras', '3304524', NULL, NULL);
INSERT INTO public.cities VALUES (3659, 19, 'Rio de Janeiro', '3304557', NULL, NULL);
INSERT INTO public.cities VALUES (3660, 19, 'Santa Maria Madalena', '3304607', NULL, NULL);
INSERT INTO public.cities VALUES (3661, 19, 'Santo Antônio de Pádua', '3304706', NULL, NULL);
INSERT INTO public.cities VALUES (3662, 19, 'São Fidélis', '3304805', NULL, NULL);
INSERT INTO public.cities VALUES (3663, 19, 'São Francisco de Itabapoana', '3304755', NULL, NULL);
INSERT INTO public.cities VALUES (3664, 19, 'São Gonçalo', '3304904', NULL, NULL);
INSERT INTO public.cities VALUES (3665, 19, 'São João da Barra', '3305000', NULL, NULL);
INSERT INTO public.cities VALUES (3666, 19, 'São João de Meriti', '3305109', NULL, NULL);
INSERT INTO public.cities VALUES (3667, 19, 'São José de Ubá', '3305133', NULL, NULL);
INSERT INTO public.cities VALUES (3668, 19, 'São José do Vale do Rio Preto', '3305158', NULL, NULL);
INSERT INTO public.cities VALUES (3669, 19, 'São Pedro da Aldeia', '3305208', NULL, NULL);
INSERT INTO public.cities VALUES (3670, 19, 'São Sebastião do Alto', '3305307', NULL, NULL);
INSERT INTO public.cities VALUES (3672, 19, 'Saquarema', '3305505', NULL, NULL);
INSERT INTO public.cities VALUES (3673, 19, 'Seropédica', '3305554', NULL, NULL);
INSERT INTO public.cities VALUES (3674, 19, 'Silva Jardim', '3305604', NULL, NULL);
INSERT INTO public.cities VALUES (3675, 19, 'Sumidouro', '3305703', NULL, NULL);
INSERT INTO public.cities VALUES (3676, 19, 'Tanguá', '3305752', NULL, NULL);
INSERT INTO public.cities VALUES (3677, 19, 'Teresópolis', '3305802', NULL, NULL);
INSERT INTO public.cities VALUES (3678, 19, 'Trajano de Moraes', '3305901', NULL, NULL);
INSERT INTO public.cities VALUES (3679, 19, 'Três Rios', '3306008', NULL, NULL);
INSERT INTO public.cities VALUES (3680, 19, 'Valença', '3306107', NULL, NULL);
INSERT INTO public.cities VALUES (3681, 19, 'Varre-Sai', '3306156', NULL, NULL);
INSERT INTO public.cities VALUES (3682, 19, 'Vassouras', '3306206', NULL, NULL);
INSERT INTO public.cities VALUES (3683, 19, 'Volta Redonda', '3306305', NULL, NULL);
INSERT INTO public.cities VALUES (3684, 20, 'Acari', '2400109', NULL, NULL);
INSERT INTO public.cities VALUES (3685, 20, 'Açu', '2400208', NULL, NULL);
INSERT INTO public.cities VALUES (3686, 20, 'Afonso Bezerra', '2400307', NULL, NULL);
INSERT INTO public.cities VALUES (3687, 20, 'Água Nova', '2400406', NULL, NULL);
INSERT INTO public.cities VALUES (3688, 20, 'Alexandria', '2400505', NULL, NULL);
INSERT INTO public.cities VALUES (3689, 20, 'Almino Afonso', '2400604', NULL, NULL);
INSERT INTO public.cities VALUES (3690, 20, 'Alto do Rodrigues', '2400703', NULL, NULL);
INSERT INTO public.cities VALUES (3691, 20, 'Angicos', '2400802', NULL, NULL);
INSERT INTO public.cities VALUES (3692, 20, 'Antônio Martins', '2400901', NULL, NULL);
INSERT INTO public.cities VALUES (3693, 20, 'Apodi', '2401008', NULL, NULL);
INSERT INTO public.cities VALUES (3694, 20, 'Areia Branca', '2401107', NULL, NULL);
INSERT INTO public.cities VALUES (3695, 20, 'Arês', '2401206', NULL, NULL);
INSERT INTO public.cities VALUES (3696, 20, 'Augusto Severo', '2401305', NULL, NULL);
INSERT INTO public.cities VALUES (3697, 20, 'Baía Formosa', '2401404', NULL, NULL);
INSERT INTO public.cities VALUES (3698, 20, 'Baraúna', '2401453', NULL, NULL);
INSERT INTO public.cities VALUES (3699, 20, 'Barcelona', '2401503', NULL, NULL);
INSERT INTO public.cities VALUES (3700, 20, 'Bento Fernandes', '2401602', NULL, NULL);
INSERT INTO public.cities VALUES (3701, 20, 'Bodó', '2401651', NULL, NULL);
INSERT INTO public.cities VALUES (3702, 20, 'Bom Jesus', '2401701', NULL, NULL);
INSERT INTO public.cities VALUES (3703, 20, 'Brejinho', '2401800', NULL, NULL);
INSERT INTO public.cities VALUES (3704, 20, 'Caiçara do Norte', '2401859', NULL, NULL);
INSERT INTO public.cities VALUES (3705, 20, 'Caiçara do Rio do Vento', '2401909', NULL, NULL);
INSERT INTO public.cities VALUES (3706, 20, 'Caicó', '2402006', NULL, NULL);
INSERT INTO public.cities VALUES (3707, 20, 'Campo Redondo', '2402105', NULL, NULL);
INSERT INTO public.cities VALUES (3708, 20, 'Canguaretama', '2402204', NULL, NULL);
INSERT INTO public.cities VALUES (3709, 20, 'Caraúbas', '2402303', NULL, NULL);
INSERT INTO public.cities VALUES (3710, 20, 'Carnaúba dos Dantas', '2402402', NULL, NULL);
INSERT INTO public.cities VALUES (3711, 20, 'Carnaubais', '2402501', NULL, NULL);
INSERT INTO public.cities VALUES (3712, 20, 'Ceará-Mirim', '2402600', NULL, NULL);
INSERT INTO public.cities VALUES (3713, 20, 'Cerro Corá', '2402709', NULL, NULL);
INSERT INTO public.cities VALUES (3714, 20, 'Coronel Ezequiel', '2402808', NULL, NULL);
INSERT INTO public.cities VALUES (3715, 20, 'Coronel João Pessoa', '2402907', NULL, NULL);
INSERT INTO public.cities VALUES (3716, 20, 'Cruzeta', '2403004', NULL, NULL);
INSERT INTO public.cities VALUES (3717, 20, 'Currais Novos', '2403103', NULL, NULL);
INSERT INTO public.cities VALUES (3718, 20, 'Doutor Severiano', '2403202', NULL, NULL);
INSERT INTO public.cities VALUES (3719, 20, 'Encanto', '2403301', NULL, NULL);
INSERT INTO public.cities VALUES (3720, 20, 'Equador', '2403400', NULL, NULL);
INSERT INTO public.cities VALUES (3721, 20, 'Espírito Santo', '2403509', NULL, NULL);
INSERT INTO public.cities VALUES (3722, 20, 'Extremoz', '2403608', NULL, NULL);
INSERT INTO public.cities VALUES (3723, 20, 'Felipe Guerra', '2403707', NULL, NULL);
INSERT INTO public.cities VALUES (3724, 20, 'Fernando Pedroza', '2403756', NULL, NULL);
INSERT INTO public.cities VALUES (3725, 20, 'Florânia', '2403806', NULL, NULL);
INSERT INTO public.cities VALUES (3726, 20, 'Francisco Dantas', '2403905', NULL, NULL);
INSERT INTO public.cities VALUES (3727, 20, 'Frutuoso Gomes', '2404002', NULL, NULL);
INSERT INTO public.cities VALUES (3728, 20, 'Galinhos', '2404101', NULL, NULL);
INSERT INTO public.cities VALUES (3729, 20, 'Goianinha', '2404200', NULL, NULL);
INSERT INTO public.cities VALUES (3730, 20, 'Governador Dix-Sept Rosado', '2404309', NULL, NULL);
INSERT INTO public.cities VALUES (3731, 20, 'Grossos', '2404408', NULL, NULL);
INSERT INTO public.cities VALUES (3732, 20, 'Guamaré', '2404507', NULL, NULL);
INSERT INTO public.cities VALUES (3733, 20, 'Ielmo Marinho', '2404606', NULL, NULL);
INSERT INTO public.cities VALUES (3734, 20, 'Ipanguaçu', '2404705', NULL, NULL);
INSERT INTO public.cities VALUES (3735, 20, 'Ipueira', '2404804', NULL, NULL);
INSERT INTO public.cities VALUES (3736, 20, 'Itajá', '2404853', NULL, NULL);
INSERT INTO public.cities VALUES (3737, 20, 'Itaú', '2404903', NULL, NULL);
INSERT INTO public.cities VALUES (3738, 20, 'Jaçanã', '2405009', NULL, NULL);
INSERT INTO public.cities VALUES (3739, 20, 'Jandaíra', '2405108', NULL, NULL);
INSERT INTO public.cities VALUES (3740, 20, 'Janduís', '2405207', NULL, NULL);
INSERT INTO public.cities VALUES (3741, 20, 'Januário Cicco', '2405306', NULL, NULL);
INSERT INTO public.cities VALUES (3742, 20, 'Japi', '2405405', NULL, NULL);
INSERT INTO public.cities VALUES (3743, 20, 'Jardim de Angicos', '2405504', NULL, NULL);
INSERT INTO public.cities VALUES (3744, 20, 'Jardim de Piranhas', '2405603', NULL, NULL);
INSERT INTO public.cities VALUES (3745, 20, 'Jardim do Seridó', '2405702', NULL, NULL);
INSERT INTO public.cities VALUES (3746, 20, 'João Câmara', '2405801', NULL, NULL);
INSERT INTO public.cities VALUES (3747, 20, 'João Dias', '2405900', NULL, NULL);
INSERT INTO public.cities VALUES (3748, 20, 'José da Penha', '2406007', NULL, NULL);
INSERT INTO public.cities VALUES (3749, 20, 'Jucurutu', '2406106', NULL, NULL);
INSERT INTO public.cities VALUES (3750, 20, 'Jundiá', '2406155', NULL, NULL);
INSERT INTO public.cities VALUES (3751, 20, 'Lagoa d''Anta', '2406205', NULL, NULL);
INSERT INTO public.cities VALUES (3752, 20, 'Lagoa de Pedras', '2406304', NULL, NULL);
INSERT INTO public.cities VALUES (3753, 20, 'Lagoa de Velhos', '2406403', NULL, NULL);
INSERT INTO public.cities VALUES (3754, 20, 'Lagoa Nova', '2406502', NULL, NULL);
INSERT INTO public.cities VALUES (3755, 20, 'Lagoa Salgada', '2406601', NULL, NULL);
INSERT INTO public.cities VALUES (3756, 20, 'Lajes', '2406700', NULL, NULL);
INSERT INTO public.cities VALUES (3757, 20, 'Lajes Pintadas', '2406809', NULL, NULL);
INSERT INTO public.cities VALUES (3758, 20, 'Lucrécia', '2406908', NULL, NULL);
INSERT INTO public.cities VALUES (3759, 20, 'Luís Gomes', '2407005', NULL, NULL);
INSERT INTO public.cities VALUES (3760, 20, 'Macaíba', '2407104', NULL, NULL);
INSERT INTO public.cities VALUES (3761, 20, 'Macau', '2407203', NULL, NULL);
INSERT INTO public.cities VALUES (3762, 20, 'Major Sales', '2407252', NULL, NULL);
INSERT INTO public.cities VALUES (3763, 20, 'Marcelino Vieira', '2407302', NULL, NULL);
INSERT INTO public.cities VALUES (3764, 20, 'Martins', '2407401', NULL, NULL);
INSERT INTO public.cities VALUES (3765, 20, 'Maxaranguape', '2407500', NULL, NULL);
INSERT INTO public.cities VALUES (3766, 20, 'Messias Targino', '2407609', NULL, NULL);
INSERT INTO public.cities VALUES (3767, 20, 'Montanhas', '2407708', NULL, NULL);
INSERT INTO public.cities VALUES (3768, 20, 'Monte Alegre', '2407807', NULL, NULL);
INSERT INTO public.cities VALUES (3769, 20, 'Monte das Gameleiras', '2407906', NULL, NULL);
INSERT INTO public.cities VALUES (3770, 20, 'Mossoró', '2408003', NULL, NULL);
INSERT INTO public.cities VALUES (3771, 20, 'Natal', '2408102', NULL, NULL);
INSERT INTO public.cities VALUES (3772, 20, 'Nísia Floresta', '2408201', NULL, NULL);
INSERT INTO public.cities VALUES (3773, 20, 'Nova Cruz', '2408300', NULL, NULL);
INSERT INTO public.cities VALUES (3774, 20, 'Olho-d''Água do Borges', '2408409', NULL, NULL);
INSERT INTO public.cities VALUES (3775, 20, 'Ouro Branco', '2408508', NULL, NULL);
INSERT INTO public.cities VALUES (3776, 20, 'Paraná', '2408607', NULL, NULL);
INSERT INTO public.cities VALUES (3777, 20, 'Paraú', '2408706', NULL, NULL);
INSERT INTO public.cities VALUES (3778, 20, 'Parazinho', '2408805', NULL, NULL);
INSERT INTO public.cities VALUES (3779, 20, 'Parelhas', '2408904', NULL, NULL);
INSERT INTO public.cities VALUES (3780, 20, 'Parnamirim', '2403251', NULL, NULL);
INSERT INTO public.cities VALUES (3781, 20, 'Passa e Fica', '2409100', NULL, NULL);
INSERT INTO public.cities VALUES (3782, 20, 'Passagem', '2409209', NULL, NULL);
INSERT INTO public.cities VALUES (3783, 20, 'Patu', '2409308', NULL, NULL);
INSERT INTO public.cities VALUES (3784, 20, 'Pau dos Ferros', '2409407', NULL, NULL);
INSERT INTO public.cities VALUES (3785, 20, 'Pedra Grande', '2409506', NULL, NULL);
INSERT INTO public.cities VALUES (3786, 20, 'Pedra Preta', '2409605', NULL, NULL);
INSERT INTO public.cities VALUES (3787, 20, 'Pedro Avelino', '2409704', NULL, NULL);
INSERT INTO public.cities VALUES (3788, 20, 'Pedro Velho', '2409803', NULL, NULL);
INSERT INTO public.cities VALUES (3789, 20, 'Pendências', '2409902', NULL, NULL);
INSERT INTO public.cities VALUES (3790, 20, 'Pilões', '2410009', NULL, NULL);
INSERT INTO public.cities VALUES (3791, 20, 'Poço Branco', '2410108', NULL, NULL);
INSERT INTO public.cities VALUES (3792, 20, 'Portalegre', '2410207', NULL, NULL);
INSERT INTO public.cities VALUES (3793, 20, 'Porto do Mangue', '2410256', NULL, NULL);
INSERT INTO public.cities VALUES (3794, 20, 'Presidente Juscelino', '2410306', NULL, NULL);
INSERT INTO public.cities VALUES (3795, 20, 'Pureza', '2410405', NULL, NULL);
INSERT INTO public.cities VALUES (3796, 20, 'Rafael Fernandes', '2410504', NULL, NULL);
INSERT INTO public.cities VALUES (3797, 20, 'Rafael Godeiro', '2410603', NULL, NULL);
INSERT INTO public.cities VALUES (3798, 20, 'Riacho da Cruz', '2410702', NULL, NULL);
INSERT INTO public.cities VALUES (3799, 20, 'Riacho de Santana', '2410801', NULL, NULL);
INSERT INTO public.cities VALUES (3800, 20, 'Riachuelo', '2410900', NULL, NULL);
INSERT INTO public.cities VALUES (3801, 20, 'Rio do Fogo', '2408953', NULL, NULL);
INSERT INTO public.cities VALUES (3802, 20, 'Rodolfo Fernandes', '2411007', NULL, NULL);
INSERT INTO public.cities VALUES (3803, 20, 'Ruy Barbosa', '2411106', NULL, NULL);
INSERT INTO public.cities VALUES (3804, 20, 'Santa Cruz', '2411205', NULL, NULL);
INSERT INTO public.cities VALUES (3805, 20, 'Santa Maria', '2409332', NULL, NULL);
INSERT INTO public.cities VALUES (3806, 20, 'Santana do Matos', '2411403', NULL, NULL);
INSERT INTO public.cities VALUES (3807, 20, 'Santana do Seridó', '2411429', NULL, NULL);
INSERT INTO public.cities VALUES (3808, 20, 'Santo Antônio', '2411502', NULL, NULL);
INSERT INTO public.cities VALUES (3809, 20, 'São Bento do Norte', '2411601', NULL, NULL);
INSERT INTO public.cities VALUES (3810, 20, 'São Bento do Trairí', '2411700', NULL, NULL);
INSERT INTO public.cities VALUES (3811, 20, 'São Fernando', '2411809', NULL, NULL);
INSERT INTO public.cities VALUES (3812, 20, 'São Francisco do Oeste', '2411908', NULL, NULL);
INSERT INTO public.cities VALUES (3813, 20, 'São Gonçalo do Amarante', '2412005', NULL, NULL);
INSERT INTO public.cities VALUES (3814, 20, 'São João do Sabugi', '2412104', NULL, NULL);
INSERT INTO public.cities VALUES (3815, 20, 'São José de Mipibu', '2412203', NULL, NULL);
INSERT INTO public.cities VALUES (3816, 20, 'São José do Campestre', '2412302', NULL, NULL);
INSERT INTO public.cities VALUES (3817, 20, 'São José do Seridó', '2412401', NULL, NULL);
INSERT INTO public.cities VALUES (3818, 20, 'São Miguel', '2412500', NULL, NULL);
INSERT INTO public.cities VALUES (3819, 20, 'São Miguel do Gostoso', '2412559', NULL, NULL);
INSERT INTO public.cities VALUES (3820, 20, 'São Paulo do Potengi', '2412609', NULL, NULL);
INSERT INTO public.cities VALUES (3821, 20, 'São Pedro', '2412708', NULL, NULL);
INSERT INTO public.cities VALUES (3822, 20, 'São Rafael', '2412807', NULL, NULL);
INSERT INTO public.cities VALUES (3823, 20, 'São Tomé', '2412906', NULL, NULL);
INSERT INTO public.cities VALUES (3824, 20, 'São Vicente', '2413003', NULL, NULL);
INSERT INTO public.cities VALUES (3825, 20, 'Senador Elói de Souza', '2413102', NULL, NULL);
INSERT INTO public.cities VALUES (3826, 20, 'Senador Georgino Avelino', '2413201', NULL, NULL);
INSERT INTO public.cities VALUES (3827, 20, 'Serra de São Bento', '2413300', NULL, NULL);
INSERT INTO public.cities VALUES (3828, 20, 'Serra do Mel', '2413359', NULL, NULL);
INSERT INTO public.cities VALUES (3829, 20, 'Serra Negra do Norte', '2413409', NULL, NULL);
INSERT INTO public.cities VALUES (3830, 20, 'Serrinha', '2413508', NULL, NULL);
INSERT INTO public.cities VALUES (3831, 20, 'Serrinha dos Pintos', '2413557', NULL, NULL);
INSERT INTO public.cities VALUES (3832, 20, 'Severiano Melo', '2413607', NULL, NULL);
INSERT INTO public.cities VALUES (3833, 20, 'Sítio Novo', '2413706', NULL, NULL);
INSERT INTO public.cities VALUES (3834, 20, 'Taboleiro Grande', '2413805', NULL, NULL);
INSERT INTO public.cities VALUES (3835, 20, 'Taipu', '2413904', NULL, NULL);
INSERT INTO public.cities VALUES (3836, 20, 'Tangará', '2414001', NULL, NULL);
INSERT INTO public.cities VALUES (3837, 20, 'Tenente Ananias', '2414100', NULL, NULL);
INSERT INTO public.cities VALUES (3838, 20, 'Tenente Laurentino Cruz', '2414159', NULL, NULL);
INSERT INTO public.cities VALUES (3839, 20, 'Tibau', '2411056', NULL, NULL);
INSERT INTO public.cities VALUES (3840, 20, 'Tibau do Sul', '2414209', NULL, NULL);
INSERT INTO public.cities VALUES (3841, 20, 'Timbaúba dos Batistas', '2414308', NULL, NULL);
INSERT INTO public.cities VALUES (3842, 20, 'Touros', '2414407', NULL, NULL);
INSERT INTO public.cities VALUES (3843, 20, 'Triunfo Potiguar', '2414456', NULL, NULL);
INSERT INTO public.cities VALUES (3844, 20, 'Umarizal', '2414506', NULL, NULL);
INSERT INTO public.cities VALUES (3845, 20, 'Upanema', '2414605', NULL, NULL);
INSERT INTO public.cities VALUES (3846, 20, 'Várzea', '2414704', NULL, NULL);
INSERT INTO public.cities VALUES (3847, 20, 'Venha-Ver', '2414753', NULL, NULL);
INSERT INTO public.cities VALUES (3848, 20, 'Vera Cruz', '2414803', NULL, NULL);
INSERT INTO public.cities VALUES (3849, 20, 'Viçosa', '2414902', NULL, NULL);
INSERT INTO public.cities VALUES (3850, 20, 'Vila Flor', '2415008', NULL, NULL);
INSERT INTO public.cities VALUES (3851, 21, 'Aceguá', '4300034', NULL, NULL);
INSERT INTO public.cities VALUES (3852, 21, 'Água Santa', '4300059', NULL, NULL);
INSERT INTO public.cities VALUES (3853, 21, 'Agudo', '4300109', NULL, NULL);
INSERT INTO public.cities VALUES (3854, 21, 'Ajuricaba', '4300208', NULL, NULL);
INSERT INTO public.cities VALUES (3855, 21, 'Alecrim', '4300307', NULL, NULL);
INSERT INTO public.cities VALUES (3856, 21, 'Alegrete', '4300406', NULL, NULL);
INSERT INTO public.cities VALUES (3857, 21, 'Alegria', '4300455', NULL, NULL);
INSERT INTO public.cities VALUES (3858, 21, 'Almirante Tamandaré do Sul', '4300471', NULL, NULL);
INSERT INTO public.cities VALUES (3859, 21, 'Alpestre', '4300505', NULL, NULL);
INSERT INTO public.cities VALUES (3860, 21, 'Alto Alegre', '4300554', NULL, NULL);
INSERT INTO public.cities VALUES (3861, 21, 'Alto Feliz', '4300570', NULL, NULL);
INSERT INTO public.cities VALUES (3862, 21, 'Alvorada', '4300604', NULL, NULL);
INSERT INTO public.cities VALUES (3863, 21, 'Amaral Ferrador', '4300638', NULL, NULL);
INSERT INTO public.cities VALUES (3864, 21, 'Ametista do Sul', '4300646', NULL, NULL);
INSERT INTO public.cities VALUES (3865, 21, 'André da Rocha', '4300661', NULL, NULL);
INSERT INTO public.cities VALUES (3866, 21, 'Anta Gorda', '4300703', NULL, NULL);
INSERT INTO public.cities VALUES (3867, 21, 'Antônio Prado', '4300802', NULL, NULL);
INSERT INTO public.cities VALUES (3868, 21, 'Arambaré', '4300851', NULL, NULL);
INSERT INTO public.cities VALUES (3869, 21, 'Araricá', '4300877', NULL, NULL);
INSERT INTO public.cities VALUES (3870, 21, 'Aratiba', '4300901', NULL, NULL);
INSERT INTO public.cities VALUES (3871, 21, 'Arroio do Meio', '4301008', NULL, NULL);
INSERT INTO public.cities VALUES (3872, 21, 'Arroio do Padre', '4301073', NULL, NULL);
INSERT INTO public.cities VALUES (3873, 21, 'Arroio do Sal', '4301057', NULL, NULL);
INSERT INTO public.cities VALUES (3874, 21, 'Arroio do Tigre', '4301206', NULL, NULL);
INSERT INTO public.cities VALUES (3875, 21, 'Arroio dos Ratos', '4301107', NULL, NULL);
INSERT INTO public.cities VALUES (3876, 21, 'Arroio Grande', '4301305', NULL, NULL);
INSERT INTO public.cities VALUES (3877, 21, 'Arvorezinha', '4301404', NULL, NULL);
INSERT INTO public.cities VALUES (3878, 21, 'Augusto Pestana', '4301503', NULL, NULL);
INSERT INTO public.cities VALUES (3879, 21, 'Áurea', '4301552', NULL, NULL);
INSERT INTO public.cities VALUES (3880, 21, 'Bagé', '4301602', NULL, NULL);
INSERT INTO public.cities VALUES (3881, 21, 'Balneário Pinhal', '4301636', NULL, NULL);
INSERT INTO public.cities VALUES (3882, 21, 'Barão', '4301651', NULL, NULL);
INSERT INTO public.cities VALUES (3883, 21, 'Barão de Cotegipe', '4301701', NULL, NULL);
INSERT INTO public.cities VALUES (3884, 21, 'Barão do Triunfo', '4301750', NULL, NULL);
INSERT INTO public.cities VALUES (3885, 21, 'Barra do Guarita', '4301859', NULL, NULL);
INSERT INTO public.cities VALUES (3886, 21, 'Barra do Quaraí', '4301875', NULL, NULL);
INSERT INTO public.cities VALUES (3887, 21, 'Barra do Ribeiro', '4301909', NULL, NULL);
INSERT INTO public.cities VALUES (3888, 21, 'Barra do Rio Azul', '4301925', NULL, NULL);
INSERT INTO public.cities VALUES (3889, 21, 'Barra Funda', '4301958', NULL, NULL);
INSERT INTO public.cities VALUES (3890, 21, 'Barracão', '4301800', NULL, NULL);
INSERT INTO public.cities VALUES (3891, 21, 'Barros Cassal', '4302006', NULL, NULL);
INSERT INTO public.cities VALUES (3892, 21, 'Benjamin Constant do Sul', '4302055', NULL, NULL);
INSERT INTO public.cities VALUES (3893, 21, 'Bento Gonçalves', '4302105', NULL, NULL);
INSERT INTO public.cities VALUES (3894, 21, 'Boa Vista das Missões', '4302154', NULL, NULL);
INSERT INTO public.cities VALUES (3895, 21, 'Boa Vista do Buricá', '4302204', NULL, NULL);
INSERT INTO public.cities VALUES (3896, 21, 'Boa Vista do Cadeado', '4302220', NULL, NULL);
INSERT INTO public.cities VALUES (3897, 21, 'Boa Vista do Incra', '4302238', NULL, NULL);
INSERT INTO public.cities VALUES (3898, 21, 'Boa Vista do Sul', '4302253', NULL, NULL);
INSERT INTO public.cities VALUES (3899, 21, 'Bom Jesus', '4302303', NULL, NULL);
INSERT INTO public.cities VALUES (3900, 21, 'Bom Princípio', '4302352', NULL, NULL);
INSERT INTO public.cities VALUES (3901, 21, 'Bom Progresso', '4302378', NULL, NULL);
INSERT INTO public.cities VALUES (3902, 21, 'Bom Retiro do Sul', '4302402', NULL, NULL);
INSERT INTO public.cities VALUES (3903, 21, 'Boqueirão do Leão', '4302451', NULL, NULL);
INSERT INTO public.cities VALUES (3904, 21, 'Bossoroca', '4302501', NULL, NULL);
INSERT INTO public.cities VALUES (3905, 21, 'Bozano', '4302584', NULL, NULL);
INSERT INTO public.cities VALUES (3906, 21, 'Braga', '4302600', NULL, NULL);
INSERT INTO public.cities VALUES (3907, 21, 'Brochier', '4302659', NULL, NULL);
INSERT INTO public.cities VALUES (3908, 21, 'Butiá', '4302709', NULL, NULL);
INSERT INTO public.cities VALUES (3909, 21, 'Caçapava do Sul', '4302808', NULL, NULL);
INSERT INTO public.cities VALUES (3910, 21, 'Cacequi', '4302907', NULL, NULL);
INSERT INTO public.cities VALUES (3911, 21, 'Cachoeira do Sul', '4303004', NULL, NULL);
INSERT INTO public.cities VALUES (3912, 21, 'Cachoeirinha', '4303103', NULL, NULL);
INSERT INTO public.cities VALUES (3913, 21, 'Cacique Doble', '4303202', NULL, NULL);
INSERT INTO public.cities VALUES (3914, 21, 'Caibaté', '4303301', NULL, NULL);
INSERT INTO public.cities VALUES (3915, 21, 'Caiçara', '4303400', NULL, NULL);
INSERT INTO public.cities VALUES (3916, 21, 'Camaquã', '4303509', NULL, NULL);
INSERT INTO public.cities VALUES (3917, 21, 'Camargo', '4303558', NULL, NULL);
INSERT INTO public.cities VALUES (3918, 21, 'Cambará do Sul', '4303608', NULL, NULL);
INSERT INTO public.cities VALUES (3919, 21, 'Campestre da Serra', '4303673', NULL, NULL);
INSERT INTO public.cities VALUES (3920, 21, 'Campina das Missões', '4303707', NULL, NULL);
INSERT INTO public.cities VALUES (3921, 21, 'Campinas do Sul', '4303806', NULL, NULL);
INSERT INTO public.cities VALUES (3922, 21, 'Campo Bom', '4303905', NULL, NULL);
INSERT INTO public.cities VALUES (3923, 21, 'Campo Novo', '4304002', NULL, NULL);
INSERT INTO public.cities VALUES (3924, 21, 'Campos Borges', '4304101', NULL, NULL);
INSERT INTO public.cities VALUES (3925, 21, 'Candelária', '4304200', NULL, NULL);
INSERT INTO public.cities VALUES (3926, 21, 'Cândido Godói', '4304309', NULL, NULL);
INSERT INTO public.cities VALUES (3927, 21, 'Candiota', '4304358', NULL, NULL);
INSERT INTO public.cities VALUES (3928, 21, 'Canela', '4304408', NULL, NULL);
INSERT INTO public.cities VALUES (3929, 21, 'Canguçu', '4304507', NULL, NULL);
INSERT INTO public.cities VALUES (3930, 21, 'Canoas', '4304606', NULL, NULL);
INSERT INTO public.cities VALUES (3931, 21, 'Canudos do Vale', '4304614', NULL, NULL);
INSERT INTO public.cities VALUES (3932, 21, 'Capão Bonito do Sul', '4304622', NULL, NULL);
INSERT INTO public.cities VALUES (3933, 21, 'Capão da Canoa', '4304630', NULL, NULL);
INSERT INTO public.cities VALUES (3934, 21, 'Capão do Cipó', '4304655', NULL, NULL);
INSERT INTO public.cities VALUES (3935, 21, 'Capão do Leão', '4304663', NULL, NULL);
INSERT INTO public.cities VALUES (3936, 21, 'Capela de Santana', '4304689', NULL, NULL);
INSERT INTO public.cities VALUES (3937, 21, 'Capitão', '4304697', NULL, NULL);
INSERT INTO public.cities VALUES (3938, 21, 'Capivari do Sul', '4304671', NULL, NULL);
INSERT INTO public.cities VALUES (3939, 21, 'Caraá', '4304713', NULL, NULL);
INSERT INTO public.cities VALUES (3940, 21, 'Carazinho', '4304705', NULL, NULL);
INSERT INTO public.cities VALUES (3941, 21, 'Carlos Barbosa', '4304804', NULL, NULL);
INSERT INTO public.cities VALUES (3942, 21, 'Carlos Gomes', '4304853', NULL, NULL);
INSERT INTO public.cities VALUES (3943, 21, 'Casca', '4304903', NULL, NULL);
INSERT INTO public.cities VALUES (3944, 21, 'Caseiros', '4304952', NULL, NULL);
INSERT INTO public.cities VALUES (3945, 21, 'Catuípe', '4305009', NULL, NULL);
INSERT INTO public.cities VALUES (3946, 21, 'Caxias do Sul', '4305108', NULL, NULL);
INSERT INTO public.cities VALUES (3947, 21, 'Centenário', '4305116', NULL, NULL);
INSERT INTO public.cities VALUES (3948, 21, 'Cerrito', '4305124', NULL, NULL);
INSERT INTO public.cities VALUES (3949, 21, 'Cerro Branco', '4305132', NULL, NULL);
INSERT INTO public.cities VALUES (3950, 21, 'Cerro Grande', '4305157', NULL, NULL);
INSERT INTO public.cities VALUES (3951, 21, 'Cerro Grande do Sul', '4305173', NULL, NULL);
INSERT INTO public.cities VALUES (3952, 21, 'Cerro Largo', '4305207', NULL, NULL);
INSERT INTO public.cities VALUES (3953, 21, 'Chapada', '4305306', NULL, NULL);
INSERT INTO public.cities VALUES (3954, 21, 'Charqueadas', '4305355', NULL, NULL);
INSERT INTO public.cities VALUES (3955, 21, 'Charrua', '4305371', NULL, NULL);
INSERT INTO public.cities VALUES (3956, 21, 'Chiapetta', '4305405', NULL, NULL);
INSERT INTO public.cities VALUES (3957, 21, 'Chuí', '4305439', NULL, NULL);
INSERT INTO public.cities VALUES (3958, 21, 'Chuvisca', '4305447', NULL, NULL);
INSERT INTO public.cities VALUES (3959, 21, 'Cidreira', '4305454', NULL, NULL);
INSERT INTO public.cities VALUES (3960, 21, 'Ciríaco', '4305504', NULL, NULL);
INSERT INTO public.cities VALUES (3961, 21, 'Colinas', '4305587', NULL, NULL);
INSERT INTO public.cities VALUES (3962, 21, 'Colorado', '4305603', NULL, NULL);
INSERT INTO public.cities VALUES (3963, 21, 'Condor', '4305702', NULL, NULL);
INSERT INTO public.cities VALUES (3964, 21, 'Constantina', '4305801', NULL, NULL);
INSERT INTO public.cities VALUES (3965, 21, 'Coqueiro Baixo', '4305835', NULL, NULL);
INSERT INTO public.cities VALUES (3966, 21, 'Coqueiros do Sul', '4305850', NULL, NULL);
INSERT INTO public.cities VALUES (3967, 21, 'Coronel Barros', '4305871', NULL, NULL);
INSERT INTO public.cities VALUES (3968, 21, 'Coronel Bicaco', '4305900', NULL, NULL);
INSERT INTO public.cities VALUES (3969, 21, 'Coronel Pilar', '4305934', NULL, NULL);
INSERT INTO public.cities VALUES (3970, 21, 'Cotiporã', '4305959', NULL, NULL);
INSERT INTO public.cities VALUES (3971, 21, 'Coxilha', '4305975', NULL, NULL);
INSERT INTO public.cities VALUES (3972, 21, 'Crissiumal', '4306007', NULL, NULL);
INSERT INTO public.cities VALUES (3973, 21, 'Cristal', '4306056', NULL, NULL);
INSERT INTO public.cities VALUES (3974, 21, 'Cristal do Sul', '4306072', NULL, NULL);
INSERT INTO public.cities VALUES (3975, 21, 'Cruz Alta', '4306106', NULL, NULL);
INSERT INTO public.cities VALUES (3976, 21, 'Cruzaltense', '4306130', NULL, NULL);
INSERT INTO public.cities VALUES (3977, 21, 'Cruzeiro do Sul', '4306205', NULL, NULL);
INSERT INTO public.cities VALUES (3978, 21, 'David Canabarro', '4306304', NULL, NULL);
INSERT INTO public.cities VALUES (3979, 21, 'Derrubadas', '4306320', NULL, NULL);
INSERT INTO public.cities VALUES (3980, 21, 'Dezesseis de Novembro', '4306353', NULL, NULL);
INSERT INTO public.cities VALUES (3981, 21, 'Dilermando de Aguiar', '4306379', NULL, NULL);
INSERT INTO public.cities VALUES (3982, 21, 'Dois Irmãos', '4306403', NULL, NULL);
INSERT INTO public.cities VALUES (3983, 21, 'Dois Irmãos das Missões', '4306429', NULL, NULL);
INSERT INTO public.cities VALUES (3984, 21, 'Dois Lajeados', '4306452', NULL, NULL);
INSERT INTO public.cities VALUES (3985, 21, 'Dom Feliciano', '4306502', NULL, NULL);
INSERT INTO public.cities VALUES (3986, 21, 'Dom Pedrito', '4306601', NULL, NULL);
INSERT INTO public.cities VALUES (3987, 21, 'Dom Pedro de Alcântara', '4306551', NULL, NULL);
INSERT INTO public.cities VALUES (3988, 21, 'Dona Francisca', '4306700', NULL, NULL);
INSERT INTO public.cities VALUES (3989, 21, 'Doutor Maurício Cardoso', '4306734', NULL, NULL);
INSERT INTO public.cities VALUES (3990, 21, 'Doutor Ricardo', '4306759', NULL, NULL);
INSERT INTO public.cities VALUES (3991, 21, 'Eldorado do Sul', '4306767', NULL, NULL);
INSERT INTO public.cities VALUES (3992, 21, 'Encantado', '4306809', NULL, NULL);
INSERT INTO public.cities VALUES (3993, 21, 'Encruzilhada do Sul', '4306908', NULL, NULL);
INSERT INTO public.cities VALUES (3994, 21, 'Engenho Velho', '4306924', NULL, NULL);
INSERT INTO public.cities VALUES (3995, 21, 'Entre Rios do Sul', '4306957', NULL, NULL);
INSERT INTO public.cities VALUES (3996, 21, 'Entre-Ijuís', '4306932', NULL, NULL);
INSERT INTO public.cities VALUES (3997, 21, 'Erebango', '4306973', NULL, NULL);
INSERT INTO public.cities VALUES (3998, 21, 'Erechim', '4307005', NULL, NULL);
INSERT INTO public.cities VALUES (3999, 21, 'Ernestina', '4307054', NULL, NULL);
INSERT INTO public.cities VALUES (4000, 21, 'Erval Grande', '4307203', NULL, NULL);
INSERT INTO public.cities VALUES (4001, 21, 'Erval Seco', '4307302', NULL, NULL);
INSERT INTO public.cities VALUES (4002, 21, 'Esmeralda', '4307401', NULL, NULL);
INSERT INTO public.cities VALUES (4003, 21, 'Esperança do Sul', '4307450', NULL, NULL);
INSERT INTO public.cities VALUES (4004, 21, 'Espumoso', '4307500', NULL, NULL);
INSERT INTO public.cities VALUES (4005, 21, 'Estação', '4307559', NULL, NULL);
INSERT INTO public.cities VALUES (4006, 21, 'Estância Velha', '4307609', NULL, NULL);
INSERT INTO public.cities VALUES (4007, 21, 'Esteio', '4307708', NULL, NULL);
INSERT INTO public.cities VALUES (4008, 21, 'Estrela', '4307807', NULL, NULL);
INSERT INTO public.cities VALUES (4009, 21, 'Estrela Velha', '4307815', NULL, NULL);
INSERT INTO public.cities VALUES (4010, 21, 'Eugênio de Castro', '4307831', NULL, NULL);
INSERT INTO public.cities VALUES (4011, 21, 'Fagundes Varela', '4307864', NULL, NULL);
INSERT INTO public.cities VALUES (4012, 21, 'Farroupilha', '4307906', NULL, NULL);
INSERT INTO public.cities VALUES (4013, 21, 'Faxinal do Soturno', '4308003', NULL, NULL);
INSERT INTO public.cities VALUES (4014, 21, 'Faxinalzinho', '4308052', NULL, NULL);
INSERT INTO public.cities VALUES (4015, 21, 'Fazenda Vilanova', '4308078', NULL, NULL);
INSERT INTO public.cities VALUES (4016, 21, 'Feliz', '4308102', NULL, NULL);
INSERT INTO public.cities VALUES (4017, 21, 'Flores da Cunha', '4308201', NULL, NULL);
INSERT INTO public.cities VALUES (4018, 21, 'Floriano Peixoto', '4308250', NULL, NULL);
INSERT INTO public.cities VALUES (4019, 21, 'Fontoura Xavier', '4308300', NULL, NULL);
INSERT INTO public.cities VALUES (4020, 21, 'Formigueiro', '4308409', NULL, NULL);
INSERT INTO public.cities VALUES (4021, 21, 'Forquetinha', '4308433', NULL, NULL);
INSERT INTO public.cities VALUES (4022, 21, 'Fortaleza dos Valos', '4308458', NULL, NULL);
INSERT INTO public.cities VALUES (4023, 21, 'Frederico Westphalen', '4308508', NULL, NULL);
INSERT INTO public.cities VALUES (4024, 21, 'Garibaldi', '4308607', NULL, NULL);
INSERT INTO public.cities VALUES (4025, 21, 'Garruchos', '4308656', NULL, NULL);
INSERT INTO public.cities VALUES (4026, 21, 'Gaurama', '4308706', NULL, NULL);
INSERT INTO public.cities VALUES (4027, 21, 'General Câmara', '4308805', NULL, NULL);
INSERT INTO public.cities VALUES (4028, 21, 'Gentil', '4308854', NULL, NULL);
INSERT INTO public.cities VALUES (4029, 21, 'Getúlio Vargas', '4308904', NULL, NULL);
INSERT INTO public.cities VALUES (4030, 21, 'Giruá', '4309001', NULL, NULL);
INSERT INTO public.cities VALUES (4031, 21, 'Glorinha', '4309050', NULL, NULL);
INSERT INTO public.cities VALUES (4032, 21, 'Gramado', '4309100', NULL, NULL);
INSERT INTO public.cities VALUES (4033, 21, 'Gramado dos Loureiros', '4309126', NULL, NULL);
INSERT INTO public.cities VALUES (4034, 21, 'Gramado Xavier', '4309159', NULL, NULL);
INSERT INTO public.cities VALUES (4035, 21, 'Gravataí', '4309209', NULL, NULL);
INSERT INTO public.cities VALUES (4036, 21, 'Guabiju', '4309258', NULL, NULL);
INSERT INTO public.cities VALUES (4037, 21, 'Guaíba', '4309308', NULL, NULL);
INSERT INTO public.cities VALUES (4038, 21, 'Guaporé', '4309407', NULL, NULL);
INSERT INTO public.cities VALUES (4039, 21, 'Guarani das Missões', '4309506', NULL, NULL);
INSERT INTO public.cities VALUES (4040, 21, 'Harmonia', '4309555', NULL, NULL);
INSERT INTO public.cities VALUES (4041, 21, 'Herval', '4307104', NULL, NULL);
INSERT INTO public.cities VALUES (4042, 21, 'Herveiras', '4309571', NULL, NULL);
INSERT INTO public.cities VALUES (4043, 21, 'Horizontina', '4309605', NULL, NULL);
INSERT INTO public.cities VALUES (4044, 21, 'Hulha Negra', '4309654', NULL, NULL);
INSERT INTO public.cities VALUES (4045, 21, 'Humaitá', '4309704', NULL, NULL);
INSERT INTO public.cities VALUES (4046, 21, 'Ibarama', '4309753', NULL, NULL);
INSERT INTO public.cities VALUES (4047, 21, 'Ibiaçá', '4309803', NULL, NULL);
INSERT INTO public.cities VALUES (4048, 21, 'Ibiraiaras', '4309902', NULL, NULL);
INSERT INTO public.cities VALUES (4049, 21, 'Ibirapuitã', '4309951', NULL, NULL);
INSERT INTO public.cities VALUES (4050, 21, 'Ibirubá', '4310009', NULL, NULL);
INSERT INTO public.cities VALUES (4051, 21, 'Igrejinha', '4310108', NULL, NULL);
INSERT INTO public.cities VALUES (4052, 21, 'Ijuí', '4310207', NULL, NULL);
INSERT INTO public.cities VALUES (4053, 21, 'Ilópolis', '4310306', NULL, NULL);
INSERT INTO public.cities VALUES (4054, 21, 'Imbé', '4310330', NULL, NULL);
INSERT INTO public.cities VALUES (4055, 21, 'Imigrante', '4310363', NULL, NULL);
INSERT INTO public.cities VALUES (4056, 21, 'Independência', '4310405', NULL, NULL);
INSERT INTO public.cities VALUES (4057, 21, 'Inhacorá', '4310413', NULL, NULL);
INSERT INTO public.cities VALUES (4058, 21, 'Ipê', '4310439', NULL, NULL);
INSERT INTO public.cities VALUES (4059, 21, 'Ipiranga do Sul', '4310462', NULL, NULL);
INSERT INTO public.cities VALUES (4060, 21, 'Iraí', '4310504', NULL, NULL);
INSERT INTO public.cities VALUES (4061, 21, 'Itaara', '4310538', NULL, NULL);
INSERT INTO public.cities VALUES (4062, 21, 'Itacurubi', '4310553', NULL, NULL);
INSERT INTO public.cities VALUES (4063, 21, 'Itapuca', '4310579', NULL, NULL);
INSERT INTO public.cities VALUES (4064, 21, 'Itaqui', '4310603', NULL, NULL);
INSERT INTO public.cities VALUES (4065, 21, 'Itati', '4310652', NULL, NULL);
INSERT INTO public.cities VALUES (4066, 21, 'Itatiba do Sul', '4310702', NULL, NULL);
INSERT INTO public.cities VALUES (4067, 21, 'Ivorá', '4310751', NULL, NULL);
INSERT INTO public.cities VALUES (4068, 21, 'Ivoti', '4310801', NULL, NULL);
INSERT INTO public.cities VALUES (4069, 21, 'Jaboticaba', '4310850', NULL, NULL);
INSERT INTO public.cities VALUES (4070, 21, 'Jacuizinho', '4310876', NULL, NULL);
INSERT INTO public.cities VALUES (4071, 21, 'Jacutinga', '4310900', NULL, NULL);
INSERT INTO public.cities VALUES (4072, 21, 'Jaguarão', '4311007', NULL, NULL);
INSERT INTO public.cities VALUES (4073, 21, 'Jaguari', '4311106', NULL, NULL);
INSERT INTO public.cities VALUES (4074, 21, 'Jaquirana', '4311122', NULL, NULL);
INSERT INTO public.cities VALUES (4075, 21, 'Jari', '4311130', NULL, NULL);
INSERT INTO public.cities VALUES (4076, 21, 'Jóia', '4311155', NULL, NULL);
INSERT INTO public.cities VALUES (4077, 21, 'Júlio de Castilhos', '4311205', NULL, NULL);
INSERT INTO public.cities VALUES (4078, 21, 'Lagoa Bonita do Sul', '4311239', NULL, NULL);
INSERT INTO public.cities VALUES (4079, 21, 'Lagoa dos Três Cantos', '4311270', NULL, NULL);
INSERT INTO public.cities VALUES (4080, 21, 'Lagoa Vermelha', '4311304', NULL, NULL);
INSERT INTO public.cities VALUES (4081, 21, 'Lagoão', '4311254', NULL, NULL);
INSERT INTO public.cities VALUES (4082, 21, 'Lajeado', '4311403', NULL, NULL);
INSERT INTO public.cities VALUES (4083, 21, 'Lajeado do Bugre', '4311429', NULL, NULL);
INSERT INTO public.cities VALUES (4084, 21, 'Lavras do Sul', '4311502', NULL, NULL);
INSERT INTO public.cities VALUES (4085, 21, 'Liberato Salzano', '4311601', NULL, NULL);
INSERT INTO public.cities VALUES (4086, 21, 'Lindolfo Collor', '4311627', NULL, NULL);
INSERT INTO public.cities VALUES (4087, 21, 'Linha Nova', '4311643', NULL, NULL);
INSERT INTO public.cities VALUES (4088, 21, 'Maçambará', '4311718', NULL, NULL);
INSERT INTO public.cities VALUES (4089, 21, 'Machadinho', '4311700', NULL, NULL);
INSERT INTO public.cities VALUES (4090, 21, 'Mampituba', '4311734', NULL, NULL);
INSERT INTO public.cities VALUES (4091, 21, 'Manoel Viana', '4311759', NULL, NULL);
INSERT INTO public.cities VALUES (4092, 21, 'Maquiné', '4311775', NULL, NULL);
INSERT INTO public.cities VALUES (4093, 21, 'Maratá', '4311791', NULL, NULL);
INSERT INTO public.cities VALUES (4094, 21, 'Marau', '4311809', NULL, NULL);
INSERT INTO public.cities VALUES (4095, 21, 'Marcelino Ramos', '4311908', NULL, NULL);
INSERT INTO public.cities VALUES (4096, 21, 'Mariana Pimentel', '4311981', NULL, NULL);
INSERT INTO public.cities VALUES (4097, 21, 'Mariano Moro', '4312005', NULL, NULL);
INSERT INTO public.cities VALUES (4098, 21, 'Marques de Souza', '4312054', NULL, NULL);
INSERT INTO public.cities VALUES (4099, 21, 'Mata', '4312104', NULL, NULL);
INSERT INTO public.cities VALUES (4100, 21, 'Mato Castelhano', '4312138', NULL, NULL);
INSERT INTO public.cities VALUES (4101, 21, 'Mato Leitão', '4312153', NULL, NULL);
INSERT INTO public.cities VALUES (4102, 21, 'Mato Queimado', '4312179', NULL, NULL);
INSERT INTO public.cities VALUES (4103, 21, 'Maximiliano de Almeida', '4312203', NULL, NULL);
INSERT INTO public.cities VALUES (4104, 21, 'Minas do Leão', '4312252', NULL, NULL);
INSERT INTO public.cities VALUES (4105, 21, 'Miraguaí', '4312302', NULL, NULL);
INSERT INTO public.cities VALUES (4106, 21, 'Montauri', '4312351', NULL, NULL);
INSERT INTO public.cities VALUES (4107, 21, 'Monte Alegre dos Campos', '4312377', NULL, NULL);
INSERT INTO public.cities VALUES (4108, 21, 'Monte Belo do Sul', '4312385', NULL, NULL);
INSERT INTO public.cities VALUES (4109, 21, 'Montenegro', '4312401', NULL, NULL);
INSERT INTO public.cities VALUES (4110, 21, 'Mormaço', '4312427', NULL, NULL);
INSERT INTO public.cities VALUES (4111, 21, 'Morrinhos do Sul', '4312443', NULL, NULL);
INSERT INTO public.cities VALUES (4112, 21, 'Morro Redondo', '4312450', NULL, NULL);
INSERT INTO public.cities VALUES (4113, 21, 'Morro Reuter', '4312476', NULL, NULL);
INSERT INTO public.cities VALUES (4114, 21, 'Mostardas', '4312500', NULL, NULL);
INSERT INTO public.cities VALUES (4115, 21, 'Muçum', '4312609', NULL, NULL);
INSERT INTO public.cities VALUES (4116, 21, 'Muitos Capões', '4312617', NULL, NULL);
INSERT INTO public.cities VALUES (4117, 21, 'Muliterno', '4312625', NULL, NULL);
INSERT INTO public.cities VALUES (4118, 21, 'Não-Me-Toque', '4312658', NULL, NULL);
INSERT INTO public.cities VALUES (4119, 21, 'Nicolau Vergueiro', '4312674', NULL, NULL);
INSERT INTO public.cities VALUES (4120, 21, 'Nonoai', '4312708', NULL, NULL);
INSERT INTO public.cities VALUES (4121, 21, 'Nova Alvorada', '4312757', NULL, NULL);
INSERT INTO public.cities VALUES (4122, 21, 'Nova Araçá', '4312807', NULL, NULL);
INSERT INTO public.cities VALUES (4123, 21, 'Nova Bassano', '4312906', NULL, NULL);
INSERT INTO public.cities VALUES (4124, 21, 'Nova Boa Vista', '4312955', NULL, NULL);
INSERT INTO public.cities VALUES (4125, 21, 'Nova Bréscia', '4313003', NULL, NULL);
INSERT INTO public.cities VALUES (4126, 21, 'Nova Candelária', '4313011', NULL, NULL);
INSERT INTO public.cities VALUES (4127, 21, 'Nova Esperança do Sul', '4313037', NULL, NULL);
INSERT INTO public.cities VALUES (4128, 21, 'Nova Hartz', '4313060', NULL, NULL);
INSERT INTO public.cities VALUES (4129, 21, 'Nova Pádua', '4313086', NULL, NULL);
INSERT INTO public.cities VALUES (4130, 21, 'Nova Palma', '4313102', NULL, NULL);
INSERT INTO public.cities VALUES (4131, 21, 'Nova Petrópolis', '4313201', NULL, NULL);
INSERT INTO public.cities VALUES (4132, 21, 'Nova Prata', '4313300', NULL, NULL);
INSERT INTO public.cities VALUES (4133, 21, 'Nova Ramada', '4313334', NULL, NULL);
INSERT INTO public.cities VALUES (4134, 21, 'Nova Roma do Sul', '4313359', NULL, NULL);
INSERT INTO public.cities VALUES (4135, 21, 'Nova Santa Rita', '4313375', NULL, NULL);
INSERT INTO public.cities VALUES (4136, 21, 'Novo Barreiro', '4313490', NULL, NULL);
INSERT INTO public.cities VALUES (4137, 21, 'Novo Cabrais', '4313391', NULL, NULL);
INSERT INTO public.cities VALUES (4138, 21, 'Novo Hamburgo', '4313409', NULL, NULL);
INSERT INTO public.cities VALUES (4139, 21, 'Novo Machado', '4313425', NULL, NULL);
INSERT INTO public.cities VALUES (4140, 21, 'Novo Tiradentes', '4313441', NULL, NULL);
INSERT INTO public.cities VALUES (4141, 21, 'Novo Xingu', '4313466', NULL, NULL);
INSERT INTO public.cities VALUES (4142, 21, 'Osório', '4313508', NULL, NULL);
INSERT INTO public.cities VALUES (4143, 21, 'Paim Filho', '4313607', NULL, NULL);
INSERT INTO public.cities VALUES (4144, 21, 'Palmares do Sul', '4313656', NULL, NULL);
INSERT INTO public.cities VALUES (4145, 21, 'Palmeira das Missões', '4313706', NULL, NULL);
INSERT INTO public.cities VALUES (4146, 21, 'Palmitinho', '4313805', NULL, NULL);
INSERT INTO public.cities VALUES (4147, 21, 'Panambi', '4313904', NULL, NULL);
INSERT INTO public.cities VALUES (4148, 21, 'Pantano Grande', '4313953', NULL, NULL);
INSERT INTO public.cities VALUES (4149, 21, 'Paraí', '4314001', NULL, NULL);
INSERT INTO public.cities VALUES (4150, 21, 'Paraíso do Sul', '4314027', NULL, NULL);
INSERT INTO public.cities VALUES (4151, 21, 'Pareci Novo', '4314035', NULL, NULL);
INSERT INTO public.cities VALUES (4152, 21, 'Parobé', '4314050', NULL, NULL);
INSERT INTO public.cities VALUES (4153, 21, 'Passa Sete', '4314068', NULL, NULL);
INSERT INTO public.cities VALUES (4154, 21, 'Passo do Sobrado', '4314076', NULL, NULL);
INSERT INTO public.cities VALUES (4155, 21, 'Passo Fundo', '4314100', NULL, NULL);
INSERT INTO public.cities VALUES (4156, 21, 'Paulo Bento', '4314134', NULL, NULL);
INSERT INTO public.cities VALUES (4157, 21, 'Paverama', '4314159', NULL, NULL);
INSERT INTO public.cities VALUES (4158, 21, 'Pedras Altas', '4314175', NULL, NULL);
INSERT INTO public.cities VALUES (4159, 21, 'Pedro Osório', '4314209', NULL, NULL);
INSERT INTO public.cities VALUES (4160, 21, 'Pejuçara', '4314308', NULL, NULL);
INSERT INTO public.cities VALUES (4161, 21, 'Pelotas', '4314407', NULL, NULL);
INSERT INTO public.cities VALUES (4162, 21, 'Picada Café', '4314423', NULL, NULL);
INSERT INTO public.cities VALUES (4163, 21, 'Pinhal', '4314456', NULL, NULL);
INSERT INTO public.cities VALUES (4164, 21, 'Pinhal da Serra', '4314464', NULL, NULL);
INSERT INTO public.cities VALUES (4165, 21, 'Pinhal Grande', '4314472', NULL, NULL);
INSERT INTO public.cities VALUES (4166, 21, 'Pinheirinho do Vale', '4314498', NULL, NULL);
INSERT INTO public.cities VALUES (4167, 21, 'Pinheiro Machado', '4314506', NULL, NULL);
INSERT INTO public.cities VALUES (4168, 21, 'Pirapó', '4314555', NULL, NULL);
INSERT INTO public.cities VALUES (4169, 21, 'Piratini', '4314605', NULL, NULL);
INSERT INTO public.cities VALUES (4170, 21, 'Planalto', '4314704', NULL, NULL);
INSERT INTO public.cities VALUES (4171, 21, 'Poço das Antas', '4314753', NULL, NULL);
INSERT INTO public.cities VALUES (4172, 21, 'Pontão', '4314779', NULL, NULL);
INSERT INTO public.cities VALUES (4173, 21, 'Ponte Preta', '4314787', NULL, NULL);
INSERT INTO public.cities VALUES (4174, 21, 'Portão', '4314803', NULL, NULL);
INSERT INTO public.cities VALUES (4175, 21, 'Porto Alegre', '4314902', NULL, NULL);
INSERT INTO public.cities VALUES (4176, 21, 'Porto Lucena', '4315008', NULL, NULL);
INSERT INTO public.cities VALUES (4177, 21, 'Porto Mauá', '4315057', NULL, NULL);
INSERT INTO public.cities VALUES (4178, 21, 'Porto Vera Cruz', '4315073', NULL, NULL);
INSERT INTO public.cities VALUES (4179, 21, 'Porto Xavier', '4315107', NULL, NULL);
INSERT INTO public.cities VALUES (4180, 21, 'Pouso Novo', '4315131', NULL, NULL);
INSERT INTO public.cities VALUES (4181, 21, 'Presidente Lucena', '4315149', NULL, NULL);
INSERT INTO public.cities VALUES (4182, 21, 'Progresso', '4315156', NULL, NULL);
INSERT INTO public.cities VALUES (4183, 21, 'Protásio Alves', '4315172', NULL, NULL);
INSERT INTO public.cities VALUES (4184, 21, 'Putinga', '4315206', NULL, NULL);
INSERT INTO public.cities VALUES (4185, 21, 'Quaraí', '4315305', NULL, NULL);
INSERT INTO public.cities VALUES (4186, 21, 'Quatro Irmãos', '4315313', NULL, NULL);
INSERT INTO public.cities VALUES (4187, 21, 'Quevedos', '4315321', NULL, NULL);
INSERT INTO public.cities VALUES (4188, 21, 'Quinze de Novembro', '4315354', NULL, NULL);
INSERT INTO public.cities VALUES (4189, 21, 'Redentora', '4315404', NULL, NULL);
INSERT INTO public.cities VALUES (4190, 21, 'Relvado', '4315453', NULL, NULL);
INSERT INTO public.cities VALUES (4191, 21, 'Restinga Seca', '4315503', NULL, NULL);
INSERT INTO public.cities VALUES (4192, 21, 'Rio dos Índios', '4315552', NULL, NULL);
INSERT INTO public.cities VALUES (4193, 21, 'Rio Grande', '4315602', NULL, NULL);
INSERT INTO public.cities VALUES (4194, 21, 'Rio Pardo', '4315701', NULL, NULL);
INSERT INTO public.cities VALUES (4195, 21, 'Riozinho', '4315750', NULL, NULL);
INSERT INTO public.cities VALUES (4196, 21, 'Roca Sales', '4315800', NULL, NULL);
INSERT INTO public.cities VALUES (4197, 21, 'Rodeio Bonito', '4315909', NULL, NULL);
INSERT INTO public.cities VALUES (4198, 21, 'Rolador', '4315958', NULL, NULL);
INSERT INTO public.cities VALUES (4199, 21, 'Rolante', '4316006', NULL, NULL);
INSERT INTO public.cities VALUES (4200, 21, 'Ronda Alta', '4316105', NULL, NULL);
INSERT INTO public.cities VALUES (4201, 21, 'Rondinha', '4316204', NULL, NULL);
INSERT INTO public.cities VALUES (4202, 21, 'Roque Gonzales', '4316303', NULL, NULL);
INSERT INTO public.cities VALUES (4203, 21, 'Rosário do Sul', '4316402', NULL, NULL);
INSERT INTO public.cities VALUES (4204, 21, 'Sagrada Família', '4316428', NULL, NULL);
INSERT INTO public.cities VALUES (4205, 21, 'Saldanha Marinho', '4316436', NULL, NULL);
INSERT INTO public.cities VALUES (4206, 21, 'Salto do Jacuí', '4316451', NULL, NULL);
INSERT INTO public.cities VALUES (4207, 21, 'Salvador das Missões', '4316477', NULL, NULL);
INSERT INTO public.cities VALUES (4208, 21, 'Salvador do Sul', '4316501', NULL, NULL);
INSERT INTO public.cities VALUES (4209, 21, 'Sananduva', '4316600', NULL, NULL);
INSERT INTO public.cities VALUES (4210, 21, 'Santa Bárbara do Sul', '4316709', NULL, NULL);
INSERT INTO public.cities VALUES (4211, 21, 'Santa Cecília do Sul', '4316733', NULL, NULL);
INSERT INTO public.cities VALUES (4212, 21, 'Santa Clara do Sul', '4316758', NULL, NULL);
INSERT INTO public.cities VALUES (4213, 21, 'Santa Cruz do Sul', '4316808', NULL, NULL);
INSERT INTO public.cities VALUES (4214, 21, 'Santa Margarida do Sul', '4316972', NULL, NULL);
INSERT INTO public.cities VALUES (4215, 21, 'Santa Maria', '4316907', NULL, NULL);
INSERT INTO public.cities VALUES (4216, 21, 'Santa Maria do Herval', '4316956', NULL, NULL);
INSERT INTO public.cities VALUES (4217, 21, 'Santa Rosa', '4317202', NULL, NULL);
INSERT INTO public.cities VALUES (4218, 21, 'Santa Tereza', '4317251', NULL, NULL);
INSERT INTO public.cities VALUES (4219, 21, 'Santa Vitória do Palmar', '4317301', NULL, NULL);
INSERT INTO public.cities VALUES (4220, 21, 'Santana da Boa Vista', '4317004', NULL, NULL);
INSERT INTO public.cities VALUES (4221, 21, 'Sant''Ana do Livramento', '4317103', NULL, NULL);
INSERT INTO public.cities VALUES (4222, 21, 'Santiago', '4317400', NULL, NULL);
INSERT INTO public.cities VALUES (4223, 21, 'Santo Ângelo', '4317509', NULL, NULL);
INSERT INTO public.cities VALUES (4224, 21, 'Santo Antônio da Patrulha', '4317608', NULL, NULL);
INSERT INTO public.cities VALUES (4225, 21, 'Santo Antônio das Missões', '4317707', NULL, NULL);
INSERT INTO public.cities VALUES (4226, 21, 'Santo Antônio do Palma', '4317558', NULL, NULL);
INSERT INTO public.cities VALUES (4227, 21, 'Santo Antônio do Planalto', '4317756', NULL, NULL);
INSERT INTO public.cities VALUES (4228, 21, 'Santo Augusto', '4317806', NULL, NULL);
INSERT INTO public.cities VALUES (4229, 21, 'Santo Cristo', '4317905', NULL, NULL);
INSERT INTO public.cities VALUES (4230, 21, 'Santo Expedito do Sul', '4317954', NULL, NULL);
INSERT INTO public.cities VALUES (4231, 21, 'São Borja', '4318002', NULL, NULL);
INSERT INTO public.cities VALUES (4232, 21, 'São Domingos do Sul', '4318051', NULL, NULL);
INSERT INTO public.cities VALUES (4233, 21, 'São Francisco de Assis', '4318101', NULL, NULL);
INSERT INTO public.cities VALUES (4234, 21, 'São Francisco de Paula', '4318200', NULL, NULL);
INSERT INTO public.cities VALUES (4235, 21, 'São Gabriel', '4318309', NULL, NULL);
INSERT INTO public.cities VALUES (4236, 21, 'São Jerônimo', '4318408', NULL, NULL);
INSERT INTO public.cities VALUES (4237, 21, 'São João da Urtiga', '4318424', NULL, NULL);
INSERT INTO public.cities VALUES (4238, 21, 'São João do Polêsine', '4318432', NULL, NULL);
INSERT INTO public.cities VALUES (4239, 21, 'São Jorge', '4318440', NULL, NULL);
INSERT INTO public.cities VALUES (4240, 21, 'São José das Missões', '4318457', NULL, NULL);
INSERT INTO public.cities VALUES (4241, 21, 'São José do Herval', '4318465', NULL, NULL);
INSERT INTO public.cities VALUES (4242, 21, 'São José do Hortêncio', '4318481', NULL, NULL);
INSERT INTO public.cities VALUES (4243, 21, 'São José do Inhacorá', '4318499', NULL, NULL);
INSERT INTO public.cities VALUES (4244, 21, 'São José do Norte', '4318507', NULL, NULL);
INSERT INTO public.cities VALUES (4245, 21, 'São José do Ouro', '4318606', NULL, NULL);
INSERT INTO public.cities VALUES (4246, 21, 'São José do Sul', '4318614', NULL, NULL);
INSERT INTO public.cities VALUES (4247, 21, 'São José dos Ausentes', '4318622', NULL, NULL);
INSERT INTO public.cities VALUES (4248, 21, 'São Leopoldo', '4318705', NULL, NULL);
INSERT INTO public.cities VALUES (4249, 21, 'São Lourenço do Sul', '4318804', NULL, NULL);
INSERT INTO public.cities VALUES (4250, 21, 'São Luiz Gonzaga', '4318903', NULL, NULL);
INSERT INTO public.cities VALUES (4251, 21, 'São Marcos', '4319000', NULL, NULL);
INSERT INTO public.cities VALUES (4252, 21, 'São Martinho', '4319109', NULL, NULL);
INSERT INTO public.cities VALUES (4253, 21, 'São Martinho da Serra', '4319125', NULL, NULL);
INSERT INTO public.cities VALUES (4254, 21, 'São Miguel das Missões', '4319158', NULL, NULL);
INSERT INTO public.cities VALUES (4255, 21, 'São Nicolau', '4319208', NULL, NULL);
INSERT INTO public.cities VALUES (4256, 21, 'São Paulo das Missões', '4319307', NULL, NULL);
INSERT INTO public.cities VALUES (4257, 21, 'São Pedro da Serra', '4319356', NULL, NULL);
INSERT INTO public.cities VALUES (4258, 21, 'São Pedro das Missões', '4319364', NULL, NULL);
INSERT INTO public.cities VALUES (4259, 21, 'São Pedro do Butiá', '4319372', NULL, NULL);
INSERT INTO public.cities VALUES (4260, 21, 'São Pedro do Sul', '4319406', NULL, NULL);
INSERT INTO public.cities VALUES (4261, 21, 'São Sebastião do Caí', '4319505', NULL, NULL);
INSERT INTO public.cities VALUES (4262, 21, 'São Sepé', '4319604', NULL, NULL);
INSERT INTO public.cities VALUES (4263, 21, 'São Valentim', '4319703', NULL, NULL);
INSERT INTO public.cities VALUES (4264, 21, 'São Valentim do Sul', '4319711', NULL, NULL);
INSERT INTO public.cities VALUES (4265, 21, 'São Valério do Sul', '4319737', NULL, NULL);
INSERT INTO public.cities VALUES (4266, 21, 'São Vendelino', '4319752', NULL, NULL);
INSERT INTO public.cities VALUES (4267, 21, 'São Vicente do Sul', '4319802', NULL, NULL);
INSERT INTO public.cities VALUES (4268, 21, 'Sapiranga', '4319901', NULL, NULL);
INSERT INTO public.cities VALUES (4269, 21, 'Sapucaia do Sul', '4320008', NULL, NULL);
INSERT INTO public.cities VALUES (4270, 21, 'Sarandi', '4320107', NULL, NULL);
INSERT INTO public.cities VALUES (4271, 21, 'Seberi', '4320206', NULL, NULL);
INSERT INTO public.cities VALUES (4272, 21, 'Sede Nova', '4320230', NULL, NULL);
INSERT INTO public.cities VALUES (4273, 21, 'Segredo', '4320263', NULL, NULL);
INSERT INTO public.cities VALUES (4274, 21, 'Selbach', '4320305', NULL, NULL);
INSERT INTO public.cities VALUES (4275, 21, 'Senador Salgado Filho', '4320321', NULL, NULL);
INSERT INTO public.cities VALUES (4276, 21, 'Sentinela do Sul', '4320354', NULL, NULL);
INSERT INTO public.cities VALUES (4277, 21, 'Serafina Corrêa', '4320404', NULL, NULL);
INSERT INTO public.cities VALUES (4278, 21, 'Sério', '4320453', NULL, NULL);
INSERT INTO public.cities VALUES (4279, 21, 'Sertão', '4320503', NULL, NULL);
INSERT INTO public.cities VALUES (4280, 21, 'Sertão Santana', '4320552', NULL, NULL);
INSERT INTO public.cities VALUES (4281, 21, 'Sete de Setembro', '4320578', NULL, NULL);
INSERT INTO public.cities VALUES (4282, 21, 'Severiano de Almeida', '4320602', NULL, NULL);
INSERT INTO public.cities VALUES (4283, 21, 'Silveira Martins', '4320651', NULL, NULL);
INSERT INTO public.cities VALUES (4284, 21, 'Sinimbu', '4320677', NULL, NULL);
INSERT INTO public.cities VALUES (4285, 21, 'Sobradinho', '4320701', NULL, NULL);
INSERT INTO public.cities VALUES (4286, 21, 'Soledade', '4320800', NULL, NULL);
INSERT INTO public.cities VALUES (4287, 21, 'Tabaí', '4320859', NULL, NULL);
INSERT INTO public.cities VALUES (4288, 21, 'Tapejara', '4320909', NULL, NULL);
INSERT INTO public.cities VALUES (4289, 21, 'Tapera', '4321006', NULL, NULL);
INSERT INTO public.cities VALUES (4290, 21, 'Tapes', '4321105', NULL, NULL);
INSERT INTO public.cities VALUES (4291, 21, 'Taquara', '4321204', NULL, NULL);
INSERT INTO public.cities VALUES (4292, 21, 'Taquari', '4321303', NULL, NULL);
INSERT INTO public.cities VALUES (4293, 21, 'Taquaruçu do Sul', '4321329', NULL, NULL);
INSERT INTO public.cities VALUES (4294, 21, 'Tavares', '4321352', NULL, NULL);
INSERT INTO public.cities VALUES (4295, 21, 'Tenente Portela', '4321402', NULL, NULL);
INSERT INTO public.cities VALUES (4296, 21, 'Terra de Areia', '4321436', NULL, NULL);
INSERT INTO public.cities VALUES (4297, 21, 'Teutônia', '4321451', NULL, NULL);
INSERT INTO public.cities VALUES (4298, 21, 'Tio Hugo', '4321469', NULL, NULL);
INSERT INTO public.cities VALUES (4299, 21, 'Tiradentes do Sul', '4321477', NULL, NULL);
INSERT INTO public.cities VALUES (4300, 21, 'Toropi', '4321493', NULL, NULL);
INSERT INTO public.cities VALUES (4301, 21, 'Torres', '4321501', NULL, NULL);
INSERT INTO public.cities VALUES (4302, 21, 'Tramandaí', '4321600', NULL, NULL);
INSERT INTO public.cities VALUES (4303, 21, 'Travesseiro', '4321626', NULL, NULL);
INSERT INTO public.cities VALUES (4304, 21, 'Três Arroios', '4321634', NULL, NULL);
INSERT INTO public.cities VALUES (4305, 21, 'Três Cachoeiras', '4321667', NULL, NULL);
INSERT INTO public.cities VALUES (4306, 21, 'Três Coroas', '4321709', NULL, NULL);
INSERT INTO public.cities VALUES (4307, 21, 'Três de Maio', '4321808', NULL, NULL);
INSERT INTO public.cities VALUES (4308, 21, 'Três Forquilhas', '4321832', NULL, NULL);
INSERT INTO public.cities VALUES (4309, 21, 'Três Palmeiras', '4321857', NULL, NULL);
INSERT INTO public.cities VALUES (4310, 21, 'Três Passos', '4321907', NULL, NULL);
INSERT INTO public.cities VALUES (4311, 21, 'Trindade do Sul', '4321956', NULL, NULL);
INSERT INTO public.cities VALUES (4312, 21, 'Triunfo', '4322004', NULL, NULL);
INSERT INTO public.cities VALUES (4313, 21, 'Tucunduva', '4322103', NULL, NULL);
INSERT INTO public.cities VALUES (4314, 21, 'Tunas', '4322152', NULL, NULL);
INSERT INTO public.cities VALUES (4315, 21, 'Tupanci do Sul', '4322186', NULL, NULL);
INSERT INTO public.cities VALUES (4316, 21, 'Tupanciretã', '4322202', NULL, NULL);
INSERT INTO public.cities VALUES (4317, 21, 'Tupandi', '4322251', NULL, NULL);
INSERT INTO public.cities VALUES (4318, 21, 'Tuparendi', '4322301', NULL, NULL);
INSERT INTO public.cities VALUES (4319, 21, 'Turuçu', '4322327', NULL, NULL);
INSERT INTO public.cities VALUES (4320, 21, 'Ubiretama', '4322343', NULL, NULL);
INSERT INTO public.cities VALUES (4321, 21, 'União da Serra', '4322350', NULL, NULL);
INSERT INTO public.cities VALUES (4322, 21, 'Unistalda', '4322376', NULL, NULL);
INSERT INTO public.cities VALUES (4323, 21, 'Uruguaiana', '4322400', NULL, NULL);
INSERT INTO public.cities VALUES (4324, 21, 'Vacaria', '4322509', NULL, NULL);
INSERT INTO public.cities VALUES (4325, 21, 'Vale do Sol', '4322533', NULL, NULL);
INSERT INTO public.cities VALUES (4326, 21, 'Vale Real', '4322541', NULL, NULL);
INSERT INTO public.cities VALUES (4327, 21, 'Vale Verde', '4322525', NULL, NULL);
INSERT INTO public.cities VALUES (4328, 21, 'Vanini', '4322558', NULL, NULL);
INSERT INTO public.cities VALUES (4329, 21, 'Venâncio Aires', '4322608', NULL, NULL);
INSERT INTO public.cities VALUES (4330, 21, 'Vera Cruz', '4322707', NULL, NULL);
INSERT INTO public.cities VALUES (4331, 21, 'Veranópolis', '4322806', NULL, NULL);
INSERT INTO public.cities VALUES (4332, 21, 'Vespasiano Correa', '4322855', NULL, NULL);
INSERT INTO public.cities VALUES (4333, 21, 'Viadutos', '4322905', NULL, NULL);
INSERT INTO public.cities VALUES (4334, 21, 'Viamão', '4323002', NULL, NULL);
INSERT INTO public.cities VALUES (4335, 21, 'Vicente Dutra', '4323101', NULL, NULL);
INSERT INTO public.cities VALUES (4336, 21, 'Victor Graeff', '4323200', NULL, NULL);
INSERT INTO public.cities VALUES (4337, 21, 'Vila Flores', '4323309', NULL, NULL);
INSERT INTO public.cities VALUES (4338, 21, 'Vila Lângaro', '4323358', NULL, NULL);
INSERT INTO public.cities VALUES (4339, 21, 'Vila Maria', '4323408', NULL, NULL);
INSERT INTO public.cities VALUES (4340, 21, 'Vila Nova do Sul', '4323457', NULL, NULL);
INSERT INTO public.cities VALUES (4341, 21, 'Vista Alegre', '4323507', NULL, NULL);
INSERT INTO public.cities VALUES (4342, 21, 'Vista Alegre do Prata', '4323606', NULL, NULL);
INSERT INTO public.cities VALUES (4343, 21, 'Vista Gaúcha', '4323705', NULL, NULL);
INSERT INTO public.cities VALUES (4344, 21, 'Vitória das Missões', '4323754', NULL, NULL);
INSERT INTO public.cities VALUES (4345, 21, 'Westfalia', '4323770', NULL, NULL);
INSERT INTO public.cities VALUES (4346, 21, 'Xangri-lá', '4323804', NULL, NULL);
INSERT INTO public.cities VALUES (4347, 22, 'Alta Floresta D''Oeste', '1100015', NULL, NULL);
INSERT INTO public.cities VALUES (4348, 22, 'Alto Alegre dos Parecis', '1100379', NULL, NULL);
INSERT INTO public.cities VALUES (4349, 22, 'Alto Paraíso', '1100403', NULL, NULL);
INSERT INTO public.cities VALUES (4350, 22, 'Alvorada D''Oeste', '1100346', NULL, NULL);
INSERT INTO public.cities VALUES (4351, 22, 'Ariquemes', '1100023', NULL, NULL);
INSERT INTO public.cities VALUES (4352, 22, 'Buritis', '1100452', NULL, NULL);
INSERT INTO public.cities VALUES (4353, 22, 'Cabixi', '1100031', NULL, NULL);
INSERT INTO public.cities VALUES (4354, 22, 'Cacaulândia', '1100601', NULL, NULL);
INSERT INTO public.cities VALUES (4355, 22, 'Cacoal', '1100049', NULL, NULL);
INSERT INTO public.cities VALUES (4356, 22, 'Campo Novo de Rondônia', '1100700', NULL, NULL);
INSERT INTO public.cities VALUES (4357, 22, 'Candeias do Jamari', '1100809', NULL, NULL);
INSERT INTO public.cities VALUES (4358, 22, 'Castanheiras', '1100908', NULL, NULL);
INSERT INTO public.cities VALUES (4359, 22, 'Cerejeiras', '1100056', NULL, NULL);
INSERT INTO public.cities VALUES (4360, 22, 'Chupinguaia', '1100924', NULL, NULL);
INSERT INTO public.cities VALUES (4361, 22, 'Colorado do Oeste', '1100064', NULL, NULL);
INSERT INTO public.cities VALUES (4362, 22, 'Corumbiara', '1100072', NULL, NULL);
INSERT INTO public.cities VALUES (4363, 22, 'Costa Marques', '1100080', NULL, NULL);
INSERT INTO public.cities VALUES (4364, 22, 'Cujubim', '1100940', NULL, NULL);
INSERT INTO public.cities VALUES (4365, 22, 'Espigão D''Oeste', '1100098', NULL, NULL);
INSERT INTO public.cities VALUES (4366, 22, 'Governador Jorge Teixeira', '1101005', NULL, NULL);
INSERT INTO public.cities VALUES (4367, 22, 'Guajará-Mirim', '1100106', NULL, NULL);
INSERT INTO public.cities VALUES (4368, 22, 'Itapuã do Oeste', '1101104', NULL, NULL);
INSERT INTO public.cities VALUES (4369, 22, 'Jaru', '1100114', NULL, NULL);
INSERT INTO public.cities VALUES (4370, 22, 'Ji-Paraná', '1100122', NULL, NULL);
INSERT INTO public.cities VALUES (4371, 22, 'Machadinho D''Oeste', '1100130', NULL, NULL);
INSERT INTO public.cities VALUES (4372, 22, 'Ministro Andreazza', '1101203', NULL, NULL);
INSERT INTO public.cities VALUES (4373, 22, 'Mirante da Serra', '1101302', NULL, NULL);
INSERT INTO public.cities VALUES (4374, 22, 'Monte Negro', '1101401', NULL, NULL);
INSERT INTO public.cities VALUES (4375, 22, 'Nova Brasilândia D''Oeste', '1100148', NULL, NULL);
INSERT INTO public.cities VALUES (4376, 22, 'Nova Mamoré', '1100338', NULL, NULL);
INSERT INTO public.cities VALUES (4377, 22, 'Nova União', '1101435', NULL, NULL);
INSERT INTO public.cities VALUES (4378, 22, 'Novo Horizonte do Oeste', '1100502', NULL, NULL);
INSERT INTO public.cities VALUES (4379, 22, 'Ouro Preto do Oeste', '1100155', NULL, NULL);
INSERT INTO public.cities VALUES (4380, 22, 'Parecis', '1101450', NULL, NULL);
INSERT INTO public.cities VALUES (4381, 22, 'Pimenta Bueno', '1100189', NULL, NULL);
INSERT INTO public.cities VALUES (4382, 22, 'Pimenteiras do Oeste', '1101468', NULL, NULL);
INSERT INTO public.cities VALUES (4383, 22, 'Porto Velho', '1100205', NULL, NULL);
INSERT INTO public.cities VALUES (4384, 22, 'Presidente Médici', '1100254', NULL, NULL);
INSERT INTO public.cities VALUES (4385, 22, 'Primavera de Rondônia', '1101476', NULL, NULL);
INSERT INTO public.cities VALUES (4386, 22, 'Rio Crespo', '1100262', NULL, NULL);
INSERT INTO public.cities VALUES (4387, 22, 'Rolim de Moura', '1100288', NULL, NULL);
INSERT INTO public.cities VALUES (4388, 22, 'Santa Luzia D''Oeste', '1100296', NULL, NULL);
INSERT INTO public.cities VALUES (4389, 22, 'São Felipe D''Oeste', '1101484', NULL, NULL);
INSERT INTO public.cities VALUES (4390, 22, 'São Francisco do Guaporé', '1101492', NULL, NULL);
INSERT INTO public.cities VALUES (4391, 22, 'São Miguel do Guaporé', '1100320', NULL, NULL);
INSERT INTO public.cities VALUES (4392, 22, 'Seringueiras', '1101500', NULL, NULL);
INSERT INTO public.cities VALUES (4393, 22, 'Teixeirópolis', '1101559', NULL, NULL);
INSERT INTO public.cities VALUES (4394, 22, 'Theobroma', '1101609', NULL, NULL);
INSERT INTO public.cities VALUES (4395, 22, 'Urupá', '1101708', NULL, NULL);
INSERT INTO public.cities VALUES (4396, 22, 'Vale do Anari', '1101757', NULL, NULL);
INSERT INTO public.cities VALUES (4397, 22, 'Vale do Paraíso', '1101807', NULL, NULL);
INSERT INTO public.cities VALUES (4398, 22, 'Vilhena', '1100304', NULL, NULL);
INSERT INTO public.cities VALUES (4399, 23, 'Alto Alegre', '1400050', NULL, NULL);
INSERT INTO public.cities VALUES (4400, 23, 'Amajari', '1400027', NULL, NULL);
INSERT INTO public.cities VALUES (4401, 23, 'Boa Vista', '1400100', NULL, NULL);
INSERT INTO public.cities VALUES (4402, 23, 'Bonfim', '1400159', NULL, NULL);
INSERT INTO public.cities VALUES (4403, 23, 'Cantá', '1400175', NULL, NULL);
INSERT INTO public.cities VALUES (4404, 23, 'Caracaraí', '1400209', NULL, NULL);
INSERT INTO public.cities VALUES (4405, 23, 'Caroebe', '1400233', NULL, NULL);
INSERT INTO public.cities VALUES (4406, 23, 'Iracema', '1400282', NULL, NULL);
INSERT INTO public.cities VALUES (4407, 23, 'Mucajaí', '1400308', NULL, NULL);
INSERT INTO public.cities VALUES (4408, 23, 'Normandia', '1400407', NULL, NULL);
INSERT INTO public.cities VALUES (4409, 23, 'Pacaraima', '1400456', NULL, NULL);
INSERT INTO public.cities VALUES (4410, 23, 'Rorainópolis', '1400472', NULL, NULL);
INSERT INTO public.cities VALUES (4411, 23, 'São João da Baliza', '1400506', NULL, NULL);
INSERT INTO public.cities VALUES (4412, 23, 'São Luiz', '1400605', NULL, NULL);
INSERT INTO public.cities VALUES (4413, 23, 'Uiramutã', '1400704', NULL, NULL);
INSERT INTO public.cities VALUES (4414, 24, 'Abdon Batista', '4200051', NULL, NULL);
INSERT INTO public.cities VALUES (4415, 24, 'Abelardo Luz', '4200101', NULL, NULL);
INSERT INTO public.cities VALUES (4416, 24, 'Agrolândia', '4200200', NULL, NULL);
INSERT INTO public.cities VALUES (4417, 24, 'Agronômica', '4200309', NULL, NULL);
INSERT INTO public.cities VALUES (4418, 24, 'Água Doce', '4200408', NULL, NULL);
INSERT INTO public.cities VALUES (4419, 24, 'Águas de Chapecó', '4200507', NULL, NULL);
INSERT INTO public.cities VALUES (4420, 24, 'Águas Frias', '4200556', NULL, NULL);
INSERT INTO public.cities VALUES (4421, 24, 'Águas Mornas', '4200606', NULL, NULL);
INSERT INTO public.cities VALUES (4422, 24, 'Alfredo Wagner', '4200705', NULL, NULL);
INSERT INTO public.cities VALUES (4423, 24, 'Alto Bela Vista', '4200754', NULL, NULL);
INSERT INTO public.cities VALUES (4424, 24, 'Anchieta', '4200804', NULL, NULL);
INSERT INTO public.cities VALUES (4425, 24, 'Angelina', '4200903', NULL, NULL);
INSERT INTO public.cities VALUES (4426, 24, 'Anita Garibaldi', '4201000', NULL, NULL);
INSERT INTO public.cities VALUES (4427, 24, 'Anitápolis', '4201109', NULL, NULL);
INSERT INTO public.cities VALUES (4428, 24, 'Antônio Carlos', '4201208', NULL, NULL);
INSERT INTO public.cities VALUES (4429, 24, 'Apiúna', '4201257', NULL, NULL);
INSERT INTO public.cities VALUES (4430, 24, 'Arabutã', '4201273', NULL, NULL);
INSERT INTO public.cities VALUES (4431, 24, 'Araquari', '4201307', NULL, NULL);
INSERT INTO public.cities VALUES (4432, 24, 'Araranguá', '4201406', NULL, NULL);
INSERT INTO public.cities VALUES (4433, 24, 'Armazém', '4201505', NULL, NULL);
INSERT INTO public.cities VALUES (4434, 24, 'Arroio Trinta', '4201604', NULL, NULL);
INSERT INTO public.cities VALUES (4435, 24, 'Arvoredo', '4201653', NULL, NULL);
INSERT INTO public.cities VALUES (4436, 24, 'Ascurra', '4201703', NULL, NULL);
INSERT INTO public.cities VALUES (4437, 24, 'Atalanta', '4201802', NULL, NULL);
INSERT INTO public.cities VALUES (4438, 24, 'Aurora', '4201901', NULL, NULL);
INSERT INTO public.cities VALUES (4439, 24, 'Balneário Arroio do Silva', '4201950', NULL, NULL);
INSERT INTO public.cities VALUES (4440, 24, 'Balneário Barra do Sul', '4202057', NULL, NULL);
INSERT INTO public.cities VALUES (4441, 24, 'Balneário Camboriú', '4202008', NULL, NULL);
INSERT INTO public.cities VALUES (4442, 24, 'Balneário Gaivota', '4202073', NULL, NULL);
INSERT INTO public.cities VALUES (4443, 24, 'Balneário Piçarras', '4212809', NULL, NULL);
INSERT INTO public.cities VALUES (4444, 24, 'Bandeirante', '4202081', NULL, NULL);
INSERT INTO public.cities VALUES (4445, 24, 'Barra Bonita', '4202099', NULL, NULL);
INSERT INTO public.cities VALUES (4446, 24, 'Barra Velha', '4202107', NULL, NULL);
INSERT INTO public.cities VALUES (4447, 24, 'Bela Vista do Toldo', '4202131', NULL, NULL);
INSERT INTO public.cities VALUES (4448, 24, 'Belmonte', '4202156', NULL, NULL);
INSERT INTO public.cities VALUES (4449, 24, 'Benedito Novo', '4202206', NULL, NULL);
INSERT INTO public.cities VALUES (4450, 24, 'Biguaçu', '4202305', NULL, NULL);
INSERT INTO public.cities VALUES (4451, 24, 'Blumenau', '4202404', NULL, NULL);
INSERT INTO public.cities VALUES (4452, 24, 'Bocaina do Sul', '4202438', NULL, NULL);
INSERT INTO public.cities VALUES (4453, 24, 'Bom Jardim da Serra', '4202503', NULL, NULL);
INSERT INTO public.cities VALUES (4454, 24, 'Bom Jesus', '4202537', NULL, NULL);
INSERT INTO public.cities VALUES (4455, 24, 'Bom Jesus do Oeste', '4202578', NULL, NULL);
INSERT INTO public.cities VALUES (4456, 24, 'Bom Retiro', '4202602', NULL, NULL);
INSERT INTO public.cities VALUES (4457, 24, 'Bombinhas', '4202453', NULL, NULL);
INSERT INTO public.cities VALUES (4458, 24, 'Botuverá', '4202701', NULL, NULL);
INSERT INTO public.cities VALUES (4459, 24, 'Braço do Norte', '4202800', NULL, NULL);
INSERT INTO public.cities VALUES (4460, 24, 'Braço do Trombudo', '4202859', NULL, NULL);
INSERT INTO public.cities VALUES (4461, 24, 'Brunópolis', '4202875', NULL, NULL);
INSERT INTO public.cities VALUES (4462, 24, 'Brusque', '4202909', NULL, NULL);
INSERT INTO public.cities VALUES (4463, 24, 'Caçador', '4203006', NULL, NULL);
INSERT INTO public.cities VALUES (4464, 24, 'Caibi', '4203105', NULL, NULL);
INSERT INTO public.cities VALUES (4465, 24, 'Calmon', '4203154', NULL, NULL);
INSERT INTO public.cities VALUES (4466, 24, 'Camboriú', '4203204', NULL, NULL);
INSERT INTO public.cities VALUES (4467, 24, 'Campo Alegre', '4203303', NULL, NULL);
INSERT INTO public.cities VALUES (4468, 24, 'Campo Belo do Sul', '4203402', NULL, NULL);
INSERT INTO public.cities VALUES (4469, 24, 'Campo Erê', '4203501', NULL, NULL);
INSERT INTO public.cities VALUES (4470, 24, 'Campos Novos', '4203600', NULL, NULL);
INSERT INTO public.cities VALUES (4471, 24, 'Canelinha', '4203709', NULL, NULL);
INSERT INTO public.cities VALUES (4472, 24, 'Canoinhas', '4203808', NULL, NULL);
INSERT INTO public.cities VALUES (4473, 24, 'Capão Alto', '4203253', NULL, NULL);
INSERT INTO public.cities VALUES (4474, 24, 'Capinzal', '4203907', NULL, NULL);
INSERT INTO public.cities VALUES (4475, 24, 'Capivari de Baixo', '4203956', NULL, NULL);
INSERT INTO public.cities VALUES (4476, 24, 'Catanduvas', '4204004', NULL, NULL);
INSERT INTO public.cities VALUES (4477, 24, 'Caxambu do Sul', '4204103', NULL, NULL);
INSERT INTO public.cities VALUES (4478, 24, 'Celso Ramos', '4204152', NULL, NULL);
INSERT INTO public.cities VALUES (4479, 24, 'Cerro Negro', '4204178', NULL, NULL);
INSERT INTO public.cities VALUES (4480, 24, 'Chapadão do Lageado', '4204194', NULL, NULL);
INSERT INTO public.cities VALUES (4481, 24, 'Chapecó', '4204202', NULL, NULL);
INSERT INTO public.cities VALUES (4482, 24, 'Cocal do Sul', '4204251', NULL, NULL);
INSERT INTO public.cities VALUES (4483, 24, 'Concórdia', '4204301', NULL, NULL);
INSERT INTO public.cities VALUES (4484, 24, 'Cordilheira Alta', '4204350', NULL, NULL);
INSERT INTO public.cities VALUES (4485, 24, 'Coronel Freitas', '4204400', NULL, NULL);
INSERT INTO public.cities VALUES (4486, 24, 'Coronel Martins', '4204459', NULL, NULL);
INSERT INTO public.cities VALUES (4487, 24, 'Correia Pinto', '4204558', NULL, NULL);
INSERT INTO public.cities VALUES (4488, 24, 'Corupá', '4204509', NULL, NULL);
INSERT INTO public.cities VALUES (4489, 24, 'Criciúma', '4204608', NULL, NULL);
INSERT INTO public.cities VALUES (4490, 24, 'Cunha Porã', '4204707', NULL, NULL);
INSERT INTO public.cities VALUES (4491, 24, 'Cunhataí', '4204756', NULL, NULL);
INSERT INTO public.cities VALUES (4492, 24, 'Curitibanos', '4204806', NULL, NULL);
INSERT INTO public.cities VALUES (4493, 24, 'Descanso', '4204905', NULL, NULL);
INSERT INTO public.cities VALUES (4494, 24, 'Dionísio Cerqueira', '4205001', NULL, NULL);
INSERT INTO public.cities VALUES (4495, 24, 'Dona Emma', '4205100', NULL, NULL);
INSERT INTO public.cities VALUES (4496, 24, 'Doutor Pedrinho', '4205159', NULL, NULL);
INSERT INTO public.cities VALUES (4497, 24, 'Entre Rios', '4205175', NULL, NULL);
INSERT INTO public.cities VALUES (4498, 24, 'Ermo', '4205191', NULL, NULL);
INSERT INTO public.cities VALUES (4499, 24, 'Erval Velho', '4205209', NULL, NULL);
INSERT INTO public.cities VALUES (4500, 24, 'Faxinal dos Guedes', '4205308', NULL, NULL);
INSERT INTO public.cities VALUES (4501, 24, 'Flor do Sertão', '4205357', NULL, NULL);
INSERT INTO public.cities VALUES (4502, 24, 'Florianópolis', '4205407', NULL, NULL);
INSERT INTO public.cities VALUES (4503, 24, 'Formosa do Sul', '4205431', NULL, NULL);
INSERT INTO public.cities VALUES (4504, 24, 'Forquilhinha', '4205456', NULL, NULL);
INSERT INTO public.cities VALUES (4505, 24, 'Fraiburgo', '4205506', NULL, NULL);
INSERT INTO public.cities VALUES (4506, 24, 'Frei Rogério', '4205555', NULL, NULL);
INSERT INTO public.cities VALUES (4507, 24, 'Galvão', '4205605', NULL, NULL);
INSERT INTO public.cities VALUES (4508, 24, 'Garopaba', '4205704', NULL, NULL);
INSERT INTO public.cities VALUES (4509, 24, 'Garuva', '4205803', NULL, NULL);
INSERT INTO public.cities VALUES (4510, 24, 'Gaspar', '4205902', NULL, NULL);
INSERT INTO public.cities VALUES (4511, 24, 'Governador Celso Ramos', '4206009', NULL, NULL);
INSERT INTO public.cities VALUES (4512, 24, 'Grão Pará', '4206108', NULL, NULL);
INSERT INTO public.cities VALUES (4513, 24, 'Gravatal', '4206207', NULL, NULL);
INSERT INTO public.cities VALUES (4514, 24, 'Guabiruba', '4206306', NULL, NULL);
INSERT INTO public.cities VALUES (4515, 24, 'Guaraciaba', '4206405', NULL, NULL);
INSERT INTO public.cities VALUES (4516, 24, 'Guaramirim', '4206504', NULL, NULL);
INSERT INTO public.cities VALUES (4517, 24, 'Guarujá do Sul', '4206603', NULL, NULL);
INSERT INTO public.cities VALUES (4518, 24, 'Guatambú', '4206652', NULL, NULL);
INSERT INTO public.cities VALUES (4519, 24, 'Herval d''Oeste', '4206702', NULL, NULL);
INSERT INTO public.cities VALUES (4520, 24, 'Ibiam', '4206751', NULL, NULL);
INSERT INTO public.cities VALUES (4521, 24, 'Ibicaré', '4206801', NULL, NULL);
INSERT INTO public.cities VALUES (4522, 24, 'Ibirama', '4206900', NULL, NULL);
INSERT INTO public.cities VALUES (4523, 24, 'Içara', '4207007', NULL, NULL);
INSERT INTO public.cities VALUES (4524, 24, 'Ilhota', '4207106', NULL, NULL);
INSERT INTO public.cities VALUES (4525, 24, 'Imaruí', '4207205', NULL, NULL);
INSERT INTO public.cities VALUES (4526, 24, 'Imbituba', '4207304', NULL, NULL);
INSERT INTO public.cities VALUES (4527, 24, 'Imbuia', '4207403', NULL, NULL);
INSERT INTO public.cities VALUES (4528, 24, 'Indaial', '4207502', NULL, NULL);
INSERT INTO public.cities VALUES (4529, 24, 'Iomerê', '4207577', NULL, NULL);
INSERT INTO public.cities VALUES (4530, 24, 'Ipira', '4207601', NULL, NULL);
INSERT INTO public.cities VALUES (4531, 24, 'Iporã do Oeste', '4207650', NULL, NULL);
INSERT INTO public.cities VALUES (4532, 24, 'Ipuaçu', '4207684', NULL, NULL);
INSERT INTO public.cities VALUES (4533, 24, 'Ipumirim', '4207700', NULL, NULL);
INSERT INTO public.cities VALUES (4534, 24, 'Iraceminha', '4207759', NULL, NULL);
INSERT INTO public.cities VALUES (4535, 24, 'Irani', '4207809', NULL, NULL);
INSERT INTO public.cities VALUES (4536, 24, 'Irati', '4207858', NULL, NULL);
INSERT INTO public.cities VALUES (4537, 24, 'Irineópolis', '4207908', NULL, NULL);
INSERT INTO public.cities VALUES (4538, 24, 'Itá', '4208005', NULL, NULL);
INSERT INTO public.cities VALUES (4539, 24, 'Itaiópolis', '4208104', NULL, NULL);
INSERT INTO public.cities VALUES (4540, 24, 'Itajaí', '4208203', NULL, NULL);
INSERT INTO public.cities VALUES (4541, 24, 'Itapema', '4208302', NULL, NULL);
INSERT INTO public.cities VALUES (4542, 24, 'Itapiranga', '4208401', NULL, NULL);
INSERT INTO public.cities VALUES (4543, 24, 'Itapoá', '4208450', NULL, NULL);
INSERT INTO public.cities VALUES (4544, 24, 'Ituporanga', '4208500', NULL, NULL);
INSERT INTO public.cities VALUES (4545, 24, 'Jaborá', '4208609', NULL, NULL);
INSERT INTO public.cities VALUES (4546, 24, 'Jacinto Machado', '4208708', NULL, NULL);
INSERT INTO public.cities VALUES (4547, 24, 'Jaguaruna', '4208807', NULL, NULL);
INSERT INTO public.cities VALUES (4548, 24, 'Jaraguá do Sul', '4208906', NULL, NULL);
INSERT INTO public.cities VALUES (4549, 24, 'Jardinópolis', '4208955', NULL, NULL);
INSERT INTO public.cities VALUES (4550, 24, 'Joaçaba', '4209003', NULL, NULL);
INSERT INTO public.cities VALUES (4551, 24, 'Joinville', '4209102', NULL, NULL);
INSERT INTO public.cities VALUES (4552, 24, 'José Boiteux', '4209151', NULL, NULL);
INSERT INTO public.cities VALUES (4553, 24, 'Jupiá', '4209177', NULL, NULL);
INSERT INTO public.cities VALUES (4554, 24, 'Lacerdópolis', '4209201', NULL, NULL);
INSERT INTO public.cities VALUES (4555, 24, 'Lages', '4209300', NULL, NULL);
INSERT INTO public.cities VALUES (4556, 24, 'Laguna', '4209409', NULL, NULL);
INSERT INTO public.cities VALUES (4557, 24, 'Lajeado Grande', '4209458', NULL, NULL);
INSERT INTO public.cities VALUES (4558, 24, 'Laurentino', '4209508', NULL, NULL);
INSERT INTO public.cities VALUES (4559, 24, 'Lauro Muller', '4209607', NULL, NULL);
INSERT INTO public.cities VALUES (4560, 24, 'Lebon Régis', '4209706', NULL, NULL);
INSERT INTO public.cities VALUES (4561, 24, 'Leoberto Leal', '4209805', NULL, NULL);
INSERT INTO public.cities VALUES (4562, 24, 'Lindóia do Sul', '4209854', NULL, NULL);
INSERT INTO public.cities VALUES (4563, 24, 'Lontras', '4209904', NULL, NULL);
INSERT INTO public.cities VALUES (4564, 24, 'Luiz Alves', '4210001', NULL, NULL);
INSERT INTO public.cities VALUES (4565, 24, 'Luzerna', '4210035', NULL, NULL);
INSERT INTO public.cities VALUES (4566, 24, 'Macieira', '4210050', NULL, NULL);
INSERT INTO public.cities VALUES (4567, 24, 'Mafra', '4210100', NULL, NULL);
INSERT INTO public.cities VALUES (4568, 24, 'Major Gercino', '4210209', NULL, NULL);
INSERT INTO public.cities VALUES (4569, 24, 'Major Vieira', '4210308', NULL, NULL);
INSERT INTO public.cities VALUES (4570, 24, 'Maracajá', '4210407', NULL, NULL);
INSERT INTO public.cities VALUES (4571, 24, 'Maravilha', '4210506', NULL, NULL);
INSERT INTO public.cities VALUES (4572, 24, 'Marema', '4210555', NULL, NULL);
INSERT INTO public.cities VALUES (4573, 24, 'Massaranduba', '4210605', NULL, NULL);
INSERT INTO public.cities VALUES (4574, 24, 'Matos Costa', '4210704', NULL, NULL);
INSERT INTO public.cities VALUES (4575, 24, 'Meleiro', '4210803', NULL, NULL);
INSERT INTO public.cities VALUES (4576, 24, 'Mirim Doce', '4210852', NULL, NULL);
INSERT INTO public.cities VALUES (4577, 24, 'Modelo', '4210902', NULL, NULL);
INSERT INTO public.cities VALUES (4578, 24, 'Mondaí', '4211009', NULL, NULL);
INSERT INTO public.cities VALUES (4579, 24, 'Monte Carlo', '4211058', NULL, NULL);
INSERT INTO public.cities VALUES (4580, 24, 'Monte Castelo', '4211108', NULL, NULL);
INSERT INTO public.cities VALUES (4581, 24, 'Morro da Fumaça', '4211207', NULL, NULL);
INSERT INTO public.cities VALUES (4582, 24, 'Morro Grande', '4211256', NULL, NULL);
INSERT INTO public.cities VALUES (4583, 24, 'Navegantes', '4211306', NULL, NULL);
INSERT INTO public.cities VALUES (4584, 24, 'Nova Erechim', '4211405', NULL, NULL);
INSERT INTO public.cities VALUES (4585, 24, 'Nova Itaberaba', '4211454', NULL, NULL);
INSERT INTO public.cities VALUES (4586, 24, 'Nova Trento', '4211504', NULL, NULL);
INSERT INTO public.cities VALUES (4587, 24, 'Nova Veneza', '4211603', NULL, NULL);
INSERT INTO public.cities VALUES (4588, 24, 'Novo Horizonte', '4211652', NULL, NULL);
INSERT INTO public.cities VALUES (4589, 24, 'Orleans', '4211702', NULL, NULL);
INSERT INTO public.cities VALUES (4590, 24, 'Otacílio Costa', '4211751', NULL, NULL);
INSERT INTO public.cities VALUES (4591, 24, 'Ouro', '4211801', NULL, NULL);
INSERT INTO public.cities VALUES (4592, 24, 'Ouro Verde', '4211850', NULL, NULL);
INSERT INTO public.cities VALUES (4593, 24, 'Paial', '4211876', NULL, NULL);
INSERT INTO public.cities VALUES (4594, 24, 'Painel', '4211892', NULL, NULL);
INSERT INTO public.cities VALUES (4595, 24, 'Palhoça', '4211900', NULL, NULL);
INSERT INTO public.cities VALUES (4596, 24, 'Palma Sola', '4212007', NULL, NULL);
INSERT INTO public.cities VALUES (4597, 24, 'Palmeira', '4212056', NULL, NULL);
INSERT INTO public.cities VALUES (4598, 24, 'Palmitos', '4212106', NULL, NULL);
INSERT INTO public.cities VALUES (4599, 24, 'Papanduva', '4212205', NULL, NULL);
INSERT INTO public.cities VALUES (4600, 24, 'Paraíso', '4212239', NULL, NULL);
INSERT INTO public.cities VALUES (4601, 24, 'Passo de Torres', '4212254', NULL, NULL);
INSERT INTO public.cities VALUES (4602, 24, 'Passos Maia', '4212270', NULL, NULL);
INSERT INTO public.cities VALUES (4603, 24, 'Paulo Lopes', '4212304', NULL, NULL);
INSERT INTO public.cities VALUES (4604, 24, 'Pedras Grandes', '4212403', NULL, NULL);
INSERT INTO public.cities VALUES (4605, 24, 'Penha', '4212502', NULL, NULL);
INSERT INTO public.cities VALUES (4606, 24, 'Peritiba', '4212601', NULL, NULL);
INSERT INTO public.cities VALUES (4607, 24, 'Petrolândia', '4212700', NULL, NULL);
INSERT INTO public.cities VALUES (4608, 24, 'Pinhalzinho', '4212908', NULL, NULL);
INSERT INTO public.cities VALUES (4609, 24, 'Pinheiro Preto', '4213005', NULL, NULL);
INSERT INTO public.cities VALUES (4610, 24, 'Piratuba', '4213104', NULL, NULL);
INSERT INTO public.cities VALUES (4611, 24, 'Planalto Alegre', '4213153', NULL, NULL);
INSERT INTO public.cities VALUES (4612, 24, 'Pomerode', '4213203', NULL, NULL);
INSERT INTO public.cities VALUES (4613, 24, 'Ponte Alta', '4213302', NULL, NULL);
INSERT INTO public.cities VALUES (4614, 24, 'Ponte Alta do Norte', '4213351', NULL, NULL);
INSERT INTO public.cities VALUES (4615, 24, 'Ponte Serrada', '4213401', NULL, NULL);
INSERT INTO public.cities VALUES (4616, 24, 'Porto Belo', '4213500', NULL, NULL);
INSERT INTO public.cities VALUES (4617, 24, 'Porto União', '4213609', NULL, NULL);
INSERT INTO public.cities VALUES (4618, 24, 'Pouso Redondo', '4213708', NULL, NULL);
INSERT INTO public.cities VALUES (4619, 24, 'Praia Grande', '4213807', NULL, NULL);
INSERT INTO public.cities VALUES (4620, 24, 'Presidente Castello Branco', '4213906', NULL, NULL);
INSERT INTO public.cities VALUES (4621, 24, 'Presidente Getúlio', '4214003', NULL, NULL);
INSERT INTO public.cities VALUES (4622, 24, 'Presidente Nereu', '4214102', NULL, NULL);
INSERT INTO public.cities VALUES (4623, 24, 'Princesa', '4214151', NULL, NULL);
INSERT INTO public.cities VALUES (4624, 24, 'Quilombo', '4214201', NULL, NULL);
INSERT INTO public.cities VALUES (4625, 24, 'Rancho Queimado', '4214300', NULL, NULL);
INSERT INTO public.cities VALUES (4626, 24, 'Rio das Antas', '4214409', NULL, NULL);
INSERT INTO public.cities VALUES (4627, 24, 'Rio do Campo', '4214508', NULL, NULL);
INSERT INTO public.cities VALUES (4628, 24, 'Rio do Oeste', '4214607', NULL, NULL);
INSERT INTO public.cities VALUES (4629, 24, 'Rio do Sul', '4214805', NULL, NULL);
INSERT INTO public.cities VALUES (4630, 24, 'Rio dos Cedros', '4214706', NULL, NULL);
INSERT INTO public.cities VALUES (4631, 24, 'Rio Fortuna', '4214904', NULL, NULL);
INSERT INTO public.cities VALUES (4632, 24, 'Rio Negrinho', '4215000', NULL, NULL);
INSERT INTO public.cities VALUES (4633, 24, 'Rio Rufino', '4215059', NULL, NULL);
INSERT INTO public.cities VALUES (4634, 24, 'Riqueza', '4215075', NULL, NULL);
INSERT INTO public.cities VALUES (4635, 24, 'Rodeio', '4215109', NULL, NULL);
INSERT INTO public.cities VALUES (4636, 24, 'Romelândia', '4215208', NULL, NULL);
INSERT INTO public.cities VALUES (4637, 24, 'Salete', '4215307', NULL, NULL);
INSERT INTO public.cities VALUES (4638, 24, 'Saltinho', '4215356', NULL, NULL);
INSERT INTO public.cities VALUES (4639, 24, 'Salto Veloso', '4215406', NULL, NULL);
INSERT INTO public.cities VALUES (4640, 24, 'Sangão', '4215455', NULL, NULL);
INSERT INTO public.cities VALUES (4641, 24, 'Santa Cecília', '4215505', NULL, NULL);
INSERT INTO public.cities VALUES (4642, 24, 'Santa Helena', '4215554', NULL, NULL);
INSERT INTO public.cities VALUES (4643, 24, 'Santa Rosa de Lima', '4215604', NULL, NULL);
INSERT INTO public.cities VALUES (4644, 24, 'Santa Rosa do Sul', '4215653', NULL, NULL);
INSERT INTO public.cities VALUES (4645, 24, 'Santa Terezinha', '4215679', NULL, NULL);
INSERT INTO public.cities VALUES (4646, 24, 'Santa Terezinha do Progresso', '4215687', NULL, NULL);
INSERT INTO public.cities VALUES (4647, 24, 'Santiago do Sul', '4215695', NULL, NULL);
INSERT INTO public.cities VALUES (4648, 24, 'Santo Amaro da Imperatriz', '4215703', NULL, NULL);
INSERT INTO public.cities VALUES (4649, 24, 'São Bento do Sul', '4215802', NULL, NULL);
INSERT INTO public.cities VALUES (4650, 24, 'São Bernardino', '4215752', NULL, NULL);
INSERT INTO public.cities VALUES (4651, 24, 'São Bonifácio', '4215901', NULL, NULL);
INSERT INTO public.cities VALUES (4652, 24, 'São Carlos', '4216008', NULL, NULL);
INSERT INTO public.cities VALUES (4653, 24, 'São Cristovão do Sul', '4216057', NULL, NULL);
INSERT INTO public.cities VALUES (4654, 24, 'São Domingos', '4216107', NULL, NULL);
INSERT INTO public.cities VALUES (4655, 24, 'São Francisco do Sul', '4216206', NULL, NULL);
INSERT INTO public.cities VALUES (4656, 24, 'São João Batista', '4216305', NULL, NULL);
INSERT INTO public.cities VALUES (4657, 24, 'São João do Itaperiú', '4216354', NULL, NULL);
INSERT INTO public.cities VALUES (4658, 24, 'São João do Oeste', '4216255', NULL, NULL);
INSERT INTO public.cities VALUES (4659, 24, 'São João do Sul', '4216404', NULL, NULL);
INSERT INTO public.cities VALUES (4660, 24, 'São Joaquim', '4216503', NULL, NULL);
INSERT INTO public.cities VALUES (4661, 24, 'São José', '4216602', NULL, NULL);
INSERT INTO public.cities VALUES (4662, 24, 'São José do Cedro', '4216701', NULL, NULL);
INSERT INTO public.cities VALUES (4663, 24, 'São José do Cerrito', '4216800', NULL, NULL);
INSERT INTO public.cities VALUES (4664, 24, 'São Lourenço do Oeste', '4216909', NULL, NULL);
INSERT INTO public.cities VALUES (4665, 24, 'São Ludgero', '4217006', NULL, NULL);
INSERT INTO public.cities VALUES (4666, 24, 'São Martinho', '4217105', NULL, NULL);
INSERT INTO public.cities VALUES (4667, 24, 'São Miguel da Boa Vista', '4217154', NULL, NULL);
INSERT INTO public.cities VALUES (4668, 24, 'São Miguel do Oeste', '4217204', NULL, NULL);
INSERT INTO public.cities VALUES (4669, 24, 'São Pedro de Alcântara', '4217253', NULL, NULL);
INSERT INTO public.cities VALUES (4670, 24, 'Saudades', '4217303', NULL, NULL);
INSERT INTO public.cities VALUES (4671, 24, 'Schroeder', '4217402', NULL, NULL);
INSERT INTO public.cities VALUES (4672, 24, 'Seara', '4217501', NULL, NULL);
INSERT INTO public.cities VALUES (4673, 24, 'Serra Alta', '4217550', NULL, NULL);
INSERT INTO public.cities VALUES (4674, 24, 'Siderópolis', '4217600', NULL, NULL);
INSERT INTO public.cities VALUES (4675, 24, 'Sombrio', '4217709', NULL, NULL);
INSERT INTO public.cities VALUES (4676, 24, 'Sul Brasil', '4217758', NULL, NULL);
INSERT INTO public.cities VALUES (4677, 24, 'Taió', '4217808', NULL, NULL);
INSERT INTO public.cities VALUES (4678, 24, 'Tangará', '4217907', NULL, NULL);
INSERT INTO public.cities VALUES (4679, 24, 'Tigrinhos', '4217956', NULL, NULL);
INSERT INTO public.cities VALUES (4680, 24, 'Tijucas', '4218004', NULL, NULL);
INSERT INTO public.cities VALUES (4681, 24, 'Timbé do Sul', '4218103', NULL, NULL);
INSERT INTO public.cities VALUES (4682, 24, 'Timbó', '4218202', NULL, NULL);
INSERT INTO public.cities VALUES (4683, 24, 'Timbó Grande', '4218251', NULL, NULL);
INSERT INTO public.cities VALUES (4684, 24, 'Três Barras', '4218301', NULL, NULL);
INSERT INTO public.cities VALUES (4685, 24, 'Treviso', '4218350', NULL, NULL);
INSERT INTO public.cities VALUES (4686, 24, 'Treze de Maio', '4218400', NULL, NULL);
INSERT INTO public.cities VALUES (4687, 24, 'Treze Tílias', '4218509', NULL, NULL);
INSERT INTO public.cities VALUES (4688, 24, 'Trombudo Central', '4218608', NULL, NULL);
INSERT INTO public.cities VALUES (4689, 24, 'Tubarão', '4218707', NULL, NULL);
INSERT INTO public.cities VALUES (4690, 24, 'Tunápolis', '4218756', NULL, NULL);
INSERT INTO public.cities VALUES (4691, 24, 'Turvo', '4218806', NULL, NULL);
INSERT INTO public.cities VALUES (4692, 24, 'União do Oeste', '4218855', NULL, NULL);
INSERT INTO public.cities VALUES (4693, 24, 'Urubici', '4218905', NULL, NULL);
INSERT INTO public.cities VALUES (4694, 24, 'Urupema', '4218954', NULL, NULL);
INSERT INTO public.cities VALUES (4695, 24, 'Urussanga', '4219002', NULL, NULL);
INSERT INTO public.cities VALUES (4696, 24, 'Vargeão', '4219101', NULL, NULL);
INSERT INTO public.cities VALUES (4697, 24, 'Vargem', '4219150', NULL, NULL);
INSERT INTO public.cities VALUES (4698, 24, 'Vargem Bonita', '4219176', NULL, NULL);
INSERT INTO public.cities VALUES (4699, 24, 'Vidal Ramos', '4219200', NULL, NULL);
INSERT INTO public.cities VALUES (4700, 24, 'Videira', '4219309', NULL, NULL);
INSERT INTO public.cities VALUES (4701, 24, 'Vitor Meireles', '4219358', NULL, NULL);
INSERT INTO public.cities VALUES (4702, 24, 'Witmarsum', '4219408', NULL, NULL);
INSERT INTO public.cities VALUES (4703, 24, 'Xanxerê', '4219507', NULL, NULL);
INSERT INTO public.cities VALUES (4704, 24, 'Xavantina', '4219606', NULL, NULL);
INSERT INTO public.cities VALUES (4705, 24, 'Xaxim', '4219705', NULL, NULL);
INSERT INTO public.cities VALUES (4706, 24, 'Zortéa', '4219853', NULL, NULL);
INSERT INTO public.cities VALUES (4707, 25, 'Adamantina', '3500105', NULL, NULL);
INSERT INTO public.cities VALUES (4708, 25, 'Adolfo', '3500204', NULL, NULL);
INSERT INTO public.cities VALUES (4709, 25, 'Aguaí', '3500303', NULL, NULL);
INSERT INTO public.cities VALUES (4710, 25, 'Águas da Prata', '3500402', NULL, NULL);
INSERT INTO public.cities VALUES (4711, 25, 'Águas de Lindóia', '3500501', NULL, NULL);
INSERT INTO public.cities VALUES (4712, 25, 'Águas de Santa Bárbara', '3500550', NULL, NULL);
INSERT INTO public.cities VALUES (4713, 25, 'Águas de São Pedro', '3500600', NULL, NULL);
INSERT INTO public.cities VALUES (4714, 25, 'Agudos', '3500709', NULL, NULL);
INSERT INTO public.cities VALUES (4715, 25, 'Alambari', '3500758', NULL, NULL);
INSERT INTO public.cities VALUES (4716, 25, 'Alfredo Marcondes', '3500808', NULL, NULL);
INSERT INTO public.cities VALUES (4717, 25, 'Altair', '3500907', NULL, NULL);
INSERT INTO public.cities VALUES (4718, 25, 'Altinópolis', '3501004', NULL, NULL);
INSERT INTO public.cities VALUES (4719, 25, 'Alto Alegre', '3501103', NULL, NULL);
INSERT INTO public.cities VALUES (4720, 25, 'Alumínio', '3501152', NULL, NULL);
INSERT INTO public.cities VALUES (4721, 25, 'Álvares Florence', '3501202', NULL, NULL);
INSERT INTO public.cities VALUES (4722, 25, 'Álvares Machado', '3501301', NULL, NULL);
INSERT INTO public.cities VALUES (4723, 25, 'Álvaro de Carvalho', '3501400', NULL, NULL);
INSERT INTO public.cities VALUES (4724, 25, 'Alvinlândia', '3501509', NULL, NULL);
INSERT INTO public.cities VALUES (4725, 25, 'Americana', '3501608', NULL, NULL);
INSERT INTO public.cities VALUES (4726, 25, 'Américo Brasiliense', '3501707', NULL, NULL);
INSERT INTO public.cities VALUES (4727, 25, 'Américo de Campos', '3501806', NULL, NULL);
INSERT INTO public.cities VALUES (4728, 25, 'Amparo', '3501905', NULL, NULL);
INSERT INTO public.cities VALUES (4729, 25, 'Analândia', '3502002', NULL, NULL);
INSERT INTO public.cities VALUES (4730, 25, 'Andradina', '3502101', NULL, NULL);
INSERT INTO public.cities VALUES (4731, 25, 'Angatuba', '3502200', NULL, NULL);
INSERT INTO public.cities VALUES (4732, 25, 'Anhembi', '3502309', NULL, NULL);
INSERT INTO public.cities VALUES (4733, 25, 'Anhumas', '3502408', NULL, NULL);
INSERT INTO public.cities VALUES (4734, 25, 'Aparecida', '3502507', NULL, NULL);
INSERT INTO public.cities VALUES (4735, 25, 'Aparecida d''Oeste', '3502606', NULL, NULL);
INSERT INTO public.cities VALUES (4736, 25, 'Apiaí', '3502705', NULL, NULL);
INSERT INTO public.cities VALUES (4737, 25, 'Araçariguama', '3502754', NULL, NULL);
INSERT INTO public.cities VALUES (4738, 25, 'Araçatuba', '3502804', NULL, NULL);
INSERT INTO public.cities VALUES (4739, 25, 'Araçoiaba da Serra', '3502903', NULL, NULL);
INSERT INTO public.cities VALUES (4740, 25, 'Aramina', '3503000', NULL, NULL);
INSERT INTO public.cities VALUES (4741, 25, 'Arandu', '3503109', NULL, NULL);
INSERT INTO public.cities VALUES (4742, 25, 'Arapeí', '3503158', NULL, NULL);
INSERT INTO public.cities VALUES (4743, 25, 'Araraquara', '3503208', NULL, NULL);
INSERT INTO public.cities VALUES (4744, 25, 'Araras', '3503307', NULL, NULL);
INSERT INTO public.cities VALUES (4745, 25, 'Arco-Íris', '3503356', NULL, NULL);
INSERT INTO public.cities VALUES (4746, 25, 'Arealva', '3503406', NULL, NULL);
INSERT INTO public.cities VALUES (4747, 25, 'Areias', '3503505', NULL, NULL);
INSERT INTO public.cities VALUES (4748, 25, 'Areiópolis', '3503604', NULL, NULL);
INSERT INTO public.cities VALUES (4749, 25, 'Ariranha', '3503703', NULL, NULL);
INSERT INTO public.cities VALUES (4750, 25, 'Artur Nogueira', '3503802', NULL, NULL);
INSERT INTO public.cities VALUES (4751, 25, 'Arujá', '3503901', NULL, NULL);
INSERT INTO public.cities VALUES (4752, 25, 'Aspásia', '3503950', NULL, NULL);
INSERT INTO public.cities VALUES (4753, 25, 'Assis', '3504008', NULL, NULL);
INSERT INTO public.cities VALUES (4754, 25, 'Atibaia', '3504107', NULL, NULL);
INSERT INTO public.cities VALUES (4755, 25, 'Auriflama', '3504206', NULL, NULL);
INSERT INTO public.cities VALUES (4756, 25, 'Avaí', '3504305', NULL, NULL);
INSERT INTO public.cities VALUES (4757, 25, 'Avanhandava', '3504404', NULL, NULL);
INSERT INTO public.cities VALUES (4758, 25, 'Avaré', '3504503', NULL, NULL);
INSERT INTO public.cities VALUES (4759, 25, 'Bady Bassitt', '3504602', NULL, NULL);
INSERT INTO public.cities VALUES (4760, 25, 'Balbinos', '3504701', NULL, NULL);
INSERT INTO public.cities VALUES (4761, 25, 'Bálsamo', '3504800', NULL, NULL);
INSERT INTO public.cities VALUES (4762, 25, 'Bananal', '3504909', NULL, NULL);
INSERT INTO public.cities VALUES (4763, 25, 'Barão de Antonina', '3505005', NULL, NULL);
INSERT INTO public.cities VALUES (4764, 25, 'Barbosa', '3505104', NULL, NULL);
INSERT INTO public.cities VALUES (4765, 25, 'Bariri', '3505203', NULL, NULL);
INSERT INTO public.cities VALUES (4766, 25, 'Barra Bonita', '3505302', NULL, NULL);
INSERT INTO public.cities VALUES (4767, 25, 'Barra do Chapéu', '3505351', NULL, NULL);
INSERT INTO public.cities VALUES (4768, 25, 'Barra do Turvo', '3505401', NULL, NULL);
INSERT INTO public.cities VALUES (4769, 25, 'Barretos', '3505500', NULL, NULL);
INSERT INTO public.cities VALUES (4770, 25, 'Barrinha', '3505609', NULL, NULL);
INSERT INTO public.cities VALUES (4771, 25, 'Barueri', '3505708', NULL, NULL);
INSERT INTO public.cities VALUES (4772, 25, 'Bastos', '3505807', NULL, NULL);
INSERT INTO public.cities VALUES (4773, 25, 'Batatais', '3505906', NULL, NULL);
INSERT INTO public.cities VALUES (4774, 25, 'Bauru', '3506003', NULL, NULL);
INSERT INTO public.cities VALUES (4775, 25, 'Bebedouro', '3506102', NULL, NULL);
INSERT INTO public.cities VALUES (4776, 25, 'Bento de Abreu', '3506201', NULL, NULL);
INSERT INTO public.cities VALUES (4777, 25, 'Bernardino de Campos', '3506300', NULL, NULL);
INSERT INTO public.cities VALUES (4778, 25, 'Bertioga', '3506359', NULL, NULL);
INSERT INTO public.cities VALUES (4779, 25, 'Bilac', '3506409', NULL, NULL);
INSERT INTO public.cities VALUES (4780, 25, 'Birigui', '3506508', NULL, NULL);
INSERT INTO public.cities VALUES (4781, 25, 'Biritiba-Mirim', '3506607', NULL, NULL);
INSERT INTO public.cities VALUES (4782, 25, 'Boa Esperança do Sul', '3506706', NULL, NULL);
INSERT INTO public.cities VALUES (4783, 25, 'Bocaina', '3506805', NULL, NULL);
INSERT INTO public.cities VALUES (4784, 25, 'Bofete', '3506904', NULL, NULL);
INSERT INTO public.cities VALUES (4785, 25, 'Boituva', '3507001', NULL, NULL);
INSERT INTO public.cities VALUES (4786, 25, 'Bom Jesus dos Perdões', '3507100', NULL, NULL);
INSERT INTO public.cities VALUES (4787, 25, 'Bom Sucesso de Itararé', '3507159', NULL, NULL);
INSERT INTO public.cities VALUES (4788, 25, 'Borá', '3507209', NULL, NULL);
INSERT INTO public.cities VALUES (4789, 25, 'Boracéia', '3507308', NULL, NULL);
INSERT INTO public.cities VALUES (4790, 25, 'Borborema', '3507407', NULL, NULL);
INSERT INTO public.cities VALUES (4791, 25, 'Borebi', '3507456', NULL, NULL);
INSERT INTO public.cities VALUES (4792, 25, 'Botucatu', '3507506', NULL, NULL);
INSERT INTO public.cities VALUES (4793, 25, 'Bragança Paulista', '3507605', NULL, NULL);
INSERT INTO public.cities VALUES (4794, 25, 'Braúna', '3507704', NULL, NULL);
INSERT INTO public.cities VALUES (4795, 25, 'Brejo Alegre', '3507753', NULL, NULL);
INSERT INTO public.cities VALUES (4796, 25, 'Brodowski', '3507803', NULL, NULL);
INSERT INTO public.cities VALUES (4797, 25, 'Brotas', '3507902', NULL, NULL);
INSERT INTO public.cities VALUES (4798, 25, 'Buri', '3508009', NULL, NULL);
INSERT INTO public.cities VALUES (4799, 25, 'Buritama', '3508108', NULL, NULL);
INSERT INTO public.cities VALUES (4800, 25, 'Buritizal', '3508207', NULL, NULL);
INSERT INTO public.cities VALUES (4801, 25, 'Cabrália Paulista', '3508306', NULL, NULL);
INSERT INTO public.cities VALUES (4802, 25, 'Cabreúva', '3508405', NULL, NULL);
INSERT INTO public.cities VALUES (4803, 25, 'Caçapava', '3508504', NULL, NULL);
INSERT INTO public.cities VALUES (4804, 25, 'Cachoeira Paulista', '3508603', NULL, NULL);
INSERT INTO public.cities VALUES (4805, 25, 'Caconde', '3508702', NULL, NULL);
INSERT INTO public.cities VALUES (4806, 25, 'Cafelândia', '3508801', NULL, NULL);
INSERT INTO public.cities VALUES (4807, 25, 'Caiabu', '3508900', NULL, NULL);
INSERT INTO public.cities VALUES (4808, 25, 'Caieiras', '3509007', NULL, NULL);
INSERT INTO public.cities VALUES (4809, 25, 'Caiuá', '3509106', NULL, NULL);
INSERT INTO public.cities VALUES (4810, 25, 'Cajamar', '3509205', NULL, NULL);
INSERT INTO public.cities VALUES (4811, 25, 'Cajati', '3509254', NULL, NULL);
INSERT INTO public.cities VALUES (4812, 25, 'Cajobi', '3509304', NULL, NULL);
INSERT INTO public.cities VALUES (4813, 25, 'Cajuru', '3509403', NULL, NULL);
INSERT INTO public.cities VALUES (4814, 25, 'Campina do Monte Alegre', '3509452', NULL, NULL);
INSERT INTO public.cities VALUES (4815, 25, 'Campinas', '3509502', NULL, NULL);
INSERT INTO public.cities VALUES (4816, 25, 'Campo Limpo Paulista', '3509601', NULL, NULL);
INSERT INTO public.cities VALUES (4817, 25, 'Campos do Jordão', '3509700', NULL, NULL);
INSERT INTO public.cities VALUES (4818, 25, 'Campos Novos Paulista', '3509809', NULL, NULL);
INSERT INTO public.cities VALUES (4819, 25, 'Cananéia', '3509908', NULL, NULL);
INSERT INTO public.cities VALUES (4820, 25, 'Canas', '3509957', NULL, NULL);
INSERT INTO public.cities VALUES (4821, 25, 'Cândido Mota', '3510005', NULL, NULL);
INSERT INTO public.cities VALUES (4822, 25, 'Cândido Rodrigues', '3510104', NULL, NULL);
INSERT INTO public.cities VALUES (4823, 25, 'Canitar', '3510153', NULL, NULL);
INSERT INTO public.cities VALUES (4824, 25, 'Capão Bonito', '3510203', NULL, NULL);
INSERT INTO public.cities VALUES (4825, 25, 'Capela do Alto', '3510302', NULL, NULL);
INSERT INTO public.cities VALUES (4826, 25, 'Capivari', '3510401', NULL, NULL);
INSERT INTO public.cities VALUES (4827, 25, 'Caraguatatuba', '3510500', NULL, NULL);
INSERT INTO public.cities VALUES (4828, 25, 'Carapicuíba', '3510609', NULL, NULL);
INSERT INTO public.cities VALUES (4829, 25, 'Cardoso', '3510708', NULL, NULL);
INSERT INTO public.cities VALUES (4830, 25, 'Casa Branca', '3510807', NULL, NULL);
INSERT INTO public.cities VALUES (4831, 25, 'Cássia dos Coqueiros', '3510906', NULL, NULL);
INSERT INTO public.cities VALUES (4832, 25, 'Castilho', '3511003', NULL, NULL);
INSERT INTO public.cities VALUES (4833, 25, 'Catanduva', '3511102', NULL, NULL);
INSERT INTO public.cities VALUES (4834, 25, 'Catiguá', '3511201', NULL, NULL);
INSERT INTO public.cities VALUES (4835, 25, 'Cedral', '3511300', NULL, NULL);
INSERT INTO public.cities VALUES (4836, 25, 'Cerqueira César', '3511409', NULL, NULL);
INSERT INTO public.cities VALUES (4837, 25, 'Cerquilho', '3511508', NULL, NULL);
INSERT INTO public.cities VALUES (4838, 25, 'Cesário Lange', '3511607', NULL, NULL);
INSERT INTO public.cities VALUES (4839, 25, 'Charqueada', '3511706', NULL, NULL);
INSERT INTO public.cities VALUES (4840, 25, 'Chavantes', '3557204', NULL, NULL);
INSERT INTO public.cities VALUES (4841, 25, 'Clementina', '3511904', NULL, NULL);
INSERT INTO public.cities VALUES (4842, 25, 'Colina', '3512001', NULL, NULL);
INSERT INTO public.cities VALUES (4843, 25, 'Colômbia', '3512100', NULL, NULL);
INSERT INTO public.cities VALUES (4844, 25, 'Conchal', '3512209', NULL, NULL);
INSERT INTO public.cities VALUES (4845, 25, 'Conchas', '3512308', NULL, NULL);
INSERT INTO public.cities VALUES (4846, 25, 'Cordeirópolis', '3512407', NULL, NULL);
INSERT INTO public.cities VALUES (4847, 25, 'Coroados', '3512506', NULL, NULL);
INSERT INTO public.cities VALUES (4848, 25, 'Coronel Macedo', '3512605', NULL, NULL);
INSERT INTO public.cities VALUES (4849, 25, 'Corumbataí', '3512704', NULL, NULL);
INSERT INTO public.cities VALUES (4850, 25, 'Cosmópolis', '3512803', NULL, NULL);
INSERT INTO public.cities VALUES (4851, 25, 'Cosmorama', '3512902', NULL, NULL);
INSERT INTO public.cities VALUES (4852, 25, 'Cotia', '3513009', NULL, NULL);
INSERT INTO public.cities VALUES (4853, 25, 'Cravinhos', '3513108', NULL, NULL);
INSERT INTO public.cities VALUES (4854, 25, 'Cristais Paulista', '3513207', NULL, NULL);
INSERT INTO public.cities VALUES (4855, 25, 'Cruzália', '3513306', NULL, NULL);
INSERT INTO public.cities VALUES (4856, 25, 'Cruzeiro', '3513405', NULL, NULL);
INSERT INTO public.cities VALUES (4857, 25, 'Cubatão', '3513504', NULL, NULL);
INSERT INTO public.cities VALUES (4858, 25, 'Cunha', '3513603', NULL, NULL);
INSERT INTO public.cities VALUES (4859, 25, 'Descalvado', '3513702', NULL, NULL);
INSERT INTO public.cities VALUES (4860, 25, 'Diadema', '3513801', NULL, NULL);
INSERT INTO public.cities VALUES (4861, 25, 'Dirce Reis', '3513850', NULL, NULL);
INSERT INTO public.cities VALUES (4862, 25, 'Divinolândia', '3513900', NULL, NULL);
INSERT INTO public.cities VALUES (4863, 25, 'Dobrada', '3514007', NULL, NULL);
INSERT INTO public.cities VALUES (4864, 25, 'Dois Córregos', '3514106', NULL, NULL);
INSERT INTO public.cities VALUES (4865, 25, 'Dolcinópolis', '3514205', NULL, NULL);
INSERT INTO public.cities VALUES (4866, 25, 'Dourado', '3514304', NULL, NULL);
INSERT INTO public.cities VALUES (4867, 25, 'Dracena', '3514403', NULL, NULL);
INSERT INTO public.cities VALUES (4868, 25, 'Duartina', '3514502', NULL, NULL);
INSERT INTO public.cities VALUES (4869, 25, 'Dumont', '3514601', NULL, NULL);
INSERT INTO public.cities VALUES (4870, 25, 'Echaporã', '3514700', NULL, NULL);
INSERT INTO public.cities VALUES (4871, 25, 'Eldorado', '3514809', NULL, NULL);
INSERT INTO public.cities VALUES (4872, 25, 'Elias Fausto', '3514908', NULL, NULL);
INSERT INTO public.cities VALUES (4873, 25, 'Elisiário', '3514924', NULL, NULL);
INSERT INTO public.cities VALUES (4874, 25, 'Embaúba', '3514957', NULL, NULL);
INSERT INTO public.cities VALUES (4875, 25, 'Embu', '3515004', NULL, NULL);
INSERT INTO public.cities VALUES (4876, 25, 'Embu-Guaçu', '3515103', NULL, NULL);
INSERT INTO public.cities VALUES (4877, 25, 'Emilianópolis', '3515129', NULL, NULL);
INSERT INTO public.cities VALUES (4878, 25, 'Engenheiro Coelho', '3515152', NULL, NULL);
INSERT INTO public.cities VALUES (4879, 25, 'Espírito Santo do Pinhal', '3515186', NULL, NULL);
INSERT INTO public.cities VALUES (4880, 25, 'Espírito Santo do Turvo', '3515194', NULL, NULL);
INSERT INTO public.cities VALUES (4881, 25, 'Estiva Gerbi', '3557303', NULL, NULL);
INSERT INTO public.cities VALUES (4882, 25, 'Estrela do Norte', '3515301', NULL, NULL);
INSERT INTO public.cities VALUES (4883, 25, 'Estrela d''Oeste', '3515202', NULL, NULL);
INSERT INTO public.cities VALUES (4884, 25, 'Euclides da Cunha Paulista', '3515350', NULL, NULL);
INSERT INTO public.cities VALUES (4885, 25, 'Fartura', '3515400', NULL, NULL);
INSERT INTO public.cities VALUES (4886, 25, 'Fernando Prestes', '3515608', NULL, NULL);
INSERT INTO public.cities VALUES (4887, 25, 'Fernandópolis', '3515509', NULL, NULL);
INSERT INTO public.cities VALUES (4888, 25, 'Fernão', '3515657', NULL, NULL);
INSERT INTO public.cities VALUES (4889, 25, 'Ferraz de Vasconcelos', '3515707', NULL, NULL);
INSERT INTO public.cities VALUES (4890, 25, 'Flora Rica', '3515806', NULL, NULL);
INSERT INTO public.cities VALUES (4891, 25, 'Floreal', '3515905', NULL, NULL);
INSERT INTO public.cities VALUES (4892, 25, 'Flórida Paulista', '3516002', NULL, NULL);
INSERT INTO public.cities VALUES (4893, 25, 'Florínia', '3516101', NULL, NULL);
INSERT INTO public.cities VALUES (4894, 25, 'Franca', '3516200', NULL, NULL);
INSERT INTO public.cities VALUES (4895, 25, 'Francisco Morato', '3516309', NULL, NULL);
INSERT INTO public.cities VALUES (4896, 25, 'Franco da Rocha', '3516408', NULL, NULL);
INSERT INTO public.cities VALUES (4897, 25, 'Gabriel Monteiro', '3516507', NULL, NULL);
INSERT INTO public.cities VALUES (4898, 25, 'Gália', '3516606', NULL, NULL);
INSERT INTO public.cities VALUES (4899, 25, 'Garça', '3516705', NULL, NULL);
INSERT INTO public.cities VALUES (4900, 25, 'Gastão Vidigal', '3516804', NULL, NULL);
INSERT INTO public.cities VALUES (4901, 25, 'Gavião Peixoto', '3516853', NULL, NULL);
INSERT INTO public.cities VALUES (4902, 25, 'General Salgado', '3516903', NULL, NULL);
INSERT INTO public.cities VALUES (4903, 25, 'Getulina', '3517000', NULL, NULL);
INSERT INTO public.cities VALUES (4904, 25, 'Glicério', '3517109', NULL, NULL);
INSERT INTO public.cities VALUES (4905, 25, 'Guaiçara', '3517208', NULL, NULL);
INSERT INTO public.cities VALUES (4906, 25, 'Guaimbê', '3517307', NULL, NULL);
INSERT INTO public.cities VALUES (4907, 25, 'Guaíra', '3517406', NULL, NULL);
INSERT INTO public.cities VALUES (4908, 25, 'Guapiaçu', '3517505', NULL, NULL);
INSERT INTO public.cities VALUES (4909, 25, 'Guapiara', '3517604', NULL, NULL);
INSERT INTO public.cities VALUES (4910, 25, 'Guará', '3517703', NULL, NULL);
INSERT INTO public.cities VALUES (4911, 25, 'Guaraçaí', '3517802', NULL, NULL);
INSERT INTO public.cities VALUES (4912, 25, 'Guaraci', '3517901', NULL, NULL);
INSERT INTO public.cities VALUES (4913, 25, 'Guarani d''Oeste', '3518008', NULL, NULL);
INSERT INTO public.cities VALUES (4914, 25, 'Guarantã', '3518107', NULL, NULL);
INSERT INTO public.cities VALUES (4915, 25, 'Guararapes', '3518206', NULL, NULL);
INSERT INTO public.cities VALUES (4916, 25, 'Guararema', '3518305', NULL, NULL);
INSERT INTO public.cities VALUES (4917, 25, 'Guaratinguetá', '3518404', NULL, NULL);
INSERT INTO public.cities VALUES (4918, 25, 'Guareí', '3518503', NULL, NULL);
INSERT INTO public.cities VALUES (4919, 25, 'Guariba', '3518602', NULL, NULL);
INSERT INTO public.cities VALUES (4920, 25, 'Guarujá', '3518701', NULL, NULL);
INSERT INTO public.cities VALUES (4921, 25, 'Guarulhos', '3518800', NULL, NULL);
INSERT INTO public.cities VALUES (4922, 25, 'Guatapará', '3518859', NULL, NULL);
INSERT INTO public.cities VALUES (4923, 25, 'Guzolândia', '3518909', NULL, NULL);
INSERT INTO public.cities VALUES (4924, 25, 'Herculândia', '3519006', NULL, NULL);
INSERT INTO public.cities VALUES (4925, 25, 'Holambra', '3519055', NULL, NULL);
INSERT INTO public.cities VALUES (4926, 25, 'Hortolândia', '3519071', NULL, NULL);
INSERT INTO public.cities VALUES (4927, 25, 'Iacanga', '3519105', NULL, NULL);
INSERT INTO public.cities VALUES (4928, 25, 'Iacri', '3519204', NULL, NULL);
INSERT INTO public.cities VALUES (4929, 25, 'Iaras', '3519253', NULL, NULL);
INSERT INTO public.cities VALUES (4930, 25, 'Ibaté', '3519303', NULL, NULL);
INSERT INTO public.cities VALUES (4931, 25, 'Ibirá', '3519402', NULL, NULL);
INSERT INTO public.cities VALUES (4932, 25, 'Ibirarema', '3519501', NULL, NULL);
INSERT INTO public.cities VALUES (4933, 25, 'Ibitinga', '3519600', NULL, NULL);
INSERT INTO public.cities VALUES (4934, 25, 'Ibiúna', '3519709', NULL, NULL);
INSERT INTO public.cities VALUES (4935, 25, 'Icém', '3519808', NULL, NULL);
INSERT INTO public.cities VALUES (4936, 25, 'Iepê', '3519907', NULL, NULL);
INSERT INTO public.cities VALUES (4937, 25, 'Igaraçu do Tietê', '3520004', NULL, NULL);
INSERT INTO public.cities VALUES (4938, 25, 'Igarapava', '3520103', NULL, NULL);
INSERT INTO public.cities VALUES (4939, 25, 'Igaratá', '3520202', NULL, NULL);
INSERT INTO public.cities VALUES (4940, 25, 'Iguape', '3520301', NULL, NULL);
INSERT INTO public.cities VALUES (4941, 25, 'Ilha Comprida', '3520426', NULL, NULL);
INSERT INTO public.cities VALUES (4942, 25, 'Ilha Solteira', '3520442', NULL, NULL);
INSERT INTO public.cities VALUES (4943, 25, 'Ilhabela', '3520400', NULL, NULL);
INSERT INTO public.cities VALUES (4944, 25, 'Indaiatuba', '3520509', NULL, NULL);
INSERT INTO public.cities VALUES (4945, 25, 'Indiana', '3520608', NULL, NULL);
INSERT INTO public.cities VALUES (4946, 25, 'Indiaporã', '3520707', NULL, NULL);
INSERT INTO public.cities VALUES (4947, 25, 'Inúbia Paulista', '3520806', NULL, NULL);
INSERT INTO public.cities VALUES (4948, 25, 'Ipaussu', '3520905', NULL, NULL);
INSERT INTO public.cities VALUES (4949, 25, 'Iperó', '3521002', NULL, NULL);
INSERT INTO public.cities VALUES (4950, 25, 'Ipeúna', '3521101', NULL, NULL);
INSERT INTO public.cities VALUES (4951, 25, 'Ipiguá', '3521150', NULL, NULL);
INSERT INTO public.cities VALUES (4952, 25, 'Iporanga', '3521200', NULL, NULL);
INSERT INTO public.cities VALUES (4953, 25, 'Ipuã', '3521309', NULL, NULL);
INSERT INTO public.cities VALUES (4954, 25, 'Iracemápolis', '3521408', NULL, NULL);
INSERT INTO public.cities VALUES (4955, 25, 'Irapuã', '3521507', NULL, NULL);
INSERT INTO public.cities VALUES (4956, 25, 'Irapuru', '3521606', NULL, NULL);
INSERT INTO public.cities VALUES (4957, 25, 'Itaberá', '3521705', NULL, NULL);
INSERT INTO public.cities VALUES (4958, 25, 'Itaí', '3521804', NULL, NULL);
INSERT INTO public.cities VALUES (4959, 25, 'Itajobi', '3521903', NULL, NULL);
INSERT INTO public.cities VALUES (4960, 25, 'Itaju', '3522000', NULL, NULL);
INSERT INTO public.cities VALUES (4961, 25, 'Itanhaém', '3522109', NULL, NULL);
INSERT INTO public.cities VALUES (4962, 25, 'Itaóca', '3522158', NULL, NULL);
INSERT INTO public.cities VALUES (4963, 25, 'Itapecerica da Serra', '3522208', NULL, NULL);
INSERT INTO public.cities VALUES (4964, 25, 'Itapetininga', '3522307', NULL, NULL);
INSERT INTO public.cities VALUES (4965, 25, 'Itapeva', '3522406', NULL, NULL);
INSERT INTO public.cities VALUES (4966, 25, 'Itapevi', '3522505', NULL, NULL);
INSERT INTO public.cities VALUES (4967, 25, 'Itapira', '3522604', NULL, NULL);
INSERT INTO public.cities VALUES (4968, 25, 'Itapirapuã Paulista', '3522653', NULL, NULL);
INSERT INTO public.cities VALUES (4969, 25, 'Itápolis', '3522703', NULL, NULL);
INSERT INTO public.cities VALUES (4970, 25, 'Itaporanga', '3522802', NULL, NULL);
INSERT INTO public.cities VALUES (4971, 25, 'Itapuí', '3522901', NULL, NULL);
INSERT INTO public.cities VALUES (4972, 25, 'Itapura', '3523008', NULL, NULL);
INSERT INTO public.cities VALUES (4973, 25, 'Itaquaquecetuba', '3523107', NULL, NULL);
INSERT INTO public.cities VALUES (4974, 25, 'Itararé', '3523206', NULL, NULL);
INSERT INTO public.cities VALUES (4975, 25, 'Itariri', '3523305', NULL, NULL);
INSERT INTO public.cities VALUES (4976, 25, 'Itatiba', '3523404', NULL, NULL);
INSERT INTO public.cities VALUES (4977, 25, 'Itatinga', '3523503', NULL, NULL);
INSERT INTO public.cities VALUES (4978, 25, 'Itirapina', '3523602', NULL, NULL);
INSERT INTO public.cities VALUES (4979, 25, 'Itirapuã', '3523701', NULL, NULL);
INSERT INTO public.cities VALUES (4980, 25, 'Itobi', '3523800', NULL, NULL);
INSERT INTO public.cities VALUES (4981, 25, 'Itu', '3523909', NULL, NULL);
INSERT INTO public.cities VALUES (4982, 25, 'Itupeva', '3524006', NULL, NULL);
INSERT INTO public.cities VALUES (4983, 25, 'Ituverava', '3524105', NULL, NULL);
INSERT INTO public.cities VALUES (4984, 25, 'Jaborandi', '3524204', NULL, NULL);
INSERT INTO public.cities VALUES (4985, 25, 'Jaboticabal', '3524303', NULL, NULL);
INSERT INTO public.cities VALUES (4986, 25, 'Jacareí', '3524402', NULL, NULL);
INSERT INTO public.cities VALUES (4987, 25, 'Jaci', '3524501', NULL, NULL);
INSERT INTO public.cities VALUES (4988, 25, 'Jacupiranga', '3524600', NULL, NULL);
INSERT INTO public.cities VALUES (4989, 25, 'Jaguariúna', '3524709', NULL, NULL);
INSERT INTO public.cities VALUES (4990, 25, 'Jales', '3524808', NULL, NULL);
INSERT INTO public.cities VALUES (4991, 25, 'Jambeiro', '3524907', NULL, NULL);
INSERT INTO public.cities VALUES (4992, 25, 'Jandira', '3525003', NULL, NULL);
INSERT INTO public.cities VALUES (4993, 25, 'Jardinópolis', '3525102', NULL, NULL);
INSERT INTO public.cities VALUES (4994, 25, 'Jarinu', '3525201', NULL, NULL);
INSERT INTO public.cities VALUES (4995, 25, 'Jaú', '3525300', NULL, NULL);
INSERT INTO public.cities VALUES (4996, 25, 'Jeriquara', '3525409', NULL, NULL);
INSERT INTO public.cities VALUES (4997, 25, 'Joanópolis', '3525508', NULL, NULL);
INSERT INTO public.cities VALUES (4998, 25, 'João Ramalho', '3525607', NULL, NULL);
INSERT INTO public.cities VALUES (4999, 25, 'José Bonifácio', '3525706', NULL, NULL);
INSERT INTO public.cities VALUES (5000, 25, 'Júlio Mesquita', '3525805', NULL, NULL);
INSERT INTO public.cities VALUES (5001, 25, 'Jumirim', '3525854', NULL, NULL);
INSERT INTO public.cities VALUES (5002, 25, 'Jundiaí', '3525904', NULL, NULL);
INSERT INTO public.cities VALUES (5003, 25, 'Junqueirópolis', '3526001', NULL, NULL);
INSERT INTO public.cities VALUES (5004, 25, 'Juquiá', '3526100', NULL, NULL);
INSERT INTO public.cities VALUES (5005, 25, 'Juquitiba', '3526209', NULL, NULL);
INSERT INTO public.cities VALUES (5006, 25, 'Lagoinha', '3526308', NULL, NULL);
INSERT INTO public.cities VALUES (5007, 25, 'Laranjal Paulista', '3526407', NULL, NULL);
INSERT INTO public.cities VALUES (5008, 25, 'Lavínia', '3526506', NULL, NULL);
INSERT INTO public.cities VALUES (5009, 25, 'Lavrinhas', '3526605', NULL, NULL);
INSERT INTO public.cities VALUES (5010, 25, 'Leme', '3526704', NULL, NULL);
INSERT INTO public.cities VALUES (5011, 25, 'Lençóis Paulista', '3526803', NULL, NULL);
INSERT INTO public.cities VALUES (5012, 25, 'Limeira', '3526902', NULL, NULL);
INSERT INTO public.cities VALUES (5013, 25, 'Lindóia', '3527009', NULL, NULL);
INSERT INTO public.cities VALUES (5014, 25, 'Lins', '3527108', NULL, NULL);
INSERT INTO public.cities VALUES (5015, 25, 'Lorena', '3527207', NULL, NULL);
INSERT INTO public.cities VALUES (5016, 25, 'Lourdes', '3527256', NULL, NULL);
INSERT INTO public.cities VALUES (5017, 25, 'Louveira', '3527306', NULL, NULL);
INSERT INTO public.cities VALUES (5018, 25, 'Lucélia', '3527405', NULL, NULL);
INSERT INTO public.cities VALUES (5019, 25, 'Lucianópolis', '3527504', NULL, NULL);
INSERT INTO public.cities VALUES (5020, 25, 'Luís Antônio', '3527603', NULL, NULL);
INSERT INTO public.cities VALUES (5021, 25, 'Luiziânia', '3527702', NULL, NULL);
INSERT INTO public.cities VALUES (5022, 25, 'Lupércio', '3527801', NULL, NULL);
INSERT INTO public.cities VALUES (5023, 25, 'Lutécia', '3527900', NULL, NULL);
INSERT INTO public.cities VALUES (5024, 25, 'Macatuba', '3528007', NULL, NULL);
INSERT INTO public.cities VALUES (5025, 25, 'Macaubal', '3528106', NULL, NULL);
INSERT INTO public.cities VALUES (5026, 25, 'Macedônia', '3528205', NULL, NULL);
INSERT INTO public.cities VALUES (5027, 25, 'Magda', '3528304', NULL, NULL);
INSERT INTO public.cities VALUES (5028, 25, 'Mairinque', '3528403', NULL, NULL);
INSERT INTO public.cities VALUES (5029, 25, 'Mairiporã', '3528502', NULL, NULL);
INSERT INTO public.cities VALUES (5030, 25, 'Manduri', '3528601', NULL, NULL);
INSERT INTO public.cities VALUES (5031, 25, 'Marabá Paulista', '3528700', NULL, NULL);
INSERT INTO public.cities VALUES (5032, 25, 'Maracaí', '3528809', NULL, NULL);
INSERT INTO public.cities VALUES (5033, 25, 'Marapoama', '3528858', NULL, NULL);
INSERT INTO public.cities VALUES (5034, 25, 'Mariápolis', '3528908', NULL, NULL);
INSERT INTO public.cities VALUES (5035, 25, 'Marília', '3529005', NULL, NULL);
INSERT INTO public.cities VALUES (5036, 25, 'Marinópolis', '3529104', NULL, NULL);
INSERT INTO public.cities VALUES (5037, 25, 'Martinópolis', '3529203', NULL, NULL);
INSERT INTO public.cities VALUES (5038, 25, 'Matão', '3529302', NULL, NULL);
INSERT INTO public.cities VALUES (5039, 25, 'Mauá', '3529401', NULL, NULL);
INSERT INTO public.cities VALUES (5040, 25, 'Mendonça', '3529500', NULL, NULL);
INSERT INTO public.cities VALUES (5041, 25, 'Meridiano', '3529609', NULL, NULL);
INSERT INTO public.cities VALUES (5042, 25, 'Mesópolis', '3529658', NULL, NULL);
INSERT INTO public.cities VALUES (5043, 25, 'Miguelópolis', '3529708', NULL, NULL);
INSERT INTO public.cities VALUES (5044, 25, 'Mineiros do Tietê', '3529807', NULL, NULL);
INSERT INTO public.cities VALUES (5045, 25, 'Mira Estrela', '3530003', NULL, NULL);
INSERT INTO public.cities VALUES (5046, 25, 'Miracatu', '3529906', NULL, NULL);
INSERT INTO public.cities VALUES (5047, 25, 'Mirandópolis', '3530102', NULL, NULL);
INSERT INTO public.cities VALUES (5048, 25, 'Mirante do Paranapanema', '3530201', NULL, NULL);
INSERT INTO public.cities VALUES (5049, 25, 'Mirassol', '3530300', NULL, NULL);
INSERT INTO public.cities VALUES (5050, 25, 'Mirassolândia', '3530409', NULL, NULL);
INSERT INTO public.cities VALUES (5051, 25, 'Mococa', '3530508', NULL, NULL);
INSERT INTO public.cities VALUES (5052, 25, 'Mogi das Cruzes', '3530607', NULL, NULL);
INSERT INTO public.cities VALUES (5053, 25, 'Mogi Guaçu', '3530706', NULL, NULL);
INSERT INTO public.cities VALUES (5054, 25, 'Moji Mirim', '3530805', NULL, NULL);
INSERT INTO public.cities VALUES (5055, 25, 'Mombuca', '3530904', NULL, NULL);
INSERT INTO public.cities VALUES (5056, 25, 'Monções', '3531001', NULL, NULL);
INSERT INTO public.cities VALUES (5057, 25, 'Mongaguá', '3531100', NULL, NULL);
INSERT INTO public.cities VALUES (5058, 25, 'Monte Alegre do Sul', '3531209', NULL, NULL);
INSERT INTO public.cities VALUES (5059, 25, 'Monte Alto', '3531308', NULL, NULL);
INSERT INTO public.cities VALUES (5060, 25, 'Monte Aprazível', '3531407', NULL, NULL);
INSERT INTO public.cities VALUES (5061, 25, 'Monte Azul Paulista', '3531506', NULL, NULL);
INSERT INTO public.cities VALUES (5062, 25, 'Monte Castelo', '3531605', NULL, NULL);
INSERT INTO public.cities VALUES (5063, 25, 'Monte Mor', '3531803', NULL, NULL);
INSERT INTO public.cities VALUES (5064, 25, 'Monteiro Lobato', '3531704', NULL, NULL);
INSERT INTO public.cities VALUES (5065, 25, 'Morro Agudo', '3531902', NULL, NULL);
INSERT INTO public.cities VALUES (5066, 25, 'Morungaba', '3532009', NULL, NULL);
INSERT INTO public.cities VALUES (5067, 25, 'Motuca', '3532058', NULL, NULL);
INSERT INTO public.cities VALUES (5068, 25, 'Murutinga do Sul', '3532108', NULL, NULL);
INSERT INTO public.cities VALUES (5069, 25, 'Nantes', '3532157', NULL, NULL);
INSERT INTO public.cities VALUES (5070, 25, 'Narandiba', '3532207', NULL, NULL);
INSERT INTO public.cities VALUES (5071, 25, 'Natividade da Serra', '3532306', NULL, NULL);
INSERT INTO public.cities VALUES (5072, 25, 'Nazaré Paulista', '3532405', NULL, NULL);
INSERT INTO public.cities VALUES (5073, 25, 'Neves Paulista', '3532504', NULL, NULL);
INSERT INTO public.cities VALUES (5074, 25, 'Nhandeara', '3532603', NULL, NULL);
INSERT INTO public.cities VALUES (5075, 25, 'Nipoã', '3532702', NULL, NULL);
INSERT INTO public.cities VALUES (5076, 25, 'Nova Aliança', '3532801', NULL, NULL);
INSERT INTO public.cities VALUES (5077, 25, 'Nova Campina', '3532827', NULL, NULL);
INSERT INTO public.cities VALUES (5078, 25, 'Nova Canaã Paulista', '3532843', NULL, NULL);
INSERT INTO public.cities VALUES (5079, 25, 'Nova Castilho', '3532868', NULL, NULL);
INSERT INTO public.cities VALUES (5080, 25, 'Nova Europa', '3532900', NULL, NULL);
INSERT INTO public.cities VALUES (5081, 25, 'Nova Granada', '3533007', NULL, NULL);
INSERT INTO public.cities VALUES (5082, 25, 'Nova Guataporanga', '3533106', NULL, NULL);
INSERT INTO public.cities VALUES (5083, 25, 'Nova Independência', '3533205', NULL, NULL);
INSERT INTO public.cities VALUES (5084, 25, 'Nova Luzitânia', '3533304', NULL, NULL);
INSERT INTO public.cities VALUES (5085, 25, 'Nova Odessa', '3533403', NULL, NULL);
INSERT INTO public.cities VALUES (5086, 25, 'Novais', '3533254', NULL, NULL);
INSERT INTO public.cities VALUES (5087, 25, 'Novo Horizonte', '3533502', NULL, NULL);
INSERT INTO public.cities VALUES (5088, 25, 'Nuporanga', '3533601', NULL, NULL);
INSERT INTO public.cities VALUES (5089, 25, 'Ocauçu', '3533700', NULL, NULL);
INSERT INTO public.cities VALUES (5090, 25, 'Óleo', '3533809', NULL, NULL);
INSERT INTO public.cities VALUES (5091, 25, 'Olímpia', '3533908', NULL, NULL);
INSERT INTO public.cities VALUES (5092, 25, 'Onda Verde', '3534005', NULL, NULL);
INSERT INTO public.cities VALUES (5093, 25, 'Oriente', '3534104', NULL, NULL);
INSERT INTO public.cities VALUES (5094, 25, 'Orindiúva', '3534203', NULL, NULL);
INSERT INTO public.cities VALUES (5095, 25, 'Orlândia', '3534302', NULL, NULL);
INSERT INTO public.cities VALUES (5096, 25, 'Osasco', '3534401', NULL, NULL);
INSERT INTO public.cities VALUES (5097, 25, 'Oscar Bressane', '3534500', NULL, NULL);
INSERT INTO public.cities VALUES (5098, 25, 'Osvaldo Cruz', '3534609', NULL, NULL);
INSERT INTO public.cities VALUES (5099, 25, 'Ourinhos', '3534708', NULL, NULL);
INSERT INTO public.cities VALUES (5100, 25, 'Ouro Verde', '3534807', NULL, NULL);
INSERT INTO public.cities VALUES (5101, 25, 'Ouroeste', '3534757', NULL, NULL);
INSERT INTO public.cities VALUES (5102, 25, 'Pacaembu', '3534906', NULL, NULL);
INSERT INTO public.cities VALUES (5103, 25, 'Palestina', '3535002', NULL, NULL);
INSERT INTO public.cities VALUES (5104, 25, 'Palmares Paulista', '3535101', NULL, NULL);
INSERT INTO public.cities VALUES (5105, 25, 'Palmeira d''Oeste', '3535200', NULL, NULL);
INSERT INTO public.cities VALUES (5106, 25, 'Palmital', '3535309', NULL, NULL);
INSERT INTO public.cities VALUES (5107, 25, 'Panorama', '3535408', NULL, NULL);
INSERT INTO public.cities VALUES (5345, 25, 'Vinhedo', '3556701', NULL, NULL);
INSERT INTO public.cities VALUES (5108, 25, 'Paraguaçu Paulista', '3535507', NULL, NULL);
INSERT INTO public.cities VALUES (5109, 25, 'Paraibuna', '3535606', NULL, NULL);
INSERT INTO public.cities VALUES (5110, 25, 'Paraíso', '3535705', NULL, NULL);
INSERT INTO public.cities VALUES (5111, 25, 'Paranapanema', '3535804', NULL, NULL);
INSERT INTO public.cities VALUES (5112, 25, 'Paranapuã', '3535903', NULL, NULL);
INSERT INTO public.cities VALUES (5113, 25, 'Parapuã', '3536000', NULL, NULL);
INSERT INTO public.cities VALUES (5114, 25, 'Pardinho', '3536109', NULL, NULL);
INSERT INTO public.cities VALUES (5115, 25, 'Pariquera-Açu', '3536208', NULL, NULL);
INSERT INTO public.cities VALUES (5116, 25, 'Parisi', '3536257', NULL, NULL);
INSERT INTO public.cities VALUES (5117, 25, 'Patrocínio Paulista', '3536307', NULL, NULL);
INSERT INTO public.cities VALUES (5118, 25, 'Paulicéia', '3536406', NULL, NULL);
INSERT INTO public.cities VALUES (5119, 25, 'Paulínia', '3536505', NULL, NULL);
INSERT INTO public.cities VALUES (5120, 25, 'Paulistânia', '3536570', NULL, NULL);
INSERT INTO public.cities VALUES (5121, 25, 'Paulo de Faria', '3536604', NULL, NULL);
INSERT INTO public.cities VALUES (5122, 25, 'Pederneiras', '3536703', NULL, NULL);
INSERT INTO public.cities VALUES (5123, 25, 'Pedra Bela', '3536802', NULL, NULL);
INSERT INTO public.cities VALUES (5124, 25, 'Pedranópolis', '3536901', NULL, NULL);
INSERT INTO public.cities VALUES (5125, 25, 'Pedregulho', '3537008', NULL, NULL);
INSERT INTO public.cities VALUES (5126, 25, 'Pedreira', '3537107', NULL, NULL);
INSERT INTO public.cities VALUES (5127, 25, 'Pedrinhas Paulista', '3537156', NULL, NULL);
INSERT INTO public.cities VALUES (5128, 25, 'Pedro de Toledo', '3537206', NULL, NULL);
INSERT INTO public.cities VALUES (5129, 25, 'Penápolis', '3537305', NULL, NULL);
INSERT INTO public.cities VALUES (5130, 25, 'Pereira Barreto', '3537404', NULL, NULL);
INSERT INTO public.cities VALUES (5131, 25, 'Pereiras', '3537503', NULL, NULL);
INSERT INTO public.cities VALUES (5132, 25, 'Peruíbe', '3537602', NULL, NULL);
INSERT INTO public.cities VALUES (5133, 25, 'Piacatu', '3537701', NULL, NULL);
INSERT INTO public.cities VALUES (5134, 25, 'Piedade', '3537800', NULL, NULL);
INSERT INTO public.cities VALUES (5135, 25, 'Pilar do Sul', '3537909', NULL, NULL);
INSERT INTO public.cities VALUES (5136, 25, 'Pindamonhangaba', '3538006', NULL, NULL);
INSERT INTO public.cities VALUES (5137, 25, 'Pindorama', '3538105', NULL, NULL);
INSERT INTO public.cities VALUES (5138, 25, 'Pinhalzinho', '3538204', NULL, NULL);
INSERT INTO public.cities VALUES (5139, 25, 'Piquerobi', '3538303', NULL, NULL);
INSERT INTO public.cities VALUES (5140, 25, 'Piquete', '3538501', NULL, NULL);
INSERT INTO public.cities VALUES (5141, 25, 'Piracaia', '3538600', NULL, NULL);
INSERT INTO public.cities VALUES (5142, 25, 'Piracicaba', '3538709', NULL, NULL);
INSERT INTO public.cities VALUES (5143, 25, 'Piraju', '3538808', NULL, NULL);
INSERT INTO public.cities VALUES (5144, 25, 'Pirajuí', '3538907', NULL, NULL);
INSERT INTO public.cities VALUES (5145, 25, 'Pirangi', '3539004', NULL, NULL);
INSERT INTO public.cities VALUES (5146, 25, 'Pirapora do Bom Jesus', '3539103', NULL, NULL);
INSERT INTO public.cities VALUES (5147, 25, 'Pirapozinho', '3539202', NULL, NULL);
INSERT INTO public.cities VALUES (5148, 25, 'Pirassununga', '3539301', NULL, NULL);
INSERT INTO public.cities VALUES (5149, 25, 'Piratininga', '3539400', NULL, NULL);
INSERT INTO public.cities VALUES (5150, 25, 'Pitangueiras', '3539509', NULL, NULL);
INSERT INTO public.cities VALUES (5151, 25, 'Planalto', '3539608', NULL, NULL);
INSERT INTO public.cities VALUES (5152, 25, 'Platina', '3539707', NULL, NULL);
INSERT INTO public.cities VALUES (5153, 25, 'Poá', '3539806', NULL, NULL);
INSERT INTO public.cities VALUES (5154, 25, 'Poloni', '3539905', NULL, NULL);
INSERT INTO public.cities VALUES (5155, 25, 'Pompéia', '3540002', NULL, NULL);
INSERT INTO public.cities VALUES (5156, 25, 'Pongaí', '3540101', NULL, NULL);
INSERT INTO public.cities VALUES (5157, 25, 'Pontal', '3540200', NULL, NULL);
INSERT INTO public.cities VALUES (5158, 25, 'Pontalinda', '3540259', NULL, NULL);
INSERT INTO public.cities VALUES (5159, 25, 'Pontes Gestal', '3540309', NULL, NULL);
INSERT INTO public.cities VALUES (5160, 25, 'Populina', '3540408', NULL, NULL);
INSERT INTO public.cities VALUES (5161, 25, 'Porangaba', '3540507', NULL, NULL);
INSERT INTO public.cities VALUES (5162, 25, 'Porto Feliz', '3540606', NULL, NULL);
INSERT INTO public.cities VALUES (5163, 25, 'Porto Ferreira', '3540705', NULL, NULL);
INSERT INTO public.cities VALUES (5164, 25, 'Potim', '3540754', NULL, NULL);
INSERT INTO public.cities VALUES (5165, 25, 'Potirendaba', '3540804', NULL, NULL);
INSERT INTO public.cities VALUES (5166, 25, 'Pracinha', '3540853', NULL, NULL);
INSERT INTO public.cities VALUES (5167, 25, 'Pradópolis', '3540903', NULL, NULL);
INSERT INTO public.cities VALUES (5168, 25, 'Praia Grande', '3541000', NULL, NULL);
INSERT INTO public.cities VALUES (5169, 25, 'Pratânia', '3541059', NULL, NULL);
INSERT INTO public.cities VALUES (5170, 25, 'Presidente Alves', '3541109', NULL, NULL);
INSERT INTO public.cities VALUES (5171, 25, 'Presidente Bernardes', '3541208', NULL, NULL);
INSERT INTO public.cities VALUES (5172, 25, 'Presidente Epitácio', '3541307', NULL, NULL);
INSERT INTO public.cities VALUES (5173, 25, 'Presidente Prudente', '3541406', NULL, NULL);
INSERT INTO public.cities VALUES (5174, 25, 'Presidente Venceslau', '3541505', NULL, NULL);
INSERT INTO public.cities VALUES (5175, 25, 'Promissão', '3541604', NULL, NULL);
INSERT INTO public.cities VALUES (5176, 25, 'Quadra', '3541653', NULL, NULL);
INSERT INTO public.cities VALUES (5177, 25, 'Quatá', '3541703', NULL, NULL);
INSERT INTO public.cities VALUES (5178, 25, 'Queiroz', '3541802', NULL, NULL);
INSERT INTO public.cities VALUES (5179, 25, 'Queluz', '3541901', NULL, NULL);
INSERT INTO public.cities VALUES (5180, 25, 'Quintana', '3542008', NULL, NULL);
INSERT INTO public.cities VALUES (5181, 25, 'Rafard', '3542107', NULL, NULL);
INSERT INTO public.cities VALUES (5182, 25, 'Rancharia', '3542206', NULL, NULL);
INSERT INTO public.cities VALUES (5183, 25, 'Redenção da Serra', '3542305', NULL, NULL);
INSERT INTO public.cities VALUES (5184, 25, 'Regente Feijó', '3542404', NULL, NULL);
INSERT INTO public.cities VALUES (5185, 25, 'Reginópolis', '3542503', NULL, NULL);
INSERT INTO public.cities VALUES (5186, 25, 'Registro', '3542602', NULL, NULL);
INSERT INTO public.cities VALUES (5187, 25, 'Restinga', '3542701', NULL, NULL);
INSERT INTO public.cities VALUES (5188, 25, 'Ribeira', '3542800', NULL, NULL);
INSERT INTO public.cities VALUES (5189, 25, 'Ribeirão Bonito', '3542909', NULL, NULL);
INSERT INTO public.cities VALUES (5190, 25, 'Ribeirão Branco', '3543006', NULL, NULL);
INSERT INTO public.cities VALUES (5191, 25, 'Ribeirão Corrente', '3543105', NULL, NULL);
INSERT INTO public.cities VALUES (5192, 25, 'Ribeirão do Sul', '3543204', NULL, NULL);
INSERT INTO public.cities VALUES (5193, 25, 'Ribeirão dos Índios', '3543238', NULL, NULL);
INSERT INTO public.cities VALUES (5194, 25, 'Ribeirão Grande', '3543253', NULL, NULL);
INSERT INTO public.cities VALUES (5195, 25, 'Ribeirão Pires', '3543303', NULL, NULL);
INSERT INTO public.cities VALUES (5196, 25, 'Ribeirão Preto', '3543402', NULL, NULL);
INSERT INTO public.cities VALUES (5197, 25, 'Rifaina', '3543600', NULL, NULL);
INSERT INTO public.cities VALUES (5198, 25, 'Rincão', '3543709', NULL, NULL);
INSERT INTO public.cities VALUES (5199, 25, 'Rinópolis', '3543808', NULL, NULL);
INSERT INTO public.cities VALUES (5200, 25, 'Rio Claro', '3543907', NULL, NULL);
INSERT INTO public.cities VALUES (5201, 25, 'Rio das Pedras', '3544004', NULL, NULL);
INSERT INTO public.cities VALUES (5202, 25, 'Rio Grande da Serra', '3544103', NULL, NULL);
INSERT INTO public.cities VALUES (5203, 25, 'Riolândia', '3544202', NULL, NULL);
INSERT INTO public.cities VALUES (5204, 25, 'Riversul', '3543501', NULL, NULL);
INSERT INTO public.cities VALUES (5205, 25, 'Rosana', '3544251', NULL, NULL);
INSERT INTO public.cities VALUES (5206, 25, 'Roseira', '3544301', NULL, NULL);
INSERT INTO public.cities VALUES (5207, 25, 'Rubiácea', '3544400', NULL, NULL);
INSERT INTO public.cities VALUES (5208, 25, 'Rubinéia', '3544509', NULL, NULL);
INSERT INTO public.cities VALUES (5209, 25, 'Sabino', '3544608', NULL, NULL);
INSERT INTO public.cities VALUES (5210, 25, 'Sagres', '3544707', NULL, NULL);
INSERT INTO public.cities VALUES (5211, 25, 'Sales', '3544806', NULL, NULL);
INSERT INTO public.cities VALUES (5212, 25, 'Sales Oliveira', '3544905', NULL, NULL);
INSERT INTO public.cities VALUES (5213, 25, 'Salesópolis', '3545001', NULL, NULL);
INSERT INTO public.cities VALUES (5214, 25, 'Salmourão', '3545100', NULL, NULL);
INSERT INTO public.cities VALUES (5215, 25, 'Saltinho', '3545159', NULL, NULL);
INSERT INTO public.cities VALUES (5216, 25, 'Salto', '3545209', NULL, NULL);
INSERT INTO public.cities VALUES (5217, 25, 'Salto de Pirapora', '3545308', NULL, NULL);
INSERT INTO public.cities VALUES (5218, 25, 'Salto Grande', '3545407', NULL, NULL);
INSERT INTO public.cities VALUES (5219, 25, 'Sandovalina', '3545506', NULL, NULL);
INSERT INTO public.cities VALUES (5220, 25, 'Santa Adélia', '3545605', NULL, NULL);
INSERT INTO public.cities VALUES (5221, 25, 'Santa Albertina', '3545704', NULL, NULL);
INSERT INTO public.cities VALUES (5222, 25, 'Santa Bárbara d''Oeste', '3545803', NULL, NULL);
INSERT INTO public.cities VALUES (5223, 25, 'Santa Branca', '3546009', NULL, NULL);
INSERT INTO public.cities VALUES (5224, 25, 'Santa Clara d''Oeste', '3546108', NULL, NULL);
INSERT INTO public.cities VALUES (5225, 25, 'Santa Cruz da Conceição', '3546207', NULL, NULL);
INSERT INTO public.cities VALUES (5226, 25, 'Santa Cruz da Esperança', '3546256', NULL, NULL);
INSERT INTO public.cities VALUES (5227, 25, 'Santa Cruz das Palmeiras', '3546306', NULL, NULL);
INSERT INTO public.cities VALUES (5228, 25, 'Santa Cruz do Rio Pardo', '3546405', NULL, NULL);
INSERT INTO public.cities VALUES (5229, 25, 'Santa Ernestina', '3546504', NULL, NULL);
INSERT INTO public.cities VALUES (5230, 25, 'Santa Fé do Sul', '3546603', NULL, NULL);
INSERT INTO public.cities VALUES (5231, 25, 'Santa Gertrudes', '3546702', NULL, NULL);
INSERT INTO public.cities VALUES (5232, 25, 'Santa Isabel', '3546801', NULL, NULL);
INSERT INTO public.cities VALUES (5233, 25, 'Santa Lúcia', '3546900', NULL, NULL);
INSERT INTO public.cities VALUES (5234, 25, 'Santa Maria da Serra', '3547007', NULL, NULL);
INSERT INTO public.cities VALUES (5235, 25, 'Santa Mercedes', '3547106', NULL, NULL);
INSERT INTO public.cities VALUES (5236, 25, 'Santa Rita do Passa Quatro', '3547502', NULL, NULL);
INSERT INTO public.cities VALUES (5237, 25, 'Santa Rita d''Oeste', '3547403', NULL, NULL);
INSERT INTO public.cities VALUES (5238, 25, 'Santa Rosa de Viterbo', '3547601', NULL, NULL);
INSERT INTO public.cities VALUES (5239, 25, 'Santa Salete', '3547650', NULL, NULL);
INSERT INTO public.cities VALUES (5240, 25, 'Santana da Ponte Pensa', '3547205', NULL, NULL);
INSERT INTO public.cities VALUES (5241, 25, 'Santana de Parnaíba', '3547304', NULL, NULL);
INSERT INTO public.cities VALUES (5242, 25, 'Santo Anastácio', '3547700', NULL, NULL);
INSERT INTO public.cities VALUES (5243, 25, 'Santo André', '3547809', NULL, NULL);
INSERT INTO public.cities VALUES (5244, 25, 'Santo Antônio da Alegria', '3547908', NULL, NULL);
INSERT INTO public.cities VALUES (5245, 25, 'Santo Antônio de Posse', '3548005', NULL, NULL);
INSERT INTO public.cities VALUES (5246, 25, 'Santo Antônio do Aracanguá', '3548054', NULL, NULL);
INSERT INTO public.cities VALUES (5247, 25, 'Santo Antônio do Jardim', '3548104', NULL, NULL);
INSERT INTO public.cities VALUES (5248, 25, 'Santo Antônio do Pinhal', '3548203', NULL, NULL);
INSERT INTO public.cities VALUES (5249, 25, 'Santo Expedito', '3548302', NULL, NULL);
INSERT INTO public.cities VALUES (5250, 25, 'Santópolis do Aguapeí', '3548401', NULL, NULL);
INSERT INTO public.cities VALUES (5251, 25, 'Santos', '3548500', NULL, NULL);
INSERT INTO public.cities VALUES (5252, 25, 'São Bento do Sapucaí', '3548609', NULL, NULL);
INSERT INTO public.cities VALUES (5253, 25, 'São Bernardo do Campo', '3548708', NULL, NULL);
INSERT INTO public.cities VALUES (5254, 25, 'São Caetano do Sul', '3548807', NULL, NULL);
INSERT INTO public.cities VALUES (5255, 25, 'São Carlos', '3548906', NULL, NULL);
INSERT INTO public.cities VALUES (5256, 25, 'São Francisco', '3549003', NULL, NULL);
INSERT INTO public.cities VALUES (5257, 25, 'São João da Boa Vista', '3549102', NULL, NULL);
INSERT INTO public.cities VALUES (5258, 25, 'São João das Duas Pontes', '3549201', NULL, NULL);
INSERT INTO public.cities VALUES (5259, 25, 'São João de Iracema', '3549250', NULL, NULL);
INSERT INTO public.cities VALUES (5260, 25, 'São João do Pau d''Alho', '3549300', NULL, NULL);
INSERT INTO public.cities VALUES (5261, 25, 'São Joaquim da Barra', '3549409', NULL, NULL);
INSERT INTO public.cities VALUES (5262, 25, 'São José da Bela Vista', '3549508', NULL, NULL);
INSERT INTO public.cities VALUES (5263, 25, 'São José do Barreiro', '3549607', NULL, NULL);
INSERT INTO public.cities VALUES (5264, 25, 'São José do Rio Pardo', '3549706', NULL, NULL);
INSERT INTO public.cities VALUES (5265, 25, 'São José do Rio Preto', '3549805', NULL, NULL);
INSERT INTO public.cities VALUES (5266, 25, 'São José dos Campos', '3549904', NULL, NULL);
INSERT INTO public.cities VALUES (5267, 25, 'São Lourenço da Serra', '3549953', NULL, NULL);
INSERT INTO public.cities VALUES (5268, 25, 'São Luís do Paraitinga', '3550001', NULL, NULL);
INSERT INTO public.cities VALUES (5269, 25, 'São Manuel', '3550100', NULL, NULL);
INSERT INTO public.cities VALUES (5270, 25, 'São Miguel Arcanjo', '3550209', NULL, NULL);
INSERT INTO public.cities VALUES (5271, 25, 'São Paulo', '3550308', NULL, NULL);
INSERT INTO public.cities VALUES (5272, 25, 'São Pedro', '3550407', NULL, NULL);
INSERT INTO public.cities VALUES (5273, 25, 'São Pedro do Turvo', '3550506', NULL, NULL);
INSERT INTO public.cities VALUES (5274, 25, 'São Roque', '3550605', NULL, NULL);
INSERT INTO public.cities VALUES (5275, 25, 'São Sebastião', '3550704', NULL, NULL);
INSERT INTO public.cities VALUES (5276, 25, 'São Sebastião da Grama', '3550803', NULL, NULL);
INSERT INTO public.cities VALUES (5277, 25, 'São Simão', '3550902', NULL, NULL);
INSERT INTO public.cities VALUES (5278, 25, 'São Vicente', '3551009', NULL, NULL);
INSERT INTO public.cities VALUES (5279, 25, 'Sarapuí', '3551108', NULL, NULL);
INSERT INTO public.cities VALUES (5280, 25, 'Sarutaiá', '3551207', NULL, NULL);
INSERT INTO public.cities VALUES (5281, 25, 'Sebastianópolis do Sul', '3551306', NULL, NULL);
INSERT INTO public.cities VALUES (5282, 25, 'Serra Azul', '3551405', NULL, NULL);
INSERT INTO public.cities VALUES (5283, 25, 'Serra Negra', '3551603', NULL, NULL);
INSERT INTO public.cities VALUES (5284, 25, 'Serrana', '3551504', NULL, NULL);
INSERT INTO public.cities VALUES (5285, 25, 'Sertãozinho', '3551702', NULL, NULL);
INSERT INTO public.cities VALUES (5286, 25, 'Sete Barras', '3551801', NULL, NULL);
INSERT INTO public.cities VALUES (5287, 25, 'Severínia', '3551900', NULL, NULL);
INSERT INTO public.cities VALUES (5288, 25, 'Silveiras', '3552007', NULL, NULL);
INSERT INTO public.cities VALUES (5289, 25, 'Socorro', '3552106', NULL, NULL);
INSERT INTO public.cities VALUES (5290, 25, 'Sorocaba', '3552205', NULL, NULL);
INSERT INTO public.cities VALUES (5291, 25, 'Sud Mennucci', '3552304', NULL, NULL);
INSERT INTO public.cities VALUES (5292, 25, 'Sumaré', '3552403', NULL, NULL);
INSERT INTO public.cities VALUES (5293, 25, 'Suzanápolis', '3552551', NULL, NULL);
INSERT INTO public.cities VALUES (5294, 25, 'Suzano', '3552502', NULL, NULL);
INSERT INTO public.cities VALUES (5295, 25, 'Tabapuã', '3552601', NULL, NULL);
INSERT INTO public.cities VALUES (5296, 25, 'Tabatinga', '3552700', NULL, NULL);
INSERT INTO public.cities VALUES (5297, 25, 'Taboão da Serra', '3552809', NULL, NULL);
INSERT INTO public.cities VALUES (5298, 25, 'Taciba', '3552908', NULL, NULL);
INSERT INTO public.cities VALUES (5299, 25, 'Taguaí', '3553005', NULL, NULL);
INSERT INTO public.cities VALUES (5300, 25, 'Taiaçu', '3553104', NULL, NULL);
INSERT INTO public.cities VALUES (5301, 25, 'Taiúva', '3553203', NULL, NULL);
INSERT INTO public.cities VALUES (5302, 25, 'Tambaú', '3553302', NULL, NULL);
INSERT INTO public.cities VALUES (5303, 25, 'Tanabi', '3553401', NULL, NULL);
INSERT INTO public.cities VALUES (5304, 25, 'Tapiraí', '3553500', NULL, NULL);
INSERT INTO public.cities VALUES (5305, 25, 'Tapiratiba', '3553609', NULL, NULL);
INSERT INTO public.cities VALUES (5306, 25, 'Taquaral', '3553658', NULL, NULL);
INSERT INTO public.cities VALUES (5307, 25, 'Taquaritinga', '3553708', NULL, NULL);
INSERT INTO public.cities VALUES (5308, 25, 'Taquarituba', '3553807', NULL, NULL);
INSERT INTO public.cities VALUES (5309, 25, 'Taquarivaí', '3553856', NULL, NULL);
INSERT INTO public.cities VALUES (5310, 25, 'Tarabai', '3553906', NULL, NULL);
INSERT INTO public.cities VALUES (5311, 25, 'Tarumã', '3553955', NULL, NULL);
INSERT INTO public.cities VALUES (5312, 25, 'Tatuí', '3554003', NULL, NULL);
INSERT INTO public.cities VALUES (5313, 25, 'Taubaté', '3554102', NULL, NULL);
INSERT INTO public.cities VALUES (5314, 25, 'Tejupá', '3554201', NULL, NULL);
INSERT INTO public.cities VALUES (5315, 25, 'Teodoro Sampaio', '3554300', NULL, NULL);
INSERT INTO public.cities VALUES (5316, 25, 'Terra Roxa', '3554409', NULL, NULL);
INSERT INTO public.cities VALUES (5317, 25, 'Tietê', '3554508', NULL, NULL);
INSERT INTO public.cities VALUES (5318, 25, 'Timburi', '3554607', NULL, NULL);
INSERT INTO public.cities VALUES (5319, 25, 'Torre de Pedra', '3554656', NULL, NULL);
INSERT INTO public.cities VALUES (5320, 25, 'Torrinha', '3554706', NULL, NULL);
INSERT INTO public.cities VALUES (5321, 25, 'Trabiju', '3554755', NULL, NULL);
INSERT INTO public.cities VALUES (5322, 25, 'Tremembé', '3554805', NULL, NULL);
INSERT INTO public.cities VALUES (5323, 25, 'Três Fronteiras', '3554904', NULL, NULL);
INSERT INTO public.cities VALUES (5324, 25, 'Tuiuti', '3554953', NULL, NULL);
INSERT INTO public.cities VALUES (5325, 25, 'Tupã', '3555000', NULL, NULL);
INSERT INTO public.cities VALUES (5326, 25, 'Tupi Paulista', '3555109', NULL, NULL);
INSERT INTO public.cities VALUES (5327, 25, 'Turiúba', '3555208', NULL, NULL);
INSERT INTO public.cities VALUES (5328, 25, 'Turmalina', '3555307', NULL, NULL);
INSERT INTO public.cities VALUES (5329, 25, 'Ubarana', '3555356', NULL, NULL);
INSERT INTO public.cities VALUES (5330, 25, 'Ubatuba', '3555406', NULL, NULL);
INSERT INTO public.cities VALUES (5331, 25, 'Ubirajara', '3555505', NULL, NULL);
INSERT INTO public.cities VALUES (5332, 25, 'Uchoa', '3555604', NULL, NULL);
INSERT INTO public.cities VALUES (5333, 25, 'União Paulista', '3555703', NULL, NULL);
INSERT INTO public.cities VALUES (5334, 25, 'Urânia', '3555802', NULL, NULL);
INSERT INTO public.cities VALUES (5335, 25, 'Uru', '3555901', NULL, NULL);
INSERT INTO public.cities VALUES (5336, 25, 'Urupês', '3556008', NULL, NULL);
INSERT INTO public.cities VALUES (5337, 25, 'Valentim Gentil', '3556107', NULL, NULL);
INSERT INTO public.cities VALUES (5338, 25, 'Valinhos', '3556206', NULL, NULL);
INSERT INTO public.cities VALUES (5339, 25, 'Valparaíso', '3556305', NULL, NULL);
INSERT INTO public.cities VALUES (5340, 25, 'Vargem', '3556354', NULL, NULL);
INSERT INTO public.cities VALUES (5341, 25, 'Vargem Grande do Sul', '3556404', NULL, NULL);
INSERT INTO public.cities VALUES (5342, 25, 'Vargem Grande Paulista', '3556453', NULL, NULL);
INSERT INTO public.cities VALUES (5343, 25, 'Várzea Paulista', '3556503', NULL, NULL);
INSERT INTO public.cities VALUES (5344, 25, 'Vera Cruz', '3556602', NULL, NULL);
INSERT INTO public.cities VALUES (5346, 25, 'Viradouro', '3556800', NULL, NULL);
INSERT INTO public.cities VALUES (5347, 25, 'Vista Alegre do Alto', '3556909', NULL, NULL);
INSERT INTO public.cities VALUES (5348, 25, 'Vitória Brasil', '3556958', NULL, NULL);
INSERT INTO public.cities VALUES (5349, 25, 'Votorantim', '3557006', NULL, NULL);
INSERT INTO public.cities VALUES (5350, 25, 'Votuporanga', '3557105', NULL, NULL);
INSERT INTO public.cities VALUES (5351, 25, 'Zacarias', '3557154', NULL, NULL);
INSERT INTO public.cities VALUES (5352, 26, 'Amparo de São Francisco', '2800100', NULL, NULL);
INSERT INTO public.cities VALUES (5353, 26, 'Aquidabã', '2800209', NULL, NULL);
INSERT INTO public.cities VALUES (5354, 26, 'Aracaju', '2800308', NULL, NULL);
INSERT INTO public.cities VALUES (5355, 26, 'Arauá', '2800407', NULL, NULL);
INSERT INTO public.cities VALUES (5356, 26, 'Areia Branca', '2800506', NULL, NULL);
INSERT INTO public.cities VALUES (5357, 26, 'Barra dos Coqueiros', '2800605', NULL, NULL);
INSERT INTO public.cities VALUES (5358, 26, 'Boquim', '2800670', NULL, NULL);
INSERT INTO public.cities VALUES (5359, 26, 'Brejo Grande', '2800704', NULL, NULL);
INSERT INTO public.cities VALUES (5360, 26, 'Campo do Brito', '2801009', NULL, NULL);
INSERT INTO public.cities VALUES (5361, 26, 'Canhoba', '2801108', NULL, NULL);
INSERT INTO public.cities VALUES (5362, 26, 'Canindé de São Francisco', '2801207', NULL, NULL);
INSERT INTO public.cities VALUES (5363, 26, 'Capela', '2801306', NULL, NULL);
INSERT INTO public.cities VALUES (5364, 26, 'Carira', '2801405', NULL, NULL);
INSERT INTO public.cities VALUES (5365, 26, 'Carmópolis', '2801504', NULL, NULL);
INSERT INTO public.cities VALUES (5366, 26, 'Cedro de São João', '2801603', NULL, NULL);
INSERT INTO public.cities VALUES (5367, 26, 'Cristinápolis', '2801702', NULL, NULL);
INSERT INTO public.cities VALUES (5368, 26, 'Cumbe', '2801900', NULL, NULL);
INSERT INTO public.cities VALUES (5369, 26, 'Divina Pastora', '2802007', NULL, NULL);
INSERT INTO public.cities VALUES (5370, 26, 'Estância', '2802106', NULL, NULL);
INSERT INTO public.cities VALUES (5371, 26, 'Feira Nova', '2802205', NULL, NULL);
INSERT INTO public.cities VALUES (5372, 26, 'Frei Paulo', '2802304', NULL, NULL);
INSERT INTO public.cities VALUES (5373, 26, 'Gararu', '2802403', NULL, NULL);
INSERT INTO public.cities VALUES (5374, 26, 'General Maynard', '2802502', NULL, NULL);
INSERT INTO public.cities VALUES (5375, 26, 'Gracho Cardoso', '2802601', NULL, NULL);
INSERT INTO public.cities VALUES (5376, 26, 'Ilha das Flores', '2802700', NULL, NULL);
INSERT INTO public.cities VALUES (5377, 26, 'Indiaroba', '2802809', NULL, NULL);
INSERT INTO public.cities VALUES (5378, 26, 'Itabaiana', '2802908', NULL, NULL);
INSERT INTO public.cities VALUES (5379, 26, 'Itabaianinha', '2803005', NULL, NULL);
INSERT INTO public.cities VALUES (5380, 26, 'Itabi', '2803104', NULL, NULL);
INSERT INTO public.cities VALUES (5381, 26, 'Itaporanga d''Ajuda', '2803203', NULL, NULL);
INSERT INTO public.cities VALUES (5382, 26, 'Japaratuba', '2803302', NULL, NULL);
INSERT INTO public.cities VALUES (5383, 26, 'Japoatã', '2803401', NULL, NULL);
INSERT INTO public.cities VALUES (5384, 26, 'Lagarto', '2803500', NULL, NULL);
INSERT INTO public.cities VALUES (5385, 26, 'Laranjeiras', '2803609', NULL, NULL);
INSERT INTO public.cities VALUES (5386, 26, 'Macambira', '2803708', NULL, NULL);
INSERT INTO public.cities VALUES (5387, 26, 'Malhada dos Bois', '2803807', NULL, NULL);
INSERT INTO public.cities VALUES (5388, 26, 'Malhador', '2803906', NULL, NULL);
INSERT INTO public.cities VALUES (5389, 26, 'Maruim', '2804003', NULL, NULL);
INSERT INTO public.cities VALUES (5390, 26, 'Moita Bonita', '2804102', NULL, NULL);
INSERT INTO public.cities VALUES (5391, 26, 'Monte Alegre de Sergipe', '2804201', NULL, NULL);
INSERT INTO public.cities VALUES (5392, 26, 'Muribeca', '2804300', NULL, NULL);
INSERT INTO public.cities VALUES (5393, 26, 'Neópolis', '2804409', NULL, NULL);
INSERT INTO public.cities VALUES (5394, 26, 'Nossa Senhora Aparecida', '2804458', NULL, NULL);
INSERT INTO public.cities VALUES (5395, 26, 'Nossa Senhora da Glória', '2804508', NULL, NULL);
INSERT INTO public.cities VALUES (5396, 26, 'Nossa Senhora das Dores', '2804607', NULL, NULL);
INSERT INTO public.cities VALUES (5397, 26, 'Nossa Senhora de Lourdes', '2804706', NULL, NULL);
INSERT INTO public.cities VALUES (5398, 26, 'Nossa Senhora do Socorro', '2804805', NULL, NULL);
INSERT INTO public.cities VALUES (5399, 26, 'Pacatuba', '2804904', NULL, NULL);
INSERT INTO public.cities VALUES (5400, 26, 'Pedra Mole', '2805000', NULL, NULL);
INSERT INTO public.cities VALUES (5401, 26, 'Pedrinhas', '2805109', NULL, NULL);
INSERT INTO public.cities VALUES (5402, 26, 'Pinhão', '2805208', NULL, NULL);
INSERT INTO public.cities VALUES (5403, 26, 'Pirambu', '2805307', NULL, NULL);
INSERT INTO public.cities VALUES (5404, 26, 'Poço Redondo', '2805406', NULL, NULL);
INSERT INTO public.cities VALUES (5405, 26, 'Poço Verde', '2805505', NULL, NULL);
INSERT INTO public.cities VALUES (5406, 26, 'Porto da Folha', '2805604', NULL, NULL);
INSERT INTO public.cities VALUES (5407, 26, 'Propriá', '2805703', NULL, NULL);
INSERT INTO public.cities VALUES (5408, 26, 'Riachão do Dantas', '2805802', NULL, NULL);
INSERT INTO public.cities VALUES (5409, 26, 'Riachuelo', '2805901', NULL, NULL);
INSERT INTO public.cities VALUES (5410, 26, 'Ribeirópolis', '2806008', NULL, NULL);
INSERT INTO public.cities VALUES (5411, 26, 'Rosário do Catete', '2806107', NULL, NULL);
INSERT INTO public.cities VALUES (5412, 26, 'Salgado', '2806206', NULL, NULL);
INSERT INTO public.cities VALUES (5413, 26, 'Santa Luzia do Itanhy', '2806305', NULL, NULL);
INSERT INTO public.cities VALUES (5414, 26, 'Santa Rosa de Lima', '2806503', NULL, NULL);
INSERT INTO public.cities VALUES (5415, 26, 'Santana do São Francisco', '2806404', NULL, NULL);
INSERT INTO public.cities VALUES (5416, 26, 'Santo Amaro das Brotas', '2806602', NULL, NULL);
INSERT INTO public.cities VALUES (5417, 26, 'São Cristóvão', '2806701', NULL, NULL);
INSERT INTO public.cities VALUES (5418, 26, 'São Domingos', '2806800', NULL, NULL);
INSERT INTO public.cities VALUES (5419, 26, 'São Francisco', '2806909', NULL, NULL);
INSERT INTO public.cities VALUES (5420, 26, 'São Miguel do Aleixo', '2807006', NULL, NULL);
INSERT INTO public.cities VALUES (5421, 26, 'Simão Dias', '2807105', NULL, NULL);
INSERT INTO public.cities VALUES (5422, 26, 'Siriri', '2807204', NULL, NULL);
INSERT INTO public.cities VALUES (5423, 26, 'Telha', '2807303', NULL, NULL);
INSERT INTO public.cities VALUES (5424, 26, 'Tobias Barreto', '2807402', NULL, NULL);
INSERT INTO public.cities VALUES (5425, 26, 'Tomar do Geru', '2807501', NULL, NULL);
INSERT INTO public.cities VALUES (5426, 26, 'Umbaúba', '2807600', NULL, NULL);
INSERT INTO public.cities VALUES (5427, 27, 'Abreulândia', '1700251', NULL, NULL);
INSERT INTO public.cities VALUES (5428, 27, 'Aguiarnópolis', '1700301', NULL, NULL);
INSERT INTO public.cities VALUES (5429, 27, 'Aliança do Tocantins', '1700350', NULL, NULL);
INSERT INTO public.cities VALUES (5430, 27, 'Almas', '1700400', NULL, NULL);
INSERT INTO public.cities VALUES (5431, 27, 'Alvorada', '1700707', NULL, NULL);
INSERT INTO public.cities VALUES (5432, 27, 'Ananás', '1701002', NULL, NULL);
INSERT INTO public.cities VALUES (5433, 27, 'Angico', '1701051', NULL, NULL);
INSERT INTO public.cities VALUES (5434, 27, 'Aparecida do Rio Negro', '1701101', NULL, NULL);
INSERT INTO public.cities VALUES (5435, 27, 'Aragominas', '1701309', NULL, NULL);
INSERT INTO public.cities VALUES (5436, 27, 'Araguacema', '1701903', NULL, NULL);
INSERT INTO public.cities VALUES (5437, 27, 'Araguaçu', '1702000', NULL, NULL);
INSERT INTO public.cities VALUES (5438, 27, 'Araguaína', '1702109', NULL, NULL);
INSERT INTO public.cities VALUES (5439, 27, 'Araguanã', '1702158', NULL, NULL);
INSERT INTO public.cities VALUES (5440, 27, 'Araguatins', '1702208', NULL, NULL);
INSERT INTO public.cities VALUES (5441, 27, 'Arapoema', '1702307', NULL, NULL);
INSERT INTO public.cities VALUES (5442, 27, 'Arraias', '1702406', NULL, NULL);
INSERT INTO public.cities VALUES (5443, 27, 'Augustinópolis', '1702554', NULL, NULL);
INSERT INTO public.cities VALUES (5444, 27, 'Aurora do Tocantins', '1702703', NULL, NULL);
INSERT INTO public.cities VALUES (5445, 27, 'Axixá do Tocantins', '1702901', NULL, NULL);
INSERT INTO public.cities VALUES (5446, 27, 'Babaçulândia', '1703008', NULL, NULL);
INSERT INTO public.cities VALUES (5447, 27, 'Bandeirantes do Tocantins', '1703057', NULL, NULL);
INSERT INTO public.cities VALUES (5448, 27, 'Barra do Ouro', '1703073', NULL, NULL);
INSERT INTO public.cities VALUES (5449, 27, 'Barrolândia', '1703107', NULL, NULL);
INSERT INTO public.cities VALUES (5450, 27, 'Bernardo Sayão', '1703206', NULL, NULL);
INSERT INTO public.cities VALUES (5451, 27, 'Bom Jesus do Tocantins', '1703305', NULL, NULL);
INSERT INTO public.cities VALUES (5452, 27, 'Brasilândia do Tocantins', '1703602', NULL, NULL);
INSERT INTO public.cities VALUES (5453, 27, 'Brejinho de Nazaré', '1703701', NULL, NULL);
INSERT INTO public.cities VALUES (5454, 27, 'Buriti do Tocantins', '1703800', NULL, NULL);
INSERT INTO public.cities VALUES (5455, 27, 'Cachoeirinha', '1703826', NULL, NULL);
INSERT INTO public.cities VALUES (5456, 27, 'Campos Lindos', '1703842', NULL, NULL);
INSERT INTO public.cities VALUES (5457, 27, 'Cariri do Tocantins', '1703867', NULL, NULL);
INSERT INTO public.cities VALUES (5458, 27, 'Carmolândia', '1703883', NULL, NULL);
INSERT INTO public.cities VALUES (5459, 27, 'Carrasco Bonito', '1703891', NULL, NULL);
INSERT INTO public.cities VALUES (5460, 27, 'Caseara', '1703909', NULL, NULL);
INSERT INTO public.cities VALUES (5461, 27, 'Centenário', '1704105', NULL, NULL);
INSERT INTO public.cities VALUES (5462, 27, 'Chapada da Natividade', '1705102', NULL, NULL);
INSERT INTO public.cities VALUES (5463, 27, 'Chapada de Areia', '1704600', NULL, NULL);
INSERT INTO public.cities VALUES (5464, 27, 'Colinas do Tocantins', '1705508', NULL, NULL);
INSERT INTO public.cities VALUES (5465, 27, 'Colméia', '1716703', NULL, NULL);
INSERT INTO public.cities VALUES (5466, 27, 'Combinado', '1705557', NULL, NULL);
INSERT INTO public.cities VALUES (5467, 27, 'Conceição do Tocantins', '1705607', NULL, NULL);
INSERT INTO public.cities VALUES (5468, 27, 'Couto Magalhães', '1706001', NULL, NULL);
INSERT INTO public.cities VALUES (5469, 27, 'Cristalândia', '1706100', NULL, NULL);
INSERT INTO public.cities VALUES (5470, 27, 'Crixás do Tocantins', '1706258', NULL, NULL);
INSERT INTO public.cities VALUES (5471, 27, 'Darcinópolis', '1706506', NULL, NULL);
INSERT INTO public.cities VALUES (5472, 27, 'Dianópolis', '1707009', NULL, NULL);
INSERT INTO public.cities VALUES (5473, 27, 'Divinópolis do Tocantins', '1707108', NULL, NULL);
INSERT INTO public.cities VALUES (5474, 27, 'Dois Irmãos do Tocantins', '1707207', NULL, NULL);
INSERT INTO public.cities VALUES (5475, 27, 'Dueré', '1707306', NULL, NULL);
INSERT INTO public.cities VALUES (5476, 27, 'Esperantina', '1707405', NULL, NULL);
INSERT INTO public.cities VALUES (5477, 27, 'Fátima', '1707553', NULL, NULL);
INSERT INTO public.cities VALUES (5478, 27, 'Figueirópolis', '1707652', NULL, NULL);
INSERT INTO public.cities VALUES (5479, 27, 'Filadélfia', '1707702', NULL, NULL);
INSERT INTO public.cities VALUES (5480, 27, 'Formoso do Araguaia', '1708205', NULL, NULL);
INSERT INTO public.cities VALUES (5481, 27, 'Fortaleza do Tabocão', '1708254', NULL, NULL);
INSERT INTO public.cities VALUES (5482, 27, 'Goianorte', '1708304', NULL, NULL);
INSERT INTO public.cities VALUES (5483, 27, 'Goiatins', '1709005', NULL, NULL);
INSERT INTO public.cities VALUES (5484, 27, 'Guaraí', '1709302', NULL, NULL);
INSERT INTO public.cities VALUES (5485, 27, 'Gurupi', '1709500', NULL, NULL);
INSERT INTO public.cities VALUES (5486, 27, 'Ipueiras', '1709807', NULL, NULL);
INSERT INTO public.cities VALUES (5487, 27, 'Itacajá', '1710508', NULL, NULL);
INSERT INTO public.cities VALUES (5488, 27, 'Itaguatins', '1710706', NULL, NULL);
INSERT INTO public.cities VALUES (5489, 27, 'Itapiratins', '1710904', NULL, NULL);
INSERT INTO public.cities VALUES (5490, 27, 'Itaporã do Tocantins', '1711100', NULL, NULL);
INSERT INTO public.cities VALUES (5491, 27, 'Jaú do Tocantins', '1711506', NULL, NULL);
INSERT INTO public.cities VALUES (5492, 27, 'Juarina', '1711803', NULL, NULL);
INSERT INTO public.cities VALUES (5493, 27, 'Lagoa da Confusão', '1711902', NULL, NULL);
INSERT INTO public.cities VALUES (5494, 27, 'Lagoa do Tocantins', '1711951', NULL, NULL);
INSERT INTO public.cities VALUES (5495, 27, 'Lajeado', '1712009', NULL, NULL);
INSERT INTO public.cities VALUES (5496, 27, 'Lavandeira', '1712157', NULL, NULL);
INSERT INTO public.cities VALUES (5497, 27, 'Lizarda', '1712405', NULL, NULL);
INSERT INTO public.cities VALUES (5498, 27, 'Luzinópolis', '1712454', NULL, NULL);
INSERT INTO public.cities VALUES (5499, 27, 'Marianópolis do Tocantins', '1712504', NULL, NULL);
INSERT INTO public.cities VALUES (5500, 27, 'Mateiros', '1712702', NULL, NULL);
INSERT INTO public.cities VALUES (5501, 27, 'Maurilândia do Tocantins', '1712801', NULL, NULL);
INSERT INTO public.cities VALUES (5502, 27, 'Miracema do Tocantins', '1713205', NULL, NULL);
INSERT INTO public.cities VALUES (5503, 27, 'Miranorte', '1713304', NULL, NULL);
INSERT INTO public.cities VALUES (5504, 27, 'Monte do Carmo', '1713601', NULL, NULL);
INSERT INTO public.cities VALUES (5505, 27, 'Monte Santo do Tocantins', '1713700', NULL, NULL);
INSERT INTO public.cities VALUES (5506, 27, 'Muricilândia', '1713957', NULL, NULL);
INSERT INTO public.cities VALUES (5507, 27, 'Natividade', '1714203', NULL, NULL);
INSERT INTO public.cities VALUES (5508, 27, 'Nazaré', '1714302', NULL, NULL);
INSERT INTO public.cities VALUES (5509, 27, 'Nova Olinda', '1714880', NULL, NULL);
INSERT INTO public.cities VALUES (5510, 27, 'Nova Rosalândia', '1715002', NULL, NULL);
INSERT INTO public.cities VALUES (5511, 27, 'Novo Acordo', '1715101', NULL, NULL);
INSERT INTO public.cities VALUES (5512, 27, 'Novo Alegre', '1715150', NULL, NULL);
INSERT INTO public.cities VALUES (5513, 27, 'Novo Jardim', '1715259', NULL, NULL);
INSERT INTO public.cities VALUES (5514, 27, 'Oliveira de Fátima', '1715507', NULL, NULL);
INSERT INTO public.cities VALUES (5515, 27, 'Palmas', '1721000', NULL, NULL);
INSERT INTO public.cities VALUES (5516, 27, 'Palmeirante', '1715705', NULL, NULL);
INSERT INTO public.cities VALUES (5517, 27, 'Palmeiras do Tocantins', '1713809', NULL, NULL);
INSERT INTO public.cities VALUES (5518, 27, 'Palmeirópolis', '1715754', NULL, NULL);
INSERT INTO public.cities VALUES (5519, 27, 'Paraíso do Tocantins', '1716109', NULL, NULL);
INSERT INTO public.cities VALUES (5520, 27, 'Paranã', '1716208', NULL, NULL);
INSERT INTO public.cities VALUES (5521, 27, 'Pau D''Arco', '1716307', NULL, NULL);
INSERT INTO public.cities VALUES (5522, 27, 'Pedro Afonso', '1716505', NULL, NULL);
INSERT INTO public.cities VALUES (5523, 27, 'Peixe', '1716604', NULL, NULL);
INSERT INTO public.cities VALUES (5524, 27, 'Pequizeiro', '1716653', NULL, NULL);
INSERT INTO public.cities VALUES (5525, 27, 'Pindorama do Tocantins', '1717008', NULL, NULL);
INSERT INTO public.cities VALUES (5526, 27, 'Piraquê', '1717206', NULL, NULL);
INSERT INTO public.cities VALUES (5527, 27, 'Pium', '1717503', NULL, NULL);
INSERT INTO public.cities VALUES (5528, 27, 'Ponte Alta do Bom Jesus', '1717800', NULL, NULL);
INSERT INTO public.cities VALUES (5529, 27, 'Ponte Alta do Tocantins', '1717909', NULL, NULL);
INSERT INTO public.cities VALUES (5530, 27, 'Porto Alegre do Tocantins', '1718006', NULL, NULL);
INSERT INTO public.cities VALUES (5531, 27, 'Porto Nacional', '1718204', NULL, NULL);
INSERT INTO public.cities VALUES (5532, 27, 'Praia Norte', '1718303', NULL, NULL);
INSERT INTO public.cities VALUES (5533, 27, 'Presidente Kennedy', '1718402', NULL, NULL);
INSERT INTO public.cities VALUES (5534, 27, 'Pugmil', '1718451', NULL, NULL);
INSERT INTO public.cities VALUES (5535, 27, 'Recursolândia', '1718501', NULL, NULL);
INSERT INTO public.cities VALUES (5536, 27, 'Riachinho', '1718550', NULL, NULL);
INSERT INTO public.cities VALUES (5537, 27, 'Rio da Conceição', '1718659', NULL, NULL);
INSERT INTO public.cities VALUES (5538, 27, 'Rio dos Bois', '1718709', NULL, NULL);
INSERT INTO public.cities VALUES (5539, 27, 'Rio Sono', '1718758', NULL, NULL);
INSERT INTO public.cities VALUES (5540, 27, 'Sampaio', '1718808', NULL, NULL);
INSERT INTO public.cities VALUES (5541, 27, 'Sandolândia', '1718840', NULL, NULL);
INSERT INTO public.cities VALUES (5542, 27, 'Santa Fé do Araguaia', '1718865', NULL, NULL);
INSERT INTO public.cities VALUES (5543, 27, 'Santa Maria do Tocantins', '1718881', NULL, NULL);
INSERT INTO public.cities VALUES (5544, 27, 'Santa Rita do Tocantins', '1718899', NULL, NULL);
INSERT INTO public.cities VALUES (5545, 27, 'Santa Rosa do Tocantins', '1718907', NULL, NULL);
INSERT INTO public.cities VALUES (5546, 27, 'Santa Tereza do Tocantins', '1719004', NULL, NULL);
INSERT INTO public.cities VALUES (5547, 27, 'Santa Terezinha do Tocantins', '1720002', NULL, NULL);
INSERT INTO public.cities VALUES (5548, 27, 'São Bento do Tocantins', '1720101', NULL, NULL);
INSERT INTO public.cities VALUES (5549, 27, 'São Félix do Tocantins', '1720150', NULL, NULL);
INSERT INTO public.cities VALUES (5550, 27, 'São Miguel do Tocantins', '1720200', NULL, NULL);
INSERT INTO public.cities VALUES (5551, 27, 'São Salvador do Tocantins', '1720259', NULL, NULL);
INSERT INTO public.cities VALUES (5552, 27, 'São Sebastião do Tocantins', '1720309', NULL, NULL);
INSERT INTO public.cities VALUES (5553, 27, 'São Valério', '1720499', NULL, NULL);
INSERT INTO public.cities VALUES (5554, 27, 'Silvanópolis', '1720655', NULL, NULL);
INSERT INTO public.cities VALUES (5555, 27, 'Sítio Novo do Tocantins', '1720804', NULL, NULL);
INSERT INTO public.cities VALUES (5556, 27, 'Sucupira', '1720853', NULL, NULL);
INSERT INTO public.cities VALUES (5557, 27, 'Taguatinga', '1720903', NULL, NULL);
INSERT INTO public.cities VALUES (5558, 27, 'Taipas do Tocantins', '1720937', NULL, NULL);
INSERT INTO public.cities VALUES (5559, 27, 'Talismã', '1720978', NULL, NULL);
INSERT INTO public.cities VALUES (5560, 27, 'Tocantínia', '1721109', NULL, NULL);
INSERT INTO public.cities VALUES (5561, 27, 'Tocantinópolis', '1721208', NULL, NULL);
INSERT INTO public.cities VALUES (5562, 27, 'Tupirama', '1721257', NULL, NULL);
INSERT INTO public.cities VALUES (5563, 27, 'Tupiratins', '1721307', NULL, NULL);
INSERT INTO public.cities VALUES (5564, 27, 'Wanderlândia', '1722081', NULL, NULL);
INSERT INTO public.cities VALUES (5565, 27, 'Xambioá', '1722107', NULL, NULL);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.addresses VALUES (2, 1, 'App\Models\User', 1, '85803690', 'Rua Rodrigues Alves', '1634', 'Parque São Paulo', false, NULL, NULL, NULL, true, NULL, NULL, NULL, NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Adriano Boldarini', 'ruiz@7cliques.com.br', '45999110509', NULL, '$2y$12$28FXbH5BIZA8TXlKxkHkFeZl7zT2s8kTg87fvlHTigjFBRirCaX46', true, true, 'https://media.licdn.com/dms/image/v2/D4D03AQFQTIh0FmPebw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673705998921?e=2147483647&v=beta&t=Tm8gjYgyLYsaWaMozUaosoAc1OSrDWJD9_W8csZi0qc', NULL, '2025-03-30 14:51:44', '2025-03-30 14:51:44', NULL);
INSERT INTO public.users VALUES (17, 'Sheila Cristina lamim', '47999158083', '47999158083', NULL, '$2y$12$VRjDiO0EZ4yMJoTLeLtRI.H292AhsqkhYqXBg9cDttfIMCIEh6za.', false, true, NULL, NULL, '2025-04-16 13:00:48', '2025-04-16 13:00:48', NULL);
INSERT INTO public.users VALUES (18, 'Andreia Cristina Pimenta', '47992010232', '47992010232', NULL, '$2y$12$FxQdi6QVZfIu0mtghTiH4ugHzYmnHjibAj2NdLujlE/C8zUyb4RJW', false, true, NULL, NULL, '2025-04-23 13:03:23', '2025-04-23 13:03:23', NULL);
INSERT INTO public.users VALUES (19, 'Paulo Roberto Voss', 'paulo@admin.com.br', '47999999999', NULL, '$2y$12$F7ZvkOIjy9cFJk.Q7hz0eOokzW462LnNDSmYN//v1fk9AKfa/VHaa', true, true, NULL, NULL, '2025-05-07 11:25:26', '2025-05-07 14:27:57', NULL);
INSERT INTO public.users VALUES (3, 'Amanda Lube', 'amanda@gmail.com', '360-725-8155', NULL, '$2y$12$03zFT.yrUMCpvzFA17DY.O.di6C.iBX5DEtN3SsOd6E/Tie.Y0teO', false, true, NULL, NULL, '2025-03-30 14:51:45', '2025-03-30 14:51:45', '2025-04-12 19:45:01');
INSERT INTO public.users VALUES (6, 'Ashlee Quigley', 'carole59@example.net', '+1-484-294-8626', NULL, '$2y$12$qR.NbcpPYNsib/Q9inO/KOSe/ijam7uVthirL4rZZgKGs/TfUv5ia', false, true, NULL, NULL, '2025-03-30 14:51:45', '2025-03-30 14:51:45', NULL);
INSERT INTO public.users VALUES (7, 'Jolie Langosh', 'mack73@example.org', '1-262-764-0123', NULL, '$2y$12$bqCAycipGhbBqYm3MINB3uFRXpyrVAJGwu7M6q4a6z4/sx.FTtUoq', false, false, NULL, NULL, '2025-03-30 14:51:46', '2025-03-30 14:51:46', NULL);
INSERT INTO public.users VALUES (8, 'Claire Jenkins', 'trey56@example.org', '1-385-870-5684', NULL, '$2y$12$dBDeUsBd1zwIQ.77Ps5Iw.UmDlqnmXi7GilVMNkD.XS4bBbpJEQCe', false, true, NULL, NULL, '2025-03-30 14:51:46', '2025-03-30 14:51:46', NULL);
INSERT INTO public.users VALUES (9, 'Lelah Brown IV', 'dnicolas@example.com', '854.924.8623', NULL, '$2y$12$l0m7vo4EWTbSO8XokuIA/OT0z4Dv6WfWdEm1IttZ96lk.G2fWjvmC', false, false, NULL, NULL, '2025-03-30 14:51:46', '2025-03-30 14:51:46', NULL);
INSERT INTO public.users VALUES (10, 'Delfina King', 'saige.king@example.org', '680-638-0214', NULL, '$2y$12$rnp0EQZbb2hfJiqkwPGQ5u7ZdVUChhweLwrU.m4F5x7mKnbZ1m4/q', false, false, NULL, NULL, '2025-03-30 14:51:46', '2025-03-30 14:51:46', NULL);
INSERT INTO public.users VALUES (11, 'Sammy Mayert', 'lew24@example.com', '+1-563-607-8455', NULL, '$2y$12$rOLjWlFiE3toLSXRiLrXH.V53vPEd9G2DPXEcqFyjF5lg/FtPQeg6', false, true, NULL, NULL, '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL);
INSERT INTO public.users VALUES (12, 'Elvera Homenick', 'pstrosin@example.org', '+1.714.676.0422', NULL, '$2y$12$StfhO2pyLxAHGgddsy5olefiBdIdTAYzAoNzU1bh57Rpc2tlBb8lq', false, true, NULL, NULL, '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL);
INSERT INTO public.users VALUES (13, 'Ms. Roslyn Koepp III', 'fpurdy@example.net', '+1-458-309-6963', NULL, '$2y$12$CBDJ1lY3jMHwaGsmwBQtQ.PZeCce0YGmH/xYHGzjdzEK/S6uEP3G6', false, true, NULL, NULL, '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL);
INSERT INTO public.users VALUES (15, 'Grace Fritsch Freitas', '51993386505', '51993386505', NULL, '$2y$12$Bttk9t4KXFQ5aes33hgl2.mxa.3/joXEGO8Le1snb9NpR/fgmc/pu', false, true, NULL, NULL, '2025-03-31 13:39:45', '2025-03-31 13:39:45', NULL);
INSERT INTO public.users VALUES (16, 'Heloisi Mayara Domingos dos Santos', '47988846717', '47988846717', NULL, '$2y$12$gKAD9UsqwSMGq8iDLVR3juBTRo6dXT/RP0wFuGvYDN1RFCHJada5q', false, true, NULL, NULL, '2025-04-03 18:21:50', '2025-04-03 18:21:50', NULL);
INSERT INTO public.users VALUES (20, 'Augusto Gabriel da Silva de Melo nery', '554797294650', '554797294650', NULL, '$2y$12$q2yIUF2D/fpQAkesNhGdH.ae6TBk9zY87eAYL9e1Zdch8dN8RojVu', false, true, NULL, NULL, '2025-05-12 13:10:42', '2025-05-12 13:10:42', NULL);
INSERT INTO public.users VALUES (29, 'Larrissa Mota', '47992237813@paulovoss.com.br', '47992237813', NULL, '$2y$12$Wl.RulJ6omEkkouS6H..WuOiAOb/v3rxU7AXrS1S/nQCIMsaTjyt6', false, true, NULL, NULL, '2025-05-17 13:32:24', '2025-05-17 13:32:24', NULL);
INSERT INTO public.users VALUES (5, 'Mozelle Senger Sr.', 'bmraz@example.org', '323-731-7974', NULL, '$2y$12$yeKqZMArYRXBmyos2wIBLeXbW5nYtBhkTZ4sU.adZoFq06EBF/1AC', false, false, NULL, NULL, '2025-03-30 14:51:45', '2025-03-30 14:51:45', NULL);
INSERT INTO public.users VALUES (14, 'Adriano Boldarini', '4599910509', '4599910509', NULL, '$2y$12$8h/cFm2f0sBCJiLpXiVef.WUJf47VqyQehNRUOJydEim4Yv0mycdW', false, true, 'https://media.licdn.com/dms/image/v2/D4D03AQFQTIh0FmPebw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673705998921?e=2147483647&v=beta&t=Tm8gjYgyLYsaWaMozUaosoAc1OSrDWJD9_W8csZi0qc', NULL, '2025-03-30 15:00:54', '2025-03-30 15:00:54', NULL);
INSERT INTO public.users VALUES (30, 'Duda', '47996304206@paulovoss.com.br', '47996304206', NULL, '$2y$12$WvgJoox8GyCZuDpfRo0QFuRiQJb1BsInQrmaBLRF84mZFni0IUwVy', false, true, NULL, NULL, '2025-05-17 13:33:24', '2025-05-17 13:33:24', NULL);
INSERT INTO public.users VALUES (4, 'Tad Blanda', 'ubogan@example.com', '678.519.5856', NULL, '$2y$12$36knotw9siHtaT22ppmsN.TSgC0uGR9dTcbidn29QjRnnQaT/Js7e', false, false, NULL, NULL, '2025-03-30 14:51:45', '2025-05-16 11:30:29', NULL);
INSERT INTO public.users VALUES (21, 'Maria', 'maria@msns.com', '879878979', NULL, '$2y$12$/A5bdEpI7KkIhdpO4VkgbemYbu5eaDyJetrOMcmS6aZhdpvaCFfSW', false, true, NULL, NULL, '2025-05-17 12:24:34', '2025-05-17 12:24:34', NULL);
INSERT INTO public.users VALUES (22, 'Marta', 'marta@msn.com', '797982232', NULL, '$2y$12$obbIykYqPhY1YTNbspK3FOx7lPCBdXUC0FzeKlNUfwYBhry9qkVyC', false, true, NULL, NULL, '2025-05-17 12:32:38', '2025-05-17 12:32:38', NULL);
INSERT INTO public.users VALUES (24, 'MArta 2', 'asda@msnrta.com', '435345345', NULL, '$2y$12$B8VMokOQzgrm2JbO5GLes.Tp/5H.IIt1Pl7fKEw0lwmS/k5WQUpzC', false, true, NULL, NULL, '2025-05-17 13:00:32', '2025-05-17 13:00:32', NULL);
INSERT INTO public.users VALUES (25, 'teste', 'teste2@9494.com', '34234234234', NULL, '$2y$12$YPrKPND25dwXMJxI.fUM7uRKdVZzWle57GHMxLWKlq/Wq3V5c7.hK', false, true, NULL, NULL, '2025-05-17 13:10:06', '2025-05-17 13:10:06', NULL);
INSERT INTO public.users VALUES (26, 'teste3', 'teste3@teste3.com', '83729873298', NULL, '$2y$12$d3BjR/TTF8qfFGmMesA04ugZsOu.gA/pdn0CX53ZEUXCv43LhEvbG', false, true, NULL, NULL, '2025-05-17 13:14:20', '2025-05-17 13:14:20', NULL);
INSERT INTO public.users VALUES (27, 'teste user', 'teste@a.com', '46984000000', NULL, '$2y$12$Tft5oDC0kLJUm.YyIu5pMeaucI0vtbc5WzO.R4ClVxn3Nk9Y6fJNO', false, true, NULL, NULL, '2025-05-17 13:28:04', '2025-05-17 13:28:04', NULL);
INSERT INTO public.users VALUES (28, 'teste user 2', 'teste@teste2.com', '46984010101', NULL, '$2y$12$4EeQhA8uOz0WyfloPUSEwe6NT5b59VskL/HUcXSyRfJgdQ5WQS8sy', false, true, NULL, NULL, '2025-05-17 13:29:09', '2025-05-17 13:29:09', NULL);
INSERT INTO public.users VALUES (31, 'Alice', '47984986125@paulovoss.com.br', '47984986125', NULL, '$2y$12$Vx81coI1bkny.OjHEkV4LuFVEBsKw1H7kBC9Lqof/E0Yzj0KYaksq', false, true, NULL, NULL, '2025-05-17 13:34:28', '2025-05-17 13:34:28', NULL);
INSERT INTO public.users VALUES (32, 'Paulo Roberto Voss', '47991999286@paulovoss.com.br', '47991999286', NULL, '$2y$12$UxVY8LB8KQEpz7M3yj1.jeJzjxvubfUYtw2EhB1.vzQgthA9QUgEq', false, true, NULL, NULL, '2025-05-17 13:36:02', '2025-05-17 13:36:02', NULL);
INSERT INTO public.users VALUES (33, 'Teste 19', 'teste@msn.com', '97897987983', NULL, '$2y$12$7v5XBTlm0oGYQTh1XlMZVuSpqcctgm2FqFPClgyq5W72t8MIcMs8S', false, true, NULL, NULL, '2025-05-19 10:17:42', '2025-05-19 10:17:42', NULL);
INSERT INTO public.users VALUES (34, 'Natasha Taraciuk Friedmann', '5511995967089', '5511995967089', NULL, '$2y$12$1c6k/LNrIqatngANsIzYHutOJO9h1n/xA2LW4c7NUY38h7ndFArT.', false, true, NULL, NULL, '2025-05-19 21:49:12', '2025-05-19 21:49:12', NULL);
INSERT INTO public.users VALUES (23, 'Romulo', 'romulo@teste.com', '80980980980', NULL, '$2y$12$3qpFZKmiYDxuh/Wek9A4WuI2duL7cefUILal4MpoLTel1sdJJOmk.', false, true, NULL, NULL, '2025-05-17 12:37:21', '2025-05-21 17:13:38', NULL);
INSERT INTO public.users VALUES (35, 'Katiane Alves Xavier', '47991722561', '47991722561', NULL, '$2y$12$RCDANeSMV3mDVb/tzIAy6.UEdZrbsLyyjjOZaQZvSwHRUxp8Yz.aK', false, true, NULL, NULL, '2025-05-30 11:51:35', '2025-05-30 11:51:35', NULL);
INSERT INTO public.users VALUES (36, 'Alexandro Dossi', '47996421996', '47996421996', NULL, '$2y$12$cRTlkGfVdoM/R3.Z3w22zOyJyu0BVxDCAnuPWyQF15V3oIK1yxyHS', false, true, NULL, NULL, '2025-06-17 15:50:19', '2025-06-17 15:50:19', NULL);
INSERT INTO public.users VALUES (2, 'Dra. Karin Boldarini', 'karin@drakarin.com.br', '47991259577', NULL, '$2y$12$7cxWWLICjhv7I4vVUoWK7uCgBbq62NiUg7vvwnYsW9Cldv/VRN5H6', true, true, 'https://drakarin.com.br/images/karin-psiq.png', NULL, '2025-03-30 14:51:45', '2025-06-19 13:23:42', NULL);


--
-- Data for Name: ai_configs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ai_configs VALUES (3, 19, 'salao_beleza', '{"atendimentos":"cortes, colora\u00e7\u00e3o, tratamentos capilares, manicure, pedicure, design de sobrancelhas, maquiagem","endereco":"Av. Brasil, 1500, Centro - Blumenau, SC","especialidade":"Cabelos cortes e mechas","formacao":"Profissionais formados pela Academia L''Or\u00e9al e Wella","formasPagamento":"cart\u00e3o de cr\u00e9dito (em at\u00e9 10x), cart\u00e3o de d\u00e9bito, PIX, dinheiro","nome":"Paulo Vozz","reembolso":"N\u00e3o atendemos por conv\u00eanios, mas oferecemos recibo para reembolso caso o plano permita"}', 'Bia', '💇‍♀️,💅,✨,🎨,⏰,💖', '{"receita":null,"sintomas":null,"desconto":null,"problemas":null,"ajuda":null,"pagamento":null}', 60, '{"urgencia":false,"falarComDra":false}', false, '2025-05-07 14:29:14', '2025-06-05 14:19:35', '# Seu nome é **Bia – Secretária Virtual do Studio Paulo Voss Cabelos – Cortes e Mechas**

**Objetivo:** Atender, informar e encaminhar solicitações de clientes de forma rápida, cordial, profissional e inteligente, usando IA para entender intenções e agilizar agendamentos.

---

## 1. Boas‑vindas e Personalização

1. **Sempre** chame `getUserName` na primeira mensagem para obter o nome (se houver).
2. Cumprimente **uma única vez** por conversa:

   ```
   Oi, [Nome]! 😊 Como posso ajudar hoje no Studio Paulo Voss?
   ```
3. Armazene internamente que já foi feita a saudação para **não repetir** “oi” ou “boas‑vindas” durante a mesma conversa.

---

## 2. Dados Essenciais do Salão

* **Nome:** Studio Paulo Voss
* **Endereço:** Rua Pedro Voos, 17 – Rio Branco, Brusque‑SC – CEP 88.350‑760
* **Horário de Funcionamento:**
    * **Dias:** Terças, Quintas, Sextas e Sábados.
    * **Horários:**
        * Terças, Quintas e Sextas: 7h às 20h
        * Sábados: 5h às 17h
    * **Fechado:** Segundas, Quartas e Domingos.
* **Formas de Pagamento:** Dinheiro, PIX, Cartão de Crédito ou Débito (detalhes de parcelamento a verificar no financeiro).
* **Wi-Fi:** Studio Paulo Voss (disponível para clientes).

---

## 3. Serviços & Preços


**(Importante: Não informar a duração estimada dos procedimentos, especialmente cabelo, devido à variabilidade.)**

**Cabelo (Paulo Roberto Voss)**

* **Corte:** R$ 60 (dinheiro) | R$ 65 (PIX/cartão)
* **Corte + Hidratação (promoção):** R$ 78 (dinheiro) | R$ 85 (PIX/cartão)
* **Lavar + Hidratar + Escovar:** R$ 60 (dinheiro) | R$ 65 (PIX/cartão)
* **Escova avulsa:** R$ 40 (dinheiro) | R$ 45 (PIX/cartão)
* **Alinhamento de fios (liso natural 4–6 meses):** R$ 300 (dinheiro) | R$ 330 (PIX/cartão)
* **Penteado:** (Incluir na lista e direcionar para agendamento)
* **Coloração/Pintar/Colorir/Fazer a Raiz:** (Incluir na lista e direcionar para agendamento)
* **Promoção "Mechas das Amigas" (2 clientes):**
    * Mechas + 2 hidratações + cauterização + finalização
    * R$ 275 cada (dinheiro) | R$ 285 cada (PIX/cartão)
* **Mechas Tradicionais:**
    * Mechas + tonalização + 1 hidratação + escova
    * R$ 310 (dinheiro) | R$ 330 (PIX/cartão)
* **Mechas Combo – Cuidado Completo:**
    * Mechas + tonalização + 2 hidratações + corte + cauterização + escova
    * Bônus: kit shampoo 250 ml + máscara 200 g
    * R$ 410 (dinheiro) | R$ 430 (PIX/cartão)

**Manicure (Larissa Mota)**

* Manicure: R$ 30,00
* Pedicure: R$ 35,00
* Blindagem: R$ 70,00
* Spa dos pés: R$ 70,00
* Esmaltação em gel: R$ 80,00
* Alongamento fibra: R$ 180,00
* Alongamento solfit: R$ 160,00
* Alongamento Tips: R$ 180,00
* Esmaltação em gel com blindagem: R$ 120,00
* Spa dos pés com esmaltação em gel: R$ 120,00

**Tratamentos Faciais e Depilação (Alice)**

* Limpeza de pele: R$ 120,00
* Microagulhamento facial: R$ 180,00 (sessão)
* Depilação:
    * Virilha completa: R$ 50,00
    * Perna inteira: R$ 60,00
    * Meia perna: R$ 35,00
    * Buço: R$ 15,00
    * Axila: R$ 25,00
    * Peito: R$ 50,00
    * Costas: R$ 50,00

**Sobrancelhas e Outros (Duda)**

* Sobrancelha: (Aguardando informações de preços)
* Dermaplaning: R$ 100,00 (Alice também faz, mas Duda é a referência para este serviço no bot)
* Lash Lifting: (Aguardando informações de preços)
* Brow Lamination: (Aguardando informações de preços)


---

## 4. Equipe & Contatos


**4.1. Início e Reconhecimento (GPT-Powered)**

1.  **Obter Nome:** Use a function `getUserName` para personalizar a conversa
2.  **Saudação:** Cumprimente calorosamente usando o nome obtido
3.  **Interpretação (GPT):** Analise a mensagem do cliente e identifique a intenção e tipo de serviço

**4.2. Direcionamento por Intenção**

* **Se a Intenção for Informações (Preços, Horários, Endereço, Promoções):**
    * Responda diretamente com as informações relevantes das seções 1 e 2.

* **Se a Intenção for Agendamento/Serviço:**

    * **Manicure (Larissa):**
        * **IMPORTANTE:** Use a function `shareManicureContact` para enviar o contato da Larissa automaticamente.
        * Após usar a function, confirme: "Para serviços de Manicure e Pedicure, o agendamento é feito diretamente com a Larissa. Acabei de enviar o contato dela para você! 💅"

    * **Sobrancelhas, Lash Lifting, Brow Lamination, Dermaplaning (Duda):**
        * **IMPORTANTE:** Use a function `shareSobrancelhasContact` para enviar o contato da Duda automaticamente.
        * Após usar a function, confirme: "Para Sobrancelhas, Lash Lifting, Brow Lamination ou Dermaplaning, o agendamento é direto com a Duda. Acabei de enviar o contato dela para você! ✨"

    * **Depilação ou Limpeza de Pele (Alice):**
        * **IMPORTANTE:** Use a function `shareDepilacaoContact` para enviar o contato da Alice automaticamente.
        * Após usar a function, confirme: "Para Depilação ou Limpeza de Pele, você pode agendar diretamente com a Alice. Acabei de enviar o contato dela para você! 😊"

    * **Cabelo (Paulo):**
        * **Reconhecer Palavras-Chave:** *corte, mechas, hidratação, escova, alinhamento, penteado, coloração, pintar, colorir cabelo todo, fazer a raiz, garantia.*
        * **Para penteados:** "Que ótimo! 💇‍♀️ Penteado para festa é uma especialidade nossa! Vamos te retonar nesse número para agendar. É para você mesmo?"
        * **Para cortes:** "Perfeito! ✂️ Vamos cuidar do seu cabelo com muito carinho! Nossa equipe vai entrar em contato nesse número para agendar. É para você mesmo?"
        * **Para mechas/coloração:** "Que legal! 🎨 Adoramos transformar cabelos aqui no Studio! Vamos te retonar nesse número para conversar sobre as opções e agendar. É para você?"
        * **Para outros serviços de cabelo:** "Que bom que quer cuidar do cabelo conosco! 💇‍♀️ Nossa equipe vai entrar em contato nesse número para agendar seu horário. É para você mesmo?"
        * **SEMPRE confirmar:** "O agendamento é para você mesmo?" ou "É para você?"
        * **NÃO** marcar data/hora. Apenas coletar confirmação e encaminhar internamente.

**4.3. Outras Solicitações**

* **Cursos/Certificações Paulo:** "Você gostaria de saber mais sobre algum curso ou certificação específica do Paulo Voss? Me diga qual para que eu possa verificar." (Encaminhar para Paulo).
* **Problemas/Descontos:** "Entendo. Vou registrar sua solicitação/dúvida e encaminhar para nossa equipe, que entrará em contato o mais breve possível. Se for sobre descontos, temos algumas promoções ativas, como a ''Mechas das Amigas''. Você gostaria de saber mais?"

**4.4. Finalização**

* Sempre termine a interação perguntando: "Posso te ajudar com mais alguma coisa?"
* Se não, despeça-se cordialmente: "Qualquer outra dúvida, é só chamar! Tenha um ótimo dia! 😊"

---

## 5. Fluxo de Atendimento

### 5.1 Reconhecimento de Intenção

Use GPT para classificar cada mensagem de acordo com as categorias abaixo:

* **Informações gerais** (preços, horários, endereço, promoções)
* **Agendamento Manicure/Pedicure**
* **Agendamento Sobrancelhas/Lash/Dermaplaning**
* **Agendamento Depilação/Limpeza de pele**
* **Serviços de Cabelo** (corte, penteado, mechas, coloração, hidratação, escova, alinhamento)
* **Outros** (cursos, dúvidas, problemas, descontos, etc.)

### 5.2 Respostas por Intenção

| Intenção                               | Ação / Function                      | Texto‑base (personalize com \[Nome])                                                                                                     |
| -------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Informações gerais**                 | —                                    | Responder diretamente usando dados das seções 1 e 2.                                                                                     |
| **Manicure/Pedicure**                  | `shareManicureContact` (uma vez)     | `Enviei o contato da Larissa para você. 💅`                                                                                              |
| **Sobrancelhas / Lash / Dermaplaning** | `shareSobrancelhasContact` (uma vez) | `Enviei o contato da Duda para você. ✨`                                                                                                  |
| **Depilação / Limpeza de pele**        | `shareDepilacaoContact` (uma vez)    | `Enviei o contato da Alice para você. 😊`                                                                                                |
| **Serviços de cabelo**                 | —                                    | `Perfeito, [Nome]! Vamos retonar para este número para combinar o horário, tudo bem?` (ou variante específica para penteado, mechas, etc.) |
| **Outros**                             | —                                    | Responda ou informe que irá encaminhar a solicitação.                                                                                    |

> **Importante:** Só dispare cada function de contato **uma vez** por conversa.

### 5.3 Encerramento

1. **Pergunte no máximo uma vez:**

   ```
   Posso ajudar em mais alguma coisa?
   ```
2. Se o cliente responder negativamente (*"não", "é só isso", "obrigado(a)"*):

   ```
   Obrigada, [Nome]! Qualquer coisa, estou por aqui. 😊
   ```

   * **Não** faça novas perguntas após esta resposta.

---

## 6. Estilo & Tom

* Amigável, positivo, leve e profissional.
* Uso moderado de emojis (💇‍♀️✨😉😊💅).
* Não mencionar “bot”, “GPT”, “functions” ou instruções internas.
* Nunca informar duração de procedimentos.
* Nunca compartilhar o número do Paulo, exceto se o cliente solicitar explicitamente.

---

## 7. Functions & Regras Técnicas

* `getUserName`: **sempre** na primeira interação.
* `shareManicureContact`: somente para Manicure/Pedicure/Larissa.
* `shareSobrancelhasContact`: somente para Sobrancelhas/Duda/Lash/Brow/Dermaplaning.
* `shareDepilacaoContact`: somente para Depilação/Limpeza de pele/Alice.

**Jamais** usar essas functions para serviços de cabelo ou em saudações.

---

## 8. Controle de Estado (Recomendado)

* **greeted**: `false` → `true` após a saudação inicial.
* **contactShared:{manicure, sobrancelhas, depilacao}**: marque como `true` quando já tiver enviado o contato, para evitar duplicidade.
* **conversationClosed**: `true` depois de enviar a mensagem de encerramento (“Obrigada, \[Nome]!”).

Usar essas flags internamente para evitar repetições.
');
INSERT INTO public.ai_configs VALUES (4, 23, 'clinica_odontologica', '{"atendimentos":"ortodontia, cl\u00ednica geral, implantes, pr\u00f3teses, clareamento, tratamento de canal","endereco":"Rua das Palmeiras, 500, Jardim Blumenau - Blumenau, SC","especialidade":"Ortodontia","formacao":"Universidade Federal de Santa Catarina, com especializa\u00e7\u00e3o em Ortodontia","formasPagamento":"cart\u00e3o de cr\u00e9dito (em at\u00e9 12x), cart\u00e3o de d\u00e9bito, PIX, boleto","nome":"Dr. Ricardo Santos","reembolso":"Aceita reembolso de planos de sa\u00fade"}', 'Clara', '🦷,😁,📅,💬,✨,💳', '{"receita":"Para retornos e manuten\u00e7\u00f5es, \u00e9 importante seguir o cronograma recomendado pelo Dr. Ricardo. Posso verificar quando seria sua pr\u00f3xima consulta. Voc\u00ea gostaria de agendar? \ud83d\udcc5","sintomas":"Entendo sua preocupa\u00e7\u00e3o. Para uma avalia\u00e7\u00e3o adequada, o Dr. Ricardo precisa examinar pessoalmente. Posso agendar uma consulta o mais breve poss\u00edvel. \ud83e\uddb7","desconto":"Temos planos de tratamento com valores especiais e op\u00e7\u00f5es de parcelamento. Posso te passar mais informa\u00e7\u00f5es sobre nossos pacotes? \ud83d\udcb3","problemas":"Problemas dent\u00e1rios podem ser desconfort\u00e1veis. O Dr. Ricardo poder\u00e1 avaliar e recomendar o tratamento mais adequado. Gostaria de agendar uma consulta? \ud83d\ude01","ajuda":"Compreendo sua situa\u00e7\u00e3o. Para um diagn\u00f3stico preciso, \u00e9 necess\u00e1rio agendar uma consulta com o Dr. Ricardo. Quando seria um bom momento para voc\u00ea? \ud83d\udcc5","pagamento":"Oferecemos diversas op\u00e7\u00f5es de pagamento: cart\u00e3o de cr\u00e9dito (em at\u00e9 12x), d\u00e9bito, PIX e boleto. Qual seria mais conveniente para voc\u00ea? \ud83d\udcb3"}', 45, '{"urgencia":true,"falarComDra":true}', true, '2025-05-21 17:16:21', '2025-05-21 17:16:21', NULL);
INSERT INTO public.ai_configs VALUES (1, 1, 'clinica_medica', '{"atendimentos":"ansiedade, depress\u00e3o, TDAH, transtornos do sono, v\u00edcios","endereco":"Av. Brasil, 273, Centro - Blumenau, SC","especialidade":"Gastroo","formacao":"Escola de Medicina de Joinville, com p\u00f3s-gradua\u00e7\u00e3o em Psiquiatria","formasPagamento":"cart\u00e3o de cr\u00e9dito (em at\u00e9 12x), cart\u00e3o de d\u00e9bito, PIX","nome":"Dra. Adriano Boldarini","reembolso":"Aceita reembolso de planos de sa\u00fade"}', 'Neusa', '📅,⏰,👩‍⚕️,📝,✅,💳', '{"receita":"Para renova\u00e7\u00e3o de receita, \u00e9 necess\u00e1rio agendar uma consulta, pois a Dra. precisa avaliar sua situa\u00e7\u00e3o cl\u00ednica atual. Voc\u00ea gostaria de marcar um hor\u00e1rio? \ud83d\udcc5","sintomas":"N\u00e3o podemos dar um diagn\u00f3stico ou prescri\u00e7\u00e3o pelo WhatsApp. Recomendo agendar uma consulta para avalia\u00e7\u00e3o detalhada com a Dra. Karin. \ud83d\udc69\u200d\u2695\ufe0f","desconto":"Atualmente, trabalhamos com valores fixos e pacotes para facilitar o tratamento. Posso te passar mais detalhes? \ud83d\udcb3","problemas":"Entendo que isso pode ser dif\u00edcil. A Dra. Karin poder\u00e1 fazer uma avalia\u00e7\u00e3o completa durante a consulta. Gostaria de agendar um hor\u00e1rio? \ud83e\udd17","ajuda":"Compreendo sua situa\u00e7\u00e3o. Para receber o atendimento adequado, \u00e9 necess\u00e1rio agendar uma consulta com a Dra. Karin. Quando seria um bom momento para voc\u00ea? \ud83d\udcc5","pagamento":"Ap\u00f3s o agendamento, enviarei um link para pagamento. Temos op\u00e7\u00f5es de cart\u00e3o de cr\u00e9dito, d\u00e9bito e PIX. Qual voc\u00ea prefere? \ud83d\udcb3"}', 50, '{"urgencia":true,"falarComDra":true}', true, '2025-05-07 14:02:21', '2025-05-21 14:11:56', '# Amanda - Secretária da 7clicks

## Visão Geral
Você é Amanda, a Secretária da 7clicks, responsável por atender e orientar nossos clientes de forma cordial e eficiente.

## Diretrizes de Atendimento

### 1. Saudação
- **Frase de abertura**: "Olá! Eu sou a Amanda, Secretária da 7clicks Soluções Digitais. Como posso ajudá-lo hoje?"

### 2. Horário de Atendimento
- **Mensagem padrão**: "Nosso horário de atendimento é de segunda a sexta, das 9h às 17h (horário de Brasília)."
- **Fora do horário**: "No momento estamos fora do nosso horário de atendimento. Nosso expediente retorna amanhã às 9h. Posso registrar sua solicitação para que nossa equipe entre em contato assim que iniciarmos as atividades."

### 3. Apresentação dos Serviços
- **Resposta**: "A 7clicks é especializada em soluções digitais personalizadas, incluindo desenvolvimento de websites responsivos, e-commerce, sistemas web e aplicativos. Transformamos suas ideias em realidades tecnológicas para impulsionar seu negócio. Qual solução digital você está buscando?"

### 4. Verificação de Status de Projetos
- **Solicitação de informações**: "Para verificar o status do seu projeto, por favor, informe o código do projeto ou o nome da sua empresa."
- **Projeto em dia**: "Excelente! Seu projeto está seguindo o cronograma conforme planejado. A próxima etapa é [etapa relevante] com previsão para [data]."
- **Projeto com atraso**: "Identificamos que houve uma pequena alteração no cronograma. Vou encaminhar sua solicitação para o gerente de projetos entrar em contato e explicar os detalhes."

### 5. Encaminhamento ao Especialista
- **Mensagem**: "Baseado na sua necessidade, vou direcionar você para nosso especialista em [área específica]. Ele(a) entrará em contato em até 4 horas úteis para discutir os detalhes do seu projeto. Posso registrar um número de telefone e e-mail para contato?"

### 6. Solicitação de Suporte Técnico
- **Coleta de informações**: "Para atendê-lo melhor, preciso de algumas informações. Qual serviço específico está apresentando problemas? Desde quando está ocorrendo? Já tentou alguma solução?"
- **Confirmação de registro**: "Obrigada pelos detalhes. Sua solicitação de suporte foi registrada com o número [número] e será atendida por nossa equipe técnica com prioridade. Você receberá atualizações por e-mail."

### 7. Orçamentos
- **Solicitação de detalhes**: "Para fornecermos um orçamento preciso, precisamos entender melhor o seu projeto. Poderia compartilhar mais detalhes sobre o que você precisa? Após essa conversa inicial, nosso consultor comercial entrará em contato para uma análise mais detalhada."

### 8. Encerramento
- **Mensagem de despedida**: "Agradeço pelo contato com a 7clicks! Estamos comprometidos em oferecer soluções digitais inovadoras que atendam às suas necessidades específicas. Se precisar de mais alguma informação, estou à disposição. Tenha um excelente dia!"

## Informações de Contato

### Localizações
Temos duas unidades para melhor atendê-lo:

1. **Unidade Cascavel/PR**  
   Rua Rodrigues Alves, nº 1634, Maria Luíza

2. **Unidade Blumenau/SC**  
   Rua Sete de Setembro, nº 525, sala 22, Centro

### Canais de Atendimento
- **E-mail**: contato@7clicks.dev
- **Telefone**: [número de telefone]
- **Redes Sociais**: Disponível para atendimento ágil
');
INSERT INTO public.ai_configs VALUES (2, 2, 'clinica_medica', '{"atendimentos":"Ansiedade, depress\u00e3o, TDAH, transtornos do sono, v\u00edcios","endereco":"Rua Jaragu\u00e1, 273, Centro - Blumenau, SC","especialidade":"Sa\u00fade Mental","formacao":"Escola de Medicina de Joinville, com p\u00f3s-gradua\u00e7\u00e3o em Psiquiatria","formasPagamento":"cart\u00e3o de cr\u00e9dito (em at\u00e9 3x sem juros), cart\u00e3o de d\u00e9bito, PIX","nome":"Dra. Karin Alana Da Rosa Boldarini","reembolso":"N\u00e3o atendemos por conv\u00eanios, mas oferecemos recibo para reembolso caso o plano permita"}', 'Neusa', '📅,⏰,👩‍⚕️,📝,✅,💳', '{"receita":null,"sintomas":null,"desconto":null,"problemas":null,"ajuda":null,"pagamento":null}', 50, '{"urgencia":true,"falarComDra":true}', true, '2025-05-07 14:04:43', '2025-06-10 21:34:00', '# Secretária Virtual da Dra. Karin Boldarini

## IDENTIDADE E COMUNICAÇÃO
- Seu nome é Sheilla, seja cordial e mantenha respostas concisas (máximo 2-3 frases curtas)
- Use emojis moderadamente: 📅 (datas), ⏰ (horários), 👩‍⚕️ (Dra. Karin), 📝 (formulários), ✅ (confirmações), 💳 (pagamentos)
- Seja calorosa e profissional, usando linguagem simples e direta

## REGRAS DE ALTA PRIORIDADE

1. **SAUDAÇÃO PERSONALIZADA** - Na primeira interação da conversa:
   - **Sempre** chame `getUserName` para obter o nome do usuário
   - Cumprimente **uma única vez** por conversa usando o nome obtido
   - Se getUserName retornar "Cliente", use "Olá! Como posso ajudar você hoje? 😊"
   - Se retornar um nome, use "Olá [NOME]! Como posso ajudar você hoje? 😊"

2. **🚨 RECONHECIMENTO AUTOMÁTICO DE SOLICITAÇÃO DE CONSULTA** - NOVA FUNCIONALIDADE:
   - **SEMPRE** que detectar mensagens indicando interesse em agendar consulta, chame `getAvailableAppointments` IMEDIATAMENTE
   - **Frases que SEMPRE disparam agendamento**:
     - "queria ver se tem consulta", "tem horário", "quero marcar", "preciso agendar"
     - "tem vaga", "disponibilidade", "quando posso", "horário livre"
     - "consulta disponível", "marcar consulta", "agendar", "quero consulta"
     - "tem como me atender", "dá para marcar", "quando a doutora atende"
   - **Resposta padrão após mostrar horários**: "Qual desses horários funciona melhor para você? 📅"
   - **NÃO pergunte** sobre preferência de data/horário - mostre os disponíveis imediatamente

3. **URGÊNCIA MÉDICA** - Se o paciente mencionar "urgência" ou "emergência", responda EXATAMENTE:
   "Irei verificar com a Dra como está sua disponibilidade para agendar especificamente para você um horário extra hoje, no período noturno, ok?
   Só peço que aguarde um momento, pois assim que possível a Dra Karin responderá, e te darei um retorno.
   Porém, se você está se sentindo mal no exato momento, com desejo de suicídio ou sensação de morte iminente, em crise de ansiedade ou psicose, por favor vá até o serviço de emergência de um hospital para poder receber atendimento médico imediatamente."

4. **SOLICITAÇÃO PARA FALAR COM A DRA** - Se o paciente pedir para falar com a dra, responda EXATAMENTE:
   "Se sinta à vontade para relatar seu problema ou dúvida médica, tudo aqui é confidencial.
   A Dra. Karin visualizará assim que tiver tempo e te responderá com toda a atenção merecida.
   Para facilitar a visualização mais rápida e consequentemente um retorno mais rápido, escreva sua dúvida em forma de texto.
   Enquanto isso, eu posso te ajudar a marcar sua consulta ou esclarecer demais dúvidas sobre o atendimento. Basta me perguntar!"

5. **PRIORIDADE DE REGRAS** - A regra de URGÊNCIA MÉDICA tem prioridade sobre outras regras quando combinadas

6. **MENSAGENS PASSIVAS** - Se o paciente responder apenas com "ok", "aguardo", etc., NÃO RESPONDA NADA

7. **MENSAGENS CONFUSAS** - Se o paciente disser "não entendi", reformule sua última resposta

8. **SAUDAÇÃO INICIAL** - Para saudações simples como "olá", chame getUserName primeiro e responda amigavelmente

9. **CLINICA AMOR E SAÚDE** - Se o paciente mencionar "Amor e Saúde" ou indicar ser paciente desta clínica:
 * **Atenção:** Este canal é EXCLUSIVAMENTE para agendamento de consultas **particulares** com a Dra. Karin. ✅
 * Para pacientes da **Clínica Amor e Saúde** (renovação de receitas, dúvidas médicas, retornos, agendamentos ou qualquer outro serviço), **inclusive quem usar "Cartão de Todos"**, o atendimento deve ser feito **diretamente pelo WhatsApp oficial da Clínica Amor e Saúde**, pois a Dra. não tem acesso aos horários ou prontuários da clínica por este canal.
 * Se deseja uma **consulta particular** com a Dra. Karin, posso verificar os horários disponíveis. Gostaria de agendar?

10. **🚨 REGRA CRÍTICA - NUNCA CONFIRME AGENDAMENTO ANTES DA FUNÇÃO 🚨**
    - **JAMAIS** diga "Consulta agendada", "agendada com sucesso", "foi agendada", "sua consulta está agendada", "consulta marcada" ou qualquer variação ANTES de chamar `bookAppointment`
    - **JAMAIS** confirme horário como se já estivesse reservado: "sua consulta para 16:00", "consulta online às 16:00"
    - **APENAS** colete os dados e chame a função `bookAppointment` IMEDIATAMENTE após receber o método de pagamento
    - **AGUARDE** o resultado da função antes de confirmar QUALQUER COISA
    - **EXEMPLO CORRETO**: "Obrigado pelas informações! Vou processar seu agendamento agora..." → CHAMA bookAppointment → AGUARDA resultado → SÓ ENTÃO confirma

10.1. **🔥 REGRA ABSOLUTA - SEMPRE CHAME A FUNÇÃO 🔥**
    - **SEMPRE** que tiver: nome + CPF + telefone + data nascimento + horário + modalidade + método pagamento = **CHAME bookAppointment IMEDIATAMENTE**
    - **NUNCA** responda com texto normal quando deveria chamar a função
    - **NUNCA** assuma que o agendamento já foi feito
    - **IGNORE** qualquer padrão do histórico da conversa que sugira pular a função
    - **SE VOCÊ NÃO CHAMAR A FUNÇÃO, O AGENDAMENTO NÃO SERÁ FEITO!**

11. **LINK DE PAGAMENTO** - NUNCA prometa enviar o link "em breve" ou manualmente. O sistema envia automaticamente após agendamento bem-sucedido. NUNCA diga "enviarei o link" ou "vou enviar o link".

12. **MÉTODO DE PAGAMENTO** - Independente do método escolhido (cartão, PIX, etc.), SEMPRE chame bookAppointment com todos os dados. O link de pagamento é o mesmo para todos os métodos.

## SERVIÇOS E ATENDIMENTO
- A Dra. Karin atende casos de ansiedade, depressão, TDAH, transtornos do sono e vícios
- Nunca forneça conselhos médicos ou diagnósticos
- Para sintomas ou pedidos de ajuda médica, demonstre empatia e sugira consulta
- Ofereça inicialmente apenas consulta avulsa (mencione pacotes somente se perguntado)

## FUNÇÕES E PROCESSO DE AGENDAMENTO

### FUNÇÕES DISPONÍVEIS:
- **getUserName**: Obter nome do usuário (usar na primeira interação)
- **getAvailableAppointments**: Mostrar horários disponíveis (usar sem parâmetros para horários mais próximos)
- **getAvailablePlans**: Para informações de valores
- **getPaymentMethods**: Para métodos de pagamento
- **bookAppointment**: OBRIGATÓRIO após coletar todos os dados
- **updateAppointment**: Para atualizar agendamentos

### 🎯 FLUXO AUTOMÁTICO DE DETECÇÃO:
1. **Usuário envia**: "Oi, queria ver se tem consulta"
2. **Sheilla IMEDIATAMENTE**: Chama `getAvailableAppointments`
3. **Sheilla responde**: "Olá! Tenho estes horários disponíveis: [lista horários] 📅 Qual funciona melhor para você?"
4. **Continua** o fluxo normal de agendamento

### Processo OBRIGATÓRIO após mostrar horários:
1. ✅ **JÁ FEITO**: Apresentar os horários disponíveis (automático)
2. Aguardar escolha do horário pelo paciente
3. Após escolha do horário, perguntar sobre modalidade (online/presencial)
4. Coletar: nome completo, CPF, telefone, data de nascimento
5. Perguntar método de pagamento
6. **🚨 IMEDIATAMENTE** após receber o método de pagamento, chame "bookAppointment" com TODOS os dados - **NÃO CONFIRME NADA ANTES**
7. **CRÍTICO - LEITURA DO CONTEXTO**: Antes de chamar bookAppointment, RELEIA a conversa para identificar se o paciente escolheu:
   - Se disse "online", "videochamada", "por vídeo" ou similar → is_online=true
   - Se disse "presencial", "no consultório", "pessoalmente" ou similar → is_online=false
   - Se não ficou claro, pergunte novamente antes de agendar
8. **AGUARDE** o resultado da função antes de confirmar qualquer coisa
9. Se bookAppointment retornar sucesso, confirme o agendamento e informe que o link será enviado
10. Nunca dê desconto ou promova desconto

### 🚨 FLUXO CORRETO DE MENSAGENS:
❌ **ERRADO**: "Obrigado, Adriano! Qual método de pagamento prefere para a consulta online às 16:00 do dia 28/05/2025?"
✅ **CORRETO**: "Obrigado pelas informações! Qual método de pagamento você prefere? (cartão de crédito, débito ou PIX)"
→ Usuário responde: "cartão de crédito"
→ **IMEDIATAMENTE** chama bookAppointment
→ **AGUARDA** resultado
→ **SÓ ENTÃO** confirma: "Consulta agendada com sucesso! ✅"

### 🎯 **QUANDO CHAMAR bookAppointment - CHECKLIST OBRIGATÓRIO:**
✅ Tenho o nome completo? 
✅ Tenho o CPF?
✅ Tenho o telefone?
✅ Tenho a data de nascimento?
✅ Tenho o horário escolhido?
✅ Tenho a modalidade (online/presencial)?
✅ Tenho o método de pagamento?

**SE TODOS ✅ = CHAME bookAppointment AGORA!**

### ⚠️ **SINAIS DE ALERTA - QUANDO VOCÊ ESTÁ ERRANDO:**
- Se você está dizendo "sua consulta para..." = ❌ ERRO! Chame a função!
- Se você está confirmando horário = ❌ ERRO! Chame a função!
- Se você tem todos os dados e não chamou a função = ❌ ERRO GRAVE!

### EXEMPLO DE CHAMADA CORRETA:
```javascript
// Se o paciente disse "quero online":
bookAppointment({
  "name": "João Silva",
  "cpf": "12345678901",
  "phone": "11999999999", 
  "birthdate": "01/01/1990",
  "date": "2025-05-28",
  "time": "15:30",
  "is_online": true,  // ← VERDADEIRO para online
  "payment_method": "cartão de crédito"
})

// Se o paciente disse "quero presencial":
bookAppointment({
  "name": "João Silva", 
  "cpf": "12345678901",
  "phone": "11999999999",
  "birthdate": "01/01/1990", 
  "date": "2025-05-28",
  "time": "15:30",
  "is_online": false, // ← FALSO para presencial
  "payment_method": "cartão de crédito"
})
```

## EXEMPLOS DE RECONHECIMENTO AUTOMÁTICO

### ✅ FRASES QUE DISPARAM `getAvailableAppointments` AUTOMATICAMENTE:
- "Oi, queria ver se tem consulta"
- "Tem horário disponível?"
- "Quero marcar uma consulta"
- "Preciso agendar"
- "Tem vaga?"
- "Quando posso marcar?"
- "Quero consulta"
- "Dá para marcar?"
- "Tem como me atender?"
- "Quando a doutora atende?"
- "Disponibilidade de horário"
- "Horário livre"

### 🔄 FLUXO COMPLETO DE EXEMPLO:
**Usuário**: "Oi, queria ver se tem consulta"
**Sheilla**: 
1. Chama `getUserName`
2. Chama `getAvailableAppointments` 
3. Responde: "Olá João! Tenho estes horários disponíveis:
   📅 **Quarta, 12/06** - 14:00 ou 16:30
   📅 **Quinta, 13/06** - 15:00
   
   Qual funciona melhor para você?"

## RESPOSTAS PADRÃO
- **Renovação de receita**: "Para renovação de receita, é necessário agendar uma consulta. Você gostaria de marcar um horário? 📅"
- **Sintomas/medicamentos**: "Não podemos dar diagnóstico pelo WhatsApp. Recomendo agendar consulta para avaliação com a Dra. Karin. 👩‍⚕️"
- **Desconto**: "Trabalhamos com valores fixos e pacotes. Posso passar mais detalhes? 💳"
- **Problemas psicológicos**: "A Dra. Karin poderá fazer uma avaliação completa. Gostaria de agendar? 🤗"
- **Pagamento**: "O link de pagamento será enviado automaticamente após o agendamento. Temos cartão de crédito, débito e PIX. Qual prefere? 💳"

## INFORMAÇÕES PRÁTICAS
- **Planos de saúde**: Não trabalha com convênios; oferece reembolso se o plano permitir
- **Pagamento**: Cartão de crédito (até 12x), cartão de débito, PIX
- **Endereço**: Rua Jaraguá, 273, Centro - Blumenau, SC
- **Formação**: Médica formada pela Escola de Medicina de Joinville, com pós-graduação em Psiquiatria
- **Consultas online**: Videochamada (50 minutos)
- **Consultas presenciais**: Requerem 30 minutos de deslocamento (total 2 horas)');


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.payment_methods VALUES (1, 'Cartão de Crédito', 'cartao_credito', 'credit_card', 'Pagamento com cartão de crédito em até 12x', true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.payment_methods VALUES (2, 'Cartão de Débito', 'cartao_debito', 'credit_card', 'Pagamento à vista com cartão de débito', true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.payment_methods VALUES (3, 'PIX', 'pix', 'qr_code', 'Pagamento instantâneo via PIX', true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.payment_methods VALUES (4, 'Dinheiro', 'dinheiro', 'payments', 'Pagamento em espécie no consultório', true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.payment_methods VALUES (5, 'Convênio', 'convenio', 'health_and_safety', 'Pagamento via plano de saúde ou convênio', true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.plans VALUES (1, 2, 'Consulta Online', 'online', 'consulta_avulsa', NULL, 300.00, 3, 'https://mpago.li/2cc49wX', '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL, true, NULL);
INSERT INTO public.plans VALUES (3, 2, 'Pacote Online - 3 Consultas', 'online', 'pacote', 3, 850.00, 3, 'https://mpago.la/2xRyck7', '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL, true, NULL);
INSERT INTO public.plans VALUES (4, 2, 'Pacote Online - 6 Consultas', 'online', 'pacote', 6, 1650.00, 10, 'https://mpago.li/31MrPkn', '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL, true, NULL);
INSERT INTO public.plans VALUES (5, 2, 'Pacote Online - 9 Consultas', 'online', 'pacote', 9, 2200.00, 12, 'https://mpago.li/31v7r1G', '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL, true, NULL);
INSERT INTO public.plans VALUES (6, 2, 'Pacote Presencial - 5 Sessões', 'presencial', 'pacote', 5, 1650.00, 10, 'https://mpago.li/2GgjZfe', '2025-03-30 14:51:47', '2025-03-30 14:51:47', NULL, true, NULL);
INSERT INTO public.plans VALUES (7, 1, 'Teste', 'presencial', 'consulta_avulsa', NULL, 240.00, 2, NULL, '2025-05-07 14:35:07', '2025-05-07 14:35:22', 'teste', true, 40);
INSERT INTO public.plans VALUES (8, 19, 'Corte de cabelo feminino', 'presencial', 'consulta_avulsa', NULL, 150.00, 3, NULL, '2025-05-07 18:15:34', '2025-05-07 18:27:35', '- Lacação, corte e escova', true, 40);
INSERT INTO public.plans VALUES (9, 19, 'Corte masculino', 'presencial', 'consulta_avulsa', NULL, 100.00, 1, NULL, '2025-05-07 18:16:11', '2025-05-07 18:27:41', 'teste', true, 40);
INSERT INTO public.plans VALUES (2, 2, 'Consulta Presencial', 'presencial', 'consulta_avulsa', NULL, 350.00, 3, 'https://mpago.li/2Nz1i2h', '2025-03-30 14:51:47', '2025-05-11 16:56:34', NULL, true, 40);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (2, 15, 2, 1, 3, '2025-03-31 10:30:00', 'agendada', 'Primeira consulta.', true, '2025-03-31 13:39:45', '2025-03-31 13:39:45');
INSERT INTO public.appointments VALUES (3, 16, 2, 1, 3, '2025-04-09 17:30:00', 'agendada', 'Primeira consulta.', true, '2025-04-03 18:21:50', '2025-04-03 18:21:50');
INSERT INTO public.appointments VALUES (1, 14, 2, 1, 3, '2025-04-21 10:00:00', 'aguardando', 'Primeira consulta.', true, '2025-03-30 15:00:54', '2025-03-30 15:00:54');
INSERT INTO public.appointments VALUES (4, 17, 2, 1, 3, '2025-04-22 14:00:00', 'agendada', 'Primeira consulta.', true, '2025-04-16 13:00:48', '2025-04-16 13:00:48');
INSERT INTO public.appointments VALUES (5, 18, 2, 1, 3, '2025-04-23 18:00:00', 'agendada', 'Primeira consulta.', true, '2025-04-23 13:03:23', '2025-04-23 13:03:23');
INSERT INTO public.appointments VALUES (6, 18, 2, 1, 3, '2025-04-30 15:00:00', 'agendada', 'Primeira consulta.', true, '2025-04-24 13:00:41', '2025-04-24 13:00:41');
INSERT INTO public.appointments VALUES (7, 20, 2, 2, 3, '2025-05-14 18:00:00', 'agendada', 'Primeira consulta.', false, '2025-05-12 13:10:42', '2025-05-12 13:10:42');
INSERT INTO public.appointments VALUES (8, 34, 2, 2, 3, '2025-05-21 18:30:00', 'agendada', 'Primeira consulta.', false, '2025-05-19 21:49:12', '2025-05-19 21:49:12');
INSERT INTO public.appointments VALUES (10, 1, 2, 2, 3, '2025-05-28 18:30:00', 'aguardando', 'Primeira consulta.', false, '2025-05-28 02:07:22', '2025-05-28 02:07:22');
INSERT INTO public.appointments VALUES (9, 1, 2, 2, 3, '2025-05-28 18:00:00', 'aguardando', 'Primeira consulta.', false, '2025-05-28 01:58:43', '2025-05-28 01:58:43');
INSERT INTO public.appointments VALUES (11, 1, 2, 2, 3, '2025-05-28 15:30:00', 'agendada', 'Primeira consulta.', false, '2025-05-28 02:16:56', '2025-05-28 02:16:56');
INSERT INTO public.appointments VALUES (12, 1, 2, 2, 3, '2025-05-28 16:00:00', 'agendada', 'Primeira consulta.', false, '2025-05-28 02:23:18', '2025-05-28 02:23:18');
INSERT INTO public.appointments VALUES (13, 1, 2, 2, 3, '2025-05-28 16:30:00', 'agendada', 'Primeira consulta.', false, '2025-05-28 03:02:38', '2025-05-28 03:02:38');
INSERT INTO public.appointments VALUES (14, 1, 2, 2, 3, '2025-05-28 15:30:00', 'agendada', 'Primeira consulta.', false, '2025-05-28 03:14:40', '2025-05-28 03:14:40');
INSERT INTO public.appointments VALUES (15, 1, 2, 1, 1, '2025-05-28 16:00:00', 'agendada', 'Primeira consulta.', true, '2025-05-28 03:55:06', '2025-05-28 03:55:06');
INSERT INTO public.appointments VALUES (16, 1, 2, 1, 3, '2025-05-28 16:30:00', 'agendada', 'Primeira consulta.', true, '2025-05-28 04:02:17', '2025-05-28 04:02:17');
INSERT INTO public.appointments VALUES (17, 1, 2, 1, 3, '2025-05-28 15:30:00', 'agendada', 'Primeira consulta.', true, '2025-05-28 04:11:58', '2025-05-28 04:11:58');
INSERT INTO public.appointments VALUES (18, 35, 2, 1, 3, '2025-06-04 18:00:00', 'agendada', 'Primeira consulta.', true, '2025-05-30 11:51:35', '2025-05-30 11:51:35');
INSERT INTO public.appointments VALUES (19, 35, 2, 1, 3, '2025-06-04 17:30:00', 'agendada', 'Primeira consulta.', true, '2025-05-30 12:01:06', '2025-05-30 12:01:06');
INSERT INTO public.appointments VALUES (20, 36, 2, 1, 3, '2025-06-18 17:30:00', 'agendada', 'Primeira consulta.', true, '2025-06-17 15:50:19', '2025-06-17 15:50:19');


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: chat_logs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: chatbots; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.chatbots VALUES (4, 2, 'appointment', 'Confirmação de agendamento', 'Sua consulta foi agendada com sucesso para o dia {data} às {hora}. Lembre-se de chegar com 10 minutos de antecedência.', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (5, 2, 'appointment', 'Lembrete de consulta', 'Olá {nome}, lembrete amigável sobre sua consulta amanhã, dia {data}, às {hora}. Confirma sua presença?', 2, true, false, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (6, 2, 'absence', 'Ausência temporária', 'Olá {nome}, no momento estou em atendimento e não posso responder. Retornarei assim que possível.', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (7, 2, 'catalog', 'Catálogo de serviços', 'Confira nossos serviços disponíveis em {link}. Estamos à disposição para esclarecer qualquer dúvida!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (8, 2, 'catalog_promotion', 'Catálogo com promoção', 'Confira nossos serviços em {link}. Aproveite nossa promoção especial: consultas com desconto para agendamentos online!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (9, 2, 'closed_store', 'Consultório fechado', 'Olá {nome}, nosso consultório está fechado no momento. {horario_atendimento} Aguardamos seu contato em nosso horário de atendimento!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (10, 2, 'closed_store_promotion', 'Consultório fechado com promoção', 'Olá {nome}, nosso consultório está fechado no momento. {horario_atendimento} Mas você já pode agendar pelo link {link} e garantir um desconto especial!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (11, 2, 'closed_holiday', 'Fechado por feriado', 'Olá {nome}, nosso consultório está fechado hoje devido ao feriado. Retornaremos ao atendimento normal no próximo dia útil. Para agendar sua consulta, acesse {link}.', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (3, 2, 'welcome', 'Boas-vindas para pacientes retornando', 'Olá {nome}!😊 Que bom ver você novamente. Sou a assistente da Dra. Karin e estou aqui para te ajudar com o que você precisar. É só falar que eu vou te ajudar!', 2, true, false, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (1, 2, 'greeting', 'Saudação padrão', 'Olá {nome}!😊. Sou a assistente da Dra. Karin e estou aqui para te ajudar com o que você precisar. É só falar que eu vou te ajudar!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.chatbots VALUES (2, 2, 'greeting', 'Saudação padrão', 'Olá {nome}!😊. Sou a assistente da Dra. Karin e estou aqui para te ajudar com o que você precisar. É só falar que eu vou te ajudar!', 1, true, true, '2025-03-30 14:51:47', '2025-03-30 14:51:47');


--
-- Data for Name: company_cliente; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.company_cliente VALUES (1, 2, 1, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (2, 2, 17, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (3, 2, 18, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (4, 2, 19, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (5, 2, 3, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (6, 2, 6, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (7, 2, 7, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (8, 2, 8, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (9, 2, 9, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (10, 2, 10, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (11, 2, 11, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (12, 2, 12, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (13, 2, 13, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (14, 2, 15, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (15, 2, 16, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (16, 2, 20, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (17, 2, 29, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (18, 2, 5, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (19, 2, 14, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (20, 2, 30, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (21, 2, 4, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (22, 2, 21, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (23, 2, 22, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (24, 2, 24, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (25, 2, 25, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (26, 2, 26, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (27, 2, 27, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (28, 2, 28, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (29, 2, 31, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (30, 2, 32, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (31, 2, 33, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (32, 2, 34, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (33, 2, 23, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (34, 2, 35, '2025-06-13 15:57:13', '2025-06-13 15:57:13', NULL);
INSERT INTO public.company_cliente VALUES (35, 1, 36, '2025-06-17 15:50:19', '2025-06-17 15:50:19', NULL);
INSERT INTO public.company_cliente VALUES (36, 2, 36, '2025-06-17 15:50:19', '2025-06-17 15:50:19', NULL);


--
-- Data for Name: company_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.company_user VALUES (1, 1, 2, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (2, 1, 4, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (3, 1, 5, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (5, 1, 23, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (6, 1, 27, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (7, 1, 28, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (8, 19, 29, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (9, 19, 30, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (10, 19, 31, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (11, 19, 32, NULL, NULL, NULL);
INSERT INTO public.company_user VALUES (12, 14, 33, NULL, NULL, NULL);


--
-- Data for Name: doctor_availabilities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctor_availabilities VALUES (1, 2, '2025-04-02', '14:30:00', 'available', '2025-03-30 14:57:11', '2025-03-30 14:57:11');
INSERT INTO public.doctor_availabilities VALUES (114, 2, '2025-05-28', '16:30:00', 'booked', '2025-05-28 02:15:10', '2025-05-28 04:02:17');
INSERT INTO public.doctor_availabilities VALUES (3, 2, '2025-04-09', '15:00:00', 'available', '2025-03-30 14:58:04', '2025-03-30 14:58:04');
INSERT INTO public.doctor_availabilities VALUES (112, 2, '2025-05-28', '15:30:00', 'booked', '2025-05-28 02:15:10', '2025-05-28 04:11:58');
INSERT INTO public.doctor_availabilities VALUES (5, 2, '2025-04-09', '18:00:00', 'available', '2025-03-30 14:58:04', '2025-03-30 14:58:04');
INSERT INTO public.doctor_availabilities VALUES (6, 2, '2025-04-09', '18:30:00', 'available', '2025-03-30 14:58:04', '2025-03-30 14:58:04');
INSERT INTO public.doctor_availabilities VALUES (7, 2, '2025-03-31', '10:00:00', 'booked', '2025-03-30 14:58:32', '2025-03-30 15:00:54');
INSERT INTO public.doctor_availabilities VALUES (8, 2, '2025-03-31', '10:30:00', 'booked', '2025-03-30 14:58:32', '2025-03-31 13:39:45');
INSERT INTO public.doctor_availabilities VALUES (2, 2, '2025-04-02', '15:30:00', 'booked', '2025-03-30 14:57:11', '2025-03-30 14:57:11');
INSERT INTO public.doctor_availabilities VALUES (4, 2, '2025-04-09', '17:30:00', 'booked', '2025-03-30 14:58:04', '2025-04-03 18:21:50');
INSERT INTO public.doctor_availabilities VALUES (120, 2, '2025-06-04', '18:30:00', 'available', '2025-05-29 00:15:40', '2025-05-29 00:15:40');
INSERT INTO public.doctor_availabilities VALUES (10, 2, '2025-04-16', '15:00:00', 'available', '2025-04-13 21:19:17', '2025-04-13 21:19:17');
INSERT INTO public.doctor_availabilities VALUES (11, 2, '2025-04-16', '17:30:00', 'available', '2025-04-13 21:19:17', '2025-04-13 21:19:17');
INSERT INTO public.doctor_availabilities VALUES (12, 2, '2025-04-16', '18:30:00', 'available', '2025-04-13 21:19:17', '2025-04-13 21:19:17');
INSERT INTO public.doctor_availabilities VALUES (13, 2, '2025-04-23', '17:00:00', 'available', '2025-04-13 21:19:51', '2025-04-13 21:19:51');
INSERT INTO public.doctor_availabilities VALUES (121, 2, '2025-06-04', '19:00:00', 'available', '2025-05-29 00:15:40', '2025-05-29 00:15:40');
INSERT INTO public.doctor_availabilities VALUES (15, 2, '2025-04-30', '14:00:00', 'available', '2025-04-13 21:20:13', '2025-04-13 21:20:13');
INSERT INTO public.doctor_availabilities VALUES (119, 2, '2025-06-04', '18:00:00', 'booked', '2025-05-29 00:15:40', '2025-05-30 11:51:35');
INSERT INTO public.doctor_availabilities VALUES (17, 2, '2025-04-30', '17:30:00', 'available', '2025-04-13 21:20:13', '2025-04-13 21:20:13');
INSERT INTO public.doctor_availabilities VALUES (18, 2, '2025-04-30', '18:30:00', 'available', '2025-04-13 21:20:13', '2025-04-13 21:20:13');
INSERT INTO public.doctor_availabilities VALUES (9, 2, '2025-04-16', '14:00:00', 'booked', '2025-04-13 21:19:17', '2025-04-16 13:00:48');
INSERT INTO public.doctor_availabilities VALUES (14, 2, '2025-04-23', '18:00:00', 'booked', '2025-04-13 21:19:51', '2025-04-23 13:03:23');
INSERT INTO public.doctor_availabilities VALUES (16, 2, '2025-04-30', '15:00:00', 'booked', '2025-04-13 21:20:13', '2025-04-24 13:00:41');
INSERT INTO public.doctor_availabilities VALUES (19, 2, '2025-05-07', '18:30:00', 'available', '2025-04-28 22:37:16', '2025-04-28 22:37:16');
INSERT INTO public.doctor_availabilities VALUES (20, 2, '2025-05-07', '17:00:00', 'available', '2025-04-28 22:37:31', '2025-04-28 22:37:31');
INSERT INTO public.doctor_availabilities VALUES (21, 2, '2025-05-07', '17:30:00', 'available', '2025-04-28 22:37:45', '2025-04-28 22:37:45');
INSERT INTO public.doctor_availabilities VALUES (22, 2, '2025-05-14', '17:00:00', 'available', '2025-04-28 22:37:57', '2025-04-28 22:37:57');
INSERT INTO public.doctor_availabilities VALUES (23, 2, '2025-05-14', '17:30:00', 'available', '2025-04-28 22:38:00', '2025-04-28 22:38:00');
INSERT INTO public.doctor_availabilities VALUES (118, 2, '2025-06-04', '17:30:00', 'booked', '2025-05-29 00:15:40', '2025-05-30 12:01:06');
INSERT INTO public.doctor_availabilities VALUES (25, 2, '2025-05-14', '18:30:00', 'available', '2025-04-28 22:38:06', '2025-04-28 22:38:06');
INSERT INTO public.doctor_availabilities VALUES (81, 2, '2025-06-18', '17:30:00', 'booked', '2025-05-21 20:01:45', '2025-06-17 15:50:19');
INSERT INTO public.doctor_availabilities VALUES (122, 2, '2025-08-06', '17:30:00', 'available', '2025-06-19 14:35:50', '2025-06-19 14:35:50');
INSERT INTO public.doctor_availabilities VALUES (123, 2, '2025-08-06', '18:00:00', 'available', '2025-06-19 14:35:50', '2025-06-19 14:35:50');
INSERT INTO public.doctor_availabilities VALUES (124, 2, '2025-08-06', '18:30:00', 'available', '2025-06-19 14:35:50', '2025-06-19 14:35:50');
INSERT INTO public.doctor_availabilities VALUES (125, 2, '2025-08-06', '19:00:00', 'available', '2025-06-19 14:35:50', '2025-06-19 14:35:50');
INSERT INTO public.doctor_availabilities VALUES (126, 2, '2025-08-13', '17:30:00', 'available', '2025-06-19 14:35:58', '2025-06-19 14:35:58');
INSERT INTO public.doctor_availabilities VALUES (127, 2, '2025-08-13', '18:00:00', 'available', '2025-06-19 14:35:58', '2025-06-19 14:35:58');
INSERT INTO public.doctor_availabilities VALUES (128, 2, '2025-08-13', '18:30:00', 'available', '2025-06-19 14:35:58', '2025-06-19 14:35:58');
INSERT INTO public.doctor_availabilities VALUES (24, 2, '2025-05-14', '18:00:00', 'booked', '2025-04-28 22:38:02', '2025-05-12 13:10:42');
INSERT INTO public.doctor_availabilities VALUES (29, 2, '2025-05-21', '18:30:00', 'booked', '2025-04-28 22:38:28', '2025-05-19 21:49:12');
INSERT INTO public.doctor_availabilities VALUES (129, 2, '2025-08-13', '19:00:00', 'available', '2025-06-19 14:35:58', '2025-06-19 14:35:58');
INSERT INTO public.doctor_availabilities VALUES (130, 2, '2025-08-20', '17:30:00', 'available', '2025-06-19 14:36:03', '2025-06-19 14:36:03');
INSERT INTO public.doctor_availabilities VALUES (131, 2, '2025-08-20', '18:00:00', 'available', '2025-06-19 14:36:03', '2025-06-19 14:36:03');
INSERT INTO public.doctor_availabilities VALUES (132, 2, '2025-08-20', '18:30:00', 'available', '2025-06-19 14:36:03', '2025-06-19 14:36:03');
INSERT INTO public.doctor_availabilities VALUES (133, 2, '2025-08-20', '19:00:00', 'available', '2025-06-19 14:36:03', '2025-06-19 14:36:03');
INSERT INTO public.doctor_availabilities VALUES (57, 1, '2025-05-21', '16:30:00', 'available', '2025-05-21 19:08:42', '2025-05-21 19:08:42');
INSERT INTO public.doctor_availabilities VALUES (58, 1, '2025-05-21', '17:00:00', 'available', '2025-05-21 19:08:42', '2025-05-21 19:08:42');
INSERT INTO public.doctor_availabilities VALUES (59, 1, '2025-05-21', '17:30:00', 'available', '2025-05-21 19:08:42', '2025-05-21 19:08:42');
INSERT INTO public.doctor_availabilities VALUES (60, 1, '2025-05-21', '18:00:00', 'available', '2025-05-21 19:08:42', '2025-05-21 19:08:42');
INSERT INTO public.doctor_availabilities VALUES (67, 2, '2025-05-21', '17:30:00', 'available', '2025-05-21 19:59:35', '2025-05-21 19:59:35');
INSERT INTO public.doctor_availabilities VALUES (68, 2, '2025-05-21', '18:00:00', 'available', '2025-05-21 19:59:35', '2025-05-21 19:59:35');
INSERT INTO public.doctor_availabilities VALUES (69, 2, '2025-05-21', '19:00:00', 'available', '2025-05-21 19:59:35', '2025-05-21 19:59:35');
INSERT INTO public.doctor_availabilities VALUES (77, 2, '2025-06-11', '17:30:00', 'available', '2025-05-21 20:01:32', '2025-05-21 20:01:32');
INSERT INTO public.doctor_availabilities VALUES (78, 2, '2025-06-11', '18:00:00', 'available', '2025-05-21 20:01:32', '2025-05-21 20:01:32');
INSERT INTO public.doctor_availabilities VALUES (79, 2, '2025-06-11', '18:30:00', 'available', '2025-05-21 20:01:32', '2025-05-21 20:01:32');
INSERT INTO public.doctor_availabilities VALUES (80, 2, '2025-06-11', '19:00:00', 'available', '2025-05-21 20:01:32', '2025-05-21 20:01:32');
INSERT INTO public.doctor_availabilities VALUES (82, 2, '2025-06-18', '18:00:00', 'available', '2025-05-21 20:01:45', '2025-05-21 20:01:45');
INSERT INTO public.doctor_availabilities VALUES (83, 2, '2025-06-18', '18:30:00', 'available', '2025-05-21 20:01:45', '2025-05-21 20:01:45');
INSERT INTO public.doctor_availabilities VALUES (84, 2, '2025-06-18', '19:00:00', 'available', '2025-05-21 20:01:45', '2025-05-21 20:01:45');
INSERT INTO public.doctor_availabilities VALUES (85, 2, '2025-06-25', '17:30:00', 'available', '2025-05-21 20:01:57', '2025-05-21 20:01:57');
INSERT INTO public.doctor_availabilities VALUES (86, 2, '2025-06-25', '18:00:00', 'available', '2025-05-21 20:01:57', '2025-05-21 20:01:57');
INSERT INTO public.doctor_availabilities VALUES (87, 2, '2025-06-25', '18:30:00', 'available', '2025-05-21 20:01:57', '2025-05-21 20:01:57');
INSERT INTO public.doctor_availabilities VALUES (88, 2, '2025-06-25', '19:00:00', 'available', '2025-05-21 20:01:57', '2025-05-21 20:01:57');
INSERT INTO public.doctor_availabilities VALUES (89, 2, '2025-07-02', '17:30:00', 'available', '2025-05-21 20:03:03', '2025-05-21 20:03:03');
INSERT INTO public.doctor_availabilities VALUES (90, 2, '2025-07-02', '18:00:00', 'available', '2025-05-21 20:03:03', '2025-05-21 20:03:03');
INSERT INTO public.doctor_availabilities VALUES (91, 2, '2025-07-02', '18:30:00', 'available', '2025-05-21 20:03:03', '2025-05-21 20:03:03');
INSERT INTO public.doctor_availabilities VALUES (92, 2, '2025-07-02', '19:00:00', 'available', '2025-05-21 20:03:03', '2025-05-21 20:03:03');
INSERT INTO public.doctor_availabilities VALUES (93, 2, '2025-07-09', '17:30:00', 'available', '2025-05-21 20:03:29', '2025-05-21 20:03:29');
INSERT INTO public.doctor_availabilities VALUES (94, 2, '2025-07-09', '18:00:00', 'available', '2025-05-21 20:03:29', '2025-05-21 20:03:29');
INSERT INTO public.doctor_availabilities VALUES (95, 2, '2025-07-09', '18:30:00', 'available', '2025-05-21 20:03:29', '2025-05-21 20:03:29');
INSERT INTO public.doctor_availabilities VALUES (96, 2, '2025-07-09', '19:00:00', 'available', '2025-05-21 20:03:29', '2025-05-21 20:03:29');
INSERT INTO public.doctor_availabilities VALUES (97, 2, '2025-07-16', '17:30:00', 'available', '2025-05-21 20:03:43', '2025-05-21 20:03:43');
INSERT INTO public.doctor_availabilities VALUES (98, 2, '2025-07-16', '18:00:00', 'available', '2025-05-21 20:03:43', '2025-05-21 20:03:43');
INSERT INTO public.doctor_availabilities VALUES (99, 2, '2025-07-16', '18:30:00', 'available', '2025-05-21 20:03:43', '2025-05-21 20:03:43');
INSERT INTO public.doctor_availabilities VALUES (100, 2, '2025-07-16', '19:00:00', 'available', '2025-05-21 20:03:43', '2025-05-21 20:03:43');
INSERT INTO public.doctor_availabilities VALUES (101, 2, '2025-07-23', '17:30:00', 'available', '2025-05-21 20:03:55', '2025-05-21 20:03:55');
INSERT INTO public.doctor_availabilities VALUES (102, 2, '2025-07-23', '18:00:00', 'available', '2025-05-21 20:03:55', '2025-05-21 20:03:55');
INSERT INTO public.doctor_availabilities VALUES (103, 2, '2025-07-23', '18:30:00', 'available', '2025-05-21 20:03:55', '2025-05-21 20:03:55');
INSERT INTO public.doctor_availabilities VALUES (104, 2, '2025-07-23', '19:00:00', 'available', '2025-05-21 20:03:55', '2025-05-21 20:03:55');
INSERT INTO public.doctor_availabilities VALUES (105, 2, '2025-07-30', '17:30:00', 'available', '2025-05-21 20:04:09', '2025-05-21 20:04:09');
INSERT INTO public.doctor_availabilities VALUES (106, 2, '2025-07-30', '18:00:00', 'available', '2025-05-21 20:04:09', '2025-05-21 20:04:09');
INSERT INTO public.doctor_availabilities VALUES (107, 2, '2025-07-30', '18:30:00', 'available', '2025-05-21 20:04:09', '2025-05-21 20:04:09');
INSERT INTO public.doctor_availabilities VALUES (108, 2, '2025-07-30', '19:00:00', 'available', '2025-05-21 20:04:10', '2025-05-21 20:04:10');
INSERT INTO public.doctor_availabilities VALUES (115, 2, '2025-05-28', '18:00:00', 'available', '2025-05-28 02:15:10', '2025-05-28 02:15:10');
INSERT INTO public.doctor_availabilities VALUES (116, 2, '2025-05-28', '18:30:00', 'available', '2025-05-28 02:15:10', '2025-05-28 02:15:10');
INSERT INTO public.doctor_availabilities VALUES (117, 2, '2025-05-28', '19:00:00', 'available', '2025-05-28 02:15:10', '2025-05-28 02:15:10');
INSERT INTO public.doctor_availabilities VALUES (113, 2, '2025-05-28', '16:00:00', 'available', '2025-05-28 02:15:10', '2025-05-28 03:55:06');
INSERT INTO public.doctor_availabilities VALUES (134, 2, '2025-08-27', '17:30:00', 'available', '2025-06-19 14:36:09', '2025-06-19 14:36:09');
INSERT INTO public.doctor_availabilities VALUES (135, 2, '2025-08-27', '18:00:00', 'available', '2025-06-19 14:36:09', '2025-06-19 14:36:09');
INSERT INTO public.doctor_availabilities VALUES (136, 2, '2025-08-27', '18:30:00', 'available', '2025-06-19 14:36:09', '2025-06-19 14:36:09');
INSERT INTO public.doctor_availabilities VALUES (137, 2, '2025-08-27', '19:00:00', 'available', '2025-06-19 14:36:09', '2025-06-19 14:36:09');


--
-- Data for Name: doctor_payment_method; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctor_payment_method VALUES (1, 1, 1, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (2, 1, 2, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (3, 1, 3, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (4, 1, 4, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (5, 1, 5, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (6, 2, 1, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (7, 2, 2, '2025-03-30 14:51:47', '2025-03-30 14:51:47');
INSERT INTO public.doctor_payment_method VALUES (8, 2, 3, '2025-03-30 14:51:47', '2025-03-30 14:51:47');


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.migrations VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations VALUES (4, '2025_03_08_101302_create_roles_table', 1);
INSERT INTO public.migrations VALUES (5, '2025_03_08_101316_create_role_modules_table', 1);
INSERT INTO public.migrations VALUES (6, '2025_03_08_101325_create_role_role_module_table', 1);
INSERT INTO public.migrations VALUES (7, '2025_03_08_101337_create_role_user_table', 1);
INSERT INTO public.migrations VALUES (8, '2025_03_08_101345_create_provinces_table', 1);
INSERT INTO public.migrations VALUES (9, '2025_03_08_101352_create_cities_table', 1);
INSERT INTO public.migrations VALUES (10, '2025_03_08_101359_create_addresses_table', 1);
INSERT INTO public.migrations VALUES (11, '2025_03_08_101403_create_user_data_table', 1);
INSERT INTO public.migrations VALUES (12, '2025_03_08_104128_create_images_table', 1);
INSERT INTO public.migrations VALUES (13, '2025_03_08_104240_remove_image_id_from_user_data_table', 1);
INSERT INTO public.migrations VALUES (14, '2025_03_08_135110_create_chatbots_table', 1);
INSERT INTO public.migrations VALUES (15, '2025_03_08_214131_create_plans_table', 1);
INSERT INTO public.migrations VALUES (16, '2025_03_08_222731_create_payment_methods_table', 1);
INSERT INTO public.migrations VALUES (17, '2025_03_08_222737_create_doctor_payment_method_table', 1);
INSERT INTO public.migrations VALUES (18, '2025_03_09_000909_create_doctor_availabilities_table', 1);
INSERT INTO public.migrations VALUES (19, '2025_03_09_221318_create_appointments_table', 1);
INSERT INTO public.migrations VALUES (20, '2025_03_25_231806_create_chat_logs_table', 1);
INSERT INTO public.migrations VALUES (21, '2025_04_12_224212_add_soft_deletes_to_users_table', 2);
INSERT INTO public.migrations VALUES (22, '2025_05_06_225521_create_ai_configs_table', 3);
INSERT INTO public.migrations VALUES (23, '2025_05_07_002910_add_description_to_plans_table', 3);
INSERT INTO public.migrations VALUES (24, '2024_03_25_000000_create_company_cliente_table', 4);
INSERT INTO public.migrations VALUES (25, '2025_05_15_000001_create_working_hours_table', 5);
INSERT INTO public.migrations VALUES (26, '2025_05_15_115924_create_specialties_table', 5);
INSERT INTO public.migrations VALUES (27, '2025_05_15_115948_create_specialty_user_table', 5);
INSERT INTO public.migrations VALUES (28, '2025_05_15_121351_change_segment_type_to_string_in_specialties_table', 5);
INSERT INTO public.migrations VALUES (29, '2025_05_15_140904_create_company_user_table', 5);
INSERT INTO public.migrations VALUES (30, '2025_05_17_000001_add_prompt_fixo_to_ai_configs', 6);


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: role_modules; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES (1, 'admin', 'Administrador', true, NULL, NULL);
INSERT INTO public.roles VALUES (6, 'service', 'Serviços', true, NULL, NULL);
INSERT INTO public.roles VALUES (7, 'commercial', 'Comercial', true, NULL, NULL);
INSERT INTO public.roles VALUES (8, 'contact', 'Contato', true, NULL, NULL);
INSERT INTO public.roles VALUES (9, 'support', 'Suporte', true, NULL, NULL);
INSERT INTO public.roles VALUES (10, 'product_validator', 'Avaliador de produtos', true, NULL, NULL);
INSERT INTO public.roles VALUES (11, 'financial', 'Financeiro', true, NULL, NULL);
INSERT INTO public.roles VALUES (12, 'expeditor', 'Expeditor', true, NULL, NULL);
INSERT INTO public.roles VALUES (2, 'client', 'Cliente', true, NULL, NULL);
INSERT INTO public.roles VALUES (3, 'patient', 'Paciente', true, NULL, NULL);
INSERT INTO public.roles VALUES (4, 'clinic', 'Clínica / Empresa', true, NULL, NULL);
INSERT INTO public.roles VALUES (5, 'doctor', 'Médico', true, NULL, NULL);


--
-- Data for Name: role_role_module; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: role_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.role_user VALUES (1, 1, 1, NULL, NULL);
INSERT INTO public.role_user VALUES (2, 1, 2, NULL, NULL);
INSERT INTO public.role_user VALUES (3, 3, 3, NULL, NULL);
INSERT INTO public.role_user VALUES (4, 3, 4, NULL, NULL);
INSERT INTO public.role_user VALUES (5, 3, 5, NULL, NULL);
INSERT INTO public.role_user VALUES (6, 3, 6, NULL, NULL);
INSERT INTO public.role_user VALUES (7, 3, 7, NULL, NULL);
INSERT INTO public.role_user VALUES (8, 3, 8, NULL, NULL);
INSERT INTO public.role_user VALUES (9, 3, 9, NULL, NULL);
INSERT INTO public.role_user VALUES (10, 3, 10, NULL, NULL);
INSERT INTO public.role_user VALUES (11, 3, 11, NULL, NULL);
INSERT INTO public.role_user VALUES (12, 3, 12, NULL, NULL);
INSERT INTO public.role_user VALUES (13, 3, 13, NULL, NULL);
INSERT INTO public.role_user VALUES (14, 3, 14, NULL, NULL);
INSERT INTO public.role_user VALUES (15, 3, 15, NULL, NULL);
INSERT INTO public.role_user VALUES (16, 3, 16, NULL, NULL);
INSERT INTO public.role_user VALUES (17, 3, 17, NULL, NULL);
INSERT INTO public.role_user VALUES (18, 3, 18, NULL, NULL);
INSERT INTO public.role_user VALUES (19, 1, 19, NULL, NULL);
INSERT INTO public.role_user VALUES (20, 3, 20, NULL, NULL);
INSERT INTO public.role_user VALUES (30, 6, 21, NULL, NULL);
INSERT INTO public.role_user VALUES (31, 6, 22, NULL, NULL);
INSERT INTO public.role_user VALUES (32, 6, 23, NULL, NULL);
INSERT INTO public.role_user VALUES (33, 6, 24, NULL, NULL);
INSERT INTO public.role_user VALUES (34, 6, 25, NULL, NULL);
INSERT INTO public.role_user VALUES (35, 7, 26, NULL, NULL);
INSERT INTO public.role_user VALUES (36, 6, 27, NULL, NULL);
INSERT INTO public.role_user VALUES (37, 7, 28, NULL, NULL);
INSERT INTO public.role_user VALUES (38, 6, 29, NULL, NULL);
INSERT INTO public.role_user VALUES (39, 6, 30, NULL, NULL);
INSERT INTO public.role_user VALUES (40, 6, 31, NULL, NULL);
INSERT INTO public.role_user VALUES (41, 6, 32, NULL, NULL);
INSERT INTO public.role_user VALUES (42, 6, 33, NULL, NULL);
INSERT INTO public.role_user VALUES (43, 7, 33, NULL, NULL);
INSERT INTO public.role_user VALUES (44, 3, 34, NULL, NULL);
INSERT INTO public.role_user VALUES (45, 1, 23, NULL, NULL);
INSERT INTO public.role_user VALUES (46, 3, 35, NULL, NULL);
INSERT INTO public.role_user VALUES (47, 3, 36, NULL, NULL);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES ('EGuWRUzVt7lCHadTBhHpVVAsjMvhwtGKaD4WzEjC', NULL, '195.80.150.179', 'WanScannerBot/1.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicEZQMVgxSjV3bUFsMExJSU9wa29ScGVFQmhkZDNKUjI3cEJNOUNaWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750002621);
INSERT INTO public.sessions VALUES ('aO3rUQRmRFsdNVpgT2XQ5ZCdT400EtNghgrm3SxB', NULL, '35.236.231.185', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEFTdHlPbTc5cnhOVFlNMmVIRXU1U0FUS3pSR3ZwRmY0bTJUV0ZRTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750005441);
INSERT INTO public.sessions VALUES ('dj1xzoDqsg49xuayqaPRpmW1l5aRFXfwRfjJwgFT', NULL, '51.159.23.43', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNG9pV0RRbWdVTmhMT2NpWTdTYUpxZVJwRGZwS25jaXVJV2JEd1BwSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750012792);
INSERT INTO public.sessions VALUES ('DE43mw5LwuVqPaSVpPLpniPRcmnj3U1ClwfUydfZ', NULL, '54.36.148.2', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOUdieExuWVdObTFETlVoc3dCWlJnWHFJeTRxOFpCbFB3YUNjVGtCUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750049585);
INSERT INTO public.sessions VALUES ('9ZallZnT4Jp6hJfZUqOqoHyr6sI4SPbpAShjBOIV', NULL, '51.68.236.72', 'Mozilla/5.0 (compatible; MJ12bot/v2.0.2; http://mj12bot.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN21OTUFEajE5SzVzdDJNZmtnZ1oyRWUzTmw1eFhaeFBhVkpqS21hYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750066864);
INSERT INTO public.sessions VALUES ('MIWW5NVf1OmSZrztt2Yma25WJoziJLx6Z0Bz0ZFI', NULL, '54.36.148.176', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjZWejEydThWTm9HNkFCdDgxUjdsUzNpNXlJRnFpOXJ5dDVHQ1BBRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750094247);
INSERT INTO public.sessions VALUES ('qxrtW2zYjI78GblyiGfyMAGWPdvv4NKmAQeC5yvF', NULL, '170.39.218.2', 'l9tcpid/v1.1.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXg0MExwVnJyaXpNd3pBZGdTcE5LcEsyVlhmR0tsSlhJRDkyMFFhVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750109043);
INSERT INTO public.sessions VALUES ('g0mSNW8G22NL8HxEDTmHYsMDchSF4CTpuqNiXIxC', NULL, '170.39.218.2', 'l9tcpid/v1.1.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzNWbTFlRmtUa0I0bEhIMURCUmRTcmVaZ3RGaWhjUEdxUnZQS0R6ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750128775);
INSERT INTO public.sessions VALUES ('Jl6jE2gGzpwP6GYxj2ruDHq0uKbDTpUkU3dlO4Hm', NULL, '2001:470:1:c84::14', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVTdpQXlnQ1k2Wk50OEN4WlY1bm1zclJ6WVhKV3kwNkRvd0hoZVExVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750154136);
INSERT INTO public.sessions VALUES ('AVgwT0LBLfXsA5wt7eq6dxkPuXbnNmzIx7sR37bQ', NULL, '20.171.207.79', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2ppcE9TcmpYVmVraEFMOXMzMzhJNFJPZ3NkZkJMS3AzcG13MWhiYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750167996);
INSERT INTO public.sessions VALUES ('EsyDO4hGvfVaBPH7Wyr9GNgWtOH19Pf7twxaQRs7', NULL, '212.102.33.185', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRnE4UGU1aGpPUGt4ODFCNlpJREtncVJsOW1ZVHpIenlQRXVSTm51aSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750184312);
INSERT INTO public.sessions VALUES ('tWlncXYifP3E5zJeghi7QMBacNPZRD7fiWzp58qP', NULL, '46.8.225.111', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnZsWU9reWRwamRFZWNoczRHNXg2YlpBS3NnTUZvV1BoTWdWTnpMQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750190053);
INSERT INTO public.sessions VALUES ('LyMCePUGt3Q5Ezy4BrtPYmhaVvoGgA6pRRdCIIXD', NULL, '44.249.141.75', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGFUakg5eGtQenhFUVhBaFA4M0IzaDBYVzRRQ2JRTU43T09vU3VoayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750218649);
INSERT INTO public.sessions VALUES ('3as2EC88NncbZHb6ZelTsJkE1pHE5wQzWapLZuoW', NULL, '165.232.117.206', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXEzWGM3QWg0b2lYMWp6eFlxUUdDUmc3Z1BKbHA5dFBlcUJoMGtjVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750241287);
INSERT INTO public.sessions VALUES ('6uxRKeDhGGIJjm1pHpAwkf0skE2cF9Ik04D5ZvdK', NULL, '161.35.73.247', 'Mozilla/5.0 (compatible; Odin; https://docs.getodin.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTFBVU83YU92UE00VkM2NUdTdERsU2pYbXA1YVRWRDdXYU1kUVFwdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750241292);
INSERT INTO public.sessions VALUES ('NhmScpcjR9QvGsdI2eraE3QtDwUbErsANUQq24c3', NULL, '51.222.253.15', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRDRvQnFjeWtXdm5wSmdweDVIckpTalBuazBndHpKbUljRlVvZU9ociI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750259048);
INSERT INTO public.sessions VALUES ('A3bElUrPb7EWGMiZNgfbxcHSGhjP657am9SpmQQr', NULL, '51.159.23.43', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHlhYWJUcU1iT0hmQXB2RHFMNGNCUlVnY0JLZlFnNmM4SWhnNDNSUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750271992);
INSERT INTO public.sessions VALUES ('mIucwGTR8TpE7qtqZogPKXekuOwoEf65KvE97LUc', NULL, '51.222.253.7', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXRHZlBnVXpvamNvWHZvZ3JCdzV3NFlwRUZocWwxN3RKQWhUQ3BVVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750286501);
INSERT INTO public.sessions VALUES ('j5GwaBUfZGrarUTnwelbiSUUonlerVXjZdIByBtV', NULL, '84.239.31.14', 'WanScannerBot/1.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTRqVm1ZNU5wbFZmcXJsYVZaMFRRdWhmckpzMEJuWTVkbDJRNXUyeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750292279);
INSERT INTO public.sessions VALUES ('osUO3bhA2we1dwgbN3b0sUaq0cRIXmf1QG44ztFU', NULL, '2001:470:1:c84::26', 'Mozilla/5.0 (X11; Linux x86_64) Gecko/20060609 Firefox/123.0esr', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidm91Vml4S2xVa2EyUFI2bzBUOERUVkI1TlZiM0RkelhGdndHdnYyZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750327486);
INSERT INTO public.sessions VALUES ('9d19xPvjonKpAkLfyQ1gsDj5P619eKMqCNFrqXQn', NULL, '195.80.150.179', 'WanScannerBot/1.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTJHaXdoUEJtV0Y2Z2pZQjFiWEpReDFpQ1FONm1pNXRnRFdXek1sMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750002624);
INSERT INTO public.sessions VALUES ('w2Bayz4noHQHiG2yHjkfAuLFdNgiW0vkplp8bbuM', NULL, '54.36.148.218', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZUNBWW5iWHowUXVSa1RjaGJmN1d4dzZPMklPWWxMS2I2MnZ6SlNuVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750006802);
INSERT INTO public.sessions VALUES ('lx2ZpCUja9W8jO7vNYRk7iWNmwlup6YUnCyvHQ6K', NULL, '54.36.149.40', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmlPUlJDNURtblN6RE9ueUNYRmpvWVFsdlBCWFhvSGMxVHJRanc4dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750017451);
INSERT INTO public.sessions VALUES ('jyJ1gqA7geYfOM5OXqkyvuD6JPntURc82hezUbdL', NULL, '170.39.218.2', 'l9tcpid/v1.1.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkswUGRPZ21VODZoYk9Kb3VZeGpNankxbkZIVG1EVnpkbWUwUnl4SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750053738);
INSERT INTO public.sessions VALUES ('aCSceAD26eZxXaWK05ZrpzpPJ8PV4WO2baom3OVe', NULL, '94.159.110.45', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXRnTVJQMHJyUmNPR1kybFU1YXVuRkh0aFdoZ3VGTk5KN2thcnZCYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750071335);
INSERT INTO public.sessions VALUES ('xAiSmRAhnV0iYkRhkkS1NBfehzvLapNkiII4QWpx', NULL, '84.104.47.212', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRFVLQWF4VTZQM0dFUWZ4YVI5dWZnMHFveWUzZXlLSUJQWFpSUXh5MCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750094454);
INSERT INTO public.sessions VALUES ('sqt69ffVgISiOSPFZkWWJqbA0tmBc1KgdtwRlGU4', NULL, '2a06:4882:d000::ed', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN281RmFzS21iZHFTTVVRZlFSM3M4OXhaZE82N0l3STEzY2MzYkVKMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750109105);
INSERT INTO public.sessions VALUES ('p9TgYpelxH3axgbLuHyyugpDfXUGXyETkWz4jTAL', NULL, '107.22.47.33', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMHk3WXgzNHhxeWljWW81YkFQSGhXQnJSYXQzN1R6d3lSaEtEaVBxVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750134298);
INSERT INTO public.sessions VALUES ('pBfNsySXXcWRoTUOvpltpJ7FE3Xp0mJpdPV7OYB8', NULL, '47.237.115.100', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1ZkYjFWYmlPeHZFVXVwZ1JBcEMzS3ZxVlJpR2I2UXZZY0w4NEVYcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750155635);
INSERT INTO public.sessions VALUES ('z8tgBNwMUQJE1a6RJdyTf0Ks6zFaUnB5iG97clXm', NULL, '54.36.149.69', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXJaYTJONnp3VmRYNGplUTByckJBTHhSRWRyTXgzRGU2bHZjbHpvbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750176006);
INSERT INTO public.sessions VALUES ('LtroinwkccPTR5dpiMYOSp5EG5OogIe3uo8FQGdR', NULL, '185.242.226.155', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieHRSTFlpQ3AwTXNDZUpWQjVkZXh0bUhmM2tNSXRYY25vek5UM2lXZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750184589);
INSERT INTO public.sessions VALUES ('fMd0XrXNTiXSfDGa7BhBCZH1Gu68O2lNtDhn8OgS', NULL, '37.14.114.224', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekhkVkdOaWNCVjd5VXRxUVBwNmNhdlpoNXhrZEpFNEtzQnVOb25sZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750198101);
INSERT INTO public.sessions VALUES ('kQVx2X3VNRl8L95laNyspYMXAoBkVx25fwX8EiMq', NULL, '34.226.248.235', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3F4elVoT3ZpVkhjRU94bVJEaklBS0o1MlNqdm1UaHdQQW56QmVRbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750221394);
INSERT INTO public.sessions VALUES ('Bu6XNmXb3RNAcsKbU8ApUywo6SzFcqybL3sKdXK5', NULL, '165.232.117.206', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWE5FY3phQURMVjRjaEh0UW1NVnlzTmdXNGdrM3lyTndLS1YzY1hBYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750241289);
INSERT INTO public.sessions VALUES ('9ZJAtT0QOnX3lTPVBQfGHCg4jO97dh4gTXTf7z1P', NULL, '194.187.178.18', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFBGZFl3NGtsTXM4b2F0MWNRUXdZaEtiMURVQnBSOWlTa0oxQjBLeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750241849);
INSERT INTO public.sessions VALUES ('pD8Y8RSg2WdnjwzBvxEvHZPeUB9DdbTx6jBnCiit', NULL, '2001:470:2cc:1::113', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkl0WDUzRDlxVFQ3OFBUaG02SG1PMGN5Tm51MVNNaUJiWkRXbGsySiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750259251);
INSERT INTO public.sessions VALUES ('ef7WzU8r6BpVq0Hyq3Cx6Jbo7Ul3EP5iTDrfFgJ5', NULL, '123.150.138.198', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVhsTGVEbEVBb1RKQU84WGQyZ2FCYlZyVFlRbHd0T3l2ZmJ0eGtPRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750285370);
INSERT INTO public.sessions VALUES ('IQHgWSKOdioQ1R18lXDwFF5tqdgyg57oHFrSIRhE', NULL, '81.182.64.35', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRUdKNjlEQUlzOXdaeXU2eERENGpJTlhZdEh4TG9BOFNRbThMRmxORiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750288056);
INSERT INTO public.sessions VALUES ('I9urmzHKT3b9BjOdwR7P3UnexFYHtLThTmzpXMb7', NULL, '20.89.88.34', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWN4c3ZlM1lVaG9CN0VvOWx6RTk0bXRkNnlkc1FqSzVTNHk5aVlUMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750312103);
INSERT INTO public.sessions VALUES ('Y8XTeNhffUT2Hx4vE1xOs3b3LJXceDn4SDUtb6LF', NULL, '183.191.122.178', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMUc3dWE4QzVHeEVjbThZTVRkZEt2dlZXWkZUZDI1WGkzRWhjZXJqcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750330356);
INSERT INTO public.sessions VALUES ('6YpdOapBJzSE8gLZNYtJsTSUBn2ApHk0FxTlOKZf', NULL, '164.92.252.125', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT2hOdUZ3dW9pQnRneHJZMWdZeGpKeGU1MVpoaEJhSjhYQ0hGTWJjTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750004575);
INSERT INTO public.sessions VALUES ('hGWrSd7dpjDJLf9ucTN5PDsAJU6rHR8aynYWBYaf', NULL, '93.41.240.123', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUJWV0J3dW02QVYzbFg1NVNDZjRHNW13Z0pCdE1QVmxSVnRieEkwTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750006962);
INSERT INTO public.sessions VALUES ('lvx4Xyw4dc7nBCoA7SGbNjuPBYi2HuhvGGAMTbZt', NULL, '34.38.39.196', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1pFNlVVTE1wZU9vdlhSaHduZFgyM3dsT2JNZmluRmk0eXVoVzBteCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750017919);
INSERT INTO public.sessions VALUES ('BWMPdBhGIpYcXDEk1AbIddaxrKAAktREjM20KJKb', NULL, '93.158.91.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicVpSTEI0UVhVY2pma2Fab0NFUTY1YjlBREswTDFqb1BYbEJWa1htQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750056468);
INSERT INTO public.sessions VALUES ('SHi6KAwT6iM92ep3ifueyjQvq0z6r8bGqqE4wgRS', NULL, '185.242.226.155', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSEpjU0pCSU1HcmI4WlVWUjlOb1BhbW9wMFVEUmFLeFphdXBUZ29MaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750083146);
INSERT INTO public.sessions VALUES ('kLUmI6GD9OmrJ6g7EEvCK4Bmx120vIr5wm4FmviC', NULL, '51.159.23.43', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY1dzQnF0cUJpbTkzTDNhN3BXV21TSG9zZkY5TWV0UmJpTkNSalEwNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750099192);
INSERT INTO public.sessions VALUES ('M8AAFwhIao5KQSFcyyScxpwBpUDEbbFmGCBh4hrm', NULL, '34.78.54.180', 'python-requests/2.32.4', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0FaVVExeDBaSEpveW1lYk5IVVN5MWh5aHRBbmIyU1o1cnRmWHFuVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750118965);
INSERT INTO public.sessions VALUES ('P6tYTUAPnegy2CUNfMpYOclMAzExRzxbajOkg9gL', NULL, '2001:470:1:c84::14', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWEFXR2hnWWN5Q0JGdlFJVXBzdW9DWWNCalNOR0d0Q2FGY2N0RGVQZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750153879);
INSERT INTO public.sessions VALUES ('LFeTsWPw94kALmNxbnx0d6hr82MW3npxVGpB5eRH', NULL, '157.55.39.205', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOHd0R0VnSUpNNndMVGRJcDJuUHh2dWVaNTFpTWdNS2pwNWFlNXN2VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vd3d3LnNldmVuZG9jdG9yLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750165810);
INSERT INTO public.sessions VALUES ('9S6qo5HNPp9IhR6HTo9tGNJ5FA58oRhzehu37idW', NULL, '212.102.33.185', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN25aVXRlVnBnWm5STk5OQWFDWGQ0UTh0azdLOHVFNVM3MnJLVjZpNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750184256);
INSERT INTO public.sessions VALUES ('yUBE5WqhosFIVW1HoPWKsvgu838pC56MWu0EFs9Z', NULL, '51.159.23.43', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY1VpSjFtVlpFSThTdVkyVThWTHFHdzhreHBacDZseWxsTTNGN1RDSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750185592);
INSERT INTO public.sessions VALUES ('x3qkmWM1WwPzlvEiBzbXVQHIOhp1iVgzpN7xwj7K', NULL, '54.36.149.58', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib1Z3S0g2VER4SEtKRTVSWkIxVDhZV0xMdmZ1U3dJck9NZG1PV0FtSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750209514);
INSERT INTO public.sessions VALUES ('cCrA7voz2fykzXMNRIwprWE7skmVGKsxV4BMYRqo', NULL, '2a00:12e8:200:6::2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSk15YXo5M2xCT2g5cG9yTnVxdnRWOFQ3Y0hjamZpQXdPNVg0UGdFeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHBzOi8vMmEwMjo0NzgwOjE0OjY3NTU6OjEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750237289);
INSERT INTO public.sessions VALUES ('BOcD24UWHgn8AETjQRBeQeINm8pUvQM6KZGGVw8E', NULL, '165.232.117.206', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUkZmb0syV3RNY294cWdaVlpPV2JRaExhb1VGOGtxQXo0cjhpZGJIaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750241290);
INSERT INTO public.sessions VALUES ('k583SlJnVDJiNdjGOMfdmbNfwZesL0RxQvLrAmgS', NULL, '2001:470:2cc:1::106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2hObkJqTFR5UUhZQXAwcUZHTUs1MGVQYjBXU0lRTXF6OXBTN2FqSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750258596);
INSERT INTO public.sessions VALUES ('53IEbl2c7TDuBfjC7mYqRIQ4bbtD0Y8ShbMVZBMi', NULL, '104.131.163.125', 'Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSE9pVFpET3FhbENXNUdXRmpNMUtJRk9uZWlHUXg1Y2txNGYxT2EwMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vc2VydmVyLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750270174);
INSERT INTO public.sessions VALUES ('puKgu1Y516Tthmu60BENuW2GIgTlYc0e4oitbfkZ', NULL, '123.150.138.198', 'Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/86.0.4240.111Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiejMzdm43dXp5V1hHdWdnNTN5RW5rZUd2N3FUaVp0aUFEbm5PN3BQaiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750285374);
INSERT INTO public.sessions VALUES ('HdvQDXkUPdr1goLtrMCJPeVfOxY5AN5Q94KBYKTL', NULL, '84.239.31.14', 'WanScannerBot/1.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlJWSkRTemR6Znl6ZTlFV2ZNeFk4RzJJaFd0cHJEUjR1b2x4c29tMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750292277);
INSERT INTO public.sessions VALUES ('QLJth1kkEsORn7UFKGQMhqT3pqdvGt9EaVjzRT2z', NULL, '2001:470:1:c84::26', 'Mozilla/5.0 (X11; Linux x86_64) Gecko/20060609 Firefox/123.0esr', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidTN5cjBxRHFrNk5yNmhRTnd0bkFzWGY2Sm81ekp2QXlDSEdWbWxzNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vWzJhMDI6NDc4MDoxNDo2NzU1OjoxXSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750327123);
INSERT INTO public.sessions VALUES ('jbfwbDS9BoAppA79UJioEvTbInAR2sJ7z6wY78as', NULL, '175.152.31.10', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTzNDSnVyaE9vNDlUbEphdlBoaFo5Uk9lWVpCZXZNOEdmUExYQ3JkUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750330391);
INSERT INTO public.sessions VALUES ('KCOz04VBrhpcq00NelVFJPZdAH6ztbEcLP9RSuai', NULL, '66.249.77.7', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.7151.103 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXg0Q085OUwzOFFsdlNkd0JCMTNnWjN2dklmT0VrRjg4dk1HREtDbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750327795);
INSERT INTO public.sessions VALUES ('x6zENyBklHeIs6c2NloRzQzD9h3l1fdWXSD9uQal', NULL, '35.215.75.183', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko; compatible; BW/1.3; rb.gy/qyzae5) Chrome/124.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWFDZFUzQ1g2MzdLZ2JlTUxsaTVDZDVGaHVqTlNVcG1QdjJOYVh0aSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750334194);
INSERT INTO public.sessions VALUES ('GKdkzP8tALbGncufEKbYiyafhrdtFcICY23r88Nc', NULL, '84.239.49.34', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW43czFoZ2VvT2NOY2tIOXhMRzdSYURjZEVRdDh5ZENKd3RIZVNzOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750357500);
INSERT INTO public.sessions VALUES ('LWVUAw2zBBEba8br3uz3dlB1Ybp42yvzctSzvvBN', NULL, '51.159.23.43', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1VyTzg5RmU4Uk4ya2hyOXJvamFmdlhrWEwyMTRjdTEydWRCNml5aSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE5OS4xODYuNDYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1750358392);
INSERT INTO public.sessions VALUES ('eEhev2IolUb4EC3ENFVXyen06Wrvnq7PHsXKRprZ', NULL, '54.214.120.98', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.89 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaEE5dURQUm03Z2Nnd0dmRmJjaE9pajJnTG9GbldYSGY4NWY5MXliYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vYXBpLmRyYWthcmluLmNvbS5iciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750361002);
INSERT INTO public.sessions VALUES ('kp5wNblyJDIRfwBsbdkOqkFficUMRSSetvVrTYFZ', NULL, '89.248.168.30', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY1RnT2Q5QXlHZ1YzQ1NrYjliMWh4TTdkb1JCM082WDVLbTkyRkJ4UiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZ2Vra2tvLmNvIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750364317);
INSERT INTO public.sessions VALUES ('5JoUJ2CVyA0zhKzlENkWHDn5v07LAo01EYlyMEpC', NULL, '66.249.77.7', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.7151.103 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmJPZE92aFpNbXdWT2h6ZmlxN3V2MXJKMWYyUUZUSEJzZXJJRXVPNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHBzOi8vc2V2ZW5kb2N0b3IuY29tLmJyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1750365123);


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties VALUES (1, 'Acupuntura', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (2, 'Alergologia e Imunologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (3, 'Anestesiologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (4, 'Angiologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (5, 'Cardiologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (6, 'Cirurgia Cardiovascular', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (7, 'Cirurgia Geral', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (8, 'Cirurgia Plástica', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (9, 'Cirurgia Torácica', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (10, 'Cirurgia Vascular', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (11, 'Clínica Geral', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (12, 'Coloproctologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (13, 'Dermatologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (14, 'Endocrinologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (15, 'Fisiatria', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (16, 'Gastroenterologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (17, 'Genética Médica', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (18, 'Geriatria', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (19, 'Ginecologia e Obstetrícia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (20, 'Hematologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (21, 'Hepatologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (22, 'Homeopatia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (23, 'Infectologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (24, 'Mastologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (25, 'Medicina de Família', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (26, 'Medicina do Trabalho', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (27, 'Medicina Esportiva', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (28, 'Medicina Intensiva', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (29, 'Medicina Nuclear', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (30, 'Nefrologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (31, 'Neurocirurgia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (32, 'Neurologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (33, 'Nutrologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (34, 'Oftalmologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (35, 'Oncologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (36, 'Ortopedia e Traumatologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (37, 'Otorrinolaringologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (38, 'Patologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (39, 'Pediatria', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (40, 'Pneumologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (41, 'Psiquiatria', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (42, 'Radiologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (43, 'Radioterapia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (44, 'Reumatologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (45, 'Saúde Mental', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (46, 'Urologia', 'clinica-medica', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (47, 'Odontologia Geral', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (48, 'Ortodontia', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (49, 'Endodontia', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (50, 'Periodontia', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (51, 'Implantodontia', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (52, 'Odontopediatria', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (53, 'Prótese Dentária', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (54, 'Cirurgia Bucomaxilofacial', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (55, 'Estética Dental', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (56, 'Radiologia Odontológica', 'clinica-odonto', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (57, 'Cabeleireiro', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (58, 'Manicure e Pedicure', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (59, 'Depilação', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (60, 'Estética Facial', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (61, 'Estética Corporal', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (62, 'Maquiagem', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (63, 'Design de Sobrancelhas', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (64, 'Massagem', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (65, 'Alongamento de Cílios', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (66, 'Corte Masculino', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (67, 'Coloração', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (68, 'Tratamentos Capilares', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (69, 'Spa das Mãos e Pés', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);
INSERT INTO public.specialties VALUES (70, 'Podologia', 'salao-beleza', true, '2025-05-15 19:47:37', '2025-05-15 19:47:37', NULL);


--
-- Data for Name: specialty_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialty_user VALUES (11, 4, '2025-05-15 21:17:51', '2025-05-15 21:17:51');
INSERT INTO public.specialty_user VALUES (38, 4, '2025-05-15 22:08:04', '2025-05-15 22:08:04');
INSERT INTO public.specialty_user VALUES (45, 2, '2025-05-15 22:08:25', '2025-05-15 22:08:25');
INSERT INTO public.specialty_user VALUES (48, 21, '2025-05-17 12:24:34', '2025-05-17 12:24:34');
INSERT INTO public.specialty_user VALUES (51, 22, '2025-05-17 12:32:38', '2025-05-17 12:32:38');
INSERT INTO public.specialty_user VALUES (51, 23, '2025-05-17 12:37:21', '2025-05-17 12:37:21');
INSERT INTO public.specialty_user VALUES (48, 24, '2025-05-17 13:00:32', '2025-05-17 13:00:32');
INSERT INTO public.specialty_user VALUES (50, 24, '2025-05-17 13:00:32', '2025-05-17 13:00:32');
INSERT INTO public.specialty_user VALUES (47, 25, '2025-05-17 13:10:06', '2025-05-17 13:10:06');
INSERT INTO public.specialty_user VALUES (48, 26, '2025-05-17 13:14:20', '2025-05-17 13:14:20');
INSERT INTO public.specialty_user VALUES (47, 27, '2025-05-17 13:28:04', '2025-05-17 13:28:04');
INSERT INTO public.specialty_user VALUES (47, 28, '2025-05-17 13:29:09', '2025-05-17 13:29:09');
INSERT INTO public.specialty_user VALUES (50, 28, '2025-05-17 13:29:09', '2025-05-17 13:29:09');
INSERT INTO public.specialty_user VALUES (58, 29, '2025-05-17 13:32:24', '2025-05-17 13:32:24');
INSERT INTO public.specialty_user VALUES (63, 30, '2025-05-17 13:33:24', '2025-05-17 13:33:24');
INSERT INTO public.specialty_user VALUES (59, 31, '2025-05-17 13:34:28', '2025-05-17 13:34:28');
INSERT INTO public.specialty_user VALUES (66, 32, '2025-05-17 13:36:02', '2025-05-17 13:36:02');
INSERT INTO public.specialty_user VALUES (57, 32, '2025-05-17 13:36:02', '2025-05-17 13:36:02');
INSERT INTO public.specialty_user VALUES (62, 33, '2025-05-19 10:17:42', '2025-05-19 10:17:42');


--
-- Data for Name: user_data; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_data VALUES (3, 3, '2000-12-04', '542055', '75993607644', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (5, 5, '2000-04-04', '194423', '89130277299', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (6, 6, '2000-04-04', '814085', '77212999083', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (7, 7, '2000-04-04', '130243', '78121134836', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (8, 8, '2000-04-04', '440941', '40265385004', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (9, 9, '2000-04-04', '469464', '28609374071', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (10, 10, '2000-04-04', '480045', '19919151845', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (11, 11, '2000-04-04', '082565', '07147050394', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (12, 12, '2000-04-04', '151869', '44015847295', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (13, 13, '2000-04-04', '363304', '81157562181', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (14, 14, '1987-05-23', NULL, '0098017957', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (15, 15, '2000-04-11', NULL, '04983588019', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (16, 16, '1995-05-29', NULL, '03302546262', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (17, 17, '1985-06-13', NULL, '05089477906', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (18, 18, '1979-02-18', NULL, '89052250120', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (20, 20, '2002-02-01', NULL, '07109478955', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (19, 19, '1990-01-01', '000002', '27360980000190', 'Paulo Roberto Voss', NULL, NULL, 'salao-beleza');
INSERT INTO public.user_data VALUES (2, 2, '2000-04-04', '000001', '00000000001', 'Dra. Karin', NULL, NULL, 'clinica-medica');
INSERT INTO public.user_data VALUES (1, 1, '2000-04-04', '000000', '00000000000', '7clicks', NULL, NULL, 'clinica-odonto');
INSERT INTO public.user_data VALUES (4, 4, '2000-04-04', '188585', '42945253907', NULL, NULL, NULL, 'clinica-medica');
INSERT INTO public.user_data VALUES (21, 21, '2025-05-08', '324234', '234234234', 'teste', NULL, 'teste', 'clinica-odonto');
INSERT INTO public.user_data VALUES (22, 22, '2025-05-01', '324234324', '234234', 'marta teste', NULL, 'marta teste Social', 'clinica-odonto');
INSERT INTO public.user_data VALUES (24, 24, NULL, '324234234', '23423423423', 'tertrte', '34234234234234', 'ter', 'clinica-odonto');
INSERT INTO public.user_data VALUES (25, 25, NULL, '234234234', '34234342343', 'teste', NULL, 'teste', 'clinica-odonto');
INSERT INTO public.user_data VALUES (26, 26, '2025-05-09', '234324234', '32897093282', 'teste3', '34234234234324', 'teste3', 'clinica-odonto');
INSERT INTO public.user_data VALUES (27, 27, NULL, NULL, NULL, NULL, NULL, NULL, 'clinica-odonto');
INSERT INTO public.user_data VALUES (28, 28, NULL, NULL, NULL, NULL, NULL, NULL, 'clinica-odonto');
INSERT INTO public.user_data VALUES (29, 29, NULL, NULL, NULL, NULL, NULL, NULL, 'salao-beleza');
INSERT INTO public.user_data VALUES (30, 30, NULL, NULL, NULL, NULL, NULL, NULL, 'salao-beleza');
INSERT INTO public.user_data VALUES (31, 31, NULL, NULL, NULL, NULL, NULL, NULL, 'salao-beleza');
INSERT INTO public.user_data VALUES (32, 32, NULL, NULL, NULL, NULL, NULL, NULL, 'salao-beleza');
INSERT INTO public.user_data VALUES (33, 33, '2025-05-01', '324324234', '24234234234', 'Teste 19', '32423423423423', 'Teste 19', 'salao-beleza');
INSERT INTO public.user_data VALUES (34, 34, '1996-12-16', NULL, '10182547906', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (23, 23, '2025-05-02', '324234234', '32423423423', 'Romulo', NULL, 'Romulo', 'clinica-odonto');
INSERT INTO public.user_data VALUES (35, 35, '1985-10-21', NULL, '34559145865', NULL, NULL, NULL, NULL);
INSERT INTO public.user_data VALUES (36, 36, '1990-11-02', NULL, '07524488971', NULL, NULL, NULL, NULL);


--
-- Data for Name: working_hours; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.working_hours VALUES (1, 1, 0, NULL, NULL, false, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (2, 1, 1, '08:00:00', '18:00:00', true, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (3, 1, 2, '08:00:00', '18:00:00', true, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (4, 1, 3, '08:00:00', '18:00:00', true, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (5, 1, 4, '08:00:00', '18:00:00', true, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (6, 1, 5, '08:00:00', '17:00:00', true, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (7, 1, 6, NULL, NULL, false, '2025-05-15 20:09:04', '2025-05-15 20:38:25');
INSERT INTO public.working_hours VALUES (71, 2, 0, NULL, NULL, false, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (72, 2, 1, '08:00:00', '18:00:00', true, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (73, 2, 2, '08:00:00', '18:00:00', true, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (74, 2, 3, NULL, NULL, false, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (75, 2, 4, NULL, NULL, false, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (76, 2, 5, NULL, NULL, false, '2025-05-21 18:01:01', '2025-06-19 13:23:41');
INSERT INTO public.working_hours VALUES (77, 2, 6, NULL, NULL, false, '2025-05-21 18:01:01', '2025-06-19 13:23:41');


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.addresses_id_seq', 2, true);


--
-- Name: ai_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ai_configs_id_seq', 4, true);


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 20, true);


--
-- Name: chat_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.chat_logs_id_seq', 1, false);


--
-- Name: chatbots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.chatbots_id_seq', 11, true);


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cities_id_seq', 5565, true);


--
-- Name: company_cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_cliente_id_seq', 36, true);


--
-- Name: company_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.company_user_id_seq', 12, true);


--
-- Name: doctor_availabilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctor_availabilities_id_seq', 137, true);


--
-- Name: doctor_payment_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctor_payment_method_id_seq', 8, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.images_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 30, true);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_methods_id_seq', 5, true);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.plans_id_seq', 9, true);


--
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.provinces_id_seq', 1, false);


--
-- Name: role_modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_modules_id_seq', 1, false);


--
-- Name: role_role_module_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_role_module_id_seq', 1, false);


--
-- Name: role_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_user_id_seq', 47, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 12, true);


--
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 70, true);


--
-- Name: user_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_data_id_seq', 36, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 36, true);


--
-- Name: working_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.working_hours_id_seq', 91, true);


--
-- PostgreSQL database dump complete
--


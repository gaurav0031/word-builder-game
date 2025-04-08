"use client"

import { useCallback } from "react"
import type { Difficulty } from "@/types/game-types"

export function useGameData() {
  const getImageWithFallback = (url: string) => {
    return url || "/placeholder.svg?height=300&width=300"
  }

  const levels = {
    easy: [
      {
        id: 1,
        title: "Farm Adventure",
        story:
          "Welcome to Farmer Joe's farm! Today, we're going to learn about different animals that live on the farm. Can you help Farmer Joe identify all his animal friends?",
        lesson: "Farm animals and their names",
        words: [
          {
            word: "cow",
            hint: "This animal gives us milk",
            image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300&h=300&fit=crop",
          },
          {
            word: "pig",
            hint: "This animal likes to roll in mud",
            image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&h=300&fit=crop",
          },
          {
            word: "hen",
            hint: "This bird lays eggs",
            image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=300&h=300&fit=crop",
          },
          {
            word: "duck",
            hint: "This bird can swim and quacks",
            image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=300&h=300&fit=crop",
          },
          {
            word: "goat",
            hint: "This animal has horns and a beard",
            image: "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 2,
        title: "Colorful World",
        story:
          "Today we're exploring the rainbow with Artist Anna! She needs your help naming all the beautiful colors she's using in her painting.",
        lesson: "Colors and their spellings",
        words: [
          {
            word: "red",
            hint: "The color of apples and fire trucks",
            image: "https://images.unsplash.com/photo-1580227974546-fbd48825d991?w=300&h=300&fit=crop",
          },
          {
            word: "blue",
            hint: "The color of the sky and ocean",
            image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=300&fit=crop",
          },
          {
            word: "green",
            hint: "The color of grass and leaves",
            image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&h=300&fit=crop",
          },
          {
            word: "yellow",
            hint: "The color of the sun and bananas",
            image: "https://images.unsplash.com/photo-1557682250-f6086caa9f16?w=300&h=300&fit=crop",
          },
          {
            word: "purple",
            hint: "The color of grapes and lavender",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 3,
        title: "Fruit Basket",
        story:
          "Chef Carlos is making a delicious fruit salad! He needs your help to identify all the fruits he's using in his recipe.",
        lesson: "Fruits and their names",
        words: [
          {
            word: "apple",
            hint: "A round red or green fruit with a stem",
            image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=300&h=300&fit=crop",
          },
          {
            word: "banana",
            hint: "A long yellow curved fruit",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
          },
          {
            word: "orange",
            hint: "A round citrus fruit with the same name as its color",
            image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop",
          },
          {
            word: "grape",
            hint: "Small round fruits that grow in bunches",
            image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=300&h=300&fit=crop",
          },
          {
            word: "mango",
            hint: "A sweet tropical fruit with orange flesh",
            image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 4,
        title: "Family Time",
        story:
          "Join the Johnson family for a picnic in the park! Let's learn about different family members and their roles.",
        lesson: "Family members and relationships",
        words: [
          {
            word: "mom",
            hint: "A female parent",
            image: "https://images.unsplash.com/photo-1543342384-1f1350e27861?w=300&h=300&fit=crop",
          },
          {
            word: "dad",
            hint: "A male parent",
            image: "https://images.unsplash.com/photo-1509506489701-dfe23b067808?w=300&h=300&fit=crop",
          },
          {
            word: "baby",
            hint: "The youngest member of a family",
            image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=300&fit=crop",
          },
          {
            word: "aunt",
            hint: "Your parent's sister",
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop",
          },
          {
            word: "uncle",
            hint: "Your parent's brother",
            image: "https://images.unsplash.com/photo-1582307811683-75b18a39ab71?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 5,
        title: "School Days",
        story:
          "It's the first day of school! Teacher Tom needs help identifying all the items in the classroom. Can you help him?",
        lesson: "School items and supplies",
        words: [
          {
            word: "book",
            hint: "Pages with information bound together",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
          },
          {
            word: "desk",
            hint: "A table where students sit and work",
            image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop",
          },
          {
            word: "pen",
            hint: "A writing tool with ink",
            image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&h=300&fit=crop",
          },
          {
            word: "ruler",
            hint: "A tool used to measure and draw straight lines",
            image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=300&h=300&fit=crop",
          },
          {
            word: "clock",
            hint: "Shows the time on the wall",
            image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 6,
        title: "Body Parts",
        story: "Doctor Diana is teaching about the human body today! Help her identify different parts of the body.",
        lesson: "Human body parts and their functions",
        words: [
          {
            word: "hand",
            hint: "You use these to grab things",
            image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?w=300&h=300&fit=crop",
          },
          {
            word: "foot",
            hint: "You stand on these",
            image: "https://images.unsplash.com/photo-1508387027939-27cccde53673?w=300&h=300&fit=crop",
          },
          {
            word: "eye",
            hint: "You see with these",
            image: "https://images.unsplash.com/photo-1559570278-eb8d71d06403?w=300&h=300&fit=crop",
          },
          {
            word: "ear",
            hint: "You hear with these",
            image: "https://images.unsplash.com/photo-1589137880361-c4c33ad2738e?w=300&h=300&fit=crop",
          },
          {
            word: "nose",
            hint: "You smell with this",
            image: "https://images.unsplash.com/photo-1581511164597-f4f83b5e1066?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 7,
        title: "Weather Watch",
        story:
          "Meteorologist Mike is forecasting the weather for the week! Help him identify different weather conditions.",
        lesson: "Weather types and conditions",
        words: [
          {
            word: "rain",
            hint: "Water falling from clouds",
            image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=300&h=300&fit=crop",
          },
          {
            word: "snow",
            hint: "Frozen water falling from the sky",
            image: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=300&h=300&fit=crop",
          },
          {
            word: "wind",
            hint: "Moving air that you can feel but not see",
            image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=300&h=300&fit=crop",
          },
          {
            word: "sun",
            hint: "The bright star that gives us light and heat",
            image: "https://images.unsplash.com/photo-1522124624696-7ea32eb9592c?w=300&h=300&fit=crop",
          },
          {
            word: "cloud",
            hint: "White or gray shapes in the sky",
            image: "https://images.unsplash.com/photo-1611928482473-7b27d24eab80?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 8,
        title: "Clothing Closet",
        story:
          "Fashion Designer Fiona is organizing her closet! Help her identify different clothing items for her new collection.",
        lesson: "Clothing items and accessories",
        words: [
          {
            word: "hat",
            hint: "Worn on your head",
            image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=300&h=300&fit=crop",
          },
          {
            word: "sock",
            hint: "Worn on your feet inside shoes",
            image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=300&fit=crop",
          },
          {
            word: "coat",
            hint: "Keeps you warm in cold weather",
            image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop",
          },
          {
            word: "shoe",
            hint: "Protects your feet when walking",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
          },
          {
            word: "belt",
            hint: "Worn around your waist to hold up pants",
            image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 9,
        title: "Number Fun",
        story: "Mathematician Max is counting everything in sight! Help him identify numbers and learn to spell them.",
        lesson: "Numbers and their spellings",
        words: [
          {
            word: "one",
            hint: "The first number",
            image: "https://images.unsplash.com/photo-1616244013240-89e5bbe8240b?w=300&h=300&fit=crop",
          },
          {
            word: "two",
            hint: "A pair has this many items",
            image: "https://images.unsplash.com/photo-1638867269318-2020af22bd51?w=300&h=300&fit=crop",
          },
          {
            word: "five",
            hint: "The number of fingers on one hand",
            image: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?w=300&h=300&fit=crop",
          },
          {
            word: "ten",
            hint: "The number of fingers on both hands",
            image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=300&h=300&fit=crop",
          },
          {
            word: "zero",
            hint: "The number that means nothing or none",
            image: "https://images.unsplash.com/photo-1621778455241-e52d1c8a2b02?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 10,
        title: "Shape Sorter",
        story:
          "Architect Alice is designing a new building! Help her identify different shapes she's using in her blueprints.",
        lesson: "Geometric shapes and their properties",
        words: [
          {
            word: "circle",
            hint: "A round shape with no corners",
            image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=300&h=300&fit=crop",
          },
          {
            word: "square",
            hint: "A shape with four equal sides",
            image: "https://images.unsplash.com/photo-1577374994572-3c9308d461a6?w=300&h=300&fit=crop",
          },
          {
            word: "star",
            hint: "A shape with points that twinkles in the night sky",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=300&fit=crop",
          },
          {
            word: "heart",
            hint: "A shape that represents love",
            image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=300&h=300&fit=crop",
          },
          {
            word: "oval",
            hint: "An elongated circle shape",
            image: "https://images.unsplash.com/photo-1562246229-37b3aca47e0c?w=300&h=300&fit=crop",
          },
        ],
      },
    ],
    medium: [
      {
        id: 1,
        title: "Ocean Explorers",
        story:
          "Dive deep into the ocean with Marine Biologist Maya! She's studying the amazing creatures that live under the sea and needs your help identifying them.",
        lesson: "Marine life and ocean vocabulary",
        words: [
          {
            word: "shark",
            hint: "A large fish with sharp teeth",
            image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?w=300&h=300&fit=crop",
          },
          {
            word: "whale",
            hint: "The largest mammal in the ocean",
            image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=300&h=300&fit=crop",
          },
          {
            word: "coral",
            hint: "Colorful structures where fish live",
            image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=300&h=300&fit=crop",
          },
          {
            word: "octopus",
            hint: "Sea creature with eight arms",
            image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=300&h=300&fit=crop",
          },
          {
            word: "dolphin",
            hint: "Intelligent marine mammal that jumps",
            image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 2,
        title: "Space Adventure",
        story:
          "Blast off into space with Astronaut Alex! He's on a mission to explore our solar system and needs your help naming what he sees through his telescope.",
        lesson: "Space and astronomy vocabulary",
        words: [
          {
            word: "planet",
            hint: "A large object that orbits a star",
            image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=300&h=300&fit=crop",
          },
          {
            word: "comet",
            hint: "Icy object with a tail in space",
            image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=300&h=300&fit=crop",
          },
          {
            word: "galaxy",
            hint: "A huge collection of stars",
            image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
          },
          {
            word: "rocket",
            hint: "Vehicle that travels to space",
            image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=300&h=300&fit=crop",
          },
          {
            word: "meteor",
            hint: "A space rock that enters Earth's atmosphere",
            image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 3,
        title: "Jungle Safari",
        story:
          "Join Explorer Emma on a jungle safari! She's documenting wild animals and needs your help identifying the creatures she encounters.",
        lesson: "Jungle animals and habitats",
        words: [
          {
            word: "tiger",
            hint: "A large striped wild cat",
            image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=300&h=300&fit=crop",
          },
          {
            word: "monkey",
            hint: "A climbing animal with a long tail",
            image: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=300&h=300&fit=crop",
          },
          {
            word: "parrot",
            hint: "A colorful bird that can mimic sounds",
            image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=300&fit=crop",
          },
          {
            word: "python",
            hint: "A large non-venomous snake",
            image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=300&h=300&fit=crop",
          },
          {
            word: "jaguar",
            hint: "A spotted big cat from the Americas",
            image: "https://images.unsplash.com/photo-1551972873-b7e8754e8e26?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 4,
        title: "City Life",
        story:
          "Urban Planner Uma is designing a new city! Help her identify important buildings and features that make up a modern metropolis.",
        lesson: "City structures and urban vocabulary",
        words: [
          {
            word: "bridge",
            hint: "Structure that spans over water or roads",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop",
          },
          {
            word: "subway",
            hint: "Underground train system",
            image: "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=300&h=300&fit=crop",
          },
          {
            word: "skyline",
            hint: "The outline of buildings against the sky",
            image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop",
          },
          {
            word: "traffic",
            hint: "Vehicles moving on roads",
            image: "https://images.unsplash.com/photo-1566143260825-4ceebd425d8e?w=300&h=300&fit=crop",
          },
          {
            word: "tower",
            hint: "A tall, narrow building or structure",
            image: "https://images.unsplash.com/photo-1549092273-8b23dde8ac2b?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 5,
        title: "Sports World",
        story:
          "Coach Chris is teaching a sports class! Help the students learn about different sports and the equipment used to play them.",
        lesson: "Sports and athletic equipment",
        words: [
          {
            word: "soccer",
            hint: "A game played by kicking a ball",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=300&fit=crop",
          },
          {
            word: "tennis",
            hint: "A game played with rackets and a ball",
            image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&h=300&fit=crop",
          },
          {
            word: "hockey",
            hint: "A game played with sticks and a puck",
            image: "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?w=300&h=300&fit=crop",
          },
          {
            word: "basket",
            hint: "Where you score points in basketball",
            image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=300&h=300&fit=crop",
          },
          {
            word: "medal",
            hint: "A prize given to winners",
            image: "https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 6,
        title: "Food Festival",
        story:
          "Chef Charlie is hosting a food festival! Help him identify different dishes and ingredients from around the world.",
        lesson: "Food vocabulary and culinary terms",
        words: [
          {
            word: "pasta",
            hint: "Italian food made from dough",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=300&fit=crop",
          },
          {
            word: "sushi",
            hint: "Japanese food with rice and fish",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop",
          },
          {
            word: "taco",
            hint: "Mexican food in a folded tortilla",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop",
          },
          {
            word: "curry",
            hint: "Spicy dish from India",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop",
          },
          {
            word: "bread",
            hint: "Baked food made from flour",
            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 7,
        title: "Music Journey",
        story:
          "Musician Mia is teaching a music class! Help her students learn about different instruments and musical terms.",
        lesson: "Musical instruments and terminology",
        words: [
          {
            word: "piano",
            hint: "Instrument with black and white keys",
            image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
          },
          {
            word: "guitar",
            hint: "Stringed instrument you strum",
            image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=300&h=300&fit=crop",
          },
          {
            word: "drum",
            hint: "Percussion instrument you hit",
            image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=300&h=300&fit=crop",
          },
          {
            word: "flute",
            hint: "Wind instrument you blow across",
            image: "https://images.unsplash.com/photo-1621368286550-f54551f39b91?w=300&h=300&fit=crop",
          },
          {
            word: "violin",
            hint: "Stringed instrument played with a bow",
            image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 8,
        title: "Art Gallery",
        story: "Artist Aaron is hosting an exhibition! Help visitors learn about different art styles and techniques.",
        lesson: "Art terminology and famous works",
        words: [
          {
            word: "paint",
            hint: "Colored liquid used to make pictures",
            image: "https://images.unsplash.com/photo-1541085388148-a28cfd55c7c2?w=300&h=300&fit=crop",
          },
          {
            word: "sketch",
            hint: "A quick drawing often done in pencil",
            image: "https://images.unsplash.com/photo-1602738328654-51ab2ae6c350?w=300&h=300&fit=crop",
          },
          {
            word: "canvas",
            hint: "Fabric surface for painting",
            image: "https://images.unsplash.com/photo-1579762593175-20226054cad0?w=300&h=300&fit=crop",
          },
          {
            word: "mural",
            hint: "Artwork painted on a wall",
            image: "https://images.unsplash.com/photo-1551913902-c92207136625?w=300&h=300&fit=crop",
          },
          {
            word: "statue",
            hint: "Three-dimensional artwork",
            image: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 9,
        title: "Transportation",
        story: "Engineer Ethan is designing new vehicles! Help him identify different modes of transportation.",
        lesson: "Vehicles and transportation vocabulary",
        words: [
          {
            word: "train",
            hint: "Vehicle that runs on tracks",
            image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=300&h=300&fit=crop",
          },
          {
            word: "plane",
            hint: "Flying vehicle with wings",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=300&fit=crop",
          },
          {
            word: "ship",
            hint: "Large vessel for water travel",
            image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=300&h=300&fit=crop",
          },
          {
            word: "truck",
            hint: "Large vehicle for carrying goods",
            image: "https://images.unsplash.com/photo-1523326350151-473b504afa42?w=300&h=300&fit=crop",
          },
          {
            word: "bike",
            hint: "Two-wheeled vehicle you pedal",
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 10,
        title: "Nature Hike",
        story:
          "Naturalist Nina is leading a hike through the forest! Help her identify different plants and natural features along the trail.",
        lesson: "Nature vocabulary and environmental terms",
        words: [
          {
            word: "forest",
            hint: "A large area covered with trees",
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop",
          },
          {
            word: "river",
            hint: "A large natural stream of water",
            image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=300&h=300&fit=crop",
          },
          {
            word: "mountain",
            hint: "A very high hill with steep sides",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop",
          },
          {
            word: "flower",
            hint: "The colorful part of a plant",
            image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
          },
          {
            word: "valley",
            hint: "Low land between hills or mountains",
            image: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?w=300&h=300&fit=crop",
          },
        ],
      },
    ],
    hard: [
      {
        id: 1,
        title: "Ancient Civilizations",
        story:
          "Join Archaeologist Amelia on her expedition to uncover the secrets of ancient civilizations! Help her identify important artifacts and concepts from long ago.",
        lesson: "Historical vocabulary and ancient cultures",
        words: [
          {
            word: "pyramid",
            hint: "Ancient structure with triangular sides",
            image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=300&h=300&fit=crop",
          },
          {
            word: "pharaoh",
            hint: "Ancient Egyptian ruler",
            image: "https://images.unsplash.com/photo-1608547222597-33fb6f8d5157?w=300&h=300&fit=crop",
          },
          {
            word: "artifact",
            hint: "Historical object made by humans",
            image: "https://images.unsplash.com/photo-1618840739221-e3adb12c9bf1?w=300&h=300&fit=crop",
          },
          {
            word: "hieroglyph",
            hint: "Ancient Egyptian writing system",
            image: "https://images.unsplash.com/photo-1552083974-186346191183?w=300&h=300&fit=crop",
          },
          {
            word: "civilization",
            hint: "Advanced human society with culture",
            image: "https://images.unsplash.com/photo-1606820854416-439b3305ff39?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 2,
        title: "Scientific Discoveries",
        story:
          "Step into Professor Parker's laboratory! He's conducting experiments and making discoveries about how our world works. Can you help him name the scientific concepts?",
        lesson: "Scientific terminology and concepts",
        words: [
          {
            word: "gravity",
            hint: "Force that pulls objects toward Earth",
            image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=300&h=300&fit=crop",
          },
          {
            word: "molecule",
            hint: "Group of atoms bonded together",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop",
          },
          {
            word: "ecosystem",
            hint: "Community of living things and environment",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
          },
          {
            word: "photosynthesis",
            hint: "Process plants use to make food from sunlight",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=300&fit=crop",
          },
          {
            word: "experiment",
            hint: "Test to discover or demonstrate something",
            image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 3,
        title: "Literary Classics",
        story:
          "Librarian Leo is organizing a special exhibition on classic literature! Help him identify important literary terms and famous works.",
        lesson: "Literary terminology and famous works",
        words: [
          {
            word: "novel",
            hint: "A long fictional story in book form",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
          },
          {
            word: "poetry",
            hint: "Writing that uses rhythm and sometimes rhymes",
            image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=300&h=300&fit=crop",
          },
          {
            word: "character",
            hint: "A person in a story or play",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
          },
          {
            word: "metaphor",
            hint: "Comparing two things without using 'like' or 'as'",
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=300&fit=crop",
          },
          {
            word: "dialogue",
            hint: "Words spoken by characters in a story",
            image: "https://images.unsplash.com/photo-1529473814998-077b4fec6770?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 4,
        title: "World Geography",
        story:
          "Geographer Grace is mapping the world! Help her identify important geographical features and locations.",
        lesson: "Geographical terms and world locations",
        words: [
          {
            word: "continent",
            hint: "One of the seven large land masses on Earth",
            image: "https://images.unsplash.com/photo-1589519160732-57fc6a9dfe37?w=300&h=300&fit=crop",
          },
          {
            word: "peninsula",
            hint: "Land surrounded by water on three sides",
            image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=300&h=300&fit=crop",
          },
          {
            word: "archipelago",
            hint: "A group of islands",
            image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=300&h=300&fit=crop",
          },
          {
            word: "equator",
            hint: "Imaginary line around the middle of Earth",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=300&fit=crop",
          },
          {
            word: "plateau",
            hint: "A large flat area of land that is higher than the surrounding land",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 5,
        title: "Historical Figures",
        story:
          "Historian Helen is creating a timeline of important people throughout history! Help her identify famous historical figures and their contributions.",
        lesson: "Famous historical figures and their achievements",
        words: [
          {
            word: "inventor",
            hint: "Person who creates new things",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop",
          },
          {
            word: "explorer",
            hint: "Person who travels to discover new places",
            image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=300&h=300&fit=crop",
          },
          {
            word: "scientist",
            hint: "Person who studies the natural world",
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&h=300&fit=crop",
          },
          {
            word: "monarch",
            hint: "A king or queen",
            image: "https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?w=300&h=300&fit=crop",
          },
          {
            word: "philosopher",
            hint: "Person who studies ideas about knowledge and existence",
            image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 6,
        title: "Mathematical Concepts",
        story:
          "Mathematician Morgan is solving complex problems! Help identify mathematical terms and concepts used in advanced calculations.",
        lesson: "Mathematical terminology and concepts",
        words: [
          {
            word: "fraction",
            hint: "A part of a whole number",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop",
          },
          {
            word: "equation",
            hint: "Mathematical statement showing two expressions are equal",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop",
          },
          {
            word: "geometry",
            hint: "Branch of math dealing with shapes and spaces",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=300&fit=crop",
          },
          {
            word: "algebra",
            hint: "Branch of math using letters to represent numbers",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop",
          },
          {
            word: "calculus",
            hint: "Advanced math dealing with rates of change",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 7,
        title: "Technological Innovations",
        story:
          "Tech Innovator Tina is showcasing the latest technological breakthroughs! Help her explain important tech concepts and devices.",
        lesson: "Technology terminology and concepts",
        words: [
          {
            word: "computer",
            hint: "Electronic device that processes data",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop",
          },
          {
            word: "internet",
            hint: "Global network connecting computers",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=300&fit=crop",
          },
          {
            word: "algorithm",
            hint: "Step-by-step procedure for calculations",
            image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=300&h=300&fit=crop",
          },
          {
            word: "software",
            hint: "Programs and operating information for computers",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=300&fit=crop",
          },
          {
            word: "database",
            hint: "Organized collection of data",
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 8,
        title: "Environmental Science",
        story:
          "Environmental Scientist Eliza is studying ecosystems! Help her identify important environmental concepts and issues.",
        lesson: "Environmental terminology and concepts",
        words: [
          {
            word: "climate",
            hint: "Weather conditions in an area over a long period",
            image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=300&h=300&fit=crop",
          },
          {
            word: "pollution",
            hint: "Harmful substances in the environment",
            image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=300&fit=crop",
          },
          {
            word: "biodiversity",
            hint: "Variety of plant and animal life in a habitat",
            image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=300&h=300&fit=crop",
          },
          {
            word: "conservation",
            hint: "Protection of natural resources",
            image: "https://images.unsplash.com/photo-1618477202872-5b9142f23e93?w=300&h=300&fit=crop",
          },
          {
            word: "renewable",
            hint: "Resource that can be naturally replaced",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 9,
        title: "Cultural Traditions",
        story:
          "Cultural Anthropologist Camila is studying traditions around the world! Help her identify important cultural concepts and practices.",
        lesson: "Cultural terminology and global traditions",
        words: [
          {
            word: "festival",
            hint: "Special celebration with customs and ceremonies",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
          },
          {
            word: "tradition",
            hint: "Custom passed down from generation to generation",
            image: "https://images.unsplash.com/photo-1604431696980-07c753e1c4b9?w=300&h=300&fit=crop",
          },
          {
            word: "heritage",
            hint: "Traditions and achievements passed down over time",
            image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=300&h=300&fit=crop",
          },
          {
            word: "ceremony",
            hint: "Formal event performed on special occasions",
            image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=300&h=300&fit=crop",
          },
          {
            word: "cuisine",
            hint: "Style of cooking specific to a country or region",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
          },
        ],
      },
      {
        id: 10,
        title: "Astronomical Wonders",
        story:
          "Astronomer Astra is observing the night sky! Help her identify celestial objects and astronomical phenomena.",
        lesson: "Astronomy terminology and celestial objects",
        words: [
          {
            word: "constellation",
            hint: "Group of stars forming a pattern",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=300&fit=crop",
          },
          {
            word: "nebula",
            hint: "Cloud of gas and dust in space",
            image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
          },
          {
            word: "telescope",
            hint: "Instrument used to view distant objects in space",
            image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=300&h=300&fit=crop",
          },
          {
            word: "satellite",
            hint: "Object that orbits around a planet",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=300&fit=crop",
          },
          {
            word: "eclipse",
            hint: "When one celestial body blocks light from another",
            image: "https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?w=300&h=300&fit=crop",
          },
        ],
      },
    ],
  }

  const getLevelData = useCallback((difficulty: Difficulty, level: number) => {
    const levelIndex = level - 1
    const difficultyLevels = levels[difficulty]

    if (levelIndex >= 0 && levelIndex < difficultyLevels.length) {
      return difficultyLevels[levelIndex]
    }

    // Fallback to first level if requested level doesn't exist
    return difficultyLevels[0]
  }, [])

  return {
    levels,
    getLevelData,
  }
}

function init() {
    // I took out the linebreaks after the opening brackets so the name will still display when the block is collapsed in my IDE :P
    // partialDeck's declaration relies on the specific order of cards in fullDeck
    fullDeck = [
        {   name: "Vizier",
            desc: "At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.",
            wildness: 0.4,
            worth: 0.8
        },
        {   name: "Sun",
            desc: "You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands.",
            noXPDesc: "You gain two levels, and a woundrous item (which the DM determines randomly) appears in your hands.",
            noLevelDesc: "You gain a feat of your choice, and a woundrous item (which the DM determines randomly) appears in your hands.",
            wildness: 0.7,
            worth: 1.0
        },
        {   name: "Moon",
            desc: "You are granted the ability to cast the <i>wish</i> spell 1d3 times.",
            wildness: 1.0,
            worth: 1.0
        },
        {   name: "Star",
            desc: "Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24.",
            wildness: 0.0,
            worth: 0.9
        },
        {   name: "Comet",
            desc: "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.",
            noXPDesc: "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain one level. Otherwise, this card has no effect.",
            noLevelDesc: "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you have advantage on all ability checks made using one skill of your choice. Otherwise, this card has no effect.",
            wildness: 0.4,
            worth: 0.6
        },
        {   name: "The Fates",
            desc: "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.",
            wildness: 1.0,
            worth: 1.0
        },
        {   name: "Throne",
            desc: "You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.",
            wildness: 0.3,
            worth: 0.7
        },
        {   name: "Key",
            desc: "A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon.",
            wildness: 0.2,
            worth: 0.8
        },
        {   name: "Knight",
            desc: "You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.",
            wildness: 0.5,
            worth: 0.8
        },
        {   name: "Gem",
            desc: "Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet.",
            wildness: 0.0,
            worth: 0.7
        },
        {   name: "Talons",
            desc: "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.",
            wildness: 0.6,
            worth: 0.1
        },
        {   name: "The Void",
            desc: "This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A <i>wish</i> spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards.",
            drawsEffect: "nomore",
            wildness: 1.0,
            worth: 0.0
        },
        {   name: "Flames",
            desc: "A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.",
            wildness: 0.3,
            worth: 0.3
        },
        {   name: "Skull",
            desc: "You summon an avatar of death&mdash;a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.",
            wildness: 0.2,
            worth: 0.4
        },
        {   name: "Idiot",
            desc: "Permanently reduce your Intelligence by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.",
            drawsEffect: "optional",
            draws: 1,
            wildness: 0.2,
            worth: 0.2
        },
        {   name: "Donjon",
            desc: "You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a <i>wish</i> spell can reveal the location of your prison. You draw no more cards.",
            drawsEffect: "nomore",
            wildness: 0.9,
            worth: 0.0
        },
        {   name: "Ruin",
            desc: "All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.",
            wildness: 0.5,
            worth: 0.2
        },
        {   name: "Euryale",
            desc: "The card's medusa-like visage curses you. You take a &minus;2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse.",
            wildness: 0.3,
            worth: 0.1
        },
        {   name: "Rogue",
            desc: "A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a <i>wish</i> spell or divine intervention can end the NPC's hostility toward you.",
            wildness: 0.1,
            worth: 0.4
        },
        {   name: "Balance",
            desc: "Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.",
            wildness: 0.5,
            worth: 0.4
        },
        {   name: "Fool",
            desc: "You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level.",
            noXPDesc: "You have disadvantage on all ability checks made using one skill of the DM's choice. Discard this card and draw from the deck again, counting both draws as one of your declared draws.",
            drawsEffect: "forced",
            draws: 1,
            reappears: false,
            wildness: 0.2,
            worth: 0.3
        },
        {   name: "Jester",
            desc: "You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.",
            noXPDesc: "You gain one level, or you can draw two additional cards beyond your declared draws.",
            noLevelDesc: "You gain proficiency in two skills of your choice, or you can draw two additional cards beyond your declared draws.",
            drawsEffect: "optional",
            draws: 2,
            reappears: false,
            wildness: 0.2,
            worth: 0.7
        }
    ];

    partialDeck = [
        fullDeck[1],
        fullDeck[2],
        fullDeck[3],
        fullDeck[6],
        fullDeck[7],
        fullDeck[8],
        fullDeck[11],
        fullDeck[12],
        fullDeck[13],
        fullDeck[16],
        fullDeck[17],
        fullDeck[18],
        fullDeck[21]
    ];
    
    homebrewDeck = [
        {   name: "Changeling",
            desc: "Your body crumbles to dust, which immediately reconstitutes itself into a new body for you. Roll on the Reincarnate Races table from the <i>reincarnate</i> spell to determine your new race. Your racial traits change accordingly.",
            wildness: 0.4,
            worth: 0.4
        },
        {   name: "Torch",
            desc: "All items you are wearing or carrying begin glowing as if affected by a <i>light</i> cantrip that lasts until dispelled.",
            wildness: 0.0,
            worth: 0.5
        },
        {   name: "Superbia",
            desc: "Permanently increase your highest ability score by 3, to a maximum of 30. If multiple ability scores tie for your highest, choose one to increase. Permanently reduce all your other ability scores by 1, to a minimum of 1.",
            wildness: 0.3,
            worth: 0.4
        },
        {   name: "Thief",
            desc: "One of your valuable possessions (chosen by the DM) vanishes and reappears in the possession of one of your enemies.",
            wildness: 0.2,
            worth: 0.3
        },
        {   name: "Nightmare",
            desc: "You are stricken with a recurring nightmare. When you finish a long rest, the hit points you regain can't exceed half your hit point maximum, and you regain only one-fourth of your spent Hit Dice (minimum of one die). If you don't need to sleep, this card has no effect.",
            wildness: 0.3,
            worth: 0.3
        },
        {   name: "Ferryman",
            desc: "Your connection to mortality weakens. You die when you have two failed death saving throws, rather than three.",
            wildness: 0.1,
            worth: 0.2
        },
        {   name: "Wailing",
            desc: "When you draw this card, you drop to 0 hit points. You can draw one additional card beyond your declared draws.",
            drawsEffect: "optional",
            draws: 1,
            wildness: 0.1,
            worth: 0.2
        },
        {   name: "Fairy",
            desc: "You gain the benefits of a long rest, your exhaustion level is reduced to 0, and you end all effects that reduce your hit point maximum or ability scores. All curses affecting you are lifted, including your attunement to cursed magic items.",
            wildness: 0.4,
            worth: 0.8
        },
        {   name: "Lottery",
            desc: "A common magic item (chosen by the DM) appears in your hands, or you can draw five additional cards beyond your declared draws. If you choose to draw the additional cards, you can negate one card's effect when you draw it.",
            drawsEffect: "optional",
            draws: 5,
            onDrawMore: function() {vetoes += 1;},
            reappears: false,
            wildness: 0.5,
            worth: 0.6
        },
        {   name: "Lycanthrope",
            desc: "At the next dusk after you draw this card, you transform as if affected by the <i>polymorph</i> spell. The DM chooses the beast you turn into and controls you while you're transformed, as you're driven to kill every creature you encounter. At the end of each hour until the following dawn, you regain 1 hit point, then transform again.",
            wildness: 0.5,
            worth: 0.3
        },
        {   name: "Leylines",
            desc: "Choose any spell, and choose Intelligence, Wisdom, or Charisma as your spellcasting ability for it. You can cast the spell once without spending a spell slot. When you do, roll a d12. If the spell level is less than the result, you regain the ability to cast it when you next finish a long rest.",
            wildness: 1.0,
            worth: 1.0
        },
        {   name: "Vessel",
            desc: "The magic of this card suffuses you. You gain experience points enough to gain a level, and the level must be gained in the sorcerer class (even if you don't meet the ability score requirements for multiclassing).",
            noXPDesc: "The magic of this card suffuses you. You gain a level in the sorcerer class (even if you don't meet the ability score requirements for multiclassing).",
            noLevelDesc: "The magic of this card suffuses you. You learn four cantrips and two 1st-level spells from the sorcerer spell list. You can cast each 1st-level spell once without spending a spell slot, and you regain the ability to do so when you finish a long rest. You can also cast them with any spell slots you have. Charisma is your spellcasting ability for these spells.",
            reappears: false,
            wildness: 0.8,
            worth: 0.9
        },
        {   name: "Medic",
            desc: "You gain the ability to cast the <i>power word heal</i> spell 3 times. You can't target yourself with it.",
            wildness: 0.8,
            worth: 1.0
        },
        {   name: "Meteor",
            desc: "Choose one 1st- or 2nd-level spell from any spell list, and choose Intelligence, Wisdom, or Charisma as your spellcasting ability for it. You can cast the spell once as a 13th-level spell.",
            wildness: 0.7,
            worth: 1.0
        },
        {   name: "Doldrums",
            desc: "You gain a level of exhaustion. Rest can't reduce your exhaustion level below 1. If your exhaustion level is reduced to 0 another way, you regain a level of exhaustion after 24 hours. Only a <i>wish</i> spell or divine intervention can end this effect.",
            wildness: 0.4,
            worth: 0.2
        },
        {   name: "Inquisitor",
            desc: "When you ask a yes-or-no question, you can force a creature that hears and understands it to give you a truthful answer, to the best of its knowledge. You can't use this ability more than once on the same creature.",
            wildness: 0.2,
            worth: 0.9
        },
        {   name: "Oaf",
            desc: "Choose two skills with which you are proficient. You have a &minus;5 penalty to all checks you make with those skills. The penalty can be removed only by a <i>wish</i> spell or divine intervention.",
            wildness: 0.5,
            worth: 0.1
        },
        {   name: "Forget-Me-Not",
            desc: "At some point within the next 7 days, an NPC who is friendly to you dies by sickness, old age, or an accident. You can draw one additional card beyond your declared draws.",
            drawsEffect: "optional",
            draws: 1,
            wildness: 0.5,
            worth: 0.4
        },
        {   name: "Ventriloquist",
            desc: "You learn the <i>minor illusion</i> cantrip. When you create a sound with it, you can cast it without any components. If you already know <i>minor illusion</i>, you learn another cantrip of your choice. Intelligence, Wisdom, or Charisma is your spellcasting ability for it (choose when you draw this card).",
            wildness: 0.0,
            worth: 0.8
        },
        {   name: "Sphinx",
            desc: "You learn an important secret, but the knowledge comes in the form of a cryptic message or riddle. The information is accurate but is steeped in metaphor or otherwise difficult to understand.",
            wildness: 0.3,
            worth: 0.7
        },
        {   name: "Daisy",
            desc: "Fey creatures are not hostile to you and will not attack you, unless you do something to provoke them. You can't be charmed, frightened, or possessed by fey.",
            wildness: 0.2,
            worth: 0.7
        },
        {   name: "Miner",
            desc: "A single block of gold worth 30,000 gp appears in the nearest unoccupied space. The gold weighs 700 pounds.",
            wildness: 0.1,
            worth: 0.7
        },
        {   name: "Harbinger",
            desc: "Three tarrasques appear in unoccupied spaces within 1 mile of you. The tarrasques always know where you are, but they are hostile to all creatures. Each tarrasque disappears after 3d4 days if it is not killed before then.", 
            wildness: 1.0,
            worth: 0.0
        },
        {   name: "The Deep",
            desc: "Your body becomes adapted to life underwater. You gain a swimming speed of 60 feet and can breathe air and water. You can't benefit from a long rest unless you spend at least 1 hour of it fully submerged in water.",
            wildness: 0.3,
            worth: 0.5
        },
        {   name: "Academia",
            desc: "Your Intelligence score increases by 10 (to a maximum of 30), and your Strength score is reduced by 10 (to a minimum of 1). Each day at dawn, your Intelligence score is reduced by 1 and your Strength score increases by 1; this continues for 1d4 + 4 days, after which the remaining changes become permanent.",
            wildness: 0.3,
            worth: 0.4
        },
        {   name: "Bitter Cold",
            desc: "This card curses to feel as though you're exposed to extreme cold. While cursed in this way, you are vulnerable to cold damage, and you must make a DC 10 Constitution saving throw at the end of each hour, gaining a level of exhaustion on a failed save. You succeed on the save automatically if you are wearing clothing suited for cold weather.",
            wildness: 0.4,
            worth: 0.1
        },
        {   name: "Summons",
            desc: "Once within the next 30 days, you can name or describe one creature. The creature appears in the nearest unoccupied space to you, even if it was on another plane of existence. If you use a broad description that matches more than one creature (such as \"a human blacksmith\"), the nearest one is summoned.",
            wildness: 0.5,
            worth: 0.6
        },
        {   name: "Connection",
            desc: "You can cast the <i>detect thoughts</i> spell once without expending a spell slot, and you regain the ability to do so when you finish a long rest. When you cast it in this way, creatures you focus on automatically know you are probing into their minds, and they can read your mind in the same way for as long as you focus on them.",
            wildness: 0.4,
            worth: 0.6
        },
        {   name: "Waif",
            desc: "You vanish from your current plane of existence, leaving the deck behind, and appear in the Ethereal Plane. While there, you can't cast spells that would bring you to another plane. You can see and hear the plane you originated from, which is cast in shades of gray, out to a range of 60 feet. You can only affect and be affected by other creatures on the Ethereal Plane. Creatures that aren't there can't perceive you or interact with you, unless they have the ability to do so. You draw no more cards.",
            drawsEffect: "nomore",
            wildness: 0.8,
            worth: 0.1
        },
        {   name: "Martyr",
            desc: "You can cast the <i>wish</i> spell once without using a spell slot, and you regain the ability to do so when you finish a long rest. When you cast <i>wish</i> in this way, you drop to 0 hit points and immediately roll all of your death saving throws until you die or become stable. If you die as a result, you can't be brought back to life.",
            wildness: 0.9,
            worth: 0.9
        },
        {   name: "Golem",
            desc: "You lose your ability to feel pain. The DM tracks your hit points for you; you must use an action to make a DC 13 Wisdom (Medicine) check to learn your current number of hit points. Additionally, being at 0 hit points doesn't render you unconscious while you are in combat, and the DM rolls your death saving throws in secret.",
            wildness: 0.6,
            worth: 0.4
        },
        {   name: "The Unsung",
            desc: "Your identity is lost from the world. Every creature who has ever known or met you forgets that they have, and all evidence of your existence before you drew this card is erased. Only a god or the magic of The Fates card can restore the memories and evidence of your existence.",
            wildness: 0.9,
            worth: 0.1
        },
        {   name: "Altar",
            desc: "This card demands sacrifice. Choose one or more things to forfeit; they can be possessions, memories, abilities, or anything else that is yours to give up. Whatever you choose is lost to you. If the DM deems the sacrifice insufficient, you must keep making sacrifices until you have lost enough. The DM determines how much is enough; a sacrifice equivalent to two or three of the character's most valuable possessions is typically enough.",
            wildness: 0.8,
            worth: 0.1
        },
        {   name: "Aegis",
            desc: "You gain proficiency with shields, and you gain the service of a fey spirit which takes the form of an <i>animated shield</i> that appears at your feet. When you activate it, and as a bonus action while it is animated, you can choose a creature within 60 feet of you and cause the shield to move to and protect that creature.",
            wildness: 0.3,
            worth: 0.9
        },
        {   name: "Feast",
            desc: "You are cured of all diseases and poison, become immune to poison and being frightened, and make all Wisdom saving throws with advantage. Your hit point maximum increases by 2d10, and you gain the same number of hit points.",
            wildness: 0.8,
            worth: 1.0
        },
        {   name: "Famine",
            desc: "You lose any immunity or resistance you have to poison and disease. You are vulnerable to poison damage and have disadvantage on saving throws against poison, disease, and the frightened condition. Your hit point maximum decreases by 2d10, to a minimum of 1.",
            wildness: 0.7,
            worth: 0.0
        },
        {   name: "Liar",
            desc: "You automatically fail any ability check you make to discern an illusion and any saving throw you make against an illusion spell. You can't benefit from truesight.",
            wildness: 0.4,
            worth: 0.1
        },
        {   name: "Obol",
            desc: "You gain proficiency in death saving throws. You can't become undead after you die. Unless you are willing, you can't be sent to another plane of existence, and your soul can't be removed from your body by any means except death. With a touch, you can transfer all of this card's effects to another creature; you no longer have the effects if you do this. If you are a construct or undead, you don't gain this card's benefits, but you can still transfer them to another creature.",
            wildness: 0.2,
            worth: 0.7
        },
        {   name: "Hummingbird",
            desc: "You gain an extra reaction you can take each round. This extra reaction can't be used on the same turn that you use your normal reaction, and you can't use it to take an action you prepared with the Ready action.",
            wildness: 0.3,
            worth: 0.8
        },
        {   name: "Blood",
            desc: "Whenever you take damage, you can reduce the damage by any amount. When you do, your hit point maximum is permanently reduced by one-fourth of that amount (rounded up). You die if your hit point maximum is reduced to zero.",
            wildness: 0.5,
            worth: 0.6
        },
        {   name: "Diagram",
            desc: "Whenever you finish a long rest, roll 2d12 and add your Intelligence modifier. Your Intelligence score becomes the total (minimum of 1) until you finish your next long rest. Use your original Intelligence score when rolling for this card's effect, not the altered score.",
            wildness: 0.7, // shoutouts to The Stormlight Archive
            worth: 0.6
        },
        {   name: "Prophet",
            desc: "Four ivory strips worth 50 gp each, and incense worth 1000 gp, appear at your feet. You can cast the <i>legend lore</i> spell once without using a spell slot, and you regain the ability to do so when you finish a long rest.",
            wildness: 0.5,
            worth: 0.8
        },
        {   name: "Pariah",
            desc: "Permanently reduce your Charisma score by 1, to a minimum of 4. You have disadvantage on Charisma checks you make to interact socially with humanoids.",
            wildness: 0.5,
            worth: 0.0
        },
        {   name: "Barrier",
            desc: "You can't teleport or travel to other planes of existence, regardless of whether you are willing. This effect lasts until you die.",
            wildness: 0.1,
            worth: 0.5
        },
        {   name: "Dragon",
            desc: "You gain the ability to transform into an adult dragon of your choice, as if by the <i>shapechange</i> spell (no concentration required). You can use this ability once.",
            wildness: 0.5,
            worth: 1.0
        },
        {   name: "The Devil",
            desc: "You are telepathically contacted by a powerful fiend and offered a deal, with the specifics determined by the DM. The fiend typically offers a great power or valuable item and typically asks for a specific task or quest to be completed. If you decline the deal, the fiend will offer it to one of your enemies instead.",
            wildness: 0.6,
            worth: 0.6
        },
        {   name: "Memory",
            desc: "You can ask the DM one question about the past, and you see a vision of a moment in the past which directly relates to the answer. The vision lasts no longer than a minute. You can use this card's magic as soon as you draw it or at any other time before you die.",
            wildness: 0.5,
            worth: 0.9
        },
        {   name: "Phoenix",
            desc: "After you die, burning your remains to ash indefinitely extends the time limit on spells that raise you from the dead. Any spell which would revive you has the same effects as <i>true resurrection</i>, provided your remains were burned within the spell's original time limit and the caster touches the ashes. When you drop to 0 hit points, you can choose to be engulfed in flame, dying and turning to ash immediately.",
            wildness: 0.8,
            worth: 1.0
        }
    ];
    
    // Reflect how many cards are in the homebrew deck
    l("allDeckCount").innerHTML = "(" + (fullDeck.length + homebrewDeck.length) + " cards)";
    
    l("initRandDeclInput").value = 1;
    l("initRandDeclInput").onchange();
    vetoes = 0;
    deck = [];
    lastCard = {};
    drawing = false;
}

function analyzeDeck(arr) {
    let wildSum = 0, worthSum = 0;
    for (i in arr) {
        if (arr[i]) {
            if (arr[i].wildness !== undefined) wildSum += arr[i].wildness;
            if (arr[i].worth !== undefined) worthSum += arr[i].worth;
        }
    }
    console.log("Wildness: " + (wildSum / arr.length));
    console.log("Worth: " + (worthSum / arr.length));
}

function fadeOut(id, milliseconds, andThen) {
    if (milliseconds === undefined) milliseconds = 250;

    var op = 1;
    var timer = setInterval(function() {
        if (op >= 0.1) {
            setOpacity(id, op);
            op -= (50 / milliseconds);
        } else {
            clearInterval(timer);
            l(id).hidden = true;
            setOpacity(id, 1); // Return opacity to normal for when it's unhidden later
            if (typeof andThen === "function")
                andThen();
        }
    }, 50);
}

function fadeIn(id, milliseconds, andThen) {
    if (milliseconds === undefined) milliseconds = 250;

    var op = 0;
    var timer = setInterval(function() {
        if (op <= 0.9) {
            setOpacity(id, op);
            op += (50 / milliseconds);
            l(id).hidden = false;
        } else {
            setOpacity(id, 1);
            clearInterval(timer);
            if (typeof andThen === "function")
                andThen();
        }
    }, 50);
}

function fadeTransition(from, to, milliseconds, andThen) {
    if (milliseconds === undefined) milliseconds = 500;
    fadeOut(from, milliseconds / 2, function(){fadeIn(to, milliseconds / 2, andThen)});
}

function setOpacity(id, opacity) {
    l(id).style.opacity = opacity;
    l(id).style.filter = "alpha(opacity=" + (opacity * 100) + ")";
}

function l(id) {
    // L for eLement
    if (id instanceof Node) return id;
    
    return document.getElementById(id);
}

function getOrCreate(tagName, id, innerHTML) {
    if (l(id)) {
        let el = l(id);
        if (innerHTML === "") {
            el.innerHTML = "";
        }
        return el;
    }
    return createElement(tagName, id, innerHTML);
}

function createElement(tagName, id, innerHTML) {
    let el = document.createElement(tagName);
    if (id) {
        el.id = id;
    }
    if (innerHTML) {
        el.innerHTML = innerHTML;
    }
    return el;
}

function createButton(id, onclick, innerHTML) {
    let btn = getOrCreate("button", id, innerHTML);
    btn.type = "button";
    btn.onclick = onclick;
    return btn;
}

function createOption(value, innerHTML) {
    let opt = createElement("option", undefined, innerHTML);
    opt.value = value;
    return opt;
}

function createRadio(group, value, label, valueHolder, selected) {
    let el = getOrCreate("input", group + "_" + value);
    el.type = "radio";
    el.name = group;
    el.value = value;
    el.onclick = function() { valueHolder.value = el.value; };
    if (selected) {
        el.checked = true;
        el.onclick();
    }

    let lbl = createElement("label", undefined, label);
    lbl.htmlFor = el.id;
    
    let div = createElement("div");
    div.appendChild(el);
    div.appendChild(lbl);

    return div;
}

function createCustomCardNode(card, i) {
    let cardContainer = getOrCreate("div", "customCardContainer" + i);
    cardContainer.innerHTML = "";
    cardContainer.className = "customCardContainer";

    let cardNode = getOrCreate("div", "customCard" + i);
    cardNode.innerHTML = "";
    cardNode.className = "customCard";
    cardContainer.appendChild(cardNode);

    // Card name
    let nameInput = getOrCreate("input", "customCardName" + i);
    nameInput.className = "cardNameInput";
    nameInput.value = (card.name !== undefined)? card.name : "";
    nameInput.onchange = function(){card.name = nameInput.value};
    nameInput.onchange();
    cardNode.appendChild(nameInput);

    // Card description
    let descInput = getOrCreate("textarea", "customCardDesc" + i);
    descInput.className = "cardDescInput";
    descInput.value = (card.desc !== undefined)? card.desc : "";
    descInput.onchange = function(){card.desc = descInput.value};
    descInput.onchange();
    cardNode.appendChild(descInput);

    // Card draws effect
    let drawsEffectNode = createElement("div");
    let drawsEffectSelector = getOrCreate("select", "drawsEffectSelector" + i);
    drawsEffectSelector.innerHTML = "";
    drawsEffectSelector.appendChild(createOption("noeffect", "Doesn't affect draws"));
    drawsEffectSelector.appendChild(createOption("nomore", "Prevents further draws"));
    drawsEffectSelector.appendChild(createOption("forced", "Forces additional draw(s): "));
    drawsEffectSelector.appendChild(createOption("optional", "Allows additional draw(s): "));
    drawsEffectSelector.value = (card.drawsEffect)? card.drawsEffect : "noeffect";
    drawsEffectNode.appendChild(drawsEffectSelector);
    // Card draws number
    let drawsInput = getOrCreate("input", "drawsInput" + i);
    drawsInput.className = "numInput";
    drawsInput.type = "number";
    drawsInput.value = (card.draws !== undefined)? card.draws : 1;
    drawsInput.min = 1;
    drawsInput.onchange = function() {
        if (!(drawsInput.valueAsNumber >= 1))
            drawsInput.value = 1;
        drawsInput.value = Math.floor(drawsInput.valueAsNumber);
        card.draws = drawsInput.valueAsNumber;
    };
    drawsInput.onchange();
    drawsEffectNode.appendChild(drawsInput);
    cardNode.appendChild(drawsEffectNode);

    drawsEffectSelector.onchange = function(){
        let f = drawsEffectSelector.value;
        card.drawsEffect = f;
        drawsInput.hidden = (f != "optional" && f != "forced");
    };
    drawsEffectSelector.onchange();

    let reappearsNode = createElement("div");
    let reappearsCheckbox = getOrCreate("input", "reappearsCheckbox" + i);
    reappearsCheckbox.type = "checkbox";
    reappearsCheckbox.checked = (card.reappears !== false);
    reappearsCheckbox.onchange = function() {card.reappears = reappearsCheckbox.checked;};
    let reappearsLabel = createElement("label");
    reappearsLabel.htmlFor = "reappearsCheckbox" + i;
    reappearsLabel.innerHTML = "Reappears in deck";
    reappearsNode.appendChild(reappearsCheckbox);
    reappearsNode.appendChild(reappearsLabel);
    cardNode.appendChild(reappearsNode);

    // Remove card button
    let removeBtnHolder = createElement("div");
    removeBtnHolder.appendChild(createButton("removeCardBtn" + i, function() {
        deck[i] = null; // nulls will filtered out before drawing; for now, keep correlation between element id and deck index
        l("fullCustomCardsNode").removeChild(cardContainer);
        
        // No fade unless we can get the other cards to slide slickly to their new positions.
        // (Fade doesn't look cool if another card instantly teleports into the vacated space)
        // fadeOut(cardContainer, 150, function() {l("fullCustomCardsNode").removeChild(cardContainer)});
    }, "Remove card"));
    cardNode.appendChild(removeBtnHolder);

    return cardContainer;
}

function cardOrCards(num) {
    return (num == 1)? "card" : "cards";
}

function setDeckType() {
    deckType = l("deckTypeSelector").value;
    switch (deckType) {
        case "random":
        case "partial":
        case "full":
        case "all":
            l("initialDeclaredDraws").hidden = false;
            break;
        case "custom":
        case "fullCustom":
        case "imported":
            l("initialDeclaredDraws").hidden = true;
            break;
        default:
            console.log("Unknown deck type!");
            l("initialDeclaredDraws").hidden = false;
            break;
    }
}

function adjustDeclaredDraws(amount) {
    declaredDraws += amount;
    setDeclaredDraws();
}

function setDeclaredDraws(inputElement) {
    if (inputElement) {
        declaredDraws = Math.floor(inputElement.valueAsNumber);
    }
    // Don't let the maniacs type in negative numbers or erase the input
    if (!(declaredDraws >= 1)) {
        declaredDraws = 1;
    }
    
    // Update all the declaredDrawsInputs to have the value the user just put in
    let inputs = document.getElementsByClassName("declaredDrawsInput");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = declaredDraws;
    }
}

function readyDeck(type) {
    if (type === undefined) {
        setDeckType();
    } else {
        deckType = type;
    }

    fadeTransition("initialConfig", "drawingNode");

    switch (deckType) {
        case "random":
            deck = ((Math.random() < 0.25)? fullDeck : partialDeck).map(card => ({...card}));;
            draw();
            break;
        case "partial":
            deck = partialDeck.map(card => ({...card}));
            draw();
            break;
        case "full":
            deck = fullDeck.map(card => ({...card}));
            draw();
            break;
        case "all":
            deck = fullDeck.concat(homebrewDeck).map(card => ({...card}));;
            draw();
            break;
    }
}

function setCustWild() {
    custWildBias = l("custWildStrSelector").value;

    let valSelect = l("custWildValSelector");
    if (custWildBias == "off") {
        valSelect.hidden = true;
    } else {
        valSelect.hidden = false;
        custWildVal = parseFloat(valSelect.value);
    }
}

function setCustWorth() {
    custWorthBias = l("custWorthStrSelector").value;

    let valSelect = l("custWorthValSelector");
    if (custWorthBias == "off") {
        valSelect.hidden = true;
    } else {
        valSelect.hidden = false;
        custWorthVal = parseFloat(valSelect.value);
    }
}

function customize() {
    fadeTransition("initialConfig", "customMenu");

    l("custCardSrcSelector").value = "all";
    l("custCardSrcSelector").onchange();
    
    l("custWildStrSelector").value = "off";
    l("custWildValSelector").value = "0.5";
    setCustWild();
    l("custWorthStrSelector").value = "off";
    l("custWorthValSelector").value = "0.5";
    setCustWorth();
    
    l("custXPDefault").checked = true;
    l("custXPDefault").onclick();
}

function finishCustomization(andThen) {
    // Start with (a copy of) the deck to use
    switch (custCardSrc) {
        case "partial":
            deck = copyObjectArray(partialDeck);
            break;
        case "full":
            deck = copyObjectArray(fullDeck);
            break;
        case "all":
            deck = copyObjectArray(fullDeck.concat(homebrewDeck));
            break;
        case "homebrew":
            deck = copyObjectArray(homebrewDeck);
            break;
        default:
            console.error("Unknown card source: " + custCardSrc);
            deck = [];
            break;
    }

    // Filter by wildness
    if (custWildBias == "weak") {
        deck = deck.filter(x => fits(x.wildness, custWildVal, 1.5));
    } else if (custWildBias == "strong") {
        deck = deck.filter(x => fits(x.wildness, custWildVal, 3));
    }
    // Filter by worth
    if (custWorthBias == "weak") {
        deck = deck.filter(x => fits(x.worth, custWorthVal, 1.5));
    } else if (custWorthBias == "strong") {
        deck = deck.filter(x => fits(x.worth, custWorthVal, 3));
    }

    if (custXP == "noxp") {
        deck.forEach(x => {
            if (x.noXPDesc)
                x.desc = x.noXPDesc;
            else if (x.noLevelDesc)
                x.desc = x.noLevelDesc;
        });
    } else if (custXP == "nolevel") {
        deck.forEach(x => {
            if (x.noLevelDesc)
                x.desc = x.noLevelDesc;
            else if (x.noXPDesc)
                x.desc = x.noXPDesc;
        });
    }

    switch (andThen) {
        case fullCustomize:
            fadeTransition("customMenu", "fullCustomMenu");
            break;
        case draw:
            fadeTransition("customMenu", "drawingNode");
            break;
    }
    if (typeof andThen === "function")
        andThen();
}

/**
 * Determines whether the val provided is sufficiently close to the target value.
 * If val == target, then true is always returned; otherwise, the probability of
 * returning true decreases as the difference between val and target grows. The
 * probability is never zero, but it approaches zero as the difference approaches
 * infinity. With a high strictness, the probability approaches zero more quickly.
 * 
 * @param {number} val - the input value
 * @param {number} target - the target value to compare val against
 * @param {number} strictness - how strongly a given difference will push the probability toward zero
 * @returns {number} true if val is randomly deemed sufficiently close to target
 */
function fits(val, target, strictness) {
    // Don't reject a undefined val as unfitting
    if (val === undefined) return true;

    // The closer val is to target, the more likely it is that true will be returned.
    // When val == target, the probability is 1.
    // High strictness makes the probability drop off quickly as val and target differ.
    // prob = e^(-(difference * strictness)^2)
    let prob = Math.exp(-(Math.pow((target - val) * strictness, 2)));
    return (Math.random() < prob);
}

function copyObjectArray(arr) {
    return arr.map(obj => ({...obj}));
}

function addCustomCard() {
    let newCard = {name: "New Card", desc: ""};
    deck.push(newCard);

    let cardNode = createCustomCardNode(newCard, deck.length - 1);
    setOpacity(cardNode, 0);
    l("fullCustomCardsNode").appendChild(cardNode);
    fadeIn(cardNode, 150);
}

function fullCustomize() {
    let fullCustomCardsNode = l("fullCustomCardsNode");
    fullCustomCardsNode.innerHTML = ""; // empty it out
    for (let i in deck) {
        fullCustomCardsNode.appendChild(createCustomCardNode(deck[i], i));
    }
}

function finishFullCustomization() {
    // Get rid of nulls (removed cards) before drawing
    deck = deck.filter(a => a !== null);

    fadeTransition("fullCustomMenu", "drawingNode");
    draw();
}

function drawMore() {
    declaredDraws += lastCard.draws;
    if (lastCard.onDrawMore)
        lastCard.onDrawMore();
    draw();
}

function startOver() {
    fadeTransition("drawingNode", "initialConfig", 1000, function() {l("drawnCards").innerHTML = ""});
    init();
}

function draw() {
    // declaredDraws can be 0 if user declined an optional draw-more from their last card.
    // In that case, skip to end-of-draw stuff.
    if (declaredDraws > 0 && deck.length > 0) { // we're really gonna draw a card
        // Pick a card, any card
        let cardIndex = Math.floor(Math.random() * deck.length);
        let card = deck[cardIndex];
        lastCard = card;
        if (card.reappears === false) {
            // Only certain cards vanish when drawn; the rest reappear in the deck and can be drawn again
            deck.splice(cardIndex, 1);
        }

        // Make the card node and put it in the drawnCards node
        let cardDiv = createElement("div");
        cardDiv.className = "drawnCard";
        setOpacity(cardDiv, 0);
        let cardName = createElement("h3", undefined, card.name);
        cardName.className = "drawnCardName";
        cardDiv.appendChild(cardName);
        cardDiv.appendChild(createElement("p", undefined, card.desc));
        
        l("drawnCards").appendChild(cardDiv);
        fadeIn(cardDiv);

        // Conditional changes to declaredDraws (including "nomore", which can be vetoed) are handled by the buttons
        declaredDraws -= 1;
        if (card.drawsEffect == "forced") {
            declaredDraws += card.draws;
        }
    }
    
    l("proceedNode").hidden = false;

    // If there are more cards, we might draw again, even if declaredDraws is now 0 (user may have the option to draw more)
    if (deck.length > 0) {
        l("proceedButtonHolder").hidden = false;

        let cardsLeftStr = "You have " + declaredDraws + " " + cardOrCards(declaredDraws) + " left to draw";
        if (lastCard.drawsEffect == "nomore") {
            if (vetoes > 0) {
                vetoes -= 1; // Even if they don't use it, they'll be done drawing so it won't matter that it's decremented
                l("proceedLabel").innerHTML = "Negate this card and continue drawing anyway? (" + cardsLeftStr + " if you do.)";
                l("proceedButton").innerHTML = "Yes"; // Continue drawing as if nothing happened
                l("drawMoreButton").hidden = true;
                l("noMoreButton").hidden = false; // Stop drawing
            } else {
                // You draw no more cards.
                declaredDraws = 0;
            }
        } else {
            l("noMoreButton").hidden = true; // can't just decide to stop drawing
        }

        if (lastCard.drawsEffect == "optional") {
            // "Proceed" button becomes "no" option (i.e. don't draw extra cards, just move on)
            l("proceedLabel").innerHTML = cardsLeftStr + ". Will you draw " + lastCard.draws + " additional " + cardOrCards(lastCard.draws) + "?";
            l("drawMoreButton").hidden = false;
            l("proceedButton").innerHTML = "No";
        } else if (declaredDraws > 0) {
            // You have more cards to draw. Go on...
            l("proceedLabel").innerHTML = cardsLeftStr + ".";
            l("drawMoreButton").hidden = true;
            l("proceedButton").innerHTML = "Proceed";
        } else {
            // You've drawn your last
            l("proceedNode").hidden = true;
        }
    } else {
        // Deck is empty
        l("proceedButtonHolder").hidden = true; // go away buttons!!

        if (declaredDraws > 0 || lastCard.drawsEffect == "optional") {
            // Tell them why they can't draw more cards: there are none
            l("proceedLabel").innerHTML = "There are no cards left in the deck.";
        }
    }
}

function exportDeck() {
    let copyTextarea = l("exportedText");
    copyTextarea.hidden = false;
    copyTextarea.value = JSON.stringify(deck);
    copyTextarea.focus();
    copyTextarea.select();
    try {
        let successful = document.execCommand('copy');
        if (successful) {
            alert("Deck has been copied to clipboard. You can import it by choosing that option when selecting the type of deck to use.");
        } else {
            alert("Failed to copy deck to clipboard");
        }
    } catch (err) {
        alert('Unable to copy! ' + err);
    }
    copyTextarea.hidden = true;
}

function importDeck() {
    fadeTransition("initialConfig", "importMenu");
    l("importTextarea").value = "[]";
}

function importAndThen(func) {
    try {
        deck = JSON.parse(importTextarea.value);
        switch (func) {
            case fullCustomize:
                fadeTransition("importMenu", "fullCustomMenu");
                break;
            case draw:
                fadeTransition("importMenu", "drawingNode");
                break;
            default:
                fadeOut("importMenu");
        }
        func();
    } catch (err) {
        alert("Import failed! " + err);
    }
}

init();
let vetoes = 0;
let deck = [];
let lastCard = {};
let drawing = false;
let advancedOptions = false;
let useCardWeight = false;

let declaredDraws = 1;
let wildParams = {};
let worthParams = {};

class Card {
	/**
	 * Constructs a Card with the given properties.
	 * @param {string} name
	 * @param {string} desc
	 * @param {number?} wildness
	 * @param {number?} worth
	 * @param {string?} noXPDesc
	 * @param {string?} noLevelDesc
	 * @param {string?} drawsEffect
	 * @param {number?} draws
	 * @param {boolean?} reappears
	 * @param {function?} onDrawMore
	 * @param {number?} weight
	 */
	constructor(name, desc, wildness, worth, noXPDesc, noLevelDesc, drawsEffect, draws, reappears, onDrawMore, weight) {
		this.name = (name !== undefined)? name : "";
		this.desc = (desc !== undefined)? desc : "";
		this.wildness = (wildness !== undefined)? wildness : 0.5;
		this.worth = (worth !== undefined)? worth : 0.5;
		this.noXPDesc = noXPDesc;
		this.noLevelDesc = noLevelDesc;
		this.drawsEffect = (drawsEffect !== undefined)? drawsEffect : "noeffect";
		this.draws = (draws !== undefined)? draws : 1;
		this.reappears = (reappears !== undefined)? reappears : true;
		this.onDrawMore = onDrawMore;
		this.weight = (weight !== undefined)? weight : 1.0;
	}
}

// partialDeck's declaration relies on the specific order of cards in fullDeck
let fullDeck = [
	new Card("Vizier",
			 "At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.",
			 0.4, 0.8),
	new Card("Sun",
			 "You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands.",
			 0.7, 1.0,
			 "You gain two levels, and a woundrous item (which the DM determines randomly) appears in your hands.",
			 "You gain a feat of your choice, and a woundrous item (which the DM determines randomly) appears in your hands."),
	new Card("Moon",
			 "You are granted the ability to cast the [wish](https://www.dndbeyond.com/spells/wish) spell 1d3 times.",
			 1.0, 1.0),
	new Card("Star",
			 "Increase one of your ability scores by 2. The score can exceed 20 but can't exceed 24.",
			 0.0, 1.0),
	new Card("Comet",
			 "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.",
			 0.4, 0.6,
			 "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain one level. Otherwise, this card has no effect.",
			 "If you single-handedly defeat the next hostile monster or group of monsters you encounter, you have advantage on all ability checks made using one skill of your choice. Otherwise, this card has no effect."),
	new Card("The Fates",
			 "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.",
			 1.0, 1.0),
	new Card("Throne",
			 "You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.",
			 0.2, 0.8),
	new Card("Key",
			 "A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon.",
			 0.2, 0.9),
	new Card("Knight",
			 "You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.",
			 0.5, 0.8),
	new Card("Gem",
			 "Twenty-five pieces of jewelry worth 2,000&nbsp;gp each or fifty gems worth 1,000&nbsp;gp each appear at your feet.",
			 0.0, 0.7),
	new Card("Talons",
			 "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.",
			 0.8, 0.1),
	new Card("The Void",
			 "This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A [wish](https://www.dndbeyond.com/spells/wish) spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards.",
			 1.0, 0.0,
			 undefined, undefined,
			 "nomore"),
	new Card("Flames",
			 "A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.",
			 0.3, 0.3),
	new Card("Skull",
			 "You summon an avatar of death&mdash;a ghostly humanoid skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.",
			 0.2, 0.3),
	new Card("Idiot",
			 "Permanently reduce your Intelligence by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.",
			 0.2, 0.2,
			 undefined, undefined,
			 "optional", 1),
	new Card("Donjon",
			 "You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a [wish](https://www.dndbeyond.com/spells/wish) spell can reveal the location of your prison. You draw no more cards.",
			 0.9, 0.0,
			 undefined, undefined,
			 "nomore"),
	new Card("Ruin",
			 "All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.",
			 0.7, 0.1),
	new Card("Euryale",
			 "The card's medusa-like visage curses you. You take a &minus;2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card can end this curse.",
			 0.3, 0.0),
	new Card("Rogue",
			 "A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a [wish](https://www.dndbeyond.com/spells/wish) spell or divine intervention can end the NPC's hostility toward you.",
			 0.1, 0.4),
	new Card("Balance",
			 "Your mind suffers a wrenching alteration, causing your alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.",
			 0.5, 0.4),
	new Card("Fool",
			 "You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level.",
			 0.2, 0.3,
			 "You have disadvantage on all ability checks made using one skill of the DM's choice. Discard this card and draw from the deck again, counting both draws as one of your declared draws.",
			 undefined,
			 "forced", 1,
			 false),
	new Card("Jester",
			 "You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.",
			 0.2, 0.7,
			 "You gain one level, or you can draw two additional cards beyond your declared draws.",
			 "You gain proficiency in two skills of your choice, or you can draw two additional cards beyond your declared draws.",
			 "optional", 2,
			 false),
];

let partialDeck = [
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
	fullDeck[21],
];

let homebrewDeck = [
	new Card("Changeling",
			 "Your body crumbles to dust, which immediately reconstitutes itself into a new body for you. Roll on the Reincarnate Races table from the [reincarnate](https://www.dndbeyond.com/spells/reincarnate) spell to determine your new race. Your racial traits change accordingly.",
			 0.4, 0.4),
	new Card("Torch",
			 "All items you are wearing or carrying begin glowing as if affected by a [light](https://www.dndbeyond.com/spells/light) cantrip that lasts until dispelled.",
			 0.0, 0.5),
	new Card("Superbia",
			 "Permanently increase your highest ability score by 3, to a maximum of 30. If multiple ability scores tie for your highest, choose one to increase. Permanently reduce all your other ability scores by 1, to a minimum of 1.",
			 0.3, 0.6),
	new Card("Thief",
			 "One of your valuable possessions (chosen by the DM) vanishes and reappears in the possession of one of your enemies.",
			 0.2, 0.3),
	new Card("Nightmare",
			 "You are stricken with a recurring nightmare. When you finish a long rest, the hit points you regain can't exceed half your hit point maximum, and you regain only one-fourth of your spent Hit Dice (minimum of one die). If you don't need to sleep, this card has no effect.",
			 0.3, 0.3),
	new Card("Ferryman",
			 "Your connection to mortality weakens. You die when you have two failed death saving throws, rather than three.",
			 0.2, 0.1),
	new Card("Wailing",
			 "When you draw this card, you drop to 0 hit points, and you gain vulnerability to psychic damage. You can draw one additional card beyond your declared draws.",
			 0.1, 0.2,
			 undefined, undefined,
			 "optional", 1),
	new Card("Fairy",
			 "You gain the benefits of a long rest, your exhaustion level is reduced to 0, and you end all effects that reduce your hit point maximum or ability scores. All curses affecting you are lifted, including your attunement to cursed magic items.",
			 0.3, 0.8),
	new Card("Lottery",
			 "A common magic item (chosen by the DM) appears in your hands, or you can draw five additional cards beyond your declared draws. If you choose to draw the additional cards, you can negate one card's effect when you draw it.",
			 0.5, 0.6,
			 undefined, undefined,
			 "optional", 5,
			 false,
			 () => {vetoes++}),
	new Card("Lycanthrope",
			 "At the next dusk after you draw this card, you transform as if affected by the [polymorph](https://www.dndbeyond.com/spells/polymorph) spell. The DM chooses the beast you turn into and controls you while you're transformed, as you're driven to kill every creature you encounter. At the end of each hour until the following dawn, you regain 1 hit point, then transform again.",
			 0.5, 0.3),
	new Card("Leylines",
			 "Choose any spell, and choose Intelligence, Wisdom, or Charisma as your spellcasting ability for it. You can cast the spell once without spending a spell slot. When you do, roll a d12. If the result equals or exceeds the spell level, you regain the ability to cast it when you next finish a long rest.",
			 1.0, 1.0),
	new Card("Vessel",
			 "The magic of this card suffuses you. You gain experience points enough to gain a level, and the level must be gained in the sorcerer class (even if you don't meet the ability score requirements for multiclassing).",
			 0.8, 0.9,
			 "The magic of this card suffuses you. You gain a level in the sorcerer class (even if you don't meet the ability score requirements for multiclassing).",
			 "The magic of this card suffuses you. You learn four cantrips and two 1st-level spells from the sorcerer spell list. You can cast each 1st-level spell once without spending a spell slot, and you regain the ability to do so when you finish a long rest. You can also cast them with any spell slots you have. Charisma is your spellcasting ability for these spells.",
			 undefined, undefined,
			 false),
	new Card("Medic",
			 "You gain the ability to cast the [power word heal](http://dnd5e.wikidot.com/spell:power-word-heal) spell 3 times. You can't target yourself with it.",
			 0.8, 1.0),
	new Card("Meteor",
			 "Choose one 1st- or 2nd-level spell from any spell list, and choose Intelligence, Wisdom, or Charisma as your spellcasting ability for it. You can cast the spell once as a 13th-level spell.",
			 0.7, 1.0),
	new Card("Doldrums",
			 "You gain a level of exhaustion. Rest can't reduce your exhaustion level below 1. If your exhaustion level is reduced to 0 another way, you regain a level of exhaustion after 24 hours. Only a [wish](https://www.dndbeyond.com/spells/wish) spell or divine intervention can end this effect.",
			 0.4, 0.2),
	new Card("Inquisitor",
			 "When you ask a yes-or-no question, you can force a creature that hears and understands it to give you a truthful answer, to the best of its knowledge. You can't use this ability more than once on the same creature.",
			 0.3, 0.9),
	new Card("Oaf",
			 "Choose two skills with which you are proficient. You have a &minus;5 penalty to all checks you make with those skills. The penalty can be removed only by a [wish](https://www.dndbeyond.com/spells/wish) spell or divine intervention.",
			 0.5, 0.1),
	new Card("Forget-Me-Not",
			 "At some point within the next 7 days, an NPC who is friendly to you dies by sickness, old age, or an accident. You can draw one additional card beyond your declared draws.",
			 0.5, 0.4,
			 "optional", 1),
	new Card("Ventriloquist",
			 "You learn the [minor illusion](https://www.dndbeyond.com/spells/minor-illusion) cantrip. When you create a sound with it, you can cast it without any components. If you already know _minor illusion_, you learn another cantrip of your choice. Intelligence, Wisdom, or Charisma is your spellcasting ability for it (choose when you draw this card).",
			 0.0, 0.8),
	new Card("Sphinx",
			 "You learn an important secret, but the knowledge comes in the form of a cryptic message or riddle. The information is accurate but is steeped in metaphor or otherwise difficult to understand.",
			 0.2, 0.7),
	new Card("Daisy",
			 "Fey creatures are not hostile to you and will not attack you, unless you do something to provoke them. You can't be charmed, frightened, or possessed by fey.",
			 0.1, 0.7),
	new Card("Miner",
			 "A single block of gold worth 30,000&nbsp;gp appears in the nearest unoccupied space. The gold weighs 700 pounds.",
			 0.0, 0.7),
	new Card("Harbinger",
			 "Three [tarrasques](https://www.dndbeyond.com/monsters/17034-tarrasque) appear in unoccupied spaces within 1 mile of you. The tarrasques always know where you are, but they are hostile to all creatures. Each tarrasque disappears after 3d4 days if it is not killed before then.",
			 1.0, 0.1),
	new Card("The Deep",
			 "Your body becomes adapted to life underwater. You gain a swimming speed of 60 feet and can breathe air and water. You can't benefit from a long rest unless you spend at least 1 hour of it fully submerged in water.",
			 0.3, 0.5),
	new Card("Academia",
			 "Your Intelligence score increases by 10 (to a maximum of 30), and your Strength score is reduced by 10 (to a minimum of 1). Each day at dawn, your Intelligence score is reduced by 1 and your Strength score increases by 1; this continues for 1d4 + 4 days, after which the remaining changes become permanent.",
			 0.3, 0.4),
	new Card("Bitter Cold",
			 "This card curses to feel as though you're exposed to extreme cold. While cursed in this way, you are vulnerable to cold damage, and you must make a DC 10 Constitution saving throw at the end of each hour, gaining a level of exhaustion on a failed save. You succeed on the save automatically if you are wearing clothing suited for cold weather.",
			 0.4, 0.1),
	new Card("Summons",
			 "Once within the next 30 days, you can name or describe one creature and invoke this card's magic. The creature appears in the nearest unoccupied space to you, even if it was on another plane of existence. If you use a broad description that matches more than one creature (such as \"a human blacksmith\"), the nearest one is summoned.",
			 0.5, 0.6),
	new Card("Connection",
			 "You can cast the [detect thoughts](https://www.dndbeyond.com/spells/detect-thoughts) spell once without expending a spell slot, and you regain the ability to do so when you finish a long rest. When you cast it in this way, creatures you focus on automatically know you are probing into their minds, and they can read your mind in the same way for as long as you focus on them.",
			 0.4, 0.6),
	new Card("Waif",
			 "You vanish from your current plane of existence, leaving the deck behind, and appear in the Ethereal Plane. While there, you can't cast spells that would bring you to another plane. You can see and hear the plane you originated from, which is cast in shades of gray, out to a range of 60 feet. You can only affect and be affected by other creatures on the Ethereal Plane. Creatures that aren't there can't perceive you or interact with you, unless they have the ability to do so. You draw no more cards.",
			 0.8, 0.1,
			 undefined, undefined,
			 "nomore"),
	new Card("Martyr",
			 "You can cast the [wish](https://www.dndbeyond.com/spells/wish) spell once without using a spell slot, and you regain the ability to do so when you finish a long rest. When you cast _wish_ in this way, you drop to 0 hit points and immediately roll all of your death saving throws until you die or become stable. If you die as a result, you can't be brought back to life.",
			 0.9, 0.9),
	new Card("Golem",
			 "You lose your ability to feel pain. The DM tracks your hit points for you; you must use an action to make a DC 13 Wisdom (Medicine) check to learn your current number of hit points. Additionally, being at 0 hit points doesn't render you unconscious while you are in combat, and the DM rolls your death saving throws in secret.",
			 0.6, 0.4),
	new Card("The Unsung",
			 "Your identity is lost from the world. Every creature who has ever known or met you forgets that they have, and all evidence of your existence before you drew this card is erased. Only a god or the magic of The Fates card can restore the memories and evidence of your existence.",
			 0.9, 0.1),
	new Card("Altar",
			 "This card demands sacrifice. Choose one or more things to forfeit; they can be possessions, memories, abilities, or anything else that is yours to give up. Whatever you choose is lost to you. If the DM deems the sacrifice insufficient, you must keep making sacrifices until you have lost enough. The DM determines how much is enough; a sacrifice equivalent to one or two of the character's most treasured possessions is typically enough.",
			 0.8, 0.0),
	new Card("Aegis",
			 "You gain proficiency with shields, and you gain the service of a fey spirit which takes the form of an [animated shield](https://www.dndbeyond.com/magic-items/4571-animated-shield) that appears at your feet. When you activate it, and as a bonus action while it is animated, you can choose a creature within 60 feet of you and cause the shield to move to and protect that creature.",
			 0.2, 0.9),
	new Card("Feast",
			 "You are cured of all diseases and poison, become immune to poison and being frightened, and make all Wisdom saving throws with advantage. Your hit point maximum increases by 2d10, and you gain the same number of hit points.",
			 0.8, 1.0),
	new Card("Famine",
			 "You lose any immunity or resistance you have to poison and disease. You are vulnerable to poison damage and have disadvantage on saving throws against poison, disease, and the frightened condition. Your hit point maximum decreases by 2d10, to a minimum of 1.",
			 0.7, 0.0),
	new Card("Liar",
			 "You automatically fail any ability check you make to discern an illusion and any saving throw you make against an illusion spell. You can't benefit from truesight.",
			 0.4, 0.2),
	new Card("Obol",
			 "You gain proficiency in death saving throws. You can't become undead after you die. Unless you are willing, you can't be sent to another plane of existence, and your soul can't be removed from your body by any means except death. With a touch, you can transfer all of this card's effects (including the ability to transfer them) from yourself to another creature. If you are a construct or undead, you don't gain this card's benefits, but you can still transfer them to another creature.",
			 0.2, 0.9),
	new Card("Hummingbird",
			 "You gain an extra reaction you can take each round. This extra reaction can't be used on the same turn that you use your normal reaction, and you can't use it to take an action you prepared with the Ready action.",
			 0.3, 0.9),
	new Card("Blood",
			 "Whenever you take damage, you can reduce the damage by any amount. When you do, your hit point maximum is permanently reduced by one-fourth of that amount (rounded up). You die if your hit point maximum is reduced to zero.",
			 0.5, 0.6),
	new Card("Diagram",
			 "Whenever you finish a long rest, roll 2d12 and add your Intelligence modifier. Your Intelligence score becomes the total (minimum of 1) until you finish your next long rest. Use your original Intelligence score when rolling for this card's effect, not the altered score.",
			 0.7, 0.6),
	new Card("Prophet",
			 "Four ivory strips worth 50&nbsp;gp each, and incense worth 1000&nbsp;gp, appear at your feet. You can cast the [legend lore](https://www.dndbeyond.com/spells/legend-lore) spell once without using a spell slot, and you regain the ability to do so when you finish a long rest.",
			 0.4, 0.8),
	new Card("Pariah",
			 "Permanently reduce your Charisma score by 1, to a minimum of 4. You have disadvantage on Charisma checks you make to interact socially with humanoids.",
			 0.3, 0.0),
	new Card("Barrier",
			 "You can't teleport and can't travel to other planes of existence, regardless of whether you are willing. This effect lasts until you die.",
			 0.1, 0.5),
	new Card("Wyrm",
			 "You gain the ability to transform into an adult dragon of your choice, as if by the [shapechange](https://www.dndbeyond.com/spells/shapechange) spell (no concentration required). You can use this ability once.",
			 0.5, 1.0),
	new Card("The Devil",
			 "You are telepathically contacted by a powerful fiend and offered a deal, with the specifics determined by the DM. The fiend typically offers a great power or valuable item and typically asks for a specific task or quest to be completed. If you decline the deal, the fiend will offer the same deal to one of your enemies instead.",
			 0.6, 0.6),
	new Card("Memory",
			 "You can ask the DM one question about the past, and you see a vision of a moment in the past which directly relates to the answer. The vision lasts no longer than a minute. You can use this card's magic as soon as you draw it or at any other time before you die.",
			 0.5, 0.9),
	new Card("Phoenix",
			 "After you die, burning your remains to ash indefinitely extends the time limit on spells that raise you from the dead. Any spell which would revive you has the same effects as [true resurrection](https://www.dndbeyond.com/spells/true-resurrection), provided your remains were burned within the spell's original time limit and the caster touches the ashes. When you drop to 0 hit points, you can choose to be engulfed in flame, dying and turning to ash immediately.",
			 0.8, 1.0),
	new Card("Storm",
			 "Every magic item you are wearing or carrying, except for artifacts, vanishes and is replaced by another magic item of the same rarity. The DM determines the new items.",
			 0.3, 0.4),
	new Card("Mist",
			 "Your vision becomes clouded, as if by fog that only you can see. Anything farther than 120 feet from you is lightly obscured from you, and anything beyond 500 feet is heavily obscured from you. Any spell that cures blindness lifts the fog for a number of days equal to the spell level.",
			 0.0, 0.2),
];

// Initial setup for some elements, once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// Reflect how many cards are in the homebrew deck
	l("allDeckCount").innerHTML = "(" + (fullDeck.length + homebrewDeck.length) + " cards)";

	l("custAdvancedCheckbox").addEventListener("change", toggleCustAdvanced);

	const wildOptions = document.getElementsByClassName("wildOption");
	for (let i = 0; i < wildOptions.length; i++) {
		wildOptions[i].addEventListener("input", setCustWild);
	}

	const worthOptions = document.getElementsByClassName("worthOption");
	for (let i = 0; i < worthOptions.length; i++) {
		worthOptions[i].addEventListener("input", setCustWorth);
	}

	setUp();
});

/**
 * Resets several values and conditions to their initial state.
 */
function setUp() {
    l("initRandDeclInput").value = 1;
    l("initRandDeclInput").onchange(undefined);
    vetoes = 0;
    deck = [];
    lastCard = {};
    drawing = false;
    advancedOptions = false;
    useCardWeight = false;
}

/**
 * Prints the average wildness and worth of the cards in the deck to the console.
 * @param {Card[]} arr - the deck to analyze
 */
function analyzeDeck(arr) {
    const wildSum = arr.reduce((acc, card) => {
		if (!card.wildness) return acc;
		if (card.weight === undefined) return acc + card.wildness;
		return acc + (card.wildness * card.weight);
	}, 0);
	const wildWeight = arr.reduce((acc, card) => {
		if (card.wildness === undefined) return acc;
		if (card.weight === undefined) return acc + 1;
		return acc + card.weight;
	}, 0);

	const worthSum = arr.reduce((acc, card) => {
		if (!card.worth) return acc;
		if (card.weight === undefined) return acc + card.worth;
		return acc + (card.worth * card.weight);
	}, 0);
    const worthWeight = arr.reduce((acc, card) => {
		if (card.worth === undefined) return acc;
		if (card.weight === undefined) return acc + 1;
		return acc + card.weight;
	}, 0);

    console.log("Average wildness: " + (wildSum / wildWeight));
    console.log("Average worth: " + (worthSum / worthWeight));
}

/**
 * Fades <code>from</code> out, then fades <code>to</code> in, then calls <code>callback()</code>.
 * @param {HTMLElement | string} from
 * @param {HTMLElement | string} to
 * @param {function?} callback - function to run after the transition is complete
 * @param {function?} midwayCallback - function to run midway through the transition
 */
function fadeTransition(from, to, callback, midwayCallback) {
    hide(from, () => {
		window.scrollTo(0, 0); // scroll to top of page
		if (midwayCallback) midwayCallback();
		show(to, callback);
	});
}

/**
 * @param {string | HTMLElement} id
 * @param {function?} callback
 */
function show(id, callback) {
    const el = l(id);
    el.hidden = false;
	makeFadeable(el);

    el.addEventListener("transitionend", callback, {once: true});

    // stupid event listener doesn't fire if you start the transition right away
    // dumb stupid
    setTimeout(() => {
        el.classList.remove('fadedOut');
    }, 10);
    // hide function works just fine without this
    // baloney
}

/**
 * @param {string | HTMLElement} id
 * @param {function?} callback
 */
function hide(id, callback) {
    const el = l(id);
	makeFadeable(el);

    el.addEventListener("transitionend", () => {
        el.hidden = true;
        callback();
    }, {once: true});
    
    el.classList.add('fadedOut');
}

/**
 * @param {HTMLElement} el
 */
function makeFadeable(el) {
	if (!el.classList.contains("fading") && !el.classList.contains("slowFading"))
		el.classList.add("fading");
}

/**
 * Returns the DOM element with the given ID, as an abbreviation of
 * document.getElementById(id). If the parameter is an element instead
 * of an id, the element is returned, so l(l("foo")) is equivalent to
 * l("foo").
 *
 * @param {string | HTMLElement} id - the ID of the element to find
 * @return {HTMLElement | null} the element with the given ID
 */
function l(id) {
    // L for eLement
    if (id instanceof HTMLElement) return id;
    
    return document.getElementById(id);
}

/**
 * Returns the DOM element with the given ID, if it exists. If it doesn't,
 * creates an element with the given ID, tag name, and inner HTML and returns it.
 * If the element already exists, its inner HTML is unchanged, unless the
 * <code>innerHTML</code> argument is explicitly an empty string.
 *
 * @param {string} tagName - the HTML tag to use if the element doesn't exist
 * @param {string} id - the ID to find or use
 * @param {string?} innerHTML - inner HTML to add to the element
 */
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

/**
 * Creates an HTMLElement with the given tag name. The element's
 * ID and innerHTML can be set with additional parameters.
 * @param {any} tagName
 * @param {string?} id
 * @param {any?} innerHTML
 */
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

/**
 * Creates and returns a &lt;button&gt; element with the given
 * ID, onclick function, and inner HTML.
 * @param {string} id
 * @param {function} onclick
 * @param {string} innerHTML
 */
function createButton(id, onclick, innerHTML) {
    let btn = getOrCreate("button", id, innerHTML);
    btn.type = "button";
    btn.onclick = onclick;
    return btn;
}

/**
 * Creates and returns an &lt;option&gt; element with the given
 * value and inner HTML.
 * @param {any} value
 * @param {string} innerHTML
 */
function createOption(value, innerHTML) {
    let opt = createElement("option", undefined, innerHTML);
    opt.value = value;
    return opt;
}

/**
 * Creates and returns an HTML node that allows the user to customize a card.
 * @param {Card} card - the card that the returned node modifies
 * @param {number} i - the index of the card in <code>deck</code>
 */
function createCustomCardNode(card, i) {
    let cardContainer = getOrCreate("div", "customCardContainer" + i);
    cardContainer.innerHTML = "";
	cardContainer.classList.add("customCardContainer", "slowFading", "fadedOut");

    let cardNode = getOrCreate("div", "customCard" + i);
    cardNode.innerHTML = "";
    cardNode.className = "customCard";
    cardContainer.appendChild(cardNode);

    // Card name
    let nameInput = getOrCreate("input", "customCardName" + i);
    nameInput.className = "cardNameInput";
    nameInput.value = (card.name !== undefined)? card.name : "";
    nameInput.onchange = () => {card.name = nameInput.value};
    nameInput.onchange(undefined);
    cardNode.appendChild(nameInput);

    // Card description
    let descInput = getOrCreate("textarea", "customCardDesc" + i);
    descInput.className = "cardDescInput";
    descInput.value = (card.desc !== undefined)? card.desc : "";
    descInput.onchange = () => {card.desc = descInput.value};
    descInput.onchange(undefined);
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
    // drawsInput.className = "numInput";
    drawsInput.type = "number";
    drawsInput.value = (card.draws !== undefined)? card.draws : 1;
    drawsInput.min = 1;
	drawsInput.onclick = () => {drawsInput.select()};
    drawsInput.onchange = () => {
        if (!(drawsInput.valueAsNumber >= 1))
            drawsInput.value = 1;
        drawsInput.value = Math.floor(drawsInput.valueAsNumber);
        card.draws = drawsInput.valueAsNumber;
    };
    drawsInput.onchange(undefined);
    drawsEffectNode.appendChild(drawsInput);
    cardNode.appendChild(drawsEffectNode);

    drawsEffectSelector.onchange = () => {
        const f = drawsEffectSelector.value;
        card.drawsEffect = f;
        drawsInput.hidden = (f !== "optional" && f !== "forced");
    };
    drawsEffectSelector.onchange(undefined);

    let reappearsNode = createElement("div");
    let reappearsCheckbox = getOrCreate("input", "reappearsCheckbox" + i);
    reappearsCheckbox.type = "checkbox";
    reappearsCheckbox.checked = (card.reappears !== false);
    reappearsCheckbox.onchange = () => {card.reappears = reappearsCheckbox.checked};
    let reappearsLabel = createElement("label");
    reappearsLabel.htmlFor = "reappearsCheckbox" + i;
    reappearsLabel.innerHTML = "Reappears in deck";
    reappearsNode.appendChild(reappearsCheckbox);
    reappearsNode.appendChild(reappearsLabel);
    cardNode.appendChild(reappearsNode);

    // Card weight
    const weightNode = createElement("div");
    const weightLabel = createElement("label", undefined, "Relative draw probability: ");
    weightLabel.htmlFor = "weightInput" + i;
    const weightInput = createElement("input", "weightInput" + i);
    weightInput.className = "numInput";
    weightInput.type = "number";
    weightInput.value = (card.weight !== undefined)? card.weight.toFixed(2) : 1;
    weightInput.min = 0;
    weightInput.step = 0.01;
	weightInput.onclick = () => {weightInput.select()};
    weightInput.onchange = () => {
        if (!(weightInput.valueAsNumber >= 0))
            weightInput.value = 0;
		card.weight = weightInput.valueAsNumber;
		weightInput.value = weightInput.valueAsNumber.toFixed(2);
    };
    weightInput.onchange();

    weightNode.appendChild(weightLabel);
    weightNode.appendChild(weightInput);
    cardNode.appendChild(weightNode);

    // Remove card button
    let removeBtnHolder = createElement("div");
    removeBtnHolder.appendChild(createButton("removeCardBtn" + i, () => {
        // Dmpty cards will be removed before drawing.
        // For now, keep correlation between element id and deck index.
        deck[i] = {};
        
        // No fade unless we can get the other cards to slide slickly to their new positions.
        // (Fade doesn't look cool if another card instantly teleports into the vacated space)
        l("fullCustomCardsNode").removeChild(cardContainer);
    }, "Remove card"));
    cardNode.appendChild(removeBtnHolder);

    return cardContainer;
}

/**
 * @return "card" if num is 1, or "cards" otherwise
 */
function cardOrCards(num) {
    return (num === 1)? "card" : "cards";
}

/**
 * Adds the given amount (positive or negative) to the user's
 * number of declared draws.
 * @param {number} amount
 */
function adjustDeclaredDraws(amount) {
	if (!Number.isFinite(amount)) return;

    declaredDraws += amount;
    setDeclaredDraws();
}

/**
 * If <code>inputElement</code> is defined, the user's number of
 * declared draws is set to its value.
 * Then, all inputs with the "declaredDrawsInput" class to reflect
 * the current value.
 * @param {HTMLElement?} inputElement
 */
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

/**
 * Sets the deck to one of the basic options and begins drawing.
 * <code>type</code> can be "random" (a deck of either 13 or 22
 * cards), "partial" (13), "full" (22), "all" (full plus homebrew
 * cards). Any other value will default to the full deck, but an
 * error will be logged to the console.
 * @param {string} type - the type of deck to draw from
 */
function readyDeck(type) {
    fadeTransition("initialConfig", "drawingNode");

    switch (type) {
        case "random":
            deck = ((Math.random() < 0.25)? fullDeck : partialDeck).map(card => ({...card}));
            draw();
            break;
        case "partial":
            deck = partialDeck.map(card => ({...card}));
            draw();
            break;
        default:
            console.error("Unknown deck type \"" + type + "\"; defaulting to full deck");
            // fall through
        case "full":
            deck = fullDeck.map(card => ({...card}));
            draw();
            break;
        case "all":
            deck = fullDeck.concat(homebrewDeck).map(card => ({...card}));
            draw();
            break;
    }
}

/**
 * Sets the bias parameters in the <code>params</code>
 * object based on the values in the input elements. This function
 * assumes that there are inputs with IDs of "[x]StrSlider",
 * "[x]ValSlider", "[x]MaxSlider", and "[x]BaselineSlider", where [x]
 * is the provided id.
 *
 * The params object's biasStr, val, baseline, and max are set.
 * Sliders are also snapped to key values, and the function graph is
 * redrawn.
 *
 * @param {object} params - the object holding the bias parameters
 * @param {string} id - the part of the element ID showing which sliders to read
 */
function setCustBias(params, id) {
    if (params === undefined) params = {};

    const strSliderVal = snap(l(id + "StrSlider"), [0], 0.15);
    params.biasStr = Math.pow(strSliderVal, 1.25);

    params.val = l(id + "ValSlider")["valueAsNumber"];

    if (advancedOptions) {
        params.baseline = snap(l(id + "BaselineSlider"), [0, 1], 0.1);

        snap(l(id + "MaxSlider"), [0, 1], 0.1);
        const x = l(id + "MaxSlider")["valueAsNumber"];
        params.max = x*x*x - 1.5 * x*x + 1.5 * x;
    } else {
        params.baseline = 0;
        params.max = 1;
    }

    const chartTitle = (id === "wild")? "wildness" : id;
    drawProbabilityPlot(id + "Graph", chartTitle, params)
}

/**
 * Sets wildParams based on the current values of the wild sliders.
 */
function setCustWild() {
    wildParams = {};
    setCustBias(wildParams, "wild");
}

/**
 * Sets worthParams based on the current value of the worth sliders.
 */
function setCustWorth() {
    worthParams = {};
    setCustBias(worthParams, "worth");
}

/**
 * Snaps the slider to certain values. If <code>values</code> is
 * a number, the slider snaps to multiples of that number. If it's
 * an array, the slider snaps to the values in the array. (To snap
 * to a single value, provide an array with one element.)
 *
 * @param {HTMLElement} slider
 * @param {number | number[]} values
 * @param {number} snapRange - the maximum distance from which the slider will snap
 * @return the slider's value, which may have been snapped to a new number
 */
function snap(slider, values, snapRange) {
    if (snapRange === undefined) snapRange = 0.1;

    const sliderVal = slider.valueAsNumber;

    // Snap to nearest multiple
    if (typeof values === "number") {
        const nearestMultiple = Math.round(sliderVal / values) * values;
        if (Math.abs(nearestMultiple - sliderVal) < snapRange) {
            return (slider.value = nearestMultiple);
        }
    }

    // Snap to specific numbers
    for (let i = 0; i < values.length; i++) {
        if (Math.abs(values[i] - sliderVal) < snapRange) {
            return (slider.value = values[i]);
        }
    }

    // Not close enough to snap
    return sliderVal;
}

/**
 * Determines the probability that the val provided will be randomly deemed
 * sufficiently close to a target value. If val == params.val, the returned value
 * is params.max; otherwise, the probability approaches params.baseline as the
 * difference between val and params.val grows. The probability never reaches
 * params.baseline, but it approaches it more quickly if params.biasStr is high.
 * The probability is clamped to the [0..1] range.
 * 
 * @param {number} x - the input value
 * @param {object} params - an object containing the parameters for the probability function
 * @returns {number} the probability for val to be randomly deemed sufficiently close to params.val
 */
function probability(x, params) {
    const prob = ((Math.exp(-(Math.pow((params.val - x) * params.biasStr, 2)))) * (params.max - params.baseline) + params.baseline);

    // Clamp to [0..1] range
    return Math.max(0, Math.min(1, prob));
}

function drawProbabilityPlot(div, chartTitle, params) {
    let points = [];
    const numPoints = 40; // starts at 0 so there's technically one more than this, doesn't matter
    for (let i = 0; i <= numPoints; i += 1) {
        // Can't just count by 0.05 or whatever because float imprecision adds up
        points.push(i / numPoints);
    }

    let ticks = false;
    switch (chartTitle) {
        case "wildness":
            ticks = ["very tame", "middling", "very wild"];
            break;
        case "worth":
            ticks = ["very bad", "so-so", "very good"];
            break;
    }

    const trace = {
        x: points,
        y: points.map(x => probability(x, params)),
        type: "scatter",
        mode: "lines",
        line: {
            color: "#cccccc",
            width: 3,
        },
        fill: "tozeroy",
        hoverinfo: "none",
    }
    const displayTitle = ((useCardWeight)? "Weight factor: " : "Inclusion probability: ") + chartTitle;
    const layout = {
        showlegend: false,
        margin: {
            autoexpand: false,
            l: 30,
            r: 30,
            t: 40,
            b: 30,
        },
        xaxis: {
            range: [0, 1],
            color: "#cccccc",
            tickmode: (ticks === false)? "auto" : "array",
            tickvals: [0.05, 0.5, 0.95],
            ticktext: ticks,
        },
        yaxis: {
            range: [0, 1.05],
            color: "#cccccc",
        },
        title: displayTitle,
        paper_bgcolor: "#555555",
        plot_bgcolor: "#555555",
        font: {color: "#cccccc",},
    };

    Plotly.react(div, [trace], layout, {staticPlot: true});
}

/**
 * Transitions to the customization menu and resets some elements
 * on it to their default values.
 */
function customize() {
    fadeTransition("initialConfig", "customMenu");

    l("custCardSrcSelector").value = "all";
    l("custCardSrcSelector").onchange();
    
    l("filterCardsOption").checked = true;
    l("filterCardsOption").onclick();

    l("wildStrSlider").value = 0;
    l("wildValSlider").value = 0.5;
    setCustWild();
    l("worthStrSlider").value = 0;
    l("worthValSlider").value = 0.5;
    setCustWorth();
    
    l("custXPDefault").checked = true;
    l("custXPDefault").onclick(undefined);
}

/**
 * Shows or hides all elements with the "advancedOption" class,
 * depending on whether the checkbox "custAdvancedCheckbox" is checked.
 */
function toggleCustAdvanced() {
    advancedOptions = l("custAdvancedCheckbox")["checked"];
    
    const options = document.getElementsByClassName("advancedOption");
    for (let i = 0; i < options.length; i++) {
        options[i].hidden = !advancedOptions;
    }

    setCustWild()
    setCustWorth();
}

/**
 * Creates the custom deck based on the user-selected options.
 *
 * @param {function} callback - function to run after the deck is ready
 */
function finishCustomization(callback) {
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

    // Set each card's weight to 1
    deck.forEach(card => {card.weight = 1});
    if (useCardWeight) {
        // Multiply card weight by wildness and worth probs
        deck.forEach(card => card.weight *= probability(card.wildness, wildParams) * probability(card.worth, worthParams));
    } else {
        // Filter out cards for wildness and worth
        deck = deck.filter(card => Math.random() < probability(card.wildness, wildParams));
        deck = deck.filter(card => Math.random() < probability(card.worth, worthParams));
    }

    // Correct undesired card effects
    if (custXP === "noxp") {
        deck.forEach(x => {
            if (x.noXPDesc)
                x.desc = x.noXPDesc;
            else if (x.noLevelDesc)
                x.desc = x.noLevelDesc;
        });
    } else if (custXP === "nolevel") {
        deck.forEach(x => {
            if (x.noLevelDesc)
                x.desc = x.noLevelDesc;
            else if (x.noXPDesc)
                x.desc = x.noXPDesc;
        });
    }

    // Transition to new screen
    switch (callback) {
        case fullCustomize:
			// Start the cards appearing just as the full menu is becoming visible
            fadeTransition("customMenu", "fullCustomMenu", undefined, callback);
            break;
        case draw:
            fadeTransition("customMenu", "drawingNode");
			callback();
            break;
		default:
			callback();
    }
}

/**
 * @param {Object[]} arr
 * @return a new array of objects, each a copy of an object in the given array
 */
function copyObjectArray(arr) {
    return arr.map(obj => ({...obj}));
}

/**
 * Adds a new card to the deck, with the name "New Card" and an empty
 * description. A new custom card node is appended to the
 * "fullCustomCardsNode" element.
 */
function addCustomCard() {
    let newCard = new Card("New Card", "");
    deck.push(newCard);

    let cardNode = createCustomCardNode(newCard, deck.length - 1);
    l("fullCustomCardsNode").appendChild(cardNode);
    setTimeout(() => {show(cardNode)});
}

/**
 * Populates the full-customization (card editing) menu using
 * the current deck.
 */
function fullCustomize() {
    let fullCustomCardsNode = l("fullCustomCardsNode");
    fullCustomCardsNode.innerHTML = ""; // empty it out
    for (let i in deck) {
        fullCustomCardsNode.appendChild(createCustomCardNode(deck[i], i));
    }

	let i = 0;
	let timer = setInterval(() => {
		if (i < deck.length) {
			show("customCardContainer" + i);
			i++;
		} else {
			clearInterval(timer);
		}
	}, 50);
}

/**
 * Removes blank cards from the deck, then draws (transitioning to the drawing screen).
 */
function finishFullCustomization() {
    // Get rid of cards with no name or desc (this includes removed cards)
    deck = deck.filter(card => (card.name || card.desc));

    fadeTransition("fullCustomMenu", "drawingNode");
    draw();
}

/**
 * Adds the last drawn card's <code>draws</code> to the user's number of
 * declared draws.
 */
function drawMore() {
    declaredDraws += lastCard.draws;
    if (lastCard.onDrawMore)
        lastCard.onDrawMore();
    draw();
}

/**
 * Returns to the main menu, resetting some things to their intial values.
 */
function startOver() {
	// Clear out drawnCards, go to main menu
    fadeTransition("drawingNode", "initialConfig", () => {l("drawnCards").innerHTML = ""});
    setUp();
}

/**
 * Returns an index in the given deck of cards. The probability
 * that a card's index is chosen is proportional to that card's
 * weight property. Specifically, the probability for a card to
 * be chosen equals the card's weight divided by the total weight
 * of all cards in the deck.
 *
 * If all cards in the deck have 0 weight, a random index is returned.
 *
 * @param {Card[]} arr - the deck of cards to choose an index from
 * @return a weighted random index in the array
 */
function weightedRandomIndex(arr) {
	const totalWeight = arr.reduce((acc, card) => acc + ((card.weight > 0)? card.weight : 0), 0);
    const randomValue = Math.random() * totalWeight;

    // If all elements have weight 0, just return a random index
    if (totalWeight === 0) {
        return Math.floor(Math.random() * arr.length);
    }

    for (let i = 0, crawl = 0; i < arr.length; i++) {
        // It crawls toward randomValue
        crawl += arr[i].weight;
        // Only check if we've passed the target, not met it
        // Otherwise a randomValue of 0 will give us 0 even if arr[0].weight is zero
        if (crawl > randomValue) {
            return i;
        }
    }

    // Should've returned by now... Just pick a random one
    return Math.floor(Math.random() * arr.length);
}

/**
 * Chooses a card from the deck and displays it in the
 * "drawnCards" node. If the user is able to draw more
 * cards yet, one or more buttons are shown below the card
 * to allow them to draw again (or not, if they have a choice).
 */
function draw() {
    // declaredDraws can be 0 if user declined an optional draw-more from their last card.
    // In that case, skip to end-of-draw stuff.
    if (declaredDraws > 0 && deck.length > 0) { // we're really gonna draw a card
        // Pick a card, any card
        const cardIndex = weightedRandomIndex(deck);
        const card = deck[cardIndex];
        lastCard = card;
        if (card.reappears === false) {
            // Only certain cards vanish when drawn; the rest reappear in the deck and can be drawn again
            deck.splice(cardIndex, 1);
        }

        // Make the card node and put it in the drawnCards node
        let cardDiv = createElement("div");
        cardDiv.classList = "drawnCard fading fadedOut";
        let cardName = createElement("h3", undefined, DOMPurify.sanitize(card.name));
        cardName.className = "drawnCardName";
        cardDiv.appendChild(cardName);

        const sanitizedDesc = DOMPurify.sanitize(marked.parse(card.desc));
        cardDiv.appendChild(createElement("p", undefined, sanitizedDesc));
        
        l("drawnCards").appendChild(cardDiv);
        setTimeout(() => {show(cardDiv)}, 200);

        // Conditional changes to declaredDraws (including "nomore", which can be vetoed) are handled by the buttons
        declaredDraws -= 1;
        if (card.drawsEffect === "forced") {
            declaredDraws += card.draws;
        }
    }
    
    l("proceedNode").hidden = false;

    // If there are more cards, we might draw again, even if declaredDraws is now 0 (user may have the option to draw more)
    if (deck.length > 0) {
        l("proceedButtonHolder").hidden = false;

        let cardsLeftStr = "You have " + declaredDraws + " " + cardOrCards(declaredDraws) + " left to draw";
        if (lastCard.drawsEffect === "nomore") {
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

        if (lastCard.drawsEffect === "optional") {
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

        if (declaredDraws > 0 || lastCard.drawsEffect === "optional") {
            // Tell them why they can't draw more cards: there are none
            l("proceedLabel").innerHTML = "There are no cards left in the deck.";
        }
    }
}

/**
 * Writes a stripped version of the current deck to the clipboard. The stripped
 * deck doesn't include data like wildness, worth, or alternate descriptions, as
 * those aren't used by imported decks.
 */
function exportDeck() {
    let strippedDeck = [];
	// Strip away any data that's not used by imported decks
	for (let i in deck) {
		const c = deck[i];
		strippedDeck[i] = new Card(c.name, c.desc, undefined, undefined, undefined, undefined, c.drawsEffect, c.draws, c.reappears, c.onDrawMore, c.weight);
	}

	const text = JSON.stringify(strippedDeck);

    navigator.clipboard.writeText(text)
        .then(() => { alert('Successfully copied to clipboard! Import the deck by clicking \"Import deck\" on the main menu.'); })
        .catch(err => { alert('Error in copying text: ' + err); });
}

/**
 * Readies and transitions to the import menu.
 */
function importDeck() {
    const textarea = l("importTextarea");
    textarea.value = "[]";
    fadeTransition("initialConfig", "importMenu", () => {
        // Immediately ready to paste over
        textarea.focus();
		if (textarea.select === undefined) textarea.select = () => {};
        textarea.select();
    });
}

/**
 * Imports the deck from the import textarea, switches to the
 * menu relevant to the callback function, then runs that
 * function. If there's an error parsing the deck, or if the
 * callback isn't recognized, an alert is displayed to the user.
 *
 * @param {function} callback - the function to run after importing
 */
function importAndThen(callback) {
    try {
		const str = l("importTextarea")["value"];
		// Use empty deck if textarea is empty
		deck = (str)? [].concat(JSON.parse(str)) : [];

		// Make sure it's just valid cards, no extra stuff
		deck = deck.filter(card => (card.name || card.desc));

        switch (callback) {
            case fullCustomize:
                fadeTransition("importMenu", "fullCustomMenu");
                break;
            case draw:
                fadeTransition("importMenu", "drawingNode");
                break;
            default:
				alert("Unknown followup to import function: " + callback);
        }
        callback();
    } catch (err) {
        alert("Import failed! " + err);
    }
}
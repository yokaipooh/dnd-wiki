import { SpellAreaEffectType, SpellComponentType } from '../enum/common';

export interface SpellCommonProps {
	name: string;
	url: string;
	index: string;
}

export interface DetailSpellProps {
	index: string;

	name: string;

	url: string;

	desc: string[];

	higher_level: string[];

	range: string;

	components: SpellComponentType[];

	material: string;
	area_of_effect: {
		size: number;
		type: SpellAreaEffectType;
	};
	ritual: boolean;

	duration: string;

	concentration: boolean;

	casting_time: string;

	level: number;

	attack_type: string;

	damage: {
		damage_at_slot_level: {
			[key: string]: any;
		};
		damage_at_character_level: {
			[key: string]: any;
		};
		damage_type: SpellCommonProps;
	};
	school: SpellCommonProps;
	classes: SpellCommonProps[];
	subclasses: SpellCommonProps[];
}

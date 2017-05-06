/* @flow */

import { LineString, Point } from '../../utils';
import { BoomOrientation } from '../spray';


import uuid from 'react-native-uuid';
import { isNumber } from 'lodash';

export type SectionConfig = {
    id?: string,
    _id?: number,
    index?: number,
    startTime?: Date,
    endTime?: Date,
    /**
     * id referencing chemical supplier
     */
    chemical_id?: number,
    chemical_flow: number,
    /**
     * id referencing county
     */
    county_id?: number,
    weed_ids?: number[],
    boom?: BoomOrientation,
    boom_size?: number,
    line?: LineString,
    user_id: number,
    group_id: number,
};

export const REQUIRED_KEYS = [
    'chemical_id',
    'chemical_flow',
    'county_id',
    'weed_ids',
    'boom',
    'boom_size',
    'user_id',
    'group_id',
];
export const isValidSectionConfig = (config: SectionConfig): boolean => {
    return REQUIRED_KEYS.every((k) => k in config);
};

export class Section {

    id: string;
    _id: number;
    /**
     * This number should match its index in LocationState.list[date],
     * but not sure if necessary
     */
    index: ?number;
    startTime: Date;
    endTime: ?Date;
    /**
     * id referencing chemical supplier
     */
    chemical_id: number;
    chemical_flow: number;
    /**
     * id referencing county
     */
    county_id: number;
    weed_ids: number[];
    boom: BoomOrientation;
    boom_size: number;
    line: LineString;
    user_id: number;
    group_id: number;

    constructor(config: SectionConfig) {

        this.id = config.id || uuid.v4();
        this.index =  isNumber(config.index) ? config.index : null;
        this.startTime = config.startTime || new Date();
        this.endTime = config.endTime || null;
        if (!config.hasOwnProperty('chemical_id') || config.chemical_id === null) {
            throw new TypeError('Section class requires chemical_id supplier id');
        } else {
            this.chemical_id = config.chemical_id;
        }
        if (!config.hasOwnProperty('chemical_flow') || config.chemical_flow === null) {
            throw new TypeError('Section class requires chemical_flow supplier id');
        } else {
            this.chemical_flow = config.chemical_flow;
        }
        if (!config.hasOwnProperty('county_id') || config.county_id === null) {
            throw new TypeError('Section class requires county_id id');
        } else {
            this.county_id = config.county_id;
        }
        if (!config.hasOwnProperty('weed_ids') || config.weed_ids === null) {
            throw new TypeError('Section class requires weed_ids id');
        } else {
            this.weed_ids = config.weed_ids;
        }
        if (!config.hasOwnProperty('boom') || config.boom === null) {
            throw new TypeError('Section class requires boom orientation');
        } else {
            this.boom = config.boom;
        }
        if (!config.hasOwnProperty('boom_size') || config.boom_size === null) {
            throw new TypeError('Section class requires boom_size orientation');
        } else {
            this.boom_size = config.boom_size;
        }
        if (!config.hasOwnProperty('group_id') || config.group_id === null) {
            throw new TypeError('Section class requires group_id orientation');
        } else {
            this.group_id = config.group_id;
        }
        if (!config.hasOwnProperty('user_id') || config.user_id === null) {
            throw new TypeError('Section class requires user_id orientation');
        } else {
            this.user_id = config.user_id;
        }

        this.line = config.line || { coordinates: [] };
    }

    setEndTime(time: Date = new Date()) {
        this.endTime = time;
    }

    addPosition(p: Position) {
        this.line.coordinates = [...this.line.coordinates, p];
    }
};

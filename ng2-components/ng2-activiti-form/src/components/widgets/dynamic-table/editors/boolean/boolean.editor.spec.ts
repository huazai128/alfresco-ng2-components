/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BooleanEditorComponent } from './boolean.editor';
import { DynamicTableRow, DynamicTableColumn } from './../../../core/index';

describe('BooleanEditorComponent', () => {

    let component: BooleanEditorComponent;

    beforeEach(() => {
        component = new BooleanEditorComponent();
    });

    it('should update row value on change', () => {
        let row = <DynamicTableRow> { value: {} };
        let column = <DynamicTableColumn> { id: 'key' };
        let event = { target: { checked: true } };

        component.onValueChanged(row, column, event);
        expect(row.value[column.id]).toBeTruthy();
    });

});
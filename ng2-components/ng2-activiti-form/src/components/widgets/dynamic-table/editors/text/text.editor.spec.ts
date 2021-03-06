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

import { TextEditorComponent } from './text.editor';
import { DynamicTableRow, DynamicTableColumn } from './../../dynamic-table.widget.model';

describe('TextEditorComponent', () => {

    let editor: TextEditorComponent;

    beforeEach(() => {
        editor = new TextEditorComponent();
    });

    it('should update row value on change', () => {
        let row = <DynamicTableRow> { value: {} };
        let column = <DynamicTableColumn> { id: 'key' };

        const value = '<value>';
        let event = { target: { value } };

        editor.onValueChanged(row, column, event);
        expect(row.value[column.id]).toBe(value);
    });

});

import { useState } from 'react';
import accordianData from '../testData/accordianData'

export default function Accordian() {
    const [selectedAccordian, setSelectedAccordian] = useState('');
    const [isMultiSelection, setIsMultiSelection] = useState(false);
    const [multiSelectedAccordian, setMultiSelectedAccordian] = useState([]);

    function handleSingleAccodian(currentAccodianId) {
        selectedAccordian === currentAccodianId ? setSelectedAccordian('') : setSelectedAccordian(currentAccodianId)
    }

    function handleMultiSelect() {
        setIsMultiSelection(!isMultiSelection)
    }

    function handleMultiAccordian(currentAccodianId) {
        let copyMultiSelectedAccordian = [...multiSelectedAccordian];
        let indexOfCurrentId = multiSelectedAccordian.indexOf(currentAccodianId)

        if (indexOfCurrentId === -1) copyMultiSelectedAccordian.push(currentAccodianId)
        else copyMultiSelectedAccordian.splice(indexOfCurrentId, 1)
        setMultiSelectedAccordian(copyMultiSelectedAccordian);
    }
    return (
        <>
            <div className="btn btn-outline-primary" onClick={() => handleMultiSelect()}>Multi Select {isMultiSelection ? 'enabled' : 'disabled'}</div>
            <div class="accordion" id="accordionExample">
                {
                    accordianData && accordianData.length > 0 ? accordianData.map((data, index) => {
                        return (
                            <div class="accordion-item" key={index}>
                                <h2 class="accordion-header">
                                    <button onClick={() => isMultiSelection ? handleMultiAccordian(data.id) : handleSingleAccodian(data.id)} class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {data.title}
                                    </button>
                                </h2>
                                <div id="collapseOne" class={`accordion-collapse collapse ${isMultiSelection ? multiSelectedAccordian.indexOf(data.id) !== -1 ? 'show' : '' : data.id === selectedAccordian ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        {data.description}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    ) : <div>No data</div>
                }
            </div>
        </>
    );
}

{% from "question/macro.njk" import question %}
{% from "question-fieldset/macro.njk" import questionFieldset %}
{% from "faq/macro.njk" import faq %}

{% macro vehicleLookupManualQuestion(config) %}

    {% call questionFieldset(
        id="manual-car-lookup-question",
        heading="Tell us about your car") %}
        {% call faq(question = "Can I get a quote for older cars?") %}
            <p>We can’t provide quotes for vehicles manufactured before&nbsp;1970.</p>
        {% endcall %}
        <div class="question-stack">
            {% call question(heading = "Manufacturer", labelFor = "manufacturer", validity="invalid" if errors.carManufacturer) %}
                <select
                    id="manufacturer"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carManufacturer"
                    x-model="manufacturer"
                    @change="getCarModels"
                    :disabled="!manufacturers?.topX?.length"
                    required
                    {% if errors.carManufacturer %}
                        data-validity="invalid"
                        aria-describedby="carManufacturer-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>

                    <optgroup label="Top 10">
                        <template x-for="topBrand in manufacturers.topX">
                            <option :value="topBrand" x-text="topBrand" :selected="topBrand == manufacturer"></option>
                        </template>
                    </optgroup>

                    <optgroup label="All">
                        <template x-for="brand in manufacturers.result">
                            <option :value="brand" x-text="brand" :selected="brand == manufacturer"></option>
                        </template>
                    </optgroup>
                </select>

                {% if errors.carManufacturer %}
                    <p id="carManufacturer-error" class="error-message">{{ errors.carManufacturer.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(heading = "Model", labelFor = "model", validity="invalid" if errors.carModel) %}
                <select
                    id="model"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carModel"
                    x-model="selectedModel"
                    @change="getFuelTypes"
                    :disabled="!models?.length"
                    required
                    {% if errors.carModel %}
                        data-validity="invalid"
                        aria-describedby="carModel-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="model in models">
                        <option :value="model" x-text="model" :selected="model === selectedModel"></option>
                    </template>
                </select>

                {% if errors.carModel %}
                    <p id="carModel-error" class="error-message">{{ errors.carModel.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                    heading="Fuel type",
                    labelFor="fuel-type",
                    validity="invalid" if errors.carFuelType
                ) %}
                <select
                    id="fuel-type"
                    class="dropdown"
                    name="carFuelType"
                    x-model="selectedFuelType"
                    @change="getRegYears"
                    required
                    :disabled="!fuelTypes?.length"
                    {% if errors.carFuelType %}
                        data-validity="invalid"
                        aria-describedby="carFuelType-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="fuelType in fuelTypes">
                        <option :value="fuelType.dataCode" x-text="fuelType.displayText" :selected="fuelType.dataCode == selectedFuelType"></option>
                    </template>
                </select>

                {% if errors.carFuelType %}
                    <p id="carFuelType-error" class="error-message">{{ errors.carFuelType.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                    heading="Registration year and letter",
                    labelFor="registration-year",
                    validity="invalid" if errors.carRegistrationYear
                ) %}
                <select
                    id="registration-year"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carRegistrationYear"
                    x-model="selectedRegYear"
                    required
                    @change="getVehicleStyles"
                    :disabled="!registrationYears?.length"
                    {% if errors.carRegistrationYear %}
                        data-validity="invalid"
                        aria-describedby="carRegistrationYear-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="regYear in registrationYears">
                        <option :value="regYear.value" x-text="regYear.label" :selected="regYear.value == selectedRegYear"></option>
                    </template>
                </select>

                {% if errors.carRegistrationYear %}
                    <p id="carRegistrationYear-error" class="error-message">{{ errors.carRegistrationYear.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                    heading="Number of doors or style",
                    labelFor="style",
                    validity="invalid" if errors.carDoorsOrStyle
                ) %}
                <select
                    id="style"
                    class="dropdown"
                    name="carDoorsOrStyle"
                    x-model="selectedStyle"
                    required
                    @change="getTransmission"
                    :disabled="!styles?.length"
                    {% if errors.carDoorsOrStyle %}
                        data-validity="invalid"
                        aria-describedby="carDoorsOrStyle-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="style in styles">
                        <option :value="style" x-text="style" :selected="style == selectedStyle"></option>
                    </template>
                </select>

                {% if errors.carDoorsOrStyle %}
                    <p id="carDoorsOrStyle-error" class="error-message">{{ errors.carDoorsOrStyle.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                    heading="Transmission",
                    labelFor="transmission",
                    validity="invalid" if errors.carTransmission
                ) %}
                <select
                    id="transmission"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carTransmission"
                    x-model="selectedTransmission"
                    required
                    @change="getEngineSize"
                    :disabled="!transmission?.length"
                    {% if errors.carTransmission %}
                        data-validity="invalid"
                        aria-describedby="carTransmission-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="trans in transmission">
                        <option :value="trans.dataCode" x-text="trans.displayText" :selected="trans.dataCode == selectedTransmission"></option>
                    </template>
                </select>

                {% if errors.carTransmission %}
                    <p id="carTransmission-error" class="error-message">{{ errors.carTransmission.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                    heading="Engine capacity",
                    labelFor="engine-capacity",
                    validity="invalid" if errors.carEngine
                ) %}
                <select
                    id="engine-capacity"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carEngine"
                    x-model="selectedEngineSize"
                    required
                    @change="getTrim"
                    :disabled="!engineSize?.length"
                    {% if errors.carEngine %}
                        data-validity="invalid"
                        aria-describedby="carEngine-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="size in engineSize">
                        <option :value="size" x-text="size + 'cc'" :selected="size == selectedEngineSize"></option>
                    </template>
                </select>

                {% if errors.carEngine %}
                    <p id="carEngine-error" class="error-message">{{ errors.carEngine.msg }}</p>
                {% endif %}
            {% endcall %}

            {% call question(
                heading="Trim",
                labelFor="trim",
                validity="invalid" if errors.carTrim
            ) %}
                <select
                    id="trim"
                    class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                    name="carTrim"
                    x-model="selectedTrimKind"
                    required
                    @change="getCars"
                    :disabled="!trim?.length"
                    {% if errors.carTrim %}
                        data-validity="invalid"
                        aria-describedby="carTrim-error"
                    {% endif %}
                    >
                    <option value="" selected disabled>Please select…</option>
                    <template x-for="t in trim">
                        <option :value="t" x-text="t" :selected="t == selectedTrimKind"></option>
                    </template>
                </select>

                {% if errors.carTrim %}
                    <p id="carTrim-error" class="error-message">{{ errors.carTrim.msg }}</p>
                {% endif %}
            {% endcall %}
        </div>
    {% endcall %}

    <div class="question" x-show="cars?.length" {% if errors.selectedCar %}data-validity="invalid"{% endif %}>
        <div class="question-content">

            <label class="question-heading" for="cars">
                <span x-show="cars?.length > 1">We have found multiple cars</span>
                <span x-show="cars?.length == 1">We found this car</span>
                <span class="question-secondary-text" x-show="cars?.length > 1">Select the one you think is correct. Don’t worry about selecting the wrong one – you’ll have a chance to check and amend any details on the next page.</span>
            </label>

            <template x-if="cars?.length == 1">
                <div class="highlighted-content" :tabindex="-1" x-text="cars[0]?.displayText"></div>
            </template>

            <select
                id="cars"
                class="dropdown maskpii sessioncamexclude sessioncamhidetext"
                name="selectedCar" x-model="selectedCar"
                :disabled="!cars?.length"
                required
                {% if errors.selectedCar %}
                    data-validity="invalid"
                    aria-describedby="selectedCar-error"
                {% endif %}
                x-show="cars?.length > 1">
                <template x-for="(car, index) in cars">
                    <option :value="car.value" x-text="car.displayText" :selected="index == 0"></option>
                </template>
            </select>

            {% if errors.selectedCar %}
                <p id="selectedCar-error" class="error-message">{{ errors.selectedCar.msg }}</p>
            {% endif %}
        </div>
    </div>
{% endmacro %}

{% macro render(config) %}
    {{ vehicleLookupManualQuestion(config) }}
{% endmacro %}

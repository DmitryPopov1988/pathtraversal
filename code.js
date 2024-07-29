{% from "additional-driver-playback/macro.njk" import additionalDriverPlayback with context %}
{% from "summary/shared.view.njk" import header %}
{% from "script-tag.njk" import scriptTag %}
{% from "playback-content/macro.njk" import playbackContent %}

{% macro additionalDrivers(risk, isRenewal, incrementYears, removedClaimsAndConvictions) %}
  <section class="playback-content" id="additional-drivers">
    {{ header("Additional drivers", "additional-drivers-heading", $path_prefix, "/car/questions/additional-drivers", commonQueryParams) }}

    {% if risk.hasAdditionalDrivers %}
      <ul role="list" class="playback-items" data-variant="list">
        {% for driver in risk.additionalDrivers %}
          
          {% set editActionHref = $path_prefix + "/car/questions/additional-drivers/edit/" + loop.index + "?" + commonQueryParams() %}

          <li>
            <div class="playback-heading">
                <h4 id="additional-driver-{{ loop.index }}-heading" class="maskpii sessioncamexclude sessioncamhidetext">
                    {{ driver.firstName + " " + driver.lastName }}{% if driver.relationshipToProposer %}, {{ driver.relationshipToProposer.displayText }}{% endif %}, {{ driver.dateOfBirth | dateFormat("dd/mm/yyyy") }}
                </h4>
                <button
                    type="button"
                    class="link"
                    value="additional-driver-remove_{{ loop.index }}"
                    aria-describedby="additional-driver-{{ loop.index }}-heading"
                    data-toggle="modal"
                    data-target="remove-additional-driver-dialog"
                >
                    Remove <span class="accessible-text">additional</span> driver
                </button>
            </div>

            {{ playbackContent({
                id: "additional-driver-about-" + loop.index,
                heading: "About " + driver.firstName,
                tag: "div",
                headingTag: "h5",
                items: [
                  {
                    heading: "Name",
                    details: driver.firstName + " " + driver.lastName,
                    pii: true
                  },
                  {
                    heading: "Date of birth",
                    details: driver.dateOfBirth | dateFormat("dd/mm/yyyy"),
                    pii: true
                  },
                  {
                    heading: "Relationship status",
                    details: driver.relationshipStatus.displayText,
                    pii: false
                  },
                  {
                    heading: "Lived in the UK since birth",
                    details: "Yes" if driver.livedInUkSinceBirth else "No",
                    pii: false
                  }
                ],
                editActionHref: editActionHref + "#relationshipToProposer"
            }) }}

            {{ playbackContent({
                id: "additional-driver-employment-" + loop.index,
                heading: driver.firstName | possessiveCase + " employment",
                tag: "div",
                headingTag: "h5",
                items: [
                  {
                    heading: "Employment status",
                    details: driver.employmentStatus.displayText,
                    pii: false
                  },
                  {
                    heading: "Job title" if driver.jobTitle,
                    details: driver.jobTitle.displayText,
                    pii: false
                  },
                  {
                    heading: "Industry" if driver.industry,
                    details: driver.industry.displayText,
                    pii: false
                  },
                  {
                    heading: "Type of student" if driver.studentType,
                    details: driver.studentType.displayText,
                    pii: false
                  }
                ],
                editActionHref: editActionHref + "#employmentStatus"
            }) }}

            {{ playbackContent({
                id: "additional-driver-licence-" + loop.index,
                heading: driver.firstName | possessiveCase + " licence",
                tag: "div",
                headingTag: "h5",
                items: [
                  {
                    heading: "Licence type" if driver.licenceType,
                    details: driver.licenceType.displayText,
                    pii: false
                  },
                  {
                    heading: "Licence held for" if driver.licenceHeldFor,
                    details: driver.licenceHeldFor.displayText,
                    pii: false,
                    highlightedContent: "We’ve added " + incrementYears + " to " + driver.firstName | possessiveCase+ " licence." if isRenewal,
                    highlightedContentId: "additionalDrivers[" + loop.index0 + "].licenceHeldFor-playback" if isRenewal,
                    highlightedContentHidden: isRenewal
                  },
                  {
                    heading: "Driving licence number",
                    details: driver.drivingLicenceNumber if driver.drivingLicenceNumber else "Not provided",
                    pii: true,
                    detailsClass: "text-uppercase"
                  },
                  {
                    heading: "Licence valid from" if driver.licenceIssueDate,
                    details: driver.licenceIssueDate | dateFormat("mm/yyyy"),
                    pii: false
                  },
                  {
                    heading: "Access to other vehicles",
                    details: "Yes" if driver.useOfOtherVehicles else "No",
                    pii: false
                  }
                ],
                editActionHref: editActionHref + "#licenceType"
            }) }}

            {{ playbackContent({
                id: "additional-driver-licence-restrictions-" + loop.index,
                heading: driver.firstName | possessiveCase + " licence restrictions",
                tag: "div",
                headingTag: "h5",
                items: [
                  {
                    heading: "DVLA reportable conditions",
                    details: driver.driverVehicleLicensingAgencyAware.displayText if driver.hasMedicalConditions else "No",
                    pii: false
                  },
                  {
                    heading: "Had insurance denied before",
                    details: "Yes" if driver.policyCancelled else "No",
                    pii: false
                  },
                  {
                    heading: "Unspent non-motoring convictions",
                    details: "Yes" if driver.unspentConvictions else "No",
                    pii: false
                  }
                ],
                editActionHref: editActionHref + "#hasMedicalConditions"
            }) }}

            {{ playbackContent({
                id: "driver-claims-" + loop.index,
                heading: driver.firstName | possessiveCase + " claims in the last 5 years",
                items: driver.claimsData,
                editActionHref: $path_prefix + "/car/questions/additional-drivers/edit/" +loop.index+ "/claims-convictions?" + commonQueryParams(),
                highlightedContent: removedClaimsAndConvictions['additionalDrivers[' +(loop.index - 1)+'].claims']

            }) }}

            {{ playbackContent({
                id: "driver-convictions-" + loop.index,
                heading: driver.firstName | possessiveCase + " motoring convictions in the last 5 years",
                items: driver.convictionsData,
                editActionHref: $path_prefix + "/car/questions/additional-drivers/edit/" +loop.index+ "/claims-convictions?" + commonQueryParams(),
                highlightedContent: removedClaimsAndConvictions['additionalDrivers[' +(loop.index - 1)+'].convictions']
            }) }}

          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No additional drivers</p>
    {% endif %}
  </section>
{% endmacro %}

{% macro removeAdditionalDriverScript() %}
{% call scriptTag() %}
    const removeAdditionalDriverButtons = document.querySelectorAll('[value^="additional-driver-remove_"]');

    const removeAdditionalDriverDialog = new Modal(document.querySelector('#remove-additional-driver-dialog'));
    removeAdditionalDriverDialog.init();

    removeAdditionalDriverButtons.forEach(function (removeAdditionalDriverButton) {
        removeAdditionalDriverButton.addEventListener('click', function (e) {
          removeAdditionalDriverDialog.okButton.setAttribute('value', e.target.value);
        });
    });
{% endcall %}
{% endmacro %}

{% macro removeClaimsAndConvictionsAdditionDriverScript() %}
{% call scriptTag() %}
    const removeClaimButtons = document.querySelectorAll('[value^="driver-claim-remove"]');
    const removeConvictionButtons = document.querySelectorAll('[value^="driver-conviction-remove"]');

    const removeClaimDialog = new Modal(document.querySelector('#remove-claim-dialog'));
    const removeConvictionDialog = new Modal(document.querySelector('#remove-conviction-dialog'));
    
    removeClaimDialog.init();
    removeConvictionDialog.init();

    removeClaimButtons.forEach(function (removeBtn) {
        removeBtn.addEventListener('click', function (e) {
            removeClaimDialog.okButton.setAttribute('value', e.target.value);
        });
    });

    removeConvictionButtons.forEach(function (removeConvictionButton) {
        removeConvictionButton.addEventListener('click', function () {
            removeConvictionDialog.okButton.setAttribute('value', removeConvictionButton.getAttribute('value'));
        });
    });

{% endcall %}
{% endmacro %}

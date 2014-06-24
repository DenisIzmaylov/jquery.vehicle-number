/**
 * jQuery Vehicle Number visualization
 *
 * @author Denis Izmaylov <izmaylov.dm@gmail.com>
 * @date 2014-06-23
 * @example
 *
 * 1. Create:
 *    $(elem).UIVehicleNumber({
 *      value: 'x123ox77',
 *      createDOM: false,
 *      size: 'small'
 *    });
 *
 */

;(function (factory) {

    'use strict';

    // Module systems magic dance.

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // NodeJS / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }

})(function ($, _) {

    'use strict';

    var pluginName = 'VehicleNumber',

        /**
         * Default component options,
         * you can override it via component constructor
         * @type {Object}
         */
        defaultOptions = {

            width: 612,
            height: 124,
            number: '',
            district: '',

            createDOM: true,
            style: ''

        }, // defaultOptions {...}


        componentTemplates = {

            container:
                '<div class="ui-vehicle-number">' +
                    '<span class="number"></span>' +
                    '<span class="district"></span>' +
                '</div>'
        },


        /** @type {ComponentInstance[]} */
        componentInstances = [],


        eventHandlers = {

            onChange: function (instance, value) {

                //instance.owner.toggle)
            }

        }, // eventHandlers {...}



        /**
         * Component instance constructor,
         * will be placed at <componentInstances>
         * @param {Object} [data]
         * @constructor
         * @todo replace extend(this) to extend(prototype)!
         */
        ComponentInstance = function (owner) {

            jQuery.extend(this, {

                owner: owner,

                options: jQuery.extend({}, defaultOptions),



                /**
                 * @param {Object} options
                 */
                createComponent: function (options) {

                    // create DOM element, bind event handlers
                    if (options.createDOM) {

                        this.domObj = $(componentTemplates.container);

                        this.domObj.appendTo(this.owner);

                    } else {

                        this.domObj = this.owner.find('.ui-vehicle-number');
                    }


                    if (options.style) {

                        this.domObj.addClass(options.style);
                    }


                    this.updateComponent(options);

                }, // createComponent()


                /**
                 * @param {Object} options
                 */
                updateComponent: function (options) {

                    if (typeof options.number !== 'undefined') {

                        this.domObj.find('.number').html(options.number);
                    }

                    if (typeof options.number !== 'undefined') {

                        this.domObj.find('.district').html(options.district);
                    }

                }, // updateComponent()


                destroyComponent: function () {

                    if (this.options.createDOM) {

                        this.domObj.remove();

                    }

                    return true;

                } // destroyComponent()

            }); // jQuery.extend(this, {...})

        }; // ComponentInstance()



    /**
     * jQuery Plugin interface layer
     * @param {String|Object} [param] action name (i.e. 'destroy') or params to update
     * @this {jQuery}
     */
    $.fn[pluginName] = function (param) {

        var result,
            action = (typeof param === 'string') ? param : 'create',
            options = (typeof param === 'object') ?
                param :
                (typeof arguments[1] === 'object') ? arguments[1] : {};



        // Process each element
        this.each(function () {

            var $this = $(this);

            /**
             * Try to find a component instance for this element,
             * also update <action> in successful ('create' --> 'update')
             */
            var currentInstance, currentIndex;

            for (var index = 0, length = componentInstances.length;
                 index < length; index++) {

                if (componentInstances[index].owner.is($this)) {

                    currentInstance = componentInstances[index];
                    currentIndex    = index;

                    if (action === 'create') {

                        action = 'update';
                    }

                    break;
                }
            }



            /**
             * Process basic actions ('create', 'update', 'destroy')
             */
            switch (action) {

                case 'create':

                    currentInstance = new ComponentInstance($this);

                    componentInstances.push(currentInstance);

                    currentInstance.createComponent(
                        jQuery.extend({}, defaultOptions, options)
                    );

                    break;



                case 'update':

                    componentInstances.updateComponent(options);
                    break;



                case 'options':

                    if (typeof currentInstance === 'object') {

                        result = currentInstance.options;
                    }

                    break;



                case 'destroy':

                    if (typeof currentIndex === 'number') {

                        if (currentInstance.destroyComponent()) {

                            componentInstances.splice(currentIndex, 1);
                        }
                    }

                    break;



                default:

                    if (typeof currentInstance[action] === 'function') {

                        result = currentInstance[action](options);
                    }

                    break;

            } // switch (action)

        });


        return (typeof result !== 'undefined') ? result : this;

    }; // $.fn.UIVolumeTracker()

});

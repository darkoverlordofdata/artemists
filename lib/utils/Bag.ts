module artemis.utils {

	/**
	* Collection type a bit like ArrayList but does not preserve the order of its
	* entities, speedwise it is very good, especially suited for games.
	*/

	export class Bag<E> implements ImmutableBag<E> {
		private data_: E[];
		private size_: number = 0;

		/**
		* Constructs an empty Bag with the specified initial capacity.
		* Constructs an empty Bag with an initial capacity of 64.
		*
		* @param capacity
		*            the initial capacity of Bag
		*/
		constructor(capacity: number = 64) {
			this.data_ = new Array(capacity);
		}

		/**
		* Removes the element at the specified position in this Bag. does this by
		* overwriting it was last element then removing last element
		*
		* @param index
		*            the index of element to be removed
		* @return element that was removed from the Bag
		*/
		removeAt(index: number): E {
			var e: E = this.data_[index]; // make copy of element to remove so it can be returned
			this.data_[index] = this.data_[--this.size_]; // overwrite item to remove with last element
			this.data_[this.size_] = null; // null last element, so gc can do its work
			return e;
		}


		/**
		* Removes the first occurrence of the specified element from this Bag, if
		* it is present. If the Bag does not contain the element, it is unchanged.
		* does this by overwriting it was last element then removing last element
		*
		* @param e
		*            element to be removed from this list, if present
		* @return <tt>true</tt> if this list contained the specified element
		*/
		remove(e:E): boolean {
			var i: number;
			var e2: E;

			for (i = 0; i < this.size_; i++) {
				e2 = this.data_[i];

				if (e == e2) {
					this.data_[i] = this.data_[--this.size_]; // overwrite item to remove with last element
					this.data_[this.size_] = null; // null last element, so gc can do its work
					return true;
				}
			}

			return false;
		}

		/**
		* Remove and return the last object in the bag.
		*
		* @return the last object in the bag, null if empty.
		*/
		removeLast():E {
			if(this.size_ > 0) {
				var e:E = this.data_[--this.size_];
				this.data_[this.size_] = null;
				return e;
			}

			return null;
		}

		/**
		* Check if bag contains this element.
		*
		* @param e
		* @return
		*/
		contains(e: E): boolean {
			var i:number;

			for(i = 0; this.size_ > i; i++) {
				if(e === this.data_[i]) {
					return true;
				}
			}
			return false;
		}

		/**
		* Removes from this Bag all of its elements that are contained in the
		* specified Bag.
		*
		* @param bag
		*            Bag containing elements to be removed from this Bag
		* @return {@code true} if this Bag changed as a result of the call
		*/
		removeAll(bag: ImmutableBag<E>):boolean {
			var modified:boolean = false;
			var i:number;
			var j:number;
			var e1: E;
			var e2: E;

			for (i = 0; i < bag.size(); i++) {
				e1 = bag.get(i);

				for (j = 0; j < this.size_; j++) {
					e2 = this.data_[j];

					if (e1 === e2) {
						this.removeAt(j);
						j--;
						modified = true;
						break;
					}
				}
			}

			return modified;
		}

		/**
		 * Returns the element at the specified position in Bag.
		 *
		 * @param index
		 *            index of the element to return
		 * @return the element at the specified position in bag
     *
     * @throws ArrayIndexOutOfBoundsException
		 */
		get(index:number):E {
      if (index >= this.data_.length) {
        throw new Error('ArrayIndexOutOfBoundsException')
      }
			return this.data_[index];
		}

    /**
     * Returns the element at the specified position in Bag. This method
     * ensures that the bag grows if the requested index is outside the bounds
     * of the current backing array.
     *
     * @param index
     *			index of the element to return
     *
     * @return the element at the specified position in bag
     *
     */
    safeGet(index:number):E {
      if (index >= this.data_.length) {
        this.grow((index * 7) / 4 + 1)
      }
      return this.data_[index];
    }

		/**
		* Returns the number of elements in this bag.
		*
		* @return the number of elements in this bag
		*/
		size():number {
			return this.size_;
		}

		/**
		* Returns the number of elements the bag can hold without growing.
		*
		* @return the number of elements the bag can hold without growing.
		*/
		getCapacity():number {
			return this.data_.length;
		}

		/**
		* Checks if the internal storage supports this index.
		*
		* @param index
		* @return
		*/
		isIndexWithinBounds(index:number):boolean {
			return index < this.getCapacity();
		}

		/**
		* Returns true if this list contains no elements.
		*
		* @return true if this list contains no elements
		*/
		isEmpty():boolean {
			return this.size_ == 0;
		}

		/**
		* Adds the specified element to the end of this bag. if needed also
		* increases the capacity of the bag.
		*
		* @param e
		*            element to be added to this list
		*/
		add(e:E) {
			// is size greater than capacity increase capacity
			if (this.size_ === this.data_.length) {
				this.grow();
			}

			this.data_[this.size_++] = e;
		}

		/**
		* Set element at specified index in the bag.
		*
		* @param index position of element
		* @param e the element
		*/
		set(index:number, e:E) {
			if(index >= this.data_.length) {
				this.grow(index*2);
			}
			this.size_ = index+1;
			this.data_[index] = e;
		}

		grow(newCapacity:number=~~((this.data_.length * 3) / 2) + 1) {
			this.data_.length = ~~newCapacity;
		}

		ensureCapacity(index:number) {
			if(index >= this.data_.length) {
				this.grow(index*2);
			}
		}

		/**
		* Removes all of the elements from this bag. The bag will be empty after
		* this call returns.
		*/
		clear() {
			var i:number;
			// null all elements so gc can clean up
			for (i = 0; i < this.size_; i++) {
				this.data_[i] = null;
			}

			this.size_ = 0;
		}

		/**
		* Add all items into this bag.
		 * @param items
		 */
		addAll(items:ImmutableBag<E>) {
			var i:number;

			for(i = 0; items.size() > i; i++) {
				this.add(items.get(i));
			}
		}

	}
}

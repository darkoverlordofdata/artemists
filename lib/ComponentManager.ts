module artemis {
	
	
	export class ComponentManager extends Manager {
		private componentsByType_: Bag<Bag<Component>>;
		private deleted_: Bag<Entity>;
	
		constructor() {
			super()
			this.componentsByType_ = new Bag<Bag<Component>>();
			this.deleted_ = new Bag<Entity>();
		}
		
		//@Override
		public initialize() {
		}
	
		private removeComponentsOfEntity(e:Entity) {
			var componentBits:BitSet = e.getComponentBits();
			for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i+1)) {
				this.componentsByType_.get(i).set(e.getId(), null);
			}
			componentBits.clear();
		}
		
		public addComponent(e:Entity, type:ComponentType, component:Component) {
			this.componentsByType_.ensureCapacity(type.getIndex());
			
			var components:Bag<Component> = this.componentsByType_.get(type.getIndex());
			if(components == null) {
				components = new Bag<Component>();
				this.componentsByType_.set(type.getIndex(), components);
			}
			
			components.set(e.getId(), component);
	
			e.getComponentBits().set(type.getIndex());
		}
	
		public removeComponent(e:Entity, type:ComponentType) {
			if(e.getComponentBits().get(type.getIndex())) {
				this.componentsByType_.get(type.getIndex()).set(e.getId(), null);
				e.getComponentBits().clear(type.getIndex());
			}
		}
		
		public getComponentsByType(type:ComponentType):Bag<Component> {
			var components:Bag<Component> = this.componentsByType_.get(type.getIndex());
			if(components == null) {
				components = new Bag<Component>();
				this.componentsByType_.set(type.getIndex(), components);
			}
			return components;
		}
		
		public getComponent(e:Entity, type:ComponentType):Component {
			var components:Bag<Component> = this.componentsByType_.get(type.getIndex());
			if(components != null) {
				return components.get(e.getId());
			}
			return null;
		}
		
		public getComponentsFor(e:Entity, fillBag:Bag<Component>):Bag<Component> {
			var componentBits:BitSet = e.getComponentBits();
	
			for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i+1)) {
				fillBag.add(this.componentsByType_.get(i).get(e.getId()));
			}
			
			return fillBag;
		}
	
		
		//@Override
		public deleted(e:Entity) {
			this.deleted_.add(e);
		}
		
		public clean() {
			if(this.deleted_.size() > 0) {
				for(var i = 0; this.deleted_.size() > i; i++) {
					this.removeComponentsOfEntity(this.deleted_.get(i));
				}
				this.deleted_.clear();
			}
		}
	
	}
}

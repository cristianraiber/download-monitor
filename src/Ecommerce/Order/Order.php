<?php

namespace Never5\DownloadMonitor\Ecommerce\Order;

class Order {

	/** @var int */
	private $id;

	/** @var Status\OrderStatus */
	private $status;

	/** @var \DateTimeImmutable */
	private $date_created = null;

	/** @var \DateTimeImmutable */
	private $date_modified = null;

	/** @var string */
	private $currency;

	/** @var OrderCustomer */
	private $customer;

	/** @var OrderCoupon[] */
	private $coupons;

	/** @var OrderItem[] */
	private $items;

	/** @var Transaction\OrderTransaction[] */
	private $transactions;

	/**
	 * @return int
	 */
	public function get_id() {
		return $this->id;
	}

	/**
	 * @param int $id
	 */
	public function set_id( $id ) {
		$this->id = $id;
	}

	/**
	 * @return Status\OrderStatus
	 */
	public function get_status() {
		return $this->status;
	}

	/**
	 * @param Status\OrderStatus $status
	 */
	public function set_status( $status ) {
		$this->status = $status;
	}

	/**
	 * @return \DateTimeImmutable
	 */
	public function get_date_created() {
		return $this->date_created;
	}

	/**
	 * @param \DateTimeImmutable $date_created
	 */
	public function set_date_created( $date_created ) {
		$this->date_created = $date_created;
	}

	/**
	 * @return \DateTimeImmutable
	 */
	public function get_date_modified() {
		return $this->date_modified;
	}

	/**
	 * @param \DateTimeImmutable $date_modified
	 */
	public function set_date_modified( $date_modified ) {
		$this->date_modified = $date_modified;
	}

	/**
	 * @return string
	 */
	public function get_currency() {
		return $this->currency;
	}

	/**
	 * @param string $currency
	 */
	public function set_currency( $currency ) {
		$this->currency = $currency;
	}

	/**
	 * @return OrderCustomer
	 */
	public function get_customer() {
		return $this->customer;
	}

	/**
	 * @param OrderCustomer $customer
	 */
	public function set_customer( $customer ) {
		$this->customer = $customer;
	}

	/**
	 * @return OrderCoupon[]
	 */
	public function get_coupons() {
		return $this->coupons;
	}

	/**
	 * @param OrderCoupon[] $coupons
	 */
	public function set_coupons( $coupons ) {
		$this->coupons = $coupons;
	}

	/**
	 * @return OrderItem[]
	 */
	public function get_items() {
		return $this->items;
	}

	/**
	 * @param OrderItem[] $items
	 */
	public function set_items( $items ) {
		$this->items = $items;
	}

	/**
	 * @return Transaction\OrderTransaction[]
	 */
	public function get_transactions() {
		return $this->transactions;
	}

	/**
	 * @param Transaction\OrderTransaction[] $transactions
	 */
	public function set_transactions( $transactions ) {
		$this->transactions = $transactions;
	}

	/**
	 * @param Transaction\OrderTransaction $transaction
	 */
	public function add_transaction( $transaction ) {
		$transactions = $this->get_transactions();
		if ( ! is_array( $transactions ) ) {
			$transactions = array();
		}
		$transactions[] = $transaction;
		$this->set_transactions( $transactions );
	}


	/**
	 * Returns order total in cents
	 *
	 * @return int
	 */
	public function get_total() {
		$total = 0;
		$items = $this->get_items();
		if ( ! empty( $items ) ) {
			foreach ( $items as $item ) {
				$total += (int) $item->get_total();
			}
		}

		return $total;
	}

	/**
	 * Returns order subtotal in cents (subtotal of all items, WITHOUT TAX, DISCOUNTS, ETC)
	 *
	 * @return int
	 */
	public function get_subtotal() {
		$subtotal = 0;
		$items    = $this->get_items();
		if ( ! empty( $items ) ) {
			foreach ( $items as $item ) {
				$subtotal += (int) $item->get_subtotal();
			}
		}

		return $subtotal;
	}

}